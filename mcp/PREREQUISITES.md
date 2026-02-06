# Workshop Prerequisites

Complete these setup steps before the workshop begins. Allow **30-45 minutes** for first-time setup.

## ✅ Checklist Overview

- [ ] System requirements met (Node.js v18+, terminal access)
- [ ] Claude Desktop installed and running
- [ ] MongoDB installed and running
- [ ] 5 MCP servers installed
- [ ] API keys acquired and configured
- [ ] Sample data seeded
- [ ] Verification tests passed

---

## 1. System Requirements

### Operating System
- **macOS** 10.15 or later
- **Windows** 10/11 with PowerShell
- **Linux** (Ubuntu 20.04+ or equivalent)

### Required Software

#### Node.js (v18 or later)
```bash
# Check if installed
node --version

# Should show: v18.x.x or higher
```

**Install if needed:**
- **macOS**: `brew install node`
- **Windows**: Download from https://nodejs.org
- **Linux**: `curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -`

#### npm (comes with Node.js)
```bash
# Verify npm
npm --version
```

---

## 2. Claude Desktop

### Installation

**Download Claude Desktop:**
- https://claude.ai/download

**Install for your platform:**
- **macOS**: Drag to Applications folder
- **Windows**: Run installer
- **Linux**: Follow instructions for your distribution

### Verify Installation

1. Launch Claude Desktop
2. Sign in with your Anthropic account
3. Look for the 🔌 hammer icon at the bottom (MCP indicator)

### Locate Config File

You'll need to edit this file to add MCP servers:

```bash
# macOS
~/Library/Application Support/Claude/claude_desktop_config.json

# Windows
%APPDATA%\Claude\claude_desktop_config.json

# Linux
~/.config/Claude/claude_desktop_config.json
```

**Quick open:**
```bash
# macOS
code ~/Library/Application\ Support/Claude/claude_desktop_config.json

# Windows
code %APPDATA%\Claude\claude_desktop_config.json

# Linux
code ~/.config/Claude/claude_desktop_config.json
```

---

## 3. MongoDB Installation

You'll use MongoDB to query production data during the workshop. Choose **Option A** (Docker - easiest) or **Option B** (local install).

### Option A: MongoDB with Docker (Recommended)

**Install Docker:**
- https://docs.docker.com/get-docker/

**Run MongoDB container:**
```bash
docker run -d \
  -p 27017:27017 \
  --name mcp-mongo \
  mongo:7

# Verify it's running
docker ps | grep mcp-mongo
```

**Test connection:**
```bash
# Install mongosh (MongoDB shell)
# macOS: brew install mongosh
# Windows: Download from https://www.mongodb.com/try/download/shell

mongosh mongodb://localhost:27017
```

### Option B: MongoDB Local Install

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community@7.0
brew services start mongodb-community@7.0
```

**Ubuntu:**
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

**Windows:**
- Download from: https://www.mongodb.com/try/download/community
- Run installer, select "Complete" installation
- Install as a Windows Service

**Verify installation:**
```bash
mongosh --eval "db.version()"
# Should show: 7.0.x
```

---

## 4. Seed MongoDB Sample Data

Navigate to the mongodb folder and run the seeding script:

```bash
cd /Users/jimisaac/prompt2finetune/mcp/mongodb
npm install
node seed-mongo.js
```

**Expected output:**
```
✅ Connected to MongoDB
✅ Dropped existing collections
✅ Seeded production_bugs collection (5 documents)
✅ Seeded deployments collection (4 documents)
✅ Workshop database ready!
```

**Verify data:**
```bash
mongosh mongodb://localhost:27017/workshop_demo

# In mongosh:
db.production_bugs.countDocuments()
# Should return: 5

db.deployments.countDocuments()
# Should return: 4
```

---

## 5. API Keys & Account Setup

You'll need accounts and API keys for 5 services. **Linear and Notion** use OAuth (no manual API keys needed), but others require tokens.

### 5.1 Linear (OAuth - No API Key Needed)

1. Sign up: https://linear.app (free plan)
2. Create a workspace and team called **"Workshop"**
3. Create 5-10 sample issues in the Workshop team
4. When you first use the Linear MCP server, a browser will open asking you to authorize - just click "Allow"

**Sample issues to create:**
- "Implement user authentication API" (Priority: Urgent, Status: Todo)
- "Fix checkout page crash on mobile" (Priority: High, Status: Todo)
- "Add dark mode support" (Priority: Medium, Status: In Progress)
- "Database migration for v2.0 schema" (Priority: High, Status: Todo)
- "Write API documentation for /payments" (Priority: Low, Status: Backlog)

### 5.2 GitHub Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token (classic)"**
3. Name it: **"MCP Workshop"**
4. Select scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `read:org` (Read org and team membership)
   - ✅ `read:user` (Read user profile data)
5. Click **"Generate token"**
6. **Copy the token** (starts with `ghp_`) - you won't see it again!
7. Save it in a secure note/password manager

### 5.3 Notion (OAuth - No API Key Needed)

1. Sign up: https://notion.so (free plan)
2. Create a workspace (or use existing)
3. When you first use the Notion MCP server, a browser will open - log in and click "Allow access"
4. That's it! OAuth handles everything

### 5.4 MongoDB Connection String

If using local MongoDB or Docker (as instructed above):
```
mongodb://localhost:27017/workshop_demo
```

If using MongoDB Atlas (cloud):
1. Sign up: https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string from "Connect" button
4. Replace `<password>` with your actual password

---

## 6. Install MCP Servers

MCP servers are Node.js programs that run locally and connect Claude to external services.

### Install Using npx (Recommended)

The easiest method is to use `npx` which downloads and runs MCP servers on-demand. We'll configure this in the next step.

**No installation needed!** - Claude Desktop will automatically use `npx` to run servers when needed.

### Alternative: Install Globally

If you prefer to install MCP servers globally:

```bash
# Linear MCP server
npm install -g mcp-remote

# GitHub MCP server
npm install -g @modelcontextprotocol/server-github

# MongoDB MCP server
npm install -g mongodb-mcp-server

# Filesystem MCP server
npm install -g @modelcontextprotocol/server-filesystem

# Notion MCP server (uses remote)
# No install needed - uses mcp-remote
```

---

## 7. Configure Claude Desktop

Now that you have API keys, configure Claude Desktop to use all 5 MCP servers.

### Step 1: Open Config File

```bash
# macOS
code ~/Library/Application\ Support/Claude/claude_desktop_config.json

# Windows
code %APPDATA%\Claude\claude_desktop_config.json

# Linux
code ~/.config/Claude/claude_desktop_config.json
```

### Step 2: Add MCP Server Configuration

Copy the configuration from `mcp/setup/claude-desktop-config.json` and customize it with your values:

```json
{
  "mcpServers": {
    "linear": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.linear.app/sse"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_YOUR_TOKEN_HERE"
      }
    },
    "mongodb": {
      "command": "npx",
      "args": [
        "-y",
        "mongodb-mcp-server",
        "--connectionString",
        "mongodb://localhost:27017/workshop_demo"
      ]
    },
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/YOUR_USERNAME/prompt2finetune/mcp/sample-project"
      ]
    },
    "notion": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.notion.com/mcp"]
    }
  }
}
```

**⚠️ IMPORTANT:**
- Replace `YOUR_TOKEN_HERE` with your GitHub personal access token
- Replace `/Users/YOUR_USERNAME/` with your actual home directory path
- For MongoDB Atlas, replace the connection string with your Atlas connection string

### Step 3: Restart Claude Desktop

1. **Quit** Claude Desktop completely (not just close the window)
   - macOS: Cmd+Q
   - Windows: Right-click taskbar → Quit
2. **Relaunch** Claude Desktop
3. Look for the **🔌 hammer icon** at the bottom
4. Click it to see all 5 MCP servers
5. All should show **"Connected"** status (green)

---

## 8. Verification Tests

Run these tests to confirm everything works before the workshop.

### Test 1: MCP Servers Connected

In Claude Desktop, click the 🔌 hammer icon and verify:
- ✅ linear (connected)
- ✅ github (connected)
- ✅ mongodb (connected)
- ✅ filesystem (connected)
- ✅ notion (connected)

### Test 2: MongoDB Query

In Claude Desktop, paste this prompt:
```
Query the MongoDB workshop_demo database and show me how many documents are in the production_bugs collection.
```

**Expected response:** Should show 5 documents.

### Test 3: Filesystem Read

```
Read the README.md file from the sample project directory and summarize the architecture.
```

**Expected response:** Should describe the "ShopFlow E-commerce Platform" architecture.

### Test 4: GitHub (Optional)

```
List the most recent commits in the repository [YOUR_GITHUB_USERNAME/YOUR_REPO]
```

**Expected response:** Should show recent commits.

### Test 5: Linear OAuth

```
Show me all issues in the Workshop team in Linear.
```

**Expected behavior:**
- A browser window opens asking you to authorize Linear
- After authorizing, Claude shows your issues

### Test 6: Notion OAuth

```
Search for pages in my Notion workspace.
```

**Expected behavior:**
- A browser window opens asking you to authorize Notion
- After authorizing, Claude shows your pages

---

## 9. Automated Verification

Run the verification script to test all connections:

```bash
cd /Users/jimisaac/prompt2finetune/mcp/scripts
node verify-installation.js
```

**Expected output:**
```
🔍 MCP Workshop Setup Verification
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Node.js v18.17.0
✅ MongoDB connected (workshop_demo)
✅ Production bugs collection: 5 documents
✅ Deployments collection: 4 documents
✅ Sample project files found
✅ Claude Desktop config file exists
✅ 5 MCP servers configured

🎉 All checks passed! You're ready for the workshop.
```

---

## Troubleshooting

If any verification test fails, see the [Troubleshooting Guide](TROUBLESHOOTING.md).

**Common issues:**
- MCP server shows "disconnected" → Check API keys in config
- MongoDB connection refused → Ensure MongoDB is running (`docker ps` or `brew services list`)
- Filesystem access denied → Check path in config matches your system
- Linear/Notion OAuth stuck → Try quitting and restarting Claude Desktop

---

## Pre-Workshop Checklist

Before the workshop starts, verify:

- [ ] Claude Desktop shows 5 connected MCP servers
- [ ] MongoDB has 5 production_bugs and 4 deployments documents
- [ ] Linear workspace has sample issues
- [ ] GitHub token works (can list commits)
- [ ] Notion OAuth completed (can search pages)
- [ ] Filesystem can read sample-project/README.md
- [ ] Verification script passes all checks

**✅ Ready?** → [Start the Workshop](workshop/demo-script.md)
