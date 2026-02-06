# Notion MCP Integration Prompts

Copy-pasteable prompts for Notion integration demos and exercises.

---

## Basic Operations

### Prompt 1: Search Pages
```
Search my Notion workspace for pages related to "sprint" or "kickoff".
Show me the titles and URLs.
```

### Prompt 2: List Recent Pages
```
Show me the most recently updated pages in my Notion workspace.
For each page:
- Title
- Last edited date
- Last edited by whom (if available)
```

### Prompt 3: Find Specific Page
```
Search my Notion workspace for a page titled "Sprint Kickoff" or similar.
Show me the page content.
```

---

## Creating Pages

### Prompt 4: Create Simple Page
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

### Prompt 5: Create Structured Page
```
Create a new Notion page titled "Weekly Status Report" with sections:

# Weekly Status Report - Week of Feb 3

## Completed This Week
[Placeholder - to be filled]

## In Progress
[Placeholder - to be filled]

## Blocked
[Placeholder - to be filled]

## Next Week's Goals
[Placeholder - to be filled]
```

### Prompt 6: Create Page with Table
```
Create a new Notion page titled "Production Bugs Summary" with:

# Production Bugs Summary

## Overview
This page tracks all production bugs and their status.

## Bugs List
| Bug ID | Title | Severity | Status | Assigned To |
|--------|-------|----------|--------|-------------|
| TBD | TBD | TBD | TBD | TBD |

(We'll populate this with data next)
```

---

## Updating Pages

### Prompt 7: Update Existing Page
```
Find the Notion page titled "Sprint Kickoff - Feb 6 2026".
Add a new section at the end:

## Action Items
- [ ] Create Linear issue for auth memory leak
- [ ] Review checkout-service recent commits
- [ ] Investigate media-service rollback
```

### Prompt 8: Append to Page
```
Find the "Weekly Status Report" page.
Under "Completed This Week", add:
- Fixed checkout crash bug (WRK-2)
- Deployed v2.3.1 to production
- Created Linear issues for untracked bugs
```

---

## Advanced Integration

### Prompt 9: Create Page from Linear Data
```
1. Query Linear for all issues in the Workshop team with status "Todo"
2. Create a Notion page titled "Sprint Todo List" with:
   - Issue ID
   - Title
   - Priority
   - Assignee
   Format as a bulleted list grouped by priority.
```

### Prompt 10: Create Page from MongoDB Data
```
1. Query MongoDB workshop_demo.production_bugs for all critical bugs
2. Create a Notion page titled "Critical Production Bugs" with:
   - Bug title
   - Error count
   - Service affected
   - Status
   Format as a table.
```

### Prompt 11: Create Page from GitHub Data
```
1. Get recent commits from GitHub [YOUR_REPO] (last 7 days)
2. Create a Notion page titled "This Week in Code" with:
   - Commit message
   - Author
   - Date
   Group by author.
```

---

## The Ultimate Integration: Sprint Kickoff

### Prompt 12: Complete Sprint Kickoff Page
```
Create a comprehensive Sprint Kickoff page in Notion titled
"Sprint Kickoff - [Today's Date]" by combining data from:

1. **Linear**: All Todo issues in Workshop team
2. **MongoDB**: Critical/high severity open bugs
3. **GitHub**: Recent commits and open PRs
4. **Filesystem**: Current version from config.json

Structure the page as:

# Sprint Kickoff - [Date]

## Sprint Overview
[Linear issues grouped by priority]

## Production Health
[MongoDB bugs - critical ones highlighted]

## Recent Code Changes
[GitHub commits from last 7 days]

## Configuration
[Current version and key feature flags from config.json]

## Recommended Action Plan
[AI-generated recommendations based on all the data]
```

---

## Workshop Exercises

### Exercise 1: Bug Report Page
**Task:** Create a Notion page from MongoDB bug data

```
1. Query MongoDB workshop_demo.production_bugs for bugs with error_count > 100
2. Create a Notion page titled "High Error Count Bugs"
3. For each bug, include:
   - Title
   - Error count
   - Service
   - Status
   - Whether it has a Linear ticket
4. Add a summary section at the top with key statistics
```

### Exercise 2: Deployment Log
**Task:** Create a deployment history page

```
1. Query MongoDB workshop_demo.deployments
2. Create a Notion page titled "Deployment History - [This Month]"
3. List all deployments with:
   - Service and version
   - Status (with ✅ for success, ❌ for rollback)
   - Deployed by
   - Date
   - Notes
4. Add statistics: total deployments, success rate
```

### Exercise 3: Team Status Update
**Task:** Generate a status update combining multiple sources

```
Create a Notion page titled "Team Status - [Today's Date]" with:

1. **Linear Progress**:
   - Issues completed this week (status: Done)
   - Issues in progress
   - Issues blocked

2. **Production Health**:
   - Critical bugs count
   - High priority bugs count
   - Recent deployment success rate

3. **Code Activity**:
   - Commits this week (from GitHub)
   - Open PRs needing review

4. **Risks and Concerns**:
   - Any untracked critical bugs
   - Any failed deployments
   - Any blocked Linear issues
```

---

## Advanced Prompts

### Prompt 13: Create Documentation Index
```
Create a Notion page titled "Project Documentation Index" that:
1. Reads the README.md from filesystem
2. Extracts all section headings
3. Creates a table of contents with links to relevant info
4. Adds sections for:
   - Architecture overview
   - Setup instructions
   - API documentation
   - Troubleshooting
```

### Prompt 14: Meeting Notes Template
```
Create a Notion page titled "Sprint Planning - [Date]" with template:

# Sprint Planning - [Date]

## Attendees
- [List team members from README.md]

## Agenda
1. Review previous sprint
2. Discuss production issues
3. Plan current sprint
4. Assign tickets

## Previous Sprint Review
[Pull from Linear: completed issues from last sprint]

## Production Issues to Address
[Pull from MongoDB: critical bugs]

## Sprint Capacity
[Calculate based on team size and sprint length]

## Tickets for This Sprint
[Pull from Linear: Todo issues for current sprint]

## Action Items
- [ ]
```

### Prompt 15: Incident Report
```
Create a Notion page for an incident report titled
"Incident: Checkout Crash - [Date]"

Based on:
1. MongoDB: checkout-service bug details (WRK-2)
2. GitHub: recent commits to checkout-service
3. Deployments: when was checkout-service last deployed?
4. Linear: is there a ticket? What's the status?

Structure:
- **Incident Summary**: What happened?
- **Impact**: Error count, affected users
- **Timeline**: When first/last seen
- **Root Cause**: Based on code changes
- **Resolution**: What's being done? (Linear ticket status)
- **Next Steps**: What to do next
```

---

## Tips for Writing Notion Prompts

### OAuth Required
Notion MCP uses OAuth - the first time you use it:
1. Browser will open asking for authorization
2. Log in to Notion
3. Select which pages to share with Claude
4. Click "Allow access"

### Page Titles
Be specific with page titles:
```
❌ "Create a sprint page"
✅ "Create a page titled 'Sprint Kickoff - Feb 6 2026'"
```

### Markdown Formatting
Notion supports markdown:
```
✅ Use # for headings
✅ Use - for bullet lists
✅ Use **bold** and *italic*
✅ Use | for tables
✅ Use - [ ] for checkboxes
```

### Search is Fuzzy
Notion search is flexible:
```
✅ "Find pages about sprint" (finds "Sprint Kickoff", "Sprint Planning", etc.)
```

---

## Troubleshooting

### OAuth Browser Doesn't Open
1. Check browser popup blocker settings
2. Manually visit https://notion.so and log in
3. Restart Claude Desktop
4. Try the Notion prompt again

### Can't Find Page
If Claude can't find a page you know exists:
```
List all pages in my Notion workspace.
```
Then use the exact title shown.

### Page Not Created
If page creation fails:
- Check you completed OAuth authorization
- Check you selected a workspace to share
- Try creating a simpler page first to test

### Update Failed
If page update fails:
- Page might be read-only
- You might not have edit permissions
- Try creating a new page instead

---

## Security & Privacy

**Important Considerations:**

1. **OAuth Scope**: When authorizing Notion, you choose which pages to share
   - Only share what you need for the workshop
   - You can revoke access later at https://notion.so/my-integrations

2. **Data Privacy**: Pages created by Claude are:
   - In YOUR Notion workspace
   - Visible to your team (based on Notion permissions)
   - Not shared with Anthropic

3. **Best Practice**:
   - Create a separate Notion workspace for testing/workshops
   - Don't use production workspace until you're comfortable

---

## Integration Examples

### Example 1: Daily Standup Note
```
Create my daily standup note in Notion:

Title: "Standup - [Today's Date]"

Content:
## Yesterday
[Get my Done issues from Linear yesterday]

## Today
[Get my In Progress issues from Linear]

## Blockers
[Get my Blocked issues from Linear]
```

### Example 2: Sprint Retrospective
```
Create a sprint retrospective page:

Title: "Sprint Retrospective - [Sprint Number]"

Content:
## What Went Well
[Get completed Linear issues count and velocity]

## What Didn't Go Well
[Get bugs found in production during sprint from MongoDB]

## Action Items for Next Sprint
[Based on analysis above]
```

---

**Next:** [Multi-MCP Orchestration Prompts](06-orchestration.md) ⭐
