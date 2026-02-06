# MongoDB MCP Query Prompts

Copy-pasteable prompts for MongoDB integration demos and exercises.

---

## Basic Queries

### Prompt 1: List Collections
```
Connect to the workshop_demo MongoDB database and list all collections.
For each collection, show:
- Collection name
- Document count
- Sample document structure
```

### Prompt 2: Show All Bugs
```
Query the workshop_demo database, production_bugs collection.
Show all bugs with their:
- ticket_id
- title
- severity
- error_count
- commit_sha
- github_pr
```

---

## Production Bugs Queries

### Prompt 1: Find Critical Bugs
```
Query workshop_demo.production_bugs:
Find all bugs with severity "critical".
For each bug:
- Title
- Error count
- Service affected
- Whether it has a Linear ticket (ticket_id)
- commit_sha (if available)
```

### Prompt 2: Find Untracked Bugs
```
Query workshop_demo.production_bugs:
Find all bugs where ticket_id is null.
These are production issues not yet tracked in Linear!
Sort by: severity (critical first), then error_count (highest first).
```

---

## Deployments Queries

### Prompt 1: Recent Deployments
```
Query workshop_demo.deployments:
Show all deployments sorted by deployed_at (newest first).
For each:
- Service name
- Version
- Status (success, rollback, failed)
- commit_sha
- Deployment notes
```

### Prompt 2: Failed/Rolled Back Deployments
```
Query workshop_demo.deployments:
Find all deployments with status "rollback" or "failed".
Show:
- Service and version
- When it was deployed
- rollback_reason or notes
- Which bug (from production_bugs) caused the rollback?
```

---

## Cross-Collection Queries

### Prompt 1: Bugs vs Deployments Correlation
```
Query workshop_demo:

1. Find the bug for ticket_id "WRK-1"
2. Note its commit_sha field
3. Find the deployment with that commit_sha
4. Show the correlation:
   - Bug: ticket_id, title, error_count
   - Deployment: service, version, status, deployed_at
```

### Prompt 2: Service Health Check
```
Query workshop_demo:

For service "checkout-service":
1. Latest deployment status and version
2. All production bugs for this service
3. Total error count across all bugs
4. Overall health: Good, Warning, or Critical?
```

---

## Workshop Exercises

### Exercise 1: Bug Triage
**Task:** Prioritize bugs for the sprint

```
Query workshop_demo.production_bugs:

1. Show all 3 bugs (WRK-1, WRK-2, WRK-3)
2. For each show:
   - ticket_id, title, severity
   - error_count and affected_users
   - status (open vs resolved)
3. Which one needs attention first based on severity and error count?
```

### Exercise 2: Deployment Health Report
**Task:** Assess deployment health

```
Query workshop_demo.deployments:

1. Show all 4 deployments
2. Count by status: success vs rollback
3. Calculate success rate (percentage)
4. Identify which service had a rollback and why
5. Verdict: Are our deployments healthy?
```

---

## Integration with Other MCP Servers

### Prompt 1: MongoDB + Linear + GitHub
```
Investigate bug WRK-1:
1. Query workshop_demo.production_bugs for ticket_id "WRK-1"
2. Get its commit_sha (d30be37) and github_pr (1)
3. Search Linear for issue WRK-1
4. Search GitHub kissflow/prompt2finetune for commit d30be37
5. Connect the dots: What bug was introduced? Is it fixed?
```

### Prompt 2: Find and Track Untracked Bugs
```
1. Query workshop_demo.production_bugs where ticket_id is null
2. For the most critical untracked bug:
   - Get all details (title, severity, error_count, service)
   - Create a Linear issue in the Workshop team
   - Priority based on severity
   - Include error count in description
```

---

## Tips

**Specify Database and Collection:**
```
✅ "Query workshop_demo.production_bugs"
❌ "Show me bugs"
```

**Reference Linked Data:**
```
✅ "Show bugs with their commit_sha and github_pr fields"
```

---

**Next:** [Filesystem Reading Prompts](04-filesystem-reading.md)
