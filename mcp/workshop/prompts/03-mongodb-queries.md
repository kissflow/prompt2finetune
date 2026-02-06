# MongoDB MCP Query Prompts

Copy-pasteable prompts for MongoDB integration demos and exercises.

---

## Basic Queries

### Prompt 1: Count Documents
```
Query the workshop_demo database:
How many documents are in each collection?
```

### Prompt 2: List Collections
```
Connect to the workshop_demo MongoDB database and list all collections.
For each collection, show:
- Collection name
- Document count
- Sample document structure
```

### Prompt 3: Show Sample Data
```
Query the workshop_demo database, production_bugs collection.
Show me 3 sample documents so I can understand the data structure.
```

---

## Production Bugs Queries

### Prompt 4: Count by Severity
```
Query workshop_demo.production_bugs:
Group by severity and count how many bugs of each severity we have.
Show the results as: Critical, High, Medium, Low
```

### Prompt 5: Find Critical Bugs
```
Query workshop_demo.production_bugs:
Find all bugs with severity "critical" and status "open".
For each bug:
- Title
- Error count
- Service affected
- When first and last seen
- Whether it has a Linear ticket (ticket_id)
```

### Prompt 6: Find Untracked Bugs
```
Query workshop_demo.production_bugs:
Find all bugs where ticket_id is null.
These are production issues not yet tracked in Linear!
Sort by: severity (critical first), then error_count (highest first).
```

### Prompt 7: High Error Count Bugs
```
Query workshop_demo.production_bugs:
Find all bugs with error_count greater than 100.
Sort by error_count descending.
Show:
- Title
- Error count
- Service
- Status
- Ticket ID (if exists)
```

### Prompt 8: Recent Bugs
```
Query workshop_demo.production_bugs:
Find bugs where first_seen is within the last 3 days.
These are newly discovered issues.
```

### Prompt 9: Active Bugs
```
Query workshop_demo.production_bugs:
Find bugs where last_seen is within the last 2 hours.
These are actively occurring issues RIGHT NOW!
Sort by severity and error_count.
```

### Prompt 10: Bugs by Service
```
Query workshop_demo.production_bugs:
Group by service and show:
- Service name
- Total bugs for that service
- How many are critical or high severity
- Total error count across all bugs

Which service has the most problems?
```

---

## Deployments Queries

### Prompt 11: Recent Deployments
```
Query workshop_demo.deployments:
Show me all deployments from the last 7 days.
Sort by deployed_at (newest first).
For each:
- Service name
- Version
- Status (success, rollback, failed)
- Deployed by whom
- Deployment notes
```

### Prompt 12: Failed/Rolled Back Deployments
```
Query workshop_demo.deployments:
Find all deployments with status "rollback" or "failed".
Show:
- Service and version
- When it was deployed
- Who deployed it
- What went wrong (from notes field)
```

### Prompt 13: Deployments by Service
```
Query workshop_demo.deployments:
For each service, show the most recent deployment:
- Version deployed
- When
- Status
- Deployed by whom
```

### Prompt 14: Deployment Frequency
```
Query workshop_demo.deployments:
Count deployments per service in the last 30 days.
Which service deploys most frequently?
```

---

## Cross-Collection Queries

### Prompt 15: Bugs vs Deployments Correlation
```
Query workshop_demo:

1. Find all deployments with status "rollback" or "failed"
2. For each failed deployment, check if there are bugs in
   production_bugs for the same service
3. Show the correlation:
   - Deployment: service, version, date
   - Related bugs: title, error count, severity
```

### Prompt 16: Service Health Check
```
Query workshop_demo:

For service "checkout-service":
1. Latest deployment status and version
2. All open production bugs
3. Total error count
4. Overall health assessment: Good, Warning, or Critical
```

---

## Aggregation Queries

### Prompt 17: Top Services by Error Count
```
Query workshop_demo.production_bugs:
Use aggregation to:
1. Group by service
2. Sum total error_count for each service
3. Sort by total errors (highest first)
4. Show top 5 services with most errors
```

### Prompt 18: Bug Severity Distribution
```
Query workshop_demo.production_bugs:
Create a summary showing:
- Total bugs
- Percentage in each severity level (critical, high, medium, low)
- How many have ticket_id vs don't
- Average error count per severity level
```

### Prompt 19: Time-Based Analysis
```
Query workshop_demo.production_bugs:
Group bugs by when they first appeared:
- Last 24 hours
- Last 3 days
- Last 7 days
- Older than 7 days

Show count for each time bucket.
```

---

## Advanced Queries

### Prompt 20: Find Outliers
```
Query workshop_demo.production_bugs:
Find bugs that are unusual:
1. Very high error_count (>200)
2. OR affecting many users (>100)
3. OR critical/high severity but no ticket_id

These need immediate attention!
```

### Prompt 21: Sprint Risk Assessment
```
Query workshop_demo:

Generate a risk assessment for the current sprint:
1. Count open critical/high bugs
2. Count recent rollbacks (last 7 days)
3. Find bugs without Linear tickets
4. Calculate total affected users across all critical bugs

Overall risk level: Low, Medium, or High?
```

### Prompt 22: Service Stability Score
```
Query workshop_demo:

For each service, calculate a "stability score" based on:
- Number of open bugs (lower is better)
- Total error count (lower is better)
- Recent deployment success (rollback = penalty)

Rank services from most to least stable.
```

---

## Workshop Exercises

### Exercise 1: Bug Triage
**Task:** Prioritize bugs for the sprint

```
Query workshop_demo.production_bugs:

1. Find all open bugs (status = "open")
2. Calculate a priority score:
   - Critical severity = 10 points
   - High severity = 5 points
   - Medium severity = 2 points
   - Low severity = 1 point
   - Add 1 point per 100 error_count
3. Sort by priority score (highest first)
4. Show top 5 bugs to work on this sprint
```

### Exercise 2: Untracked Issues Report
**Task:** Find production issues not tracked in Linear

```
Query workshop_demo.production_bugs:

1. Find all bugs where ticket_id is null
2. For each:
   - Calculate days since first_seen
   - Show severity and error_count
   - Note affected_users
3. Generate a report:
   "We have [N] untracked production issues affecting [X] users.
    The most critical is [title] with [error_count] errors."
```

### Exercise 3: Deployment Health Report
**Task:** Assess deployment health over the last week

```
Query workshop_demo.deployments:

1. Count total deployments in last 7 days
2. Count by status: success vs rollback vs failed
3. Calculate success rate (percentage)
4. Identify services with rollbacks
5. Verdict: Are our deployments healthy or problematic?
```

---

## Integration with Other MCP Servers

### Prompt 23: MongoDB + Linear
```
1. Query workshop_demo.production_bugs where ticket_id is null
   and severity is "critical"
2. For the bug with the highest error_count:
   - Get all details
   - Create a Linear issue in the Workshop team
   - Priority: Critical
   - Include error count and service in description
```

### Prompt 24: MongoDB + GitHub
```
1. Query workshop_demo.production_bugs for bugs in "checkout-service"
2. For each bug:
   - Search GitHub [YOUR_REPO] for recent commits mentioning "checkout"
   - Are there any commits that might have introduced these bugs?
3. Identify potential culprit commits
```

### Prompt 25: Full Stack Investigation
```
1. Query workshop_demo.production_bugs: find the bug with highest error_count
2. Check workshop_demo.deployments: was there a recent deployment to that service?
3. Search GitHub [YOUR_REPO]: find recent commits to that service
4. Check Linear: is there already a ticket? If not, create one
5. Create Notion page summarizing the investigation
```

---

## Tips for Writing MongoDB Prompts

### Specify Database and Collection
Always be explicit:
```
❌ "Show me bugs"
✅ "Query workshop_demo.production_bugs"
```

### Use MongoDB Terminology
Claude understands MongoDB operators:
```
✅ "where error_count is greater than 100" ($gt)
✅ "where ticket_id is null" ($eq: null)
✅ "group by service" ($group)
✅ "sort by error_count descending" (.sort())
```

### Be Clear About Fields
Mention specific fields you want to see:
```
✅ "For each bug, show: title, error_count, service, status"
```

### Natural Language Works
You don't need to write exact MongoDB queries:
```
✅ "Find critical bugs from the last 3 days"
(Claude translates this to proper MongoDB query)
```

---

## Troubleshooting

### Connection Refused
If MongoDB MCP can't connect:
```bash
# Check MongoDB is running
mongosh --eval "db.version()"

# Docker: check container
docker ps | grep mongo

# macOS: check service
brew services list | grep mongodb
```

### Database Not Found
If workshop_demo doesn't exist:
```bash
cd /Users/jimisaac/prompt2finetune/mcp/mongodb
node seed-mongo.js
```

### Empty Results
If queries return no results:
```
Query workshop_demo:
List all collections and show document count for each.
```

### Verify data exists:
```bash
mongosh mongodb://localhost:27017/workshop_demo
> db.production_bugs.countDocuments()
# Should return 5
```

---

**Next:** [Filesystem Reading Prompts](04-filesystem-reading.md)
