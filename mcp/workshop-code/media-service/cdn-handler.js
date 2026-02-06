// media-service/cdn-handler.js
// ShopFlow E-commerce Platform - Media Service

/**
 * CDN Handler for product images and media assets
 *
 * BUG HISTORY (WRK-2):
 * - Commit c9d1f88: Switched from CloudFlare to Fastly CDN
 * - Commit d1a5c42: Added retry logic (PR #2 - under review)
 * - DEPLOYMENT: v3.0.0 rolled back due to 503 errors under load
 */

const axios = require('axios');

class CDNHandler {
  constructor(config) {
    this.cdnBaseUrl = config.cdnBaseUrl;
    this.apiKey = config.apiKey;
    this.maxRetries = config.maxRetries || 3;
    this.retryDelay = config.retryDelay || 1000;
  }

  /**
   * Fetch media asset from CDN
   * @param {string} assetPath - Path to asset (e.g., /products/img_123.jpg)
   * @returns {Promise<Buffer>} Asset data
   *
   * BUG (WRK-2): CDN returns 503 errors under load
   * ERROR: "Service Unavailable: CDN origin server not responding"
   * AFFECTED: 156 errors, 89 users
   *
   * CAUSE: New Fastly CDN not configured for same traffic patterns as CloudFlare
   * STATUS: Rolled back to v2.9.5, fix in progress
   */
  async fetchAsset(assetPath) {
    // ============================================================
    // ATTEMPTED FIX for WRK-2 (Commit d1a5c42 - PR #2)
    // Added retry logic with exponential backoff
    // ISSUE: Doesn't fully solve the problem - CDN origin misconfigured
    // ============================================================

    let lastError;

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        console.log(`[CDN] Fetching ${assetPath} (attempt ${attempt}/${this.maxRetries})`);

        const response = await axios.get(`${this.cdnBaseUrl}${assetPath}`, {
          headers: {
            'X-API-Key': this.apiKey,
            'User-Agent': 'ShopFlow-MediaService/3.0'
          },
          timeout: 5000,
          responseType: 'arraybuffer'
        });

        console.log(`[CDN] Successfully fetched ${assetPath}`);
        return response.data;

      } catch (error) {
        lastError = error;

        // Log error details for debugging WRK-2
        console.error(`[WRK-2] CDN fetch failed (attempt ${attempt}):`, {
          assetPath,
          status: error.response?.status,
          statusText: error.response?.statusText,
          message: error.message
        });

        // If this is a 503 error (the WRK-2 bug), retry with backoff
        if (error.response?.status === 503) {
          if (attempt < this.maxRetries) {
            const delay = this.retryDelay * Math.pow(2, attempt - 1);
            console.log(`[WRK-2] Retrying after ${delay}ms...`);
            await this.sleep(delay);
            continue;
          }
        }

        // For other errors (404, 401, etc.), don't retry
        if (error.response?.status && error.response.status !== 503) {
          throw error;
        }
      }
    }

    // All retries exhausted
    console.error(`[WRK-2] CRITICAL: CDN fetch failed after ${this.maxRetries} attempts`);
    throw new Error(`CDN unavailable: ${lastError.message}`);
  }

  /**
   * Upload media asset to CDN
   * @param {string} assetPath - Destination path
   * @param {Buffer} data - Asset data
   */
  async uploadAsset(assetPath, data) {
    try {
      // ============================================================
      // ORIGINAL BUG (Commit c9d1f88)
      // Switched CDN provider from CloudFlare to Fastly
      // This CDN configuration doesn't handle load properly
      // ============================================================

      const response = await axios.put(
        `${this.cdnBaseUrl}${assetPath}`,
        data,
        {
          headers: {
            'X-API-Key': this.apiKey,
            'Content-Type': 'application/octet-stream'
          },
          timeout: 30000
        }
      );

      console.log(`[CDN] Successfully uploaded ${assetPath}`);
      return {
        success: true,
        url: `${this.cdnBaseUrl}${assetPath}`,
        etag: response.headers.etag
      };

    } catch (error) {
      console.error(`[CDN] Upload failed for ${assetPath}:`, error.message);
      throw new Error(`CDN upload failed: ${error.message}`);
    }
  }

  /**
   * Purge cached asset from CDN
   */
  async purgeCache(assetPath) {
    try {
      await axios.delete(`${this.cdnBaseUrl}/cache${assetPath}`, {
        headers: {
          'X-API-Key': this.apiKey
        }
      });
      console.log(`[CDN] Cache purged for ${assetPath}`);
      return { success: true };
    } catch (error) {
      console.error(`[CDN] Cache purge failed:`, error.message);
      throw error;
    }
  }

  /**
   * Helper: Sleep for specified milliseconds
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = CDNHandler;

// ============================================================
// WORKSHOP NOTES:
// ============================================================
// This file demonstrates Story 2 (WRK-2):
//
// BUG: CDN returning 503 errors under load
// CAUSE: Switched from CloudFlare to Fastly without proper config
// ATTEMPTED FIX: Lines 43-78 - Added retry logic (helps but doesn't solve root cause)
// STATUS: Deployment v3.0.0 rolled back to v2.9.5
//
// Cross-system links:
// - Linear Ticket: WRK-2 (High, In Progress)
// - MongoDB Bug: ticket_id "WRK-2", 156 errors
// - GitHub Commit: c9d1f88 (CDN switch), d1a5c42 (retry logic)
// - GitHub PR: #2 (Open - under review)
// - Deployment: v3.0.0 rolled back, v2.9.5 currently running
//
// THE REAL FIX (not implemented yet):
// Need to reconfigure Fastly CDN origin servers to match traffic patterns
// ============================================================
