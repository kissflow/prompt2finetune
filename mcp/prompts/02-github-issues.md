# GitHub MCP Integration Prompts

Copy-pasteable prompts for GitHub integration demos and exercises.

---

## Basic Queries

### Prompt 1: List Recent Commits
```
Show me the most recent commits in the repository kissflow/prompt2finetune, branch workshop-sample.
For each commit, include:
- Commit message
- Author
- Date
- Commit SHA (short version)

Look for commits mentioning WRK-1, WRK-2, or WRK-3.
```



---

## Code Search

### Prompt 1: Search for Bug-Related Code
```
Search the kissflow/prompt2finetune repository for code files in
mcp/workshop-code/ directory.

Find files related to:
- checkout (for WRK-1)
- cdn or media (for WRK-2)
- auth or session (for WRK-3)

Show me the file paths.
```

### Prompt 2: Read Specific File
```
Read the file mcp/workshop-code/checkout-service/checkout.js from
kissflow/prompt2finetune (branch: workshop-sample).

Find the processCart function and explain what it does.
```

---

## Integration with Other Data

### Prompt 1: GitHub + MongoDB Cross-Reference
```
Investigate bug WRK-1:
1. Query MongoDB workshop_demo.production_bugs for ticket_id "WRK-1"
2. Note the commit_sha field (d30be37)
3. Search GitHub kissflow/prompt2finetune (branch: workshop-sample) for commit d30be37
4. Read the commit message and changes
5. Connect the dots: Does this commit match the bug in MongoDB?

Expected commits to find:
- d30be37: "Add cart validation" (introduced the bug)
- 2e3fcd1: "Fix null check in processCart - closes WRK-1" (fixed it)
```

### Prompt 2: GitHub + Linear Connection
```
1. Get Linear issue WRK-2 details
2. Search GitHub kissflow/prompt2finetune (branch: workshop-sample)
   for commits mentioning "WRK-2" or "CDN"
3. Found commits:
   - 00bca23: "Switch CDN provider" (introduced the bug)
   - 4ea4fe2: "Add CDN retry logic - addresses WRK-2" (attempted fix)
4. What's the current status? Is WRK-2 resolved?
```

---

## Workshop Exercises

### Exercise 1: Bug Investigation
**Task:** Investigate the checkout crash using GitHub

```
The checkout crash bug (WRK-1) is affecting checkout-service.

1. Search kissflow/prompt2finetune (branch: workshop-sample)
   for commits mentioning "WRK-1"
2. Find commits d30be37 (introduced bug) and 2e3fcd1 (fixed it)
3. Read mcp/workshop-code/checkout-service/checkout.js

What was the bug? How was it fixed?

Expected finding: Null pointer crash due to missing cart validation
```

### Exercise 2: Deployment Correlation
**Task:** Connect code changes to deployments

```
1. Search GitHub for commit 2e3fcd1 (WRK-1 fix)
2. Query MongoDB deployments for checkout-service
3. Find deployment with commit_sha "2e3fcd1"
4. When was the fix deployed?
5. Cross-check: Has the bug stopped occurring? (Check MongoDB production_bugs last_seen)
```

---

## Tips

**Always Specify Repository:**
```
✅ "Search kissflow/prompt2finetune"
❌ "Search the repo"
```

**Specify Branch:**
```
✅ "branch: workshop-sample"
(The workshop commits are on this branch)
```

**Use Commit SHAs for Precision:**
```
✅ "Find commit d30be37"
✅ "Find commit 2e3fcd1"
```

---

**Next:** [MongoDB Query Prompts](03-mongodb-queries.md)
