# Simple Workshop Prerequisites

Quick setup guide for the MCP workshop - just Linear and Notion!

---

## 1. Claude Desktop

**Download and Install:**
- https://claude.ai/download
- Sign in with your Anthropic account
- Look for the 🔌 icon at the bottom (MCP indicator)

---

## 2. Linear Setup (OAuth - No API Key Needed)

**Create Account:**
1. Sign up: https://linear.app (free plan)
2. Create a workspace and team called **"Workshop"**
3. Set team **identifier** to **"WRK"** (Settings → Teams → Your Team → Identifier)

**Create Sample Issues:**

Copy and paste these exact details when creating issues in Linear:

---

**Issue 1: WRK-1**

**Title:** Fix checkout crash on mobile Safari

**Priority:** Critical (🔴)

**Status:** In Progress

**Assignee:** You

**Description:**
```
Null pointer crash affecting checkout flow on mobile Safari.

Error: TypeError: Cannot read property 'items' of null at processCart (checkout.js:127)

Impact:
- 342 errors reported
- 127 users affected
- Service: checkout-service
- First seen: 2026-01-15
- Last seen: 2026-02-05

Steps to reproduce:
1. Open checkout page on mobile Safari
2. Add items to cart
3. Click "Proceed to Payment"
4. App crashes with null pointer exception

Expected: Smooth checkout flow
Actual: Crash due to missing cart validation
```

---

**Issue 2: WRK-2**

**Title:** Investigate CDN 503 errors under load

**Priority:** High (🟡)

**Status:** In Progress

**Assignee:** You

**Description:**
```
Image CDN returning 503 errors under load after switching to Fastly.

Error: Service Unavailable: CDN origin server not responding

Impact:
- 156 errors reported
- 89 users affected
- Service: media-service
- First seen: 2026-01-20
- Last seen: 2026-02-04
- Deployment: v3.0.0 rolled back to v2.9.5

Symptoms:
- Product images fail to load during peak hours
- Intermittent 503 errors from CDN endpoints
- Origin server timeout issues

Investigation needed:
- Check CDN configuration after provider switch
- Review origin server capacity
- Implement retry logic and fallback
```

---

**Issue 3: WRK-3**

**Title:** Fix auth service memory leak

**Priority:** Critical (🔴)

**Status:** Todo

**Assignee:** You

**Description:**
```
Memory leak in auth session handler causing heap exhaustion.

Error: FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory

Impact:
- 89 service crashes
- 234 users disconnected
- Service: auth-service
- First seen: 2026-01-18
- Last seen: 2026-02-06

Symptoms:
- Memory usage grows continuously over time
- Service crashes every 4-6 hours
- Session data not being garbage collected properly

Investigation:
- Profile memory usage in production
- Check for session cleanup logic
- Review event listener cleanup
- Possible connection pool leak
```

---

---

## 3. Notion Setup (OAuth - No API Key Needed)

**Create Account:**
1. Sign up: https://notion.so (free plan)
2. Create a workspace or use existing

---

## 4. Configure Claude Desktop

**Open Config File:**

```bash
# macOS
~/Library/Application Support/Claude/claude_desktop_config.json

# Windows
%APPDATA%\Claude\claude_desktop_config.json
```

**Add Configuration:**

```json
{
  "mcpServers": {
    "linear": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.linear.app/sse"]
    },
    "notion": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.notion.com/mcp"]
    }
  }
}
```

**Restart Claude Desktop:**
- macOS: Cmd+Q then relaunch
- Windows: Right-click taskbar → Quit then relaunch

---

## 5. Verify Setup

**Check MCP Servers:**
- Click 🔌 icon in Claude Desktop
- Both `linear` and `notion` should show "Connected"

**Test Linear:**
```
Show me all issues in my Linear workspace
```
- A browser opens for OAuth authorization
- After authorizing, Claude shows your issues

**Test Notion:**
```
Search for pages in my Notion workspace
```
- A browser opens for OAuth authorization
- After authorizing, Claude shows your pages

---

## Pre-Workshop Checklist

- [ ] Claude Desktop installed and signed in
- [ ] Linear workspace created with 3 sample issues (WRK-1, WRK-2, WRK-3)
- [ ] Notion workspace created
- [ ] Both MCP servers show "Connected" in Claude Desktop
- [ ] Linear OAuth test passed
- [ ] Notion OAuth test passed

**That's it! You're ready for the workshop.** 🎉
