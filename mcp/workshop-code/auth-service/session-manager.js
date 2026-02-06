// auth-service/session-manager.js
// ShopFlow E-commerce Platform - Authentication Service

/**
 * User session management
 *
 * BUG HISTORY (WRK-3):
 * - Memory leak discovered 1 day ago
 * - Commit ef0c84b: WIP investigation (PR #3 draft)
 * - Commit 4ea4fe2: Added cleanup logic (under testing)
 */

class SessionManager {
  constructor(redis, config) {
    this.redis = redis;
    this.sessionTTL = config.sessionTTL || 3600; // 1 hour default
    this.maxSessions = config.maxSessions || 10000;

    // ============================================================
    // BUG (WRK-3): This Map grows unbounded causing memory leak
    // Should be using Redis for session storage, not in-memory Map
    // ============================================================
    this.activeSessions = new Map(); // ⚠️ MEMORY LEAK HERE

    // Track disconnected sessions that weren't cleaned up
    this.zombieSessions = new Set();
  }

  /**
   * Create new user session
   * @param {string} userId - User ID
   * @param {Object} metadata - Session metadata
   * @returns {Promise<string>} Session token
   *
   * BUG (WRK-3): Sessions accumulate in memory
   * ERROR: "FATAL ERROR: Reached heap limit Allocation failed"
   * AFFECTED: 89 crashes, 234 users disconnected
   *
   * CAUSE: activeSessions Map grows unbounded, never cleaned up
   * STATUS: Draft fix in PR #3, pending testing
   */
  async createSession(userId, metadata = {}) {
    const sessionId = this.generateSessionId();

    // Check if we're approaching max sessions (memory limit)
    if (this.activeSessions.size >= this.maxSessions) {
      console.error(`[WRK-3] WARNING: Max sessions reached (${this.maxSessions})`);
      // This should trigger cleanup, but currently doesn't
    }

    const session = {
      sessionId,
      userId,
      createdAt: new Date(),
      lastActivity: new Date(),
      metadata,
      // ============================================================
      // BUG: These event listeners are never removed
      // When user disconnects, session stays in memory forever
      // ============================================================
      connections: [] // Track active connections (never cleaned)
    };

    // Store in both Redis (good) and memory (bad - causes leak)
    await this.redis.setex(
      `session:${sessionId}`,
      this.sessionTTL,
      JSON.stringify(session)
    );

    // ⚠️ THIS IS THE MEMORY LEAK
    // Map keeps growing, old sessions never removed
    this.activeSessions.set(sessionId, session);

    console.log(`[Session] Created session ${sessionId} for user ${userId}`);
    console.log(`[WRK-3] Active sessions in memory: ${this.activeSessions.size}`);

    return sessionId;
  }

  /**
   * Get session by ID
   */
  async getSession(sessionId) {
    // Check memory cache first (fast but leaky)
    const cachedSession = this.activeSessions.get(sessionId);
    if (cachedSession) {
      cachedSession.lastActivity = new Date();
      return cachedSession;
    }

    // Fall back to Redis
    const sessionData = await this.redis.get(`session:${sessionId}`);
    if (sessionData) {
      const session = JSON.parse(sessionData);
      // ⚠️ LEAK: Re-adding to memory on every get
      this.activeSessions.set(sessionId, session);
      return session;
    }

    return null;
  }

  /**
   * Destroy session
   *
   * ============================================================
   * ATTEMPTED FIX for WRK-3 (Commit 4ea4fe2 - PR #3)
   * Added cleanup logic, but still incomplete
   * ============================================================
   */
  async destroySession(sessionId) {
    console.log(`[Session] Destroying session ${sessionId}`);

    // Remove from Redis
    await this.redis.del(`session:${sessionId}`);

    // Remove from memory cache
    const session = this.activeSessions.get(sessionId);
    if (session) {
      // FIX: Clean up connection listeners
      if (session.connections) {
        session.connections.forEach(conn => {
          try {
            conn.removeAllListeners(); // Prevent listener leaks
          } catch (err) {
            console.error(`[WRK-3] Error cleaning connection:`, err);
          }
        });
      }

      this.activeSessions.delete(sessionId);
    }

    console.log(`[WRK-3] Session destroyed. Remaining: ${this.activeSessions.size}`);
  }

  /**
   * Clean up expired sessions
   *
   * NOTE: This runs every 5 minutes but doesn't fix the leak
   * because disconnected sessions aren't tracked properly
   */
  async cleanupExpiredSessions() {
    console.log(`[Session] Running cleanup... (${this.activeSessions.size} sessions)`);

    const now = Date.now();
    let cleaned = 0;

    for (const [sessionId, session] of this.activeSessions) {
      const age = now - session.lastActivity.getTime();

      // Remove sessions inactive for > TTL
      if (age > this.sessionTTL * 1000) {
        await this.destroySession(sessionId);
        cleaned++;
      }
    }

    console.log(`[Session] Cleanup complete: removed ${cleaned} expired sessions`);
    console.log(`[WRK-3] Remaining in memory: ${this.activeSessions.size}`);

    // ⚠️ STILL A PROBLEM: Zombie sessions not tracked
    // Users who disconnect without logout stay in memory forever
  }

  /**
   * Handle connection disconnect
   *
   * ============================================================
   * INCOMPLETE FIX (Commit 4ea4fe2)
   * Added this method but it's not always called
   * Need WebSocket/HTTP server integration
   * ============================================================
   */
  async onDisconnect(sessionId) {
    console.log(`[Session] User disconnected: ${sessionId}`);

    // Mark as zombie if not properly logged out
    this.zombieSessions.add(sessionId);

    // TODO: Should destroy session here?
    // await this.destroySession(sessionId);
  }

  /**
   * Generate unique session ID
   */
  generateSessionId() {
    return `sess_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  }

  /**
   * Get memory usage stats (for debugging WRK-3)
   */
  getMemoryStats() {
    const memUsage = process.memoryUsage();
    return {
      activeSessions: this.activeSessions.size,
      zombieSessions: this.zombieSessions.size,
      heapUsedMB: Math.round(memUsage.heapUsed / 1024 / 1024),
      heapTotalMB: Math.round(memUsage.heapTotal / 1024 / 1024),
      externalMB: Math.round(memUsage.external / 1024 / 1024)
    };
  }
}

module.exports = SessionManager;

// ============================================================
// WORKSHOP NOTES:
// ============================================================
// This file demonstrates Story 3 (WRK-3):
//
// BUG: Memory leak in session handler
// CAUSE: activeSessions Map (line 21) grows unbounded
//        Disconnected users stay in memory forever
// ROOT ISSUES:
//   1. Using in-memory Map instead of Redis only
//   2. Connection listeners never removed
//   3. onDisconnect not properly integrated with WebSocket server
//
// ATTEMPTED FIX: Lines 133-151 - Added cleanup and disconnect handler
// STATUS: Draft PR #3, needs more testing
//
// THE REAL FIX:
//   1. Remove activeSessions Map entirely, use Redis only
//   2. Integrate onDisconnect with WebSocket server lifecycle
//   3. Set up proper session expiration
//
// Cross-system links:
// - Linear Ticket: WRK-3 (Critical, Todo)
// - MongoDB Bug: ticket_id "WRK-3", 89 errors
// - GitHub Commits: ef0c84b (investigation), 4ea4fe2 (attempted fix)
// - GitHub PR: #3 (Draft)
// - Deployment: Pending (auth-service still on v1.8.0)
// ============================================================
