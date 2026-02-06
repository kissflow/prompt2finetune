# Linear MCP Integration Prompts

Copy-pasteable prompts for Linear integration demos and exercises.

---

## Basic Prompts

### Prompt 1: List All Issues
```
Show me all issues in the Workshop team in Linear.
Group them by priority and show the status of each.
```

### Prompt 2: Filter by Status
```
Show me all issues in the Workshop team that have status "Todo".
Sort by priority (Urgent first).
```

### Prompt 3: Filter by Priority
```
Show me all urgent and high priority issues in the Workshop team.
For each issue, include:
- Issue ID and title
- Current status
- Assignee (if any)
```

### Prompt 4: Search by Keyword
```
Search Linear issues in the Workshop team for anything related to
"checkout" or "payment". Show me the issue IDs, titles, and priorities.
```

---

## Creating Issues

### Prompt 5: Create Basic Issue
```
Create a new Linear issue in the Workshop team:
Title: "Add loading spinner to checkout button"
Priority: Medium
Status: Todo
```

### Prompt 6: Create Detailed Issue
```
Create a new Linear issue in the Workshop team:
Title: "Investigate auth service memory leak"
Priority: Critical
Status: Todo
Description: "Auth service showing memory leak in production. Error count: 89 errors in last 24 hours. Service: auth-service. Related to session handler. Needs immediate investigation."
```

### Prompt 7: Create Issue from Bug Report
```
I found a production bug that's not tracked yet. Create a Linear issue:

Based on this bug report:
- Title: "Memory leak in auth session handler"
- Severity: Critical
- Error count: 89 errors
- Service: auth-service
- Impact: 234 affected users

Create an appropriate Linear issue in the Workshop team with Critical priority.
```

---

## Updating Issues

### Prompt 8: Update Status
```
Update Linear issue WRK-2 to status "In Progress".
```

### Prompt 9: Update Multiple Fields
```
For Linear issue WRK-6, update:
- Status: In Progress
- Priority: High
- Add a comment: "Started investigation - appears to be CDN origin server issue"
```

---

## Advanced Queries

### Prompt 10: Find Unassigned Critical Issues
```
Show me all issues in the Workshop team that are:
- Priority: Urgent or Critical
- Status: Todo
- Not assigned to anyone

These need immediate attention.
```

### Prompt 11: Sprint Progress
```
Give me a summary of the current sprint for the Workshop team:
- Total issues
- How many are in each status (Todo, In Progress, Done)
- How many are urgent or high priority
- Any blockers?
```

### Prompt 12: Find Related Issues
```
Find all Linear issues in the Workshop team related to "authentication"
or "login". Show me the issue IDs, titles, statuses, and whether they're
linked to any GitHub PRs.
```

---

## Integration with Other Data

### Prompt 13: Linear + MongoDB Cross-Reference
```
1. Query the workshop_demo MongoDB database for production_bugs where ticket_id is null
2. These are bugs not yet tracked in Linear
3. For the most critical one (highest severity + error count), create a Linear issue
```

### Prompt 14: Linear + GitHub Connection
```
Show me Linear issue WRK-2 details.
Then search GitHub repository [YOUR_REPO] for any code, commits, or PRs
mentioning "checkout crash" or "WRK-2".
Are there any PRs addressing this issue?
```

---

## Workshop Exercises

### Exercise 1: Issue Creation from Data
**Task:** Create Linear issues for all untracked production bugs

```
1. Query MongoDB workshop_demo.production_bugs where ticket_id is null
2. For each untracked bug, create a Linear issue in the Workshop team with:
   - Title from bug title
   - Priority based on severity (critical → Critical, high → High, etc.)
   - Description including error count and service name
```

### Exercise 2: Status Report
**Task:** Generate a status update for standup

```
Generate a brief status update (3-4 sentences) for today's standup based on:
1. My assigned Linear issues in the Workshop team
2. Which ones I completed yesterday (if any are Done)
3. Which one I'm working on today (In Progress)
4. Any blockers (issues with dependencies)
```

### Exercise 3: Priority Assessment
**Task:** Find the highest priority work

```
Analyze all Todo issues in the Workshop team:
1. List all urgent and high priority issues
2. For each, check if there are related production bugs in MongoDB
3. Rank them by: (1) Has production bug? (2) Error count (3) Priority
4. Tell me which issue to work on first and why
```

---

## Tips for Writing Linear Prompts

### Be Specific About Team
Always mention the team name to avoid ambiguity:
```
❌ "Show me my issues"
✅ "Show me my issues in the Workshop team"
```

### Use Issue IDs When Updating
Include the specific issue ID:
```
❌ "Update the checkout crash issue"
✅ "Update Linear issue WRK-2"
```

### Provide Context for Creation
Give enough detail when creating issues:
```
❌ "Create an issue about the bug"
✅ "Create an issue titled 'Fix auth memory leak' with Critical priority and description: [details]"
```

### Leverage Natural Language
Don't worry about exact field names - Claude understands:
```
✅ "Show me urgent issues"
✅ "Show me critical priority issues"
✅ "Show me high-importance tasks"
(All work the same way!)
```

---

## Troubleshooting

### OAuth Not Working
If Linear OAuth browser doesn't open:
1. Check browser popup settings
2. Manually visit https://linear.app and log in first
3. Restart Claude Desktop
4. Try again

### Can't Find Team
If Claude can't find the "Workshop" team:
```
List all teams in my Linear workspace.
```
Then use the exact team name shown.

### Issue Not Found
If Claude can't find an issue by ID:
```
Search Linear for issue [ID] across all teams.
```

---

**Next:** [GitHub Integration Prompts](02-github-issues.md)
