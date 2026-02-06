# Linear MCP Integration Prompts

Copy-pasteable prompts for Linear integration demos and exercises.

---

## Basic Queries

### Prompt 1: List All Issues
```
Show me all issues in the Workshop team in Linear.
Group them by priority and show the status of each.
```

### Prompt 2: Filter by Priority
```
Show me all urgent and high priority issues in the Workshop team.
For each issue, include:
- Issue ID and title
- Current status
- Assignee (if any)
```

---

## Creating Issues

### Prompt 1: Create Basic Issue
```
Create a new Linear issue in the Workshop team:
Title: "Add loading spinner to checkout button"
Priority: Medium
Status: Todo
```

### Prompt 2: Create Issue from Production Bug
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

### Prompt 1: Update Status
```
Update Linear issue WRK-2 to status "In Progress".
```

### Prompt 2: Update Multiple Fields
```
For Linear issue WRK-1, update:
- Status: Done
- Add a comment: "Fixed null check in checkout.js - deployed in v2.3.1"
```

---

## Integration with Other Data

### Prompt 1: Linear + MongoDB Cross-Reference
```
1. Query the workshop_demo MongoDB database for production_bugs where ticket_id is null
2. These are bugs not yet tracked in Linear
3. For the most critical one (highest severity + error count), create a Linear issue
```

### Prompt 2: Linear + GitHub Connection
```
Show me Linear issue WRK-2 details.
Then search GitHub repository kissflow/prompt2finetune (branch: workshop-sample)
for any commits or code mentioning "WRK-2".
Are there any commits addressing this issue?
```

---

## Workshop Exercises

### Exercise 1: Issue Creation from Data
**Task:** Create Linear issues for untracked production bugs

```
1. Query MongoDB workshop_demo.production_bugs where ticket_id is null
2. For each untracked bug, create a Linear issue in the Workshop team with:
   - Title from bug title
   - Priority based on severity (critical → Critical, high → High)
   - Description including error count and service name
```

### Exercise 2: Status Report
**Task:** Generate a standup update

```
Generate a brief status update for today's standup based on:
1. My assigned Linear issues in the Workshop team
2. Which issues I completed yesterday (status: Done)
3. Which issue I'm working on today (status: In Progress)
4. Any blockers
```

---

## Tips

**Be Specific About Team:**
```
✅ "Show me issues in the Workshop team"
❌ "Show me my issues"
```

**Use Issue IDs When Updating:**
```
✅ "Update Linear issue WRK-2"
❌ "Update the checkout crash issue"
```

---

**Next:** [GitHub Integration Prompts](02-github-issues.md)
