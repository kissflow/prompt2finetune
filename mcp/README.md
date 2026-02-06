# MCP Workshop: Orchestrating Multiple Data Sources with Claude

Learn how to connect Claude to 5 data sources (Linear, GitHub, MongoDB, Filesystem, Notion) and orchestrate them with natural language.

## 🎯 What You'll Learn

- Connect Claude to multiple systems using MCP (Model Context Protocol)
- Query data across Linear tickets, GitHub commits, MongoDB, and files
- Correlate production bugs → code changes → deployments
- Build powerful cross-system workflows with simple prompts

## 🚀 Quick Start

### 1. Setup (45-60 min)
Follow **[PREREQUISITES.md](./PREREQUISITES.md)** to:
- Install Claude Desktop and MCP servers
- Set up MongoDB with workshop data
- Create Linear issues (WRK-1, WRK-2, WRK-3)
- Configure API keys

### 2. Run the Workshop (60-90 min)
Follow **[DEMO.md](./DEMO.md)** for hands-on exercises:
- Test each MCP server individually
- Investigate 3 interconnected bug stories
- See cross-system data correlation in action

### 3. Get Help
If you run into issues, check **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)**

---

## 📖 Workshop Structure

```
mcp/
├── README.md              ← You are here
├── DEMO.md                ← 🎯 START HERE for hands-on workshop
├── PREREQUISITES.md       ← Setup instructions
├── TROUBLESHOOTING.md     ← Common issues & fixes
│
├── mongodb/               ← MongoDB seed script
│   ├── seed-mongo.js      ← Creates 3 bugs (WRK-1, WRK-2, WRK-3)
│   └── package.json
│
├── workshop-code/         ← Sample code files with bugs
│   ├── checkout-service/  ← WRK-1: Checkout crash
│   ├── media-service/     ← WRK-2: CDN 503 errors
│   ├── auth-service/      ← WRK-3: Memory leak
│   └── README.md
│
├── prompts/               ← Sample prompts for each MCP server
│   ├── 01-linear-tasks.md
│   ├── 02-github-issues.md
│   ├── 03-mongodb-queries.md
│   ├── 04-filesystem-reading.md
│   ├── 05-notion-docs.md
│   └── 06-orchestration.md    ← 🌟 Multi-system workflows
│
├── setup/                 ← Configuration templates
│   ├── claude-desktop-config.json
│   ├── mcp-servers-setup.md
│   └── environment-check.sh   ← Verify your setup
│
└── scripts/
    └── verify-installation.js
```

---

## 🔥 The 3 Stories

The workshop uses 3 interconnected bug stories to demonstrate cross-system correlation:

### Story 1: WRK-1 - Checkout Crash ✅ FIXED
- **Bug:** Null pointer crash on mobile Safari (342 errors, 127 users)
- **Cause:** Commit `d30be37` - missing null check
- **Fix:** Commit `2e3fcd1` - added validation
- **Status:** Deployed in checkout-service v2.3.1

### Story 2: WRK-2 - CDN 503 Errors ⚠️ IN PROGRESS
- **Bug:** Image CDN returning 503s under load (156 errors, 89 users)
- **Cause:** Commit `00bca23` - CDN provider switch
- **Status:** Deployment v3.0.0 rolled back, investigating

### Story 3: WRK-3 - Auth Memory Leak 🔴 OPEN
- **Bug:** Session handler memory leak (89 crashes, 234 users)
- **Cause:** Unbounded Map accumulation
- **Status:** Draft PR in progress, not deployed yet

**Each story spans all 5 systems** - demonstrating how MCP connects Linear tickets → MongoDB errors → GitHub commits → Code files → Deployment status

---

## ⚡ Why This Matters

**Before MCP:**
1. Check Linear for ticket WRK-1
2. Switch to MongoDB, query for errors
3. Copy commit SHA
4. Open GitHub, search for commit
5. Find related code file
6. Check deployment logs
7. Manually correlate everything
8. Update Notion with findings

**With MCP:**
```
Investigate WRK-1 across Linear, MongoDB, GitHub, and filesystem.
Create a Notion summary.
```

Claude does it all in one query. **This is the power of MCP.**

---

## 📚 Resources

- **MCP Documentation:** https://modelcontextprotocol.io
- **MCP Servers:** https://github.com/modelcontextprotocol/servers
- **GitHub MCP Server:** https://github.com/github/github-mcp-server
- **Linear MCP:** https://linear.app/docs/mcp
- **MongoDB MCP:** https://www.npmjs.com/package/mongodb-mcp-server

---

## 🎓 Learning Path

This workshop is **Part 4** of the AI development journey:

1. ✅ **Prompt Engineering** - Write effective prompts
2. ✅ **RAG (Retrieval-Augmented Generation)** - Connect LLMs to knowledge
3. ✅ **Fine-tuning** - Customize models for specific tasks
4. 🎯 **MCP Orchestration** - Connect LLMs to your entire tool ecosystem ← *You are here*

---

## 🤝 Contributing

Found an issue? Have suggestions? Open an issue or PR!

---

## 📝 License

Part of the [prompt2finetune](https://github.com/kissflow/prompt2finetune) learning series.

---

**Ready to start?** → **[DEMO.md](./DEMO.md)** 🚀
