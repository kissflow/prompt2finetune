# MCP Workshop Demo Guide

**Duration:** 60-90 minutes

This hands-on workshop demonstrates how Claude orchestrates multiple data sources using MCP (Model Context Protocol).

---

## Prerequisites

Before starting, ensure you've completed:
- ✅ [PREREQUISITES.md](./PREREQUISITES.md) - All 5 MCP servers configured
- ✅ MongoDB seeded with workshop data
- ✅ Linear issues WRK-1, WRK-2, WRK-3 created
- ✅ Claude Desktop restarted with MCP servers connected

**Verify:** Check the 🔌 icon in Claude Desktop shows all 5 servers connected.

---

## Part 1: Individual MCP Servers (30 min)

Test each MCP server individually to understand what data is available.

### 1.1 Linear - View Your Issues (5 min)

```
Show me all issues in my Linear workspace.
Focus on issues WRK-1, WRK-2, and WRK-3.
```

**Expected:** Lists the 3 issues you created with priorities and status.

---

### 1.2 MongoDB - Query Production Bugs (5 min)

```
Query the workshop_demo database, production_bugs collection.
Find all bugs and show:
- ticket_id
- title
- severity
- error_count
- commit_sha
- github_pr
```

**Expected:** Returns 3 bugs (WRK-1, WRK-2, WRK-3) with error details.

**Notice:** The `commit_sha` and `github_pr` fields link to GitHub!

---

### 1.3 GitHub - View Commits (5 min)

```
Search the kissflow/prompt2finetune repository (branch: workshop-sample)
for commits that mention "WRK-1" or "WRK-2" or "WRK-3" in the message.

Show the commit SHAs, messages, and dates.
```

**Expected:** Finds commits d30be37, 2e3fcd1, 00bca23, 4ea4fe2, ef0c84b

---

### 1.4 Filesystem - Read Code Files (5 min)

```
Read the file mcp/workshop-code/checkout-service/checkout.js

What bug was introduced and how was it fixed?
```

**Expected:** Explains the null pointer crash bug in WRK-1 and the fix.

---

### 1.5 Notion - Create a Test Page (5 min)

```
Create a Notion page titled "MCP Workshop Test" with:
- A heading "Testing Notion Integration"
- A bullet list with 3 items:
  - Linear integration ✅
  - MongoDB integration ✅
  - GitHub integration ✅
```

**Expected:** Creates the page in your Notion workspace.

---

## Part 2: Cross-System Orchestration (30 min)

Now the magic! Use multiple MCP servers in a single query.

### 2.1 Story 1: Investigate WRK-1 (Checkout Crash) - SOLVED ✅

```
Investigate the checkout crash bug (WRK-1) using all available data:

1. **Linear**: Get issue WRK-1 details
2. **MongoDB**: Query production_bugs for ticket_id "WRK-1"
   - Note the commit_sha field (d30be37)
   - Note the github_pr field (1)
3. **GitHub**: Find commits d30be37 and 2e3fcd1 in kissflow/prompt2finetune
4. **Filesystem**: Read mcp/workshop-code/checkout-service/checkout.js
5. **MongoDB**: Verify deployment - query deployments where service = "checkout-service" and version = "v2.3.1"

Connect all the dots: What was the bug? How was it fixed? Is it deployed?
```

**Expected:** Claude traces the complete story:
- Bug introduced in commit d30be37
- 342 errors in production (MongoDB)
- Fixed in commit 2e3fcd1 (GitHub)
- Deployed successfully in v2.3.1 (MongoDB deployments)
- Linear ticket status: resolved

**This is the "wow moment"** - seeing data correlated across 5 systems!

---

### 2.2 Story 2: Investigate WRK-2 (CDN Issues) - IN PROGRESS ⚠️

```
Investigate the CDN 503 error bug (WRK-2):

1. **Linear**: Get issue WRK-2 status
2. **MongoDB**: Query production_bugs for ticket_id "WRK-2"
   - Note commit_sha: 00bca23
3. **GitHub**: Find commit 00bca23 - what changed?
4. **Filesystem**: Read mcp/workshop-code/media-service/cdn-handler.js
5. **MongoDB**: Query deployments for media-service
   - Why was v3.0.0 rolled back?

What's the current status? Is it fixed?
```

**Expected:** Claude explains:
- CDN switch introduced 503 errors (commit 00bca23)
- Deployment v3.0.0 rolled back
- Currently on v2.9.5
- Retry logic added (commit 4ea4fe2) but doesn't solve root cause
- Still investigating

---

### 2.3 Story 3: Investigate WRK-3 (Memory Leak) - OPEN 🔴

```
Investigate the auth service memory leak (WRK-3):

1. **Linear**: Get issue WRK-3 details
2. **MongoDB**: Query production_bugs for ticket_id "WRK-3"
   - How many errors? How many users affected?
3. **Filesystem**: Read mcp/workshop-code/auth-service/session-manager.js
   - What's causing the memory leak?
4. **GitHub**: Search for commits mentioning "WRK-3"
5. **MongoDB**: Check deployments for auth-service
   - Is a fix deployed yet?

What's the root cause and current status?
```

**Expected:** Claude identifies:
- Memory leak from unbounded Map (89 errors, 234 users affected)
- Investigation commit ef0c84b found the issue
- Fix attempted but not deployed yet
- Auth-service still on v1.8.0 (has the bug)

---

## Part 3: The Ultimate Prompt (15 min)

### 3.1 Complete Sprint Summary

```
Create a complete sprint analysis combining all systems:

1. **Linear**: Get all issues WRK-1, WRK-2, WRK-3 with their status
2. **MongoDB**:
   - Query all production_bugs (show error counts and affected users)
   - Query all deployments (show success/rollback status)
3. **GitHub**: List all commits in workshop-sample branch mentioning WRK-1, WRK-2, or WRK-3
4. **Filesystem**: Read mcp/workshop-code/README.md for overview
5. **Notion**: Create a page titled "Sprint Analysis - [Today's Date]" with:

   ## Summary
   [Overview of the 3 issues]

   ## Status
   - WRK-1: ✅ Fixed and deployed
   - WRK-2: ⚠️ Investigating (deployment rolled back)
   - WRK-3: 🔴 Open (fix pending)

   ## Production Impact
   [Total errors, affected users from MongoDB]

   ## Deployment Health
   [Success/rollback status from MongoDB]

   ## Recommendations
   [Prioritized action items based on severity and impact]
```

**Expected:** Claude creates a comprehensive Notion page pulling data from all 5 systems with accurate cross-references.

**This demonstrates the full power of MCP orchestration!**

---

## Part 4: Experiment (15 min)

Try your own queries! Ideas:

### Find Untracked Bugs
```
Query MongoDB for production_bugs where ticket_id is null.
For each untracked bug, create a Linear issue with appropriate priority.
```

### Code Change Impact Analysis
```
For each deployment in MongoDB with status "rollback":
1. Find the commit_sha
2. Search GitHub for that commit
3. Read the related code file
4. Explain what went wrong
```

### Weekly Report
```
Generate a weekly report combining:
- Linear: Issues completed this week
- MongoDB: New bugs vs resolved bugs
- GitHub: Total commits
- Create a Notion page summarizing everything
```

---

## Troubleshooting

**MCP server not responding:**
- Quit Claude Desktop completely (Cmd+Q)
- Restart and check the 🔌 icon

**MongoDB queries failing:**
- Check MongoDB is running: `docker ps | grep mongo` or `brew services list | grep mongodb`
- Test connection: `mongosh mongodb://localhost:27017/workshop_demo`

**Linear/Notion OAuth issues:**
- Click the OAuth popup when it appears
- If blocked, check browser settings

**GitHub MCP not working:**
- Ensure Docker is running (GitHub MCP uses Docker)
- Pull image: `docker pull ghcr.io/github/github-mcp-server`

See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for more help.

---

## What You Learned

✅ **Individual MCP servers** - Each system has unique data
✅ **Cross-system queries** - Connect data across multiple sources
✅ **Data correlation** - MongoDB commit_sha → GitHub commits → Linear tickets
✅ **Realistic workflows** - Bug investigation, deployment analysis, sprint planning
✅ **Natural language** - No APIs, no code, just describe what you need

**The power of MCP:** Instead of switching between 5 tools, copying data, and manually correlating information, you ask Claude ONE question and it orchestrates everything.

---

## Next Steps

- **Adapt to your workflow:** Replace sample data with your real Linear/GitHub/MongoDB
- **Explore more MCP servers:** Check https://github.com/modelcontextprotocol/servers
- **Build custom servers:** Use the MCP SDK to create your own integrations
- **Share your experience:** What workflows did MCP unlock for you?

---

**Questions or issues?** Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) or open an issue on GitHub.

**Enjoyed the workshop?** ⭐ Star the repo and share with your team!
