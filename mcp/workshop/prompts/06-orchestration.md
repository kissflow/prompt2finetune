# Multi-MCP Orchestration Prompts ⭐

**The real power of MCP!** These prompts combine multiple MCP servers in a single workflow.

---

## The Star Prompt: Smart Sprint Kickoff

### Prompt 1: Complete Sprint Kickoff (All 5 MCP Servers)
```
I'm starting a new sprint today. Help me prepare a complete Sprint Kickoff brief.

Here's what I need:

1. **Linear**: Find all issues assigned to me in the current sprint for the
   "Workshop" team. List them with their priority, status, and description.

2. **GitHub**: For the repository kissflow/prompt2finetune (branch: workshop-sample), check:
   - Any open pull requests
   - Recent commits from the last 7 days (look for WRK-1, WRK-2, WRK-3 mentions)
   - Commits: d30be37, 2e3fcd1, 00bca23, 4ea4fe2, ef0c84b

3. **MongoDB**: Query the `workshop_demo` database:
   - Find all bugs from the `production_bugs` collection (WRK-1, WRK-2, WRK-3)
   - Get the last 4 deployments from the `deployments` collection
   - Cross-reference: which bugs have commit_sha and github_pr fields linking to GitHub?

4. **Filesystem**: Read these files from mcp/sample-project/ and mcp/workshop-code/:
   - sample-project/README.md (ShopFlow architecture context)
   - sample-project/CHANGELOG.md (recent changes)
   - sample-project/config.json (current feature flags)
   - workshop-code/README.md (bug stories overview)

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
   - Suggested priority order based on error counts and severity
```

---

## Production Issue Investigation

### Prompt 2: Full Stack Bug Investigation
```
Investigate the checkout crash bug (WRK-1) using all available data sources:

1. **Linear**: Get full details of issue WRK-1
   - Title: "Fix checkout crash on mobile Safari"
   - Priority: Critical
   - Status: Should be "In Progress" or "Done"

2. **MongoDB**: Query production_bugs for ticket_id "WRK-1"
   - Error count: 342 errors
   - Affected users: 127
   - Note the commit_sha field: d30be37 (bug introduced)
   - Note the github_pr field: 1 (PR that fixed it)
   - Status: resolved (fixed 2 days ago)

3. **GitHub**: Search kissflow/prompt2finetune (branch: workshop-sample) for:
   - Commit d30be37: "Add cart validation" (introduced bug)
   - Commit 2e3fcd1: "Fix null check in processCart - closes WRK-1" (fixed bug)
   - Read file: mcp/workshop-code/checkout-service/checkout.js

4. **Filesystem**: Read mcp/sample-project/CHANGELOG.md
   - Check version v2.3.1 entry
   - Should mention the checkout fix

5. **MongoDB**: Verify the fix was deployed
   - Query deployments where service = "checkout-service"
   - Find version v2.3.1 with commit_sha "2e3fcd1"
   - Status should be "success"

6. **Notion**: Create an incident report page "WRK-1: Checkout Crash Analysis" with:
   - **Bug**: Null pointer crash on mobile Safari (342 errors, 127 users affected)
   - **Root Cause**: Missing null check on cart object (code from commit d30be37)
   - **Fix**: Added null validation (commit 2e3fcd1, PR #1)
   - **Status**: ✅ Fixed and deployed in v2.3.1 on [2 days ago date]
   - **Timeline**: First seen 3 days ago → Fixed 2 days ago

This demonstrates COMPLETE cross-system data correlation!
```

### Prompt 3: Untracked Issues Workflow
```
Find and track untracked production issues:

1. **MongoDB**: Query production_bugs where ticket_id is null
   - Find all untracked bugs
   - Sort by severity and error count

2. **GitHub**: For each untracked bug's service:
   - Check recent commits to that service
   - Are there any PRs that might fix it?

3. **Linear**: For the most critical untracked bug:
   - Create a new issue with appropriate priority
   - Include error count and service in description

4. **Notion**: Update the Sprint Kickoff page with:
   - "Newly Discovered Issues" section
   - List bugs that were just tracked
```

---

## Deployment Analysis

### Prompt 4: Deployment Health Check
```
Analyze deployment health across all services:

1. **MongoDB**: Query deployments collection
   - Get all deployments from last 7 days
   - Identify any rollbacks or failures
   - Calculate success rate

2. **MongoDB**: For services with rollbacks:
   - Query production_bugs for those services
   - Are there bugs correlated with the rollback?

3. **GitHub**: For failed deployments:
   - Find commits deployed in that version
   - Who made those commits?
   - What changed?

4. **Linear**: Check if there are issues created for failed deployments
   - If not, create them

5. **Notion**: Create "Deployment Health Report" page with:
   - Overall success rate
   - Services with issues
   - Recommended actions
```

### Prompt 5: Code Change Impact Analysis
```
Analyze the impact of recent code changes:

1. **GitHub**: Get all commits from last 7 days in [YOUR_REPO]
   - Group by service (auth, checkout, media, user)

2. **MongoDB**: For each service with recent commits:
   - Check production_bugs for new bugs in that timeframe
   - Check deployments - any rollbacks?

3. **Filesystem**: Read CHANGELOG.md
   - Do the changes match what's documented?

4. **Linear**: Find issues related to those services
   - Are bugs being tracked?

5. **Notion**: Create "Change Impact Analysis" showing:
   - Service → Commits → Bugs → Tickets correlation
   - Risk assessment for each service
```

---

## Sprint Planning & Management

### Prompt 6: Sprint Capacity Planning
```
Help me plan sprint capacity:

1. **Linear**: Get all Todo issues in Workshop team
   - Count total issues
   - Group by priority

2. **MongoDB**: Assess production urgency
   - Count critical/high bugs
   - Calculate total affected users

3. **Filesystem**: Read README.md
   - How many team members?
   - Any mentioned on-call rotation?

4. **GitHub**: Check open PR count
   - How many PRs need review?
   - Is the team bottlenecked on reviews?

5. **Notion**: Create "Sprint Capacity Plan" with:
   - Total capacity (team size × sprint days)
   - Required work (production bugs + planned issues)
   - Capacity warning if over-committed
   - Recommended prioritization
```

### Prompt 7: Daily Standup Summary
```
Generate my daily standup summary:

1. **Linear**: Check my assigned issues
   - What did I complete yesterday? (moved to Done)
   - What am I working on today? (In Progress)
   - What's blocked?

2. **GitHub**: My recent activity
   - Commits I made yesterday
   - PRs I opened or reviewed

3. **MongoDB**: Any production issues assigned to me?
   - Check production_bugs assigned_to field

4. **Notion**: Create a quick standup note:
   ## Yesterday
   [Completed Linear issues + GitHub commits]

   ## Today
   [In Progress issues]

   ## Blockers
   [Blocked issues + production emergencies]
```

---

## Code Review & Quality

### Prompt 8: PR Review Preparation
```
Help me review Pull Request #[NUMBER] in [YOUR_REPO]:

1. **GitHub**: Get PR details
   - What files changed?
   - What's the description?
   - Which service is affected?

2. **MongoDB**: Check production health of that service
   - Any existing bugs?
   - Recent deployments - any failures?

3. **Filesystem**: Read README.md
   - Does this PR align with architecture?
   - Any mentioned coding standards?

4. **Linear**: Is there a related issue?
   - Does the PR address the issue requirements?

5. **Notion**: Create "PR Review Notes - #[NUMBER]" with:
   - Summary of changes
   - Risk assessment based on service health
   - Review checklist
   - Approval recommendation
```

---

## Incident Response

### Prompt 9: Emergency Triage
```
We have a production emergency! Help me triage:

1. **MongoDB**: Query production_bugs
   - Sort by last_seen (most recent first)
   - Find actively occurring issues (last_seen < 1 hour)
   - Get error counts and affected users

2. **MongoDB**: Check recent deployments
   - Any deployments in last 24 hours?
   - Could a recent deploy have caused this?

3. **GitHub**: For affected service:
   - What changed recently?
   - Any suspicious commits?

4. **Linear**: Check if there are existing tickets
   - If not, create Critical priority issue

5. **Notion**: Create "Incident Log - [Timestamp]" with:
   - What's broken
   - How many users affected
   - Likely cause
   - Immediate action plan
```

### Prompt 10: Post-Incident Review
```
Create a post-incident review for the checkout crash (WRK-1):

1. **Linear**: Get issue WRK-1 full history
   - Title: "Fix checkout crash on mobile Safari"
   - Priority: Critical
   - Created: 3 days ago
   - Current status: Fixed

2. **MongoDB**: Get bug data for ticket_id "WRK-1"
   - Error count: 342 errors
   - Affected users: 127
   - First seen: 3 days ago
   - Last seen: 2 days ago (when fixed)
   - commit_sha: d30be37 (introduced bug)
   - github_pr: 1 (fix)
   - Status: resolved

3. **GitHub**: Find the bug introduction and fix
   - Commit d30be37: "Add cart validation" - introduced null pointer bug
   - Commit 2e3fcd1: "Fix null check in processCart - closes WRK-1" - fixed it
   - Read mcp/workshop-code/checkout-service/checkout.js to see the fix

4. **MongoDB**: Check deployment
   - Query deployments for checkout-service v2.3.1
   - Deployed 2 days ago with commit 2e3fcd1
   - Status: success

5. **Filesystem**: Read mcp/sample-project/CHANGELOG.md
   - Should document v2.3.1 with checkout fix

6. **Notion**: Create "Post-Incident Review - WRK-1 Checkout Crash" with:
   ## Incident Summary
   Null pointer crash on mobile Safari affecting checkout flow. 342 errors, 127 users impacted.

   ## Timeline
   - Day -3: First seen after deployment with commit d30be37
   - Day -2: Bug identified as WRK-1, fix deployed in v2.3.1 (commit 2e3fcd1)
   - Day -2: Last error seen - issue resolved

   ## Root Cause
   Commit d30be37 added cart validation but introduced a bug: missing null check
   before accessing cart.items property. Mobile Safari occasionally sends null
   cart when localStorage sync fails.

   ## Resolution
   Commit 2e3fcd1 added null check: `if (!cart || !cart.items)` before processing.
   Deployed in checkout-service v2.3.1. No more errors since deployment.

   ## Lessons Learned
   - Need better null safety in JavaScript code
   - Mobile browser edge cases should be tested
   - Quick turnaround (24 hours from detection to fix) worked well

   ## Action Items
   - [ ] Add null check linting rules to prevent similar issues
   - [ ] Create mobile Safari testing checklist
   - [ ] Document common mobile browser gotchas

This demonstrates the COMPLETE story from bug → fix → deployment!
```

---

## Reporting & Metrics

### Prompt 11: Weekly Team Report
```
Generate a weekly team report for leadership:

1. **Linear**: Sprint progress
   - Issues completed this week
   - Issues still in progress
   - Velocity trend

2. **GitHub**: Code activity
   - Total commits this week
   - PRs merged
   - Contributors

3. **MongoDB**: Production health
   - New bugs found
   - Bugs resolved
   - Deployment success rate

4. **Filesystem**: Feature progress
   - Read config.json
   - What features were enabled this week?

5. **Notion**: Create "Weekly Report - [Week of Date]" with:
   ## Executive Summary
   [High-level achievements and concerns]

   ## Sprint Progress
   [Velocity, completed work]

   ## Production Stability
   [Bug trends, deployment health]

   ## Code Quality
   [PR metrics, review turnaround]

   ## Risks & Blockers
   [Critical issues, team blockers]

   ## Next Week Focus
   [Priorities]
```

### Prompt 12: Service Health Dashboard
```
Create a service health dashboard:

1. **Filesystem**: Read README.md
   - List all microservices

2. **MongoDB**: For each service:
   - Query production_bugs: count open bugs by severity
   - Query deployments: get latest deployment status
   - Calculate health score

3. **GitHub**: For each service:
   - Count open PRs
   - Recent commit activity

4. **Linear**: For each service:
   - Count related open issues

5. **Notion**: Create "Service Health Dashboard" with table:
   | Service | Health Score | Open Bugs | Latest Deploy | Open PRs | Open Issues |
   |---------|--------------|-----------|---------------|----------|-------------|
   [Fill with data from above]

   Color coding: 🟢 Healthy | 🟡 Warning | 🔴 Critical
```

---

## Advanced Workflows

### Prompt 13: Automated Sprint Planning
```
Automate sprint planning for the upcoming sprint:

1. **MongoDB**: Get production urgency metrics
   - Critical bugs needing immediate attention
   - Services with highest error counts

2. **Linear**: Get backlog issues
   - All Todo issues
   - Group by priority and estimate

3. **GitHub**: Check pending PRs
   - How many need to be merged first?

4. **Filesystem**: Read README for sprint goals
   - What are stated objectives?

5. **Notion**: Create "Sprint [N+1] Plan" with:
   ## Must-Have (Based on Production Data)
   [Critical bugs from MongoDB]

   ## Should-Have (High Priority)
   [High priority Linear issues aligned with README goals]

   ## Nice-to-Have
   [Medium priority issues]

   ## Capacity Analysis
   [Team size vs estimated work]

   ## Dependencies
   [PRs to merge first, blockers]
```

### Prompt 14: Release Readiness Check
```
Are we ready to release version 2.4.0?

1. **Linear**: Sprint completion check
   - Are all critical sprint issues Done?
   - Any open blockers?

2. **GitHub**: Code review status
   - Any open PRs that must be merged?
   - All commits reviewed?

3. **MongoDB**: Production stability check
   - Any critical bugs still open?
   - Recent deployment success rate >95%?

4. **Filesystem**: Documentation check
   - Read CHANGELOG.md - is it updated?
   - Read README.md - is version correct?
   - Read config.json - is configuration production-ready?

5. **Notion**: Create "Release Readiness - v2.4.0" with:
   ## Go/No-Go Checklist
   - [ ] All critical issues resolved
   - [ ] No open blockers
   - [ ] All PRs merged and reviewed
   - [ ] Production stable
   - [ ] Documentation updated

   ## Verdict: ✅ GO / ⚠️ GO WITH CAUTION / ❌ NO-GO

   ## Recommended Actions
   [Based on findings]
```

---

## Tips for Orchestration Prompts

### 1. Be Explicit About Order
```
✅ "First check MongoDB, then create a Linear issue based on those results"
```

### 2. Show the Connections
```
✅ "Cross-reference bugs in MongoDB with tickets in Linear"
```

### 3. Specify Final Output
```
✅ "Create a Notion page summarizing all of the above"
```

### 4. Use Numbered Steps
```
✅ 1. Do A
✅ 2. Do B with results from A
✅ 3. Do C with results from A and B
```

### 5. Include Context
```
✅ "We're investigating a checkout bug, so focus on checkout-related data"
```

---

## Workshop Challenge

### Ultimate Challenge: End-to-End Workflow
```
Execute a complete end-to-end workflow:

SCENARIO: You're the on-call engineer. It's Monday morning. Execute your
weekly start-of-week routine:

1. **MongoDB**: Get weekend production health
   - Any new bugs since Friday?
   - Weekend deployment status?

2. **Linear**: Get your sprint status
   - What's left from last week?
   - What's new this week?

3. **GitHub**: Check weekend activity
   - Any emergency commits or PRs?
   - Who was working over the weekend?

4. **Filesystem**: Read latest CHANGELOG
   - Any hotfixes deployed?

5. **Notion**: Create "Weekly Kickoff - [Date]" summarizing:
   - Weekend incidents (if any)
   - Sprint carryover from last week
   - This week's priorities
   - Production concerns to watch

6. **Linear**: Based on MongoDB data, create issues for any new critical bugs

7. **Notion**: Update Sprint Kickoff page with action plan for the week

This is the complete workflow a real engineer might do every Monday!
```

---

**This is where MCP shines!** You just described what you need, and Claude orchestrates 5+ different tools to make it happen. No API documentation. No code. Just natural language. 🎉

---

**Back to:** [Workshop Demo Script](../demo-script.md) | [Main README](../../README.md)
