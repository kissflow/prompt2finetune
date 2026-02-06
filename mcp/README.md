# MCP Workshop: Smart Sprint Kickoff with 5 MCP Servers

## Overview

Welcome to the **Model Context Protocol (MCP) Workshop**! This hands-on workshop teaches you how to orchestrate multiple data sources through Claude using MCP servers. You'll learn to build intelligent workflows that connect Linear, GitHub, MongoDB, Filesystem, and Notion in a single prompt.

### What You'll Build

By the end of this workshop, you'll create a **"Smart Sprint Kickoff"** system that:

1. 📋 **Linear** → Pulls sprint tickets assigned to you
2. 🐙 **GitHub** → Checks related branches, PRs, and commits
3. 🗄️ **MongoDB** → Queries production bug/error data
4. 📁 **Filesystem** → Reads project docs and configs
5. 📝 **Notion** → Creates a comprehensive Sprint Kickoff Plan

All from **ONE PROMPT** to Claude!

## What is MCP?

The Model Context Protocol (MCP) is an open standard that allows AI assistants like Claude to securely connect to external data sources and tools. Instead of manually gathering information from multiple systems, you describe what you need and Claude orchestrates the tools to get it done.

**Key Concepts:**
- **MCP Servers**: Programs that expose data/tools to Claude (e.g., Linear server, GitHub server)
- **Tools**: Functions Claude can call (e.g., `list_issues`, `search_code`, `find_documents`)
- **Orchestration**: Claude intelligently chains multiple MCP servers to complete complex tasks

## Learning Path Integration

This workshop extends your AI journey:

```
1. Prompting Strategies → 2. RAG → 3. Fine-tuning → 4. MCP Orchestration
   (Simple prompts)      (Single    (Specialized     (Multiple data
                         source)     models)          sources)
```

## Workshop Structure

| Section | Duration | What You'll Learn |
|---------|----------|-------------------|
| **Setup & Prerequisites** | 15 min | Install Claude Desktop, MCP servers, configure API keys |
| **Linear Integration** | 10 min | Query and create sprint tasks |
| **GitHub Integration** | 10 min | Search code, list PRs, review commits |
| **MongoDB Queries** | 15 min | Query production data, analyze bugs |
| **Filesystem Reading** | 10 min | Read architecture docs, analyze configs |
| **Notion Integration** | 10 min | Create and update documentation |
| **Multi-MCP Orchestration** | 20 min | **The Magic**: Combine all 5 servers in one prompt |
| **Hands-on Practice** | 20 min | Build your own workflows |

**Total Time**: 90-120 minutes

## Prerequisites

Before starting the workshop, complete these setup steps:

✅ **System Requirements**
✅ **Claude Desktop** installed
✅ **5 MCP Servers** configured
✅ **API Keys** acquired
✅ **MongoDB** seeded with sample data

📖 **[Complete Prerequisites Guide →](PREREQUISITES.md)**

## Quick Start

### 1. Verify Your Setup

```bash
# Check Node.js (v18+)
node --version

# Check MongoDB is running
mongosh --eval "db.version()"

# Verify Claude Desktop config
cat ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

### 2. Seed MongoDB Data

```bash
cd mcp/mongodb
npm install
node seed-mongo.js
```

### 3. Configure Claude Desktop

Edit your Claude Desktop config with all 5 MCP servers:

```bash
# macOS
code ~/Library/Application\ Support/Claude/claude_desktop_config.json

# Copy the template from setup/claude-desktop-config.json
```

### 4. Run the Workshop

Follow the step-by-step demo script:

📖 **[Workshop Demo Script →](workshop/demo-script.md)**

## The Star Prompt: Smart Sprint Kickoff

Once everything is configured, try this powerful orchestration prompt:

```
I'm starting a new sprint today. Help me prepare a complete Sprint Kickoff brief.

1. **Linear**: Find all issues assigned to me in the current sprint
2. **GitHub**: Check for open PRs and recent commits (last 7 days)
3. **MongoDB**: Query production_bugs for critical/high severity open issues
4. **Filesystem**: Read README.md, CHANGELOG.md, and config.json
5. **Notion**: Create a "Sprint Kickoff - [Today's Date]" page combining everything

Organize the Notion page with:
- Sprint Overview (tickets & priorities)
- Risk Assessment (critical bugs + recent deployments)
- Codebase Context (recent changes + feature flags)
- Recommended Action Plan (what to tackle first and why)
```

Watch Claude orchestrate all 5 MCP servers to create your personalized sprint plan!

## Workshop Files

```
mcp/
├── README.md                          ← You are here
├── PREREQUISITES.md                   Setup guide
├── TROUBLESHOOTING.md                 Common issues & fixes
│
├── setup/                             Configuration
│   ├── claude-desktop-config.json     MCP server config template
│   ├── mcp-servers-setup.md           Detailed installation
│   └── environment-check.sh           Verify prerequisites
│
├── mongodb/                           Database setup
│   ├── seed-mongo.js                  Sample data seeding
│   ├── package.json                   Dependencies
│   └── README.md                      MongoDB instructions
│
├── sample-project/                    Files for Filesystem MCP
│   ├── README.md                      Architecture docs
│   ├── CHANGELOG.md                   Version history
│   └── config.json                    Feature flags
│
├── workshop/                          Workshop materials
│   ├── demo-script.md                 Step-by-step guide
│   └── prompts/                       Sample prompts
│       ├── 01-linear-tasks.md         Linear integration
│       ├── 02-github-issues.md        GitHub integration
│       ├── 03-mongodb-queries.md      MongoDB queries
│       ├── 04-filesystem-reading.md   Filesystem reading
│       ├── 05-notion-docs.md          Notion integration
│       └── 06-orchestration.md        Multi-MCP workflows
│
└── scripts/                           Utilities
    └── verify-installation.js         Test MCP connections
```

## Sample Prompts Library

Each section includes copy-pasteable prompts:

- **[Linear Tasks](workshop/prompts/01-linear-tasks.md)** - Query and create sprint tasks
- **[GitHub Issues](workshop/prompts/02-github-issues.md)** - Search code, review PRs
- **[MongoDB Queries](workshop/prompts/03-mongodb-queries.md)** - Analyze production data
- **[Filesystem Reading](workshop/prompts/04-filesystem-reading.md)** - Read docs and configs
- **[Notion Docs](workshop/prompts/05-notion-docs.md)** - Create and update pages
- **[Orchestration](workshop/prompts/06-orchestration.md)** - Multi-MCP workflows ⭐

## Troubleshooting

Running into issues? Check the troubleshooting guide:

📖 **[Troubleshooting Guide →](TROUBLESHOOTING.md)**

Common issues:
- MCP server not connecting
- Authentication errors
- MongoDB connection refused
- Claude Desktop not recognizing servers

## Next Steps

After completing the workshop:

1. **Build Your Own Workflows** - Identify manual tasks in your workflow that could be automated
2. **Add More MCP Servers** - Explore [Awesome MCP Servers](https://github.com/punkpeye/awesome-mcp-servers)
3. **Share Your Experience** - What workflows did you build? Share with the community!

## Resources

- **MCP Specification**: https://modelcontextprotocol.io
- **Official MCP Servers**: https://github.com/modelcontextprotocol/servers
- **Linear MCP Docs**: https://linear.app/docs/mcp
- **Notion MCP Docs**: https://developers.notion.com/docs/mcp
- **Awesome MCP Servers**: https://github.com/punkpeye/awesome-mcp-servers

## Learning Path

Continue your AI journey:

- **Previous**: [Fine-tuning](../README.md) - Specialized models for specific tasks
- **Current**: MCP Orchestration - Multiple data sources
- **Next**: Build production AI applications with MCP + Fine-tuned models

---

**Ready to start?** → [Prerequisites Guide](PREREQUISITES.md) | [Demo Script](workshop/demo-script.md)
