# Notion MCP Integration Prompts

Copy-pasteable prompts for Notion integration demos and exercises.

---

## Basic Operations

### Prompt 1: Search Pages
```
Search my Notion workspace for pages related to "sprint" or "workshop".
Show me the titles and last edited dates.
```

### Prompt 2: Create Test Page
```
Create a new Notion page titled "MCP Workshop Test" with:

# MCP Workshop Test

Testing Notion integration with MCP.

## Checklist
- [x] Linear connected
- [x] MongoDB connected
- [x] GitHub connected
- [x] Filesystem connected
- [x] Notion connected

All systems working!
```

---

## Creating Documentation

### Prompt 1: Create Bug Report
```
Create a new Notion page titled "WRK-1: Checkout Crash Analysis" with:

# WRK-1: Checkout Crash Analysis

## Bug Details
- **Title:** Fix checkout crash on mobile Safari
- **Severity:** Critical
- **Errors:** 342 errors, 127 users affected
- **Service:** checkout-service

## Root Cause
Null pointer crash due to missing cart validation.

## Resolution
Fixed in commit 2e3fcd1, deployed in v2.3.1

## Status
✅ Resolved
```

### Prompt 2: Create Sprint Summary
```
Create a new Notion page titled "Sprint Summary - Week 1" with sections:

# Sprint Summary - Week 1

## Issues Worked On
(List from Linear)

## Production Bugs
(List from MongoDB)

## Code Changes
(List from GitHub)

## Deployments
(List from MongoDB deployments)

## Next Steps
(Action items)
```

---

## Multi-System Integration

### Prompt 1: Complete Sprint Kickoff
```
Create a comprehensive Sprint Kickoff page in Notion:

1. **Linear**: Get all issues WRK-1, WRK-2, WRK-3
2. **MongoDB**: Query production_bugs for all 3 bugs
3. **GitHub**: Find commits mentioning WRK-1, WRK-2, WRK-3
4. **MongoDB**: Get deployment status
5. **Notion**: Create page "Sprint Kickoff - [Today's Date]" with:

   ## Sprint Overview
   [Linear issues list with priorities]

   ## Production Impact
   [MongoDB bugs with error counts]

   ## Recent Code Changes
   [GitHub commits]

   ## Deployment Status
   [MongoDB deployments - success/rollback]

   ## Recommended Actions
   [Prioritized based on severity and error count]
```

### Prompt 2: Post-Incident Report
```
Create a post-incident report for WRK-1 in Notion:

1. **Linear**: Get WRK-1 details
2. **MongoDB**: Get bug data for ticket_id "WRK-1"
3. **GitHub**: Find commits d30be37 and 2e3fcd1
4. **Filesystem**: Read checkout-service/checkout.js
5. **Notion**: Create page "Post-Incident: WRK-1" with:

   ## Incident Summary
   [What happened]

   ## Timeline
   [First seen → Fixed → Deployed]

   ## Root Cause
   [Code analysis from filesystem]

   ## Resolution
   [How it was fixed, commit details]

   ## Lessons Learned
   [What to do differently]
```

---

## Workshop Exercises

### Exercise 1: Status Dashboard
**Task:** Create a real-time status dashboard

```
Create a Notion page "Service Health Dashboard" with data from:
1. MongoDB production_bugs - count by service
2. MongoDB deployments - latest status for each service
3. Linear - count of open issues
4. Format as a table with health indicators (🟢🟡🔴)
```

### Exercise 2: Weekly Report
**Task:** Generate a weekly summary

```
Create a Notion page "Weekly Report - [This Week]" combining:
1. Linear: Issues completed this week
2. MongoDB: Bugs found vs resolved
3. GitHub: Commit count and contributors
4. MongoDB: Deployment success rate
5. Summary: Overall team health and velocity
```

---

## Tips

**Page Titles:**
```
✅ Include dates: "Sprint Kickoff - Feb 6 2026"
❌ Generic: "Sprint Kickoff"
```

**Use Markdown:**
```
✅ Notion supports markdown for formatting
✅ Use ## for headings, - for bullets, - [ ] for checkboxes
```

---

**Back to:** [Orchestration Prompts](06-orchestration.md) | [Main README](../README.md)
