# Troubleshooting Guide

Common issues and solutions for the MCP Workshop.

---

## 🔌 MCP Server Connection Issues

### Problem: MCP server shows "disconnected" in Claude Desktop

**Symptoms:**
- Red/disconnected status in the 🔌 MCP menu
- Claude says "I don't have access to [service]"

**Solutions:**

1. **Check the Claude Desktop config file is valid JSON:**
   ```bash
   # macOS - use jq to validate JSON
   cat ~/Library/Application\ Support/Claude/claude_desktop_config.json | jq .

   # If you get an error, you have invalid JSON - check for:
   # - Missing commas
   # - Extra commas (especially after last item)
   # - Unmatched brackets or braces
   # - Incorrect quotes
   ```

2. **Restart Claude Desktop:**
   - **macOS**: Cmd+Q, then relaunch
   - **Windows**: Right-click taskbar → Quit, then relaunch
   - **Not just closing the window** - must fully quit

3. **Check npx can run the server:**
   ```bash
   # Test if npx works
   npx -y @modelcontextprotocol/server-github --version

   # If this fails, reinstall Node.js
   ```

4. **Check server logs:**
   - Claude Desktop logs are in:
     - **macOS**: `~/Library/Logs/Claude/`
     - **Windows**: `%APPDATA%\Claude\logs\`
   - Look for error messages mentioning the MCP server

---

## 🔑 Authentication Errors

### Linear: "Not authenticated" or "Invalid API key"

**For OAuth (recommended):**
1. Linear uses OAuth - no API key needed
2. When you first use Linear MCP, a browser should open
3. If the browser doesn't open:
   - Check browser isn't blocking popups
   - Try manually visiting https://linear.app and logging in first
   - Restart Claude Desktop

**For API key (if using direct integration):**
1. Get API key from: https://linear.app → Settings → API
2. Ensure it's set correctly in `claude_desktop_config.json`:
   ```json
   "linear": {
     "command": "npx",
     "args": ["-y", "@modelcontextprotocol/server-linear"],
     "env": {
       "LINEAR_API_KEY": "lin_api_YOUR_KEY_HERE"
     }
   }
   ```

### GitHub: "Bad credentials" or "401 Unauthorized"

1. **Verify token is correct:**
   ```bash
   # Test your GitHub token
   curl -H "Authorization: token ghp_YOUR_TOKEN" https://api.github.com/user

   # Should show your GitHub user info
   ```

2. **Check token scopes:**
   - Go to https://github.com/settings/tokens
   - Click on your token
   - Ensure these scopes are checked:
     - ✅ repo
     - ✅ read:org
     - ✅ read:user

3. **Regenerate token:**
   - If token is old or revoked, create a new one
   - Update `claude_desktop_config.json` with new token
   - Restart Claude Desktop

4. **Check for special characters:**
   - Ensure token is in quotes: `"ghp_..."`
   - No spaces or newlines in the token

### Notion: OAuth browser doesn't open

1. **Check browser settings:**
   - Allow popups from Claude Desktop
   - Try a different browser as default

2. **Manual authorization:**
   - Visit https://www.notion.so/my-integrations
   - Click "New integration"
   - Select capabilities needed
   - Copy integration token if using API key method

3. **Clear Notion OAuth cache:**
   ```bash
   # macOS - remove Notion OAuth cache
   rm -rf ~/Library/Application\ Support/Claude/notion-oauth-cache

   # Restart Claude Desktop
   ```

---

## 🗄️ MongoDB Connection Issues

### Problem: "MongoDB connection refused" or "ECONNREFUSED"

**If using Docker:**
```bash
# Check if container is running
docker ps | grep mcp-mongo

# If not running, start it:
docker start mcp-mongo

# Check logs:
docker logs mcp-mongo
```

**If using local MongoDB:**
```bash
# macOS - check service status
brew services list | grep mongodb

# Start if not running
brew services start mongodb-community

# Ubuntu - check status
sudo systemctl status mongod

# Start if stopped
sudo systemctl start mongod

# Windows - check service
sc query MongoDB
```

**Test connection directly:**
```bash
mongosh mongodb://localhost:27017

# Should connect without errors
```

### Problem: "Authentication failed" with MongoDB

If using MongoDB with authentication:
```json
"mongodb": {
  "command": "npx",
  "args": [
    "-y",
    "mongodb-mcp-server",
    "--connectionString",
    "mongodb://username:password@localhost:27017/workshop_demo?authSource=admin"
  ]
}
```

### Problem: "Database not found" or "Collection not found"

1. **Verify database exists:**
   ```bash
   mongosh mongodb://localhost:27017

   show dbs
   # Should show: workshop_demo

   use workshop_demo
   show collections
   # Should show: production_bugs, deployments
   ```

2. **Re-run seeding script:**
   ```bash
   cd /Users/jimisaac/prompt2finetune/mcp/mongodb
   node seed-mongo.js
   ```

---

## 📁 Filesystem Access Issues

### Problem: "Access denied" or "Path not found"

1. **Verify path is absolute (not relative):**
   ```json
   // ❌ Wrong - relative path
   "filesystem": {
     "args": ["mcp/sample-project"]
   }

   // ✅ Correct - absolute path
   "filesystem": {
     "args": ["/Users/jimisaac/prompt2finetune/mcp/sample-project"]
   }
   ```

2. **Check path exists:**
   ```bash
   # Verify directory exists
   ls /Users/jimisaac/prompt2finetune/mcp/sample-project

   # Should show: README.md, CHANGELOG.md, config.json
   ```

3. **Check file permissions:**
   ```bash
   # Ensure files are readable
   ls -la /Users/jimisaac/prompt2finetune/mcp/sample-project

   # All files should have read permissions (r--)
   ```

4. **macOS security permissions:**
   - Go to System Preferences → Security & Privacy → Privacy
   - Select "Files and Folders"
   - Ensure Claude Desktop has access to the directory

---

## 🛠️ Claude Desktop Issues

### Problem: MCP hammer icon (🔌) not showing

1. **Check Claude Desktop version:**
   - MCP is only available in recent versions
   - Update Claude Desktop to the latest version

2. **Check config file location:**
   ```bash
   # Ensure config file exists at the right location
   # macOS
   ls ~/Library/Application\ Support/Claude/claude_desktop_config.json

   # Windows
   dir %APPDATA%\Claude\claude_desktop_config.json
   ```

3. **Validate JSON syntax:**
   - Use a JSON validator: https://jsonlint.com
   - Common errors:
     - Trailing comma after last item in object/array
     - Missing quotes around strings
     - Unescaped backslashes in Windows paths

### Problem: Claude Desktop crashes or becomes unresponsive

1. **Check MCP server output:**
   - An MCP server might be hanging
   - Try disabling servers one by one to isolate the issue

2. **Clear Claude cache:**
   ```bash
   # macOS
   rm -rf ~/Library/Caches/Claude/

   # Windows
   rd /s /q %APPDATA%\Claude\Cache
   ```

3. **Reinstall Claude Desktop:**
   - Download latest version
   - Backup your `claude_desktop_config.json` first!

---

## 🧪 Workshop Demo Issues

### Problem: Claude says it doesn't have the tool or capability

**Example:** "I don't have the ability to query Linear"

**Solutions:**

1. **Check server is connected:**
   - Click 🔌 hammer icon
   - Verify the specific server (e.g., "linear") shows "connected"

2. **Restart the conversation:**
   - Start a new chat in Claude Desktop
   - MCP connections are per-conversation

3. **Be specific in your prompt:**
   ```
   # ❌ Too vague
   "Get my tasks"

   # ✅ Specific
   "Use the Linear MCP server to list all issues assigned to me in the Workshop team"
   ```

### Problem: MongoDB queries return empty results

1. **Verify data was seeded:**
   ```bash
   mongosh mongodb://localhost:27017/workshop_demo

   db.production_bugs.find().pretty()
   # Should show 5 documents
   ```

2. **Check collection names:**
   - Collection names are case-sensitive
   - Correct: `production_bugs`
   - Wrong: `Production_Bugs`, `productionBugs`

3. **Use correct database:**
   ```
   # In your prompt, specify the database:
   "Query the workshop_demo database, collection production_bugs"
   ```

### Problem: Filesystem MCP can't find files

1. **Check relative paths in prompts:**
   ```
   # ❌ Wrong - relative path
   "Read the file mcp/sample-project/README.md"

   # ✅ Correct - file name or absolute path
   "Read the file README.md"
   # (filesystem MCP is already scoped to sample-project directory)
   ```

2. **List directory contents first:**
   ```
   "List all files in the sample project directory"
   ```

---

## 🚀 Performance Issues

### Problem: Claude takes a long time to respond with MCP

**Causes:**
- Multiple MCP server calls in sequence
- Large MongoDB result sets
- Network latency for remote servers (Linear, Notion)

**Solutions:**

1. **Be more specific in prompts:**
   ```
   # ❌ Slow - Claude will query everything
   "Tell me about my sprint"

   # ✅ Fast - specific request
   "Query Linear for issues in Sprint 42 with status Todo"
   ```

2. **Limit result sets:**
   ```
   "Show the first 10 production bugs ordered by error_count descending"
   ```

3. **Use pagination:**
   ```
   "Show me the next 10 issues" (after showing first 10)
   ```

---

## 🧹 Clean Up & Reset

### Reset MongoDB data

```bash
cd /Users/jimisaac/prompt2finetune/mcp/mongodb
node seed-mongo.js
# Drops and recreates all collections
```

### Reset MCP configuration

```bash
# Backup current config
cp ~/Library/Application\ Support/Claude/claude_desktop_config.json \
   ~/Library/Application\ Support/Claude/claude_desktop_config.backup.json

# Start fresh from template
cp /Users/jimisaac/prompt2finetune/mcp/setup/claude-desktop-config.json \
   ~/Library/Application\ Support/Claude/claude_desktop_config.json

# Edit with your API keys
code ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

### Reset Linear OAuth

```bash
# Remove Linear OAuth cache
rm -rf ~/Library/Application\ Support/Claude/linear-oauth-cache

# Next Linear query will prompt for re-authorization
```

### Reset Notion OAuth

```bash
# Remove Notion OAuth cache
rm -rf ~/Library/Application\ Support/Claude/notion-oauth-cache

# Next Notion query will prompt for re-authorization
```

---

## 📞 Getting Help

### Still stuck?

1. **Check MCP server logs:**
   ```bash
   # macOS
   tail -f ~/Library/Logs/Claude/mcp-server-*.log
   ```

2. **Enable debug logging:**
   Add to your `claude_desktop_config.json`:
   ```json
   {
     "mcpServers": { ... },
     "debugLogging": true
   }
   ```

3. **Check official documentation:**
   - MCP Specification: https://modelcontextprotocol.io
   - Claude Desktop MCP Guide: https://docs.anthropic.com/claude/docs/mcp
   - Linear MCP: https://linear.app/docs/mcp
   - Notion MCP: https://developers.notion.com/docs/mcp

4. **Community resources:**
   - GitHub Issues: https://github.com/modelcontextprotocol/servers/issues
   - Discord: https://discord.gg/modelcontextprotocol

---

## ✅ Quick Diagnostic Commands

Run these to diagnose issues quickly:

```bash
# 1. Check Node.js version
node --version

# 2. Check MongoDB is running
mongosh --eval "db.version()"

# 3. Verify MongoDB data
mongosh mongodb://localhost:27017/workshop_demo --eval "db.production_bugs.countDocuments()"

# 4. Check Claude Desktop config exists
ls ~/Library/Application\ Support/Claude/claude_desktop_config.json

# 5. Validate JSON config
cat ~/Library/Application\ Support/Claude/claude_desktop_config.json | jq .

# 6. Test GitHub token
curl -H "Authorization: token ghp_YOUR_TOKEN" https://api.github.com/user

# 7. Check filesystem path exists
ls /Users/jimisaac/prompt2finetune/mcp/sample-project
```

---

**Found a solution not listed here?** Please contribute to this guide!

**Ready to continue?** → [Back to Workshop](workshop/demo-script.md)
