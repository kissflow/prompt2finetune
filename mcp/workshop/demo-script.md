# MCP Workshop Demo Script

**Duration:** 90-120 minutes
**Format:** Instructor-led demo with hands-on practice
**Audience:** Developers familiar with APIs and command-line tools

---

## Workshop Overview

This workshop teaches Model Context Protocol (MCP) through a realistic scenario: **Smart Sprint Kickoff**. Participants will learn to orchestrate 5 different data sources (Linear, GitHub, MongoDB, Filesystem, Notion) through Claude using MCP servers.

### Learning Objectives

By the end of this workshop, participants will be able to:
1. ✅ Configure Claude Desktop with multiple MCP servers
2. ✅ Use natural language prompts to query different data sources
3. ✅ Orchestrate multiple MCP servers in a single workflow
4. ✅ Build custom workflows for their own use cases

---

## Pre-Workshop Setup (Instructor)

**Before the workshop starts:**

- [ ] Verify your Claude Desktop shows all 5 MCP servers connected
- [ ] Test the "Smart Sprint Kickoff" prompt end-to-end
- [ ] Have sample outputs ready in case of live demo failures
- [ ] Prepare backup Linear/Notion workspaces if OAuth fails
- [ ] Test screen sharing setup with terminal + Claude Desktop visible

**Recommended screen layout:**
- Left: Claude Desktop (70% of screen)
- Right: Terminal / VS Code (30% of screen)

---

## Part 0: Introduction (10 minutes)

### Slide 1: Welcome

> **Instructor says:**
>
> "Welcome to the MCP Workshop! Today, we're going to learn how to orchestrate multiple data sources through AI using the Model Context Protocol.
>
> How many of you have used APIs before? [show of hands]
> How many have used tools like Zapier or Make.com for automation? [show of hands]
>
> MCP is similar, but instead of clicking through UI builders, you just describe what you want in natural language, and Claude figures out which APIs to call and how to combine the data."

### Slide 2: The Problem

> **Instructor says:**
>
> "Let's set the scene. It's Monday morning, you're starting a new sprint. What do you do?
>
> Typically, you'd:
> 1. Open Linear → Check your assigned tickets
> 2. Open GitHub → Look for related PRs and commits
> 3. Open Sentry/Datadog → Check production errors
> 4. Read the project README and CHANGELOG
> 5. Open Notion → Update the sprint doc
>
> That's at least 5 browser tabs, 10 minutes of context switching, and manual copy-pasting between tools.
>
> What if you could do all of that with **one prompt** to Claude?"

### Slide 3: The Solution - MCP

> **Instructor says:**
>
> "That's what MCP enables. MCP is an open protocol that lets AI assistants like Claude connect to external data sources and tools.
>
> Think of it like this: Claude is the conductor, and each MCP server is an instrument in the orchestra. You tell Claude what symphony you want, and it orchestrates all the instruments together.
>
> Today we'll use 5 MCP servers:
> - **Linear** → Project management
> - **GitHub** → Code repository
> - **MongoDB** → Production database
> - **Filesystem** → Local files
> - **Notion** → Documentation
>
> Let's see it in action!"

---

## Part 1: Verify Setup (5 minutes)

### Step 1.1: Check MCP Servers

> **Instructor demonstrates:**
>
> "First, let's make sure everyone has their MCP servers connected. Look at the bottom of Claude Desktop - you should see a hammer icon 🔌."

**Action:**
1. Click the 🔌 hammer icon in Claude Desktop
2. Show all 5 servers: linear, github, mongodb, filesystem, notion
3. Verify all show "Connected" (green status)

> **Instructor says:**
>
> "If you don't see all 5 connected, raise your hand and we'll help you troubleshoot."

[PAUSE FOR PARTICIPANT CHECK - 2 minutes]

### Step 1.2: Quick Connection Test

**Prompt to demonstrate:**
```
Can you check if you have access to Linear, GitHub, MongoDB, Filesystem, and Notion MCP servers?
List which servers are available.
```

**Expected Response:**
```
I have access to all 5 MCP servers:
1. ✅ Linear - for project management
2. ✅ GitHub - for code repository access
3. ✅ MongoDB - for database queries
4. ✅ Filesystem - for reading local files
5. ✅ Notion - for documentation
```

---

## Part 2: Individual MCP Server Demos (40 minutes)

### Demo 2.1: Linear MCP (8 minutes)

> **Instructor says:**
>
> "Let's start with Linear. Linear is a project management tool - think Jira but faster. We've seeded a workspace with sample sprint tickets."

**Prompt 1: List Issues**
```
Show me all issues in the Workshop team in Linear.
Group them by priority and show the status of each.
```

**Expected Response:**
- Lists issues grouped by priority (Urgent, High, Medium, Low)
- Shows status (Todo, In Progress, Backlog)
- Shows issue IDs (e.g., WRK-1, WRK-2)

> **Instructor narrates:**
>
> "Notice how Claude calls the Linear MCP server's `search_issues` tool. It's translating my natural language into the Linear API call, then formatting the results nicely.
>
> Let's try creating an issue..."

**Prompt 2: Create Issue**
```
Create a new Linear issue in the Workshop team:
Title: "Investigate auth service memory leak"
Priority: Critical
Status: Todo
Description: "Auth service showing memory leak in production (89 errors in last 24 hours). Related to session handler."
```

**Expected Response:**
```
✅ Created issue WRK-7: "Investigate auth service memory leak"
- Priority: Critical
- Status: Todo
- Team: Workshop
- URL: https://linear.app/workshop/issue/WRK-7
```

> **Instructor says:**
>
> "Claude just created a real ticket in Linear! If you check your Linear workspace right now, you'll see it.
>
> The key insight: We didn't need to learn the Linear API, remember field names, or write any code. We just described what we wanted."

[Show Linear workspace in browser to confirm issue was created]

---

### Demo 2.2: GitHub MCP (8 minutes)

> **Instructor says:**
>
> "Next up: GitHub. Let's see what's happening in our codebase."

**Prompt 1: Recent Commits**
```
Show me the most recent 5 commits in the repository [YOUR_REPO].
Focus on commits from the last 7 days.
```

**Expected Response:**
- List of recent commits with messages, authors, dates
- Commit SHAs and links

**Prompt 2: Search Code**
```
Search the repository [YOUR_REPO] for code related to "checkout" or "cart".
I'm investigating the checkout crash bug (WRK-2).
```

**Expected Response:**
- List of files containing "checkout" or "cart"
- Line numbers and code snippets
- File paths as clickable links

> **Instructor narrates:**
>
> "Claude is using the GitHub MCP server's `search_code` tool. It's searching across the entire repository.
>
> This is super useful when you're debugging - you can ask Claude to find all files related to a specific feature or bug, and it'll show you exactly where to look."

**Prompt 3: Check PRs**
```
List all open pull requests in [YOUR_REPO].
Are there any PRs related to checkout, auth, or mobile?
```

**Expected Response:**
- List of open PRs with titles and descriptions
- PR numbers and links
- Filtering based on keywords

---

### Demo 2.3: MongoDB MCP (10 minutes)

> **Instructor says:**
>
> "Now let's look at production data. We've seeded a MongoDB database with production bugs and deployment history - the kind of data you'd see in a real system."

**Prompt 1: Count Bugs**
```
Query the workshop_demo database and tell me:
1. How many production bugs are there total?
2. How many are critical severity?
3. How many are currently open?
```

**Expected Response:**
```
Production Bugs Summary:
- Total bugs: 5
- Critical severity: 2
- Currently open: 4
```

**Prompt 2: Critical Bugs Detail**
```
Show me all critical severity bugs that are currently open.
For each bug, show:
- Title and description
- Error count
- Which service is affected
- When it was first seen and last seen
- Whether it's linked to a Linear ticket
```

**Expected Response:**
```
Critical Open Bugs:

1. WRK-2: Checkout crash on mobile Safari
   - Service: checkout-service
   - Error count: 342 errors
   - First seen: 3 days ago
   - Last seen: 1 hour ago
   - Assigned to: alice
   - ⚠️ Still actively occurring!

2. Auth service memory leak
   - Service: auth-service
   - Error count: 89 errors
   - First seen: 1 day ago
   - Last seen: 30 minutes ago
   - ⚠️ NOT TRACKED in Linear yet!
```

> **Instructor highlights:**
>
> "This is the key insight! Claude found a critical bug that doesn't have a Linear ticket yet. In a real sprint kickoff, this would be flagged immediately for investigation.
>
> Claude is doing the manual work you'd normally do - cross-referencing production errors with your ticketing system."

**Prompt 3: Deployment History**
```
Query the deployments collection and show me:
1. Recent deployments in the last week
2. Any failed or rolled-back deployments
3. Which services were affected
```

**Expected Response:**
```
Recent Deployments:

✅ checkout-service v2.3.1 (2 days ago) - Success
   "Hotfix for null pointer crash on iOS Safari"

❌ media-service v3.0.0 (1 day ago) - ROLLBACK
   "Rolled back due to CDN 503 errors under load"

✅ auth-service v1.8.0 (4 days ago) - Success
✅ user-service v2.1.5 (6 days ago) - Success
```

> **Instructor narrates:**
>
> "Claude is connecting the dots: the media-service rollback yesterday correlates with bug WRK-6 (Image CDN 503 errors). These are the insights that help prioritize sprint work."

---

### Demo 2.4: Filesystem MCP (7 minutes)

> **Instructor says:**
>
> "Now let's read some local files. Every project has documentation - README, CHANGELOG, config files. Let's see what our sample project looks like."

**Prompt 1: Read README**
```
Read the README.md file from the sample project directory.
Summarize:
1. What is the project?
2. What's the architecture?
3. What services are there?
4. Current sprint goals
```

**Expected Response:**
```
Project: ShopFlow E-Commerce Platform

Architecture:
- Microservices-based (4 services)
- Tech stack: Node.js, React, MongoDB, Redis
- Hosting: AWS ECS (Fargate)

Services:
1. auth-service (port 3001) - Authentication & sessions
2. checkout-service (port 3002) - Cart & payments
3. media-service (port 3003) - Image upload & CDN
4. user-service (port 3004) - User profiles

Current Sprint (v2.4.0):
- Fix critical bugs (checkout crash, auth memory leak)
- Add dark mode support
- Database migration for v2.0 schema
```

**Prompt 2: Check Recent Changes**
```
Read the CHANGELOG.md file and tell me:
1. What's the current version?
2. What changed in the latest release?
3. Any recent bug fixes related to checkout or auth?
```

**Expected Response:**
```
Current version: v2.3.1 (released Feb 3, 2026)

Latest changes (v2.3.1):
- [Critical] Hotfix for checkout null pointer crash on iOS Safari
- Fixed race condition in cart state management
- Patched memory leak in media-service

Recent related fixes:
- v2.3.1: Checkout crash fix (addresses WRK-2)
- v2.3.0: Payment retry logic added
- v2.2.0: Dashboard slow query fix (added index)
```

**Prompt 3: Feature Flags**
```
Read the config.json file and tell me:
1. Which features are currently enabled in production?
2. Which features are disabled?
3. Any configuration that might be relevant to the current sprint bugs?
```

**Expected Response:**
```
Enabled features:
- ✅ newCheckoutFlow: true
- ✅ guestCheckout: true
- ✅ socialLogin: true
- ✅ productRecommendations: true

Disabled features:
- ❌ darkMode: false (planned for current sprint!)
- ❌ aiRecommendations: false
- ❌ imageOptimizationV2: false

Relevant config:
- Checkout service timeout: 30s
- Session timeout: 3600s (1 hour)
- Error alert threshold: 100 errors
```

---

### Demo 2.5: Notion MCP (7 minutes)

> **Instructor says:**
>
> "Finally, Notion. This is where we'll create our Sprint Kickoff document combining everything we've learned."

**Prompt 1: Search Existing Pages**
```
Search my Notion workspace for pages related to "sprint" or "kickoff".
```

**Expected Response:**
- List of existing sprint-related pages
- Links to pages
- Brief summary of each

**Prompt 2: Create Sprint Page** (We'll do this in the full orchestration demo, but show the capability)
```
Create a new Notion page titled "Sprint Kickoff - Feb 6 2026" with this content:

# Sprint Kickoff - Feb 6 2026

## Team: Workshop

## Sprint Goals
- Fix critical production bugs
- Implement dark mode
- Database migration

## Status
Ready to begin!
```

**Expected Response:**
```
✅ Created page: "Sprint Kickoff - Feb 6 2026"
URL: https://notion.so/Sprint-Kickoff-Feb-6-2026-xxxxx
```

[Show the created Notion page in browser]

> **Instructor says:**
>
> "Great! So now we've seen all 5 MCP servers individually. Each one is useful on its own, but the real magic happens when we combine them..."

---

## Part 3: The Magic - Multi-MCP Orchestration (20 minutes)

> **Instructor says:**
>
> "This is the 'wow' moment. We're going to use ALL FIVE MCP servers in ONE PROMPT to create a complete Sprint Kickoff brief. Watch how Claude orchestrates everything..."

### The Star Prompt: Smart Sprint Kickoff

```
I'm starting a new sprint today. Help me prepare a complete Sprint Kickoff brief.

Here's what I need:

1. **Linear**: Find all issues assigned to me in the current sprint for the
   "Workshop" team. List them with their priority, status, and description.

2. **GitHub**: For the repository [YOUR_REPO], check:
   - Any open pull requests
   - Recent commits from the last 7 days

3. **MongoDB**: Query the `workshop_demo` database:
   - Find all open critical and high severity bugs from the `production_bugs` collection
   - Get the last 5 deployments from the `deployments` collection
   - Cross-reference: which bugs are linked to my sprint tickets?

4. **Filesystem**: Read these files from my project directory:
   - README.md (for architecture context)
   - CHANGELOG.md (for recent changes)
   - config.json (for current feature flags)

5. **Notion**: Create a new Notion page called
   "Sprint Kickoff - [Today's Date]" with a structured summary combining
   ALL of the above information, organized as:

   ## Sprint Overview
   - Sprint goals and timeline
   - Assigned tickets by priority

   ## Risk Assessment
   - Critical bugs and their impact
   - Recent deployments (especially failures/rollbacks)
   - Untracked production issues that need tickets

   ## Codebase Context
   - Current version and recent changes
   - Active feature flags
   - Architecture notes

   ## Recommended Action Plan
   - What to tackle first and why
   - Dependencies and blockers
   - Suggested priority order
```

### Narrate What's Happening

> **Instructor narrates while Claude works:**
>
> "Alright, let's watch this unfold step by step...
>
> **Step 1: Linear** - Claude is calling the Linear MCP to get my assigned tickets. See how it's filtering by team and current sprint? There we go - 6 issues found.
>
> **Step 2: GitHub** - Now it's switching to GitHub MCP. It's listing open PRs and recent commits. Notice it's automatically using the last 7 days like I asked.
>
> **Step 3: MongoDB** - Here comes the database query. It's searching for critical and high severity bugs, and... there! It found 4 open issues. Now it's cross-referencing - WRK-2 and WRK-6 are tracked, but look - the auth memory leak isn't tracked yet! That's a finding.
>
> **Step 4: Filesystem** - Reading local files now. README for architecture... CHANGELOG for version history... config.json for feature flags. All being loaded into context.
>
> **Step 5: Deployments** - Querying recent deployments. Aha! Media-service was rolled back yesterday - that correlates with WRK-6!
>
> **Step 6: Notion** - Now for the finale. Claude is synthesizing EVERYTHING into a Notion page. Watch how it structures the information..."

[Wait for Claude to complete]

### Show the Result

> **Instructor says:**
>
> "Let's look at what Claude created. I'll open the Notion page..."

[Open the Notion page in browser and walk through each section]

> **Instructor highlights:**
>
> "Look at the **Risk Assessment** section. Claude identified that:
> 1. The checkout crash (WRK-2) has 342 errors and affects 127 users - highest priority
> 2. The auth memory leak is CRITICAL but not tracked - needs a ticket immediately
> 3. The media-service rollback yesterday is still unresolved
>
> This is the kind of cross-referencing and prioritization that would take a human 20-30 minutes of manual work across 5 different tools.
>
> Claude did it in under 60 seconds.
>
> And the **Recommended Action Plan** section - Claude is actually making smart recommendations based on error counts, deployment history, and sprint priorities. This isn't just data aggregation, it's analysis."

---

## Part 4: Hands-On Practice (20 minutes)

> **Instructor says:**
>
> "Now it's your turn! Let's try some practice prompts. I'll give you 3 exercises - start with Exercise 1, and if you finish early, move to Exercise 2 and 3."

### Exercise 1: Issue Triage (Beginner)

**Task:**
"Use MongoDB to find all untracked bugs (where `ticket_id` is null), then create a Linear issue for the most critical one."

**Sample solution:**
```
1. Query MongoDB workshop_demo database for production_bugs where ticket_id is null
2. Find the one with highest severity and error count
3. Create a Linear issue for it with appropriate priority and description
```

[Give participants 5-7 minutes to work on this]

### Exercise 2: Deployment Investigation (Intermediate)

**Task:**
"The media-service was rolled back yesterday. Using GitHub and MongoDB, investigate what happened and create a summary."

**Sample solution:**
```
1. Query MongoDB for the media-service deployment with status "rollback"
2. Search GitHub for recent commits to media-service around that time
3. Check production_bugs for errors related to media-service
4. Summarize the timeline and potential root cause
```

[Give participants 5-7 minutes]

### Exercise 3: Weekly Status Report (Advanced)

**Task:**
"Generate a weekly status report for your team that combines:
- Linear tickets completed this week
- GitHub PRs merged this week
- Production bugs opened vs. resolved
- Recent deployments and their status

Create this as a Notion page."

[Give participants remaining time]

---

## Part 5: Discussion & Q&A (15 minutes)

### Discussion Questions

> **Instructor facilitates:**

**Question 1:** "What manual workflows in YOUR job could be automated with MCP?"

[Take 2-3 responses from participants]

**Question 2:** "What other MCP servers would you want to add?"

Potential answers:
- Slack (send notifications, read messages)
- Jira (if using Jira instead of Linear)
- Sentry/Datadog (error monitoring)
- AWS CLI (infrastructure management)
- Docker (container management)
- CI/CD tools (trigger builds, check status)

**Question 3:** "Where could this go wrong? What are the risks?"

Potential answers:
- AI could misinterpret requests
- Could write incorrect SQL/queries
- Could create unwanted tickets/documents
- Security concerns with API access
- Rate limiting issues

> **Instructor responds:**
>
> "These are all valid concerns! That's why:
> 1. **Human-in-the-loop** - Always review what Claude created
> 2. **Start with read-only** - Use MCP servers in read-only mode first
> 3. **Scoped permissions** - Only give Claude access to what it needs
> 4. **Audit logs** - Track all MCP server actions
> 5. **Test in staging** - Try workflows in non-production first"

---

## Part 6: Next Steps & Resources (5 minutes)

> **Instructor says:**
>
> "Congratulations! You've now seen how to orchestrate multiple data sources through MCP. Here's what to do next..."

### Next Steps

1. **Practice with your own data**
   - Set up MCP servers for YOUR Linear workspace
   - Connect to YOUR GitHub repos
   - Query YOUR production database

2. **Build your own workflows**
   - Identify repetitive tasks in your job
   - Design prompts to automate them
   - Share successful workflows with your team

3. **Explore more MCP servers**
   - Check out: https://github.com/punkpeye/awesome-mcp-servers
   - Popular additions: Slack, Docker, AWS, Kubernetes

4. **Contribute**
   - Build your own MCP server for internal tools
   - MCP server SDK: https://modelcontextprotocol.io/docs

### Resources

- **MCP Specification**: https://modelcontextprotocol.io
- **Official MCP Servers**: https://github.com/modelcontextprotocol/servers
- **Linear MCP Docs**: https://linear.app/docs/mcp
- **Notion MCP Docs**: https://developers.notion.com/docs/mcp
- **Awesome MCP Servers**: https://github.com/punkpeye/awesome-mcp-servers

### Feedback

> "We'd love your feedback on this workshop! What worked well? What could be improved?"

[Provide feedback mechanism - Google Form, GitHub Issues, etc.]

---

## Instructor Notes

### Timing Adjustments

**If running short on time:**
- Skip Exercise 3 (advanced)
- Shorten Q&A to 10 minutes
- Combine demos 2.1-2.5 into quicker examples

**If running long:**
- Extend hands-on practice to 30 minutes
- Add a fourth exercise
- Do deeper dives into each MCP server

### Common Issues During Live Demo

**Linear/Notion OAuth doesn't work:**
- Have backup screenshots of expected output
- Use API key method instead
- Pre-create pages and show them

**MongoDB returns empty results:**
- Re-run seed script before workshop
- Verify connection string in config

**GitHub rate limits:**
- Use a dedicated token with high limits
- Have backup repo with fewer commits

### Tips for Success

1. **Practice the full demo twice** before workshop
2. **Have backup plans** for each demo
3. **Engage participants** - ask questions throughout
4. **Pace yourself** - don't rush through orchestration demo
5. **Leave time for troubleshooting** - participants will have issues

---

**End of Workshop! 🎉**
