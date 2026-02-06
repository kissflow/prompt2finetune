# Workshop Sample Code

This directory contains simplified code samples from the ShopFlow e-commerce platform. These files demonstrate the 3 bug stories used throughout the workshop.

## Purpose

These files are used by the **Filesystem MCP server** to demonstrate:
- Reading code files
- Analyzing bugs and fixes
- Cross-referencing code with GitHub commits and MongoDB errors

## The 3 Stories

### Story 1: Checkout Crash (WRK-1)
**File:** `checkout-service/checkout.js`

A null pointer crash on mobile Safari affecting the cart checkout flow.

**Bug introduced:** Commit `a7f4e2c` - "Add cart validation"
**Bug fixed:** Commit `b8e3d91` - "Fix null check in processCart - closes WRK-1"

**MongoDB Bug:** `ticket_id: WRK-1`, 342 errors
**Linear Ticket:** WRK-1 (Critical, In Progress)
**Status:** ✅ Fixed and deployed in v2.3.1

---

### Story 2: CDN Issues (WRK-2)
**File:** `media-service/cdn-handler.js`

Image CDN returning 503 errors under load after switching providers.

**Bug introduced:** Commit `c9d1f88` - "Switch CDN provider"
**Attempted fix:** Commit `d1a5c42` - "Add CDN retry logic - WRK-2"

**MongoDB Bug:** `ticket_id: WRK-2`, 156 errors
**Linear Ticket:** WRK-2 (High, In Progress)
**GitHub PR:** #2 (Open - under review)
**Status:** ⚠️ Deployment rolled back, fix in progress

---

### Story 3: Auth Memory Leak (WRK-3)
**File:** `auth-service/session-manager.js`

Memory leak in authentication session handler causing heap exhaustion.

**Investigation:** Commit `e2b9f33` - "WIP: Investigate auth memory leak - WRK-3"
**Fix attempt:** Commit `f3c1a77` - "Add session cleanup on disconnect - WRK-3"

**MongoDB Bug:** `ticket_id: WRK-3`, 89 errors
**Linear Ticket:** WRK-3 (Critical, Todo)
**GitHub PR:** #3 (Draft - work in progress)
**Status:** 🔴 Open, fix pending deployment

---

## Using These Files in the Workshop

### During Filesystem MCP Demo
```
Read the checkout.js file and explain what the bug was in WRK-1
```

### During Cross-System Orchestration
```
Analyze the auth-service memory leak:
1. Read session-manager.js
2. Query MongoDB for WRK-3 errors
3. Search GitHub for commits mentioning WRK-3
4. Check Linear for ticket status

What's the complete picture?
```

---

## File Structure

```
workshop-code/
├── README.md                          # This file
├── checkout-service/
│   └── checkout.js                    # Story 1: Null pointer crash
├── media-service/
│   └── cdn-handler.js                 # Story 2: CDN 503 errors
└── auth-service/
    └── session-manager.js             # Story 3: Memory leak
```

---

## Commits Reference

These files are tracked in the `workshop-sample` branch with commit history that matches the stories:

- `a7f4e2c` - Add cart validation (introduced WRK-1 bug)
- `b8e3d91` - Fix null check in processCart - closes WRK-1
- `c9d1f88` - Switch CDN provider (introduced WRK-2)
- `d1a5c42` - Add CDN retry logic - WRK-2
- `e2b9f33` - WIP: Investigate auth memory leak - WRK-3
- `f3c1a77` - Add session cleanup on disconnect - WRK-3

**Note:** Once actual commits are created, these SHAs will be updated to match real commit hashes.

---

## Workshop Integration

These files enable powerful cross-system queries like:

**"Smart Sprint Kickoff" (from 06-orchestration.md):**
```
Create a sprint summary for this week:
1. Get all Linear tickets (WRK-1, WRK-2, WRK-3)
2. Query MongoDB for related production bugs
3. Read the code files to understand each issue
4. Search GitHub for related commits and PRs
5. Check deployment status
6. Create a Notion page with the full analysis
```

This demonstrates how MCP orchestration connects code, data, tickets, and documentation!
