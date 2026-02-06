const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const dbName = "workshop_demo";

async function seed() {
  const client = new MongoClient(uri);

  try {
    console.log("🔌 Connecting to MongoDB...");
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db(dbName);

    // Drop existing collections if they exist
    const collections = await db.listCollections().toArray();
    for (const col of collections) {
      await db.collection(col.name).drop();
      console.log(`🗑️  Dropped collection: ${col.name}`);
    }

    // ====================================================================
    // 1. PRODUCTION_BUGS COLLECTION
    // ====================================================================
    // 3 interconnected stories that span Linear, GitHub, and MongoDB
    console.log("\n📝 Seeding production_bugs collection...");
    await db.collection("production_bugs").insertMany([
      {
        // STORY 1: Checkout Crash (FIXED ✅)
        ticket_id: "WRK-1",
        title: "Checkout crash: null pointer on mobile Safari",
        severity: "critical",
        service: "checkout-service",
        error_count: 342,
        error_message: "TypeError: Cannot read property 'items' of null at processCart (checkout.js:127)",
        first_seen: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        last_seen: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago (when fixed)
        status: "resolved",
        assigned_to: "alice",
        stack_trace_url: "https://sentry.io/issues/12345",
        affected_users: 127,
        commit_sha: "d30be37", // Commit that introduced the bug
        github_pr: 1, // PR that fixed it
        resolved_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        resolution_notes: "Fixed null check in processCart - deployed in v2.3.1"
      },
      {
        // STORY 2: CDN Issues (IN PROGRESS ⚠️)
        ticket_id: "WRK-2",
        title: "Image CDN returning 503 under load",
        severity: "high",
        service: "media-service",
        error_count: 156,
        error_message: "Service Unavailable: CDN origin server not responding",
        first_seen: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        last_seen: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
        status: "investigating",
        assigned_to: "bob",
        stack_trace_url: "https://sentry.io/issues/12346",
        affected_users: 89,
        commit_sha: "00bca23", // Commit that introduced the CDN switch
        github_pr: 2, // PR attempting to fix (still open)
        resolution_notes: "Deployment v3.0.0 rolled back - investigating CDN configuration"
      },
      {
        // STORY 3: Auth Memory Leak (OPEN 🔴)
        ticket_id: "WRK-3",
        title: "Memory leak in auth session handler",
        severity: "critical",
        service: "auth-service",
        error_count: 89,
        error_message: "FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory",
        first_seen: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        last_seen: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        status: "open",
        assigned_to: "alice",
        stack_trace_url: "https://sentry.io/issues/12347",
        affected_users: 234,
        commit_sha: null, // No specific commit - gradual leak
        github_pr: 3, // Draft PR with attempted fix
        resolution_notes: "Draft PR #3 in progress - testing session cleanup logic"
      }
    ]);
    console.log("✅ Seeded production_bugs: 3 documents");

    // ====================================================================
    // 2. DEPLOYMENTS COLLECTION
    // ====================================================================
    // Deployment history linked to the 3 bug stories
    console.log("\n🚀 Seeding deployments collection...");
    await db.collection("deployments").insertMany([
      {
        // STORY 1: Checkout fix deployment (SUCCESS ✅)
        service: "checkout-service",
        version: "v2.3.1",
        deployed_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        deployed_by: "alice",
        status: "success",
        commit_sha: "2e3fcd1", // The commit that FIXED WRK-1
        pr_number: 1,
        environment: "production",
        duration_seconds: 127,
        notes: "Fix checkout null pointer crash - closes WRK-1",
        linked_tickets: ["WRK-1"]
      },
      {
        // STORY 2: CDN deployment (ROLLED BACK ⚠️)
        service: "media-service",
        version: "v3.0.0",
        deployed_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        deployed_by: "bob",
        status: "rollback",
        commit_sha: "00bca23", // The commit that CAUSED WRK-2
        pr_number: null,
        environment: "production",
        duration_seconds: 45,
        rollback_reason: "CDN 503 errors under load - WRK-2",
        notes: "Rolled back v3.0.0 due to CDN issues",
        linked_tickets: ["WRK-2"]
      },
      {
        // STORY 2: Rollback to previous version
        service: "media-service",
        version: "v2.9.5",
        deployed_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 3600000), // 1 day ago + 1 hour
        deployed_by: "bob",
        status: "success",
        commit_sha: "a1b2c3d",
        pr_number: null,
        environment: "production",
        duration_seconds: 38,
        notes: "Rolled back from v3.0.0 due to WRK-2 - using previous stable version",
        linked_tickets: ["WRK-2"]
      },
      {
        // STORY 3: Auth service (before memory leak was discovered)
        service: "auth-service",
        version: "v1.8.0",
        deployed_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
        deployed_by: "alice",
        status: "success",
        commit_sha: "e1f2a3b",
        pr_number: null,
        environment: "production",
        duration_seconds: 98,
        notes: "Added OAuth2 support for Google login",
        linked_tickets: []
      }
    ]);
    console.log("✅ Seeded deployments: 4 documents");

    // ====================================================================
    // 3. CREATE INDEXES
    // ====================================================================
    console.log("\n🔍 Creating indexes...");
    await db.collection("production_bugs").createIndex({ ticket_id: 1 });
    await db.collection("production_bugs").createIndex({ severity: 1, status: 1 });
    await db.collection("production_bugs").createIndex({ service: 1 });
    await db.collection("production_bugs").createIndex({ error_count: -1 });

    await db.collection("deployments").createIndex({ service: 1, deployed_at: -1 });
    await db.collection("deployments").createIndex({ status: 1 });

    console.log("✅ Created indexes");

    // ====================================================================
    // SUMMARY
    // ====================================================================
    console.log("\n" + "=".repeat(60));
    console.log("🎉 MongoDB seeding complete!");
    console.log("=".repeat(60));
    console.log(`Database: ${dbName}`);
    console.log(`Collections created: 2`);
    console.log(`  - production_bugs: 3 documents (WRK-1, WRK-2, WRK-3)`);
    console.log(`  - deployments: 4 documents`);
    console.log("=".repeat(60));
    console.log("\n✅ Workshop database ready!");
    console.log("\n📊 The 3 Interconnected Stories:");
    console.log("  WRK-1: Checkout crash (Fixed ✅) - deployed in v2.3.1");
    console.log("  WRK-2: CDN 503 errors (Investigating ⚠️) - v3.0.0 rolled back");
    console.log("  WRK-3: Auth memory leak (Open 🔴) - PR #3 in progress");
    console.log("\n💡 Verify with:");
    console.log(`   mongosh mongodb://localhost:27017/${dbName}`);
    console.log(`   > db.production_bugs.find().pretty()`);
    console.log(`   > db.deployments.find().pretty()`);
    console.log("\n🔗 Cross-reference test:");
    console.log(`   > db.production_bugs.findOne({ticket_id: "WRK-1"})`);
    console.log(`   > db.deployments.findOne({commit_sha: "2e3fcd1"})`);
    console.log("\n📝 GitHub commits (workshop-sample branch):");
    console.log(`   d30be37 - Add cart validation (introduced WRK-1)`);
    console.log(`   2e3fcd1 - Fix null check - closes WRK-1`);
    console.log(`   00bca23 - Switch CDN provider (introduced WRK-2)`);
    console.log(`   4ea4fe2 - Add CDN retry logic - addresses WRK-2`);
    console.log(`   ef0c84b - WIP: Investigate auth memory leak - WRK-3`);
    console.log("");

  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  } finally {
    await client.close();
    console.log("👋 Disconnected from MongoDB");
  }
}

// Run the seeding
seed().catch(console.error);
