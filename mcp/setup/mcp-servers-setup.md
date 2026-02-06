# MCP Servers Setup Guide

Detailed installation instructions for each of the 5 MCP servers used in the workshop.

---

## Installation Methods

### Method 1: npx (Recommended - No Installation Needed!)

The easiest method is to use `npx` in your Claude Desktop config. Claude will automatically download and run the MCP servers when needed.

**Advantages:**
- ✅ No manual installation
- ✅ Always uses latest version
- ✅ No global npm pollution
- ✅ Works cross-platform

**This is what we use in the workshop!**

### Method 2: Global Installation

If you prefer to install MCP servers globally:

```bash
npm install -g mcp-remote
npm install -g @modelcontextprotocol/server-github
npm install -g mongodb-mcp-server
npm install -g @modelcontextprotocol/server-filesystem
```

Then in your config, use full paths:
```json
{
  "command": "node",
  "args": ["/usr/local/lib/node_modules/@modelcontextprotocol/server-github/dist/index.js"]
}
```

---

## 1. Linear MCP Server

### Overview
Connects Claude to Linear for project management tasks.

**Capabilities:**
- List teams and projects
- Query issues by status, assignee, priority
- Create new issues
- Update issue status and properties
- Search across all issues

### Setup Method: OAuth (Recommended)

Linear MCP uses **OAuth** - no API key needed!

**Configuration:**
```json
"linear": {
  "command": "npx",
  "args": ["-y", "mcp-remote", "https://mcp.linear.app/sse"]
}
```

**First Use:**
1. Start Claude Desktop with this config
2. Ask Claude: "Show me all issues in Linear"
3. A browser window will open
4. Log in to Linear and click "Allow access"
5. Done! Future requests won't require re-authorization

### Alternative: API Key Method

If you prefer using an API key instead of OAuth:

**Get API Key:**
1. Go to https://linear.app
2. Click Settings → API → "Create Key"
3. Name it "MCP Workshop"
4. Copy the key (starts with `lin_api_`)

**Configuration:**
```json
"linear": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-linear"],
  "env": {
    "LINEAR_API_KEY": "lin_api_YOUR_KEY_HERE"
  }
}
```

### Sample Data Setup

Create a Linear workspace with sample issues:

1. Go to https://linear.app
2. Create a team called "Workshop"
3. Create 5-10 sample issues:
   - "Implement user authentication API" (Urgent, Todo)
   - "Fix checkout page crash on mobile" (High, Todo)
   - "Add dark mode support" (Medium, In Progress)
   - "Database migration for v2.0 schema" (High, Todo)
   - "Write API documentation for /payments" (Low, Backlog)

### Verify Setup

In Claude Desktop:
```
Show me all issues in the Workshop team in Linear.
```

**Expected:** List of your issues with titles, statuses, and priorities.

---

## 2. GitHub MCP Server

### Overview
Connects Claude to GitHub repositories.

**Capabilities:**
- List repositories
- Search code across repos
- List pull requests and issues
- View commits and branches
- Read file contents
- Create issues and PRs (if scopes allow)

### Setup

**Get Personal Access Token:**
1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token (classic)"**
3. Name: **"MCP Workshop"**
4. Select scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `read:org` (Read org and team membership)
   - ✅ `read:user` (Read user profile data)
5. Click **"Generate token"**
6. **Copy the token** (starts with `ghp_`) - save it securely!

**Configuration:**
```json
    "github": {                                                                                                                                                                                                                                    
        "command": "docker",                                                                                                                                                                                                                         
        "args": [                                                                                                                                                                                                                                    
          "run",                                                                                                                                                                                                                                     
          "-i",                                                                                                                                                                                                                                      
          "--rm",                                                                                                                                                                                                                                    
          "-e",                                                                                                                                                                                                                                      
          "GITHUB_PERSONAL_ACCESS_TOKEN",                                                                                                                                                                                                            
          "ghcr.io/github/github-mcp-server"                                                                                                                                                                                                         
        ],                                                                                                                                                                                                                                           
        "env": {                                                                                                                                                                                                                                     
          "GITHUB_PERSONAL_ACCESS_TOKEN": "GITHUB_PERSONAL_ACCESS_TOKEN"                                                                                                                                                                                      
        }                                                                                                                                                                                                                                            
      },   
```

**⚠️ Security:**
- Never commit your token to git
- Store tokens in a password manager
- Rotate tokens regularly
- Use minimal required scopes

### Verify Setup

In Claude Desktop:
```
List the most recent commits in the repository [YOUR_USERNAME/YOUR_REPO]
```

**Expected:** List of recent commits with messages and authors.

### Troubleshooting

**"Bad credentials" error:**
```bash
# Test your token manually
curl -H "Authorization: token ghp_YOUR_TOKEN" https://api.github.com/user

# Should show your GitHub user info
```

**Rate limiting:**
- GitHub API has rate limits: 5000 requests/hour (authenticated)
- If you hit the limit, wait or use a different token

---

## 3. MongoDB MCP Server

### Overview
Connects Claude to MongoDB databases for queries.

**Capabilities:**
- List databases and collections
- Run `find()` queries
- Run `aggregate()` pipelines
- Get collection schemas
- Count documents

### Setup

**Prerequisites:**
- MongoDB 7.0+ running locally or on Atlas
- Database seeded with workshop data

**Configuration (Local MongoDB):**
```json
"mongodb": {
  "command": "npx",
  "args": [
    "-y",
    "mongodb-mcp-server",
    "--connectionString",
    "mongodb://localhost:27017/workshop_demo"
  ]
}
```

```

### Seed Sample Data

```bash
cd /Users/jimisaac/prompt2finetune/mcp/mongodb
npm install
node seed-mongo.js
```

### Verify Setup

In Claude Desktop:
```
Query the MongoDB workshop_demo database and show me how many documents
are in the production_bugs collection.
```

**Expected:** "There are 5 documents in the production_bugs collection."

### Troubleshooting

**"Connection refused":**
```bash
# Check MongoDB is running
mongosh --eval "db.version()"

# Docker: check container status
docker ps | grep mongo

# macOS: check service
brew services list | grep mongodb
```

**"Authentication failed":**
- Ensure username/password are correct
- Add `?authSource=admin` to connection string
- Check user has proper permissions

---

## 4. Filesystem MCP Server

### Overview
Connects Claude to local filesystem for reading files.

**Capabilities:**
- Read file contents
- List directory contents
- Search files by pattern
- Get file metadata

**⚠️ Security:**
- Only grant access to specific directories
- Never allow access to sensitive directories (e.g., ~/.ssh, ~/.aws)
- Use absolute paths
- MCP server is read-only by default

### Setup

**Configuration:**
```json
"filesystem": {
  "command": "npx",
  "args": [
    "-y",
    "@modelcontextprotocol/server-filesystem",
    "/Users/jimisaac/prompt2finetune/mcp/sample-project"
  ]
}
```

**⚠️ Important:**
- Replace `/Users/jimisaac/` with your actual home directory
- Path must be **absolute**, not relative
- Path must exist before starting Claude Desktop

**Multiple directories:**
```json
"filesystem": {
  "command": "npx",
  "args": [
    "-y",
    "@modelcontextprotocol/server-filesystem",
    "/Users/jimisaac/prompt2finetune/mcp/sample-project",
    "/Users/jimisaac/Documents/projects"
  ]
}
```

### Verify Setup

In Claude Desktop:
```
Read the README.md file from the sample project directory and summarize
the architecture.
```

**Expected:** Summary of the ShopFlow e-commerce platform architecture.

### Troubleshooting

**"Access denied" or "Path not found":**
```bash
# Verify path exists
ls /Users/jimisaac/prompt2finetune/mcp/sample-project

# Check permissions
ls -la /Users/jimisaac/prompt2finetune/mcp/sample-project
```

**macOS security prompt:**
- Go to System Preferences → Security & Privacy → Privacy
- Select "Files and Folders"
- Ensure Claude Desktop has access

---

## 5. Notion MCP Server

### Overview
Connects Claude to Notion workspace for documentation.

**Capabilities:**
- Search pages and databases
- Read page content
- Create new pages
- Update page properties
- Query databases

### Setup Method: OAuth (Recommended)

Notion MCP uses **OAuth** - no API key needed!

**Configuration:**
```json
"notion": {
  "command": "npx",
  "args": ["-y", "mcp-remote", "https://mcp.notion.com/mcp"]
}
```

**First Use:**
1. Start Claude Desktop with this config
2. Ask Claude: "Search for pages in my Notion workspace"
3. A browser window will open
4. Log in to Notion and click "Allow access"
5. Select which pages/databases to share
6. Done! Future requests won't require re-authorization

### Alternative: Integration Token Method

If you prefer using an integration token:

**Create Notion Integration:**
1. Go to: https://www.notion.so/my-integrations
2. Click "New integration"
3. Name: "MCP Workshop"
4. Select capabilities: Read content, Update content, Insert content
5. Click "Submit"
6. Copy the "Internal Integration Token" (starts with `secret_`)

**Share pages with integration:**
1. Open a Notion page
2. Click "..." menu → "Add connections"
3. Select "MCP Workshop" integration

**Configuration:**
```json
"notion": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-notion"],
  "env": {
    "NOTION_API_KEY": "secret_YOUR_TOKEN_HERE"
  }
}
```

### Verify Setup

In Claude Desktop:
```
Search for pages in my Notion workspace.
```

**Expected:** List of pages in your Notion workspace.

---

## Complete Configuration Example

Here's a complete `claude_desktop_config.json` with all 5 servers:

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

**Remember to:**
- Replace `YOUR_TOKEN_HERE` with your GitHub token
- Replace `/Users/YOUR_USERNAME/` with your actual path
- Update MongoDB connection string if using Atlas

---

## Applying Configuration

### 1. Open Config File

```bash
# macOS
code ~/Library/Application\ Support/Claude/claude_desktop_config.json

# Windows
code %APPDATA%\Claude\claude_desktop_config.json

# Linux
code ~/.config/Claude/claude_desktop_config.json
```

### 2. Paste Configuration

Copy the complete configuration above and paste it into the file.

### 3. Customize Values

- Add your GitHub personal access token
- Update filesystem paths
- Update MongoDB connection string if needed

### 4. Validate JSON

```bash
# macOS/Linux - check JSON is valid
cat ~/Library/Application\ Support/Claude/claude_desktop_config.json | jq .

# Should print formatted JSON if valid
```

### 5. Restart Claude Desktop

**Important:** Must fully quit and relaunch, not just close the window.

- **macOS**: Cmd+Q, then relaunch
- **Windows**: Right-click taskbar → Quit, then relaunch
- **Linux**: Close all windows and quit from system tray

### 6. Verify Connections

1. Look for the 🔌 hammer icon at the bottom of Claude Desktop
2. Click it to see all MCP servers
3. All 5 should show "Connected" status (green)

---

## Troubleshooting

### Server shows "Disconnected"

1. **Check JSON syntax:**
   ```bash
   cat ~/Library/Application\ Support/Claude/claude_desktop_config.json | jq .
   ```
2. **Check npx works:**
   ```bash
   npx -y @modelcontextprotocol/server-github --version
   ```
3. **Check logs:**
   - macOS: `~/Library/Logs/Claude/`
   - Windows: `%APPDATA%\Claude\logs\`

### OAuth browser doesn't open

- Check browser isn't blocking popups
- Try setting a different default browser
- Manually visit the service and log in first

### Need Help?

See the [main Troubleshooting Guide](../TROUBLESHOOTING.md) for more solutions.

---

**Next Step:** [Run the Workshop](../workshop/demo-script.md)
