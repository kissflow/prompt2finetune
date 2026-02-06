# GitHub MCP Integration Prompts

Copy-pasteable prompts for GitHub integration demos and exercises.

---

## Repository Exploration

### Prompt 1: List Recent Commits
```
Show me the most recent 10 commits in the repository [YOUR_USERNAME/YOUR_REPO].
For each commit, include:
- Commit message
- Author
- Date
- Commit SHA (short version)
```

### Prompt 2: Filter Commits by Time
```
Show me all commits in [YOUR_USERNAME/YOUR_REPO] from the last 7 days.
Group them by author.
```

### Prompt 3: Search Commits by Message
```
Search commit messages in [YOUR_USERNAME/YOUR_REPO] for keywords:
"fix", "bug", or "patch"

Show me the 5 most recent bug fix commits.
```

---

## Code Search

### Prompt 4: Search for Function/Class
```
Search the repository [YOUR_USERNAME/YOUR_REPO] for code containing
the function "processCheckout" or class "CheckoutService".

Show me the file paths and line numbers where they appear.
```

### Prompt 5: Search by Keyword
```
Search [YOUR_USERNAME/YOUR_REPO] for code related to "authentication"
or "session handling".

I'm investigating an auth memory leak bug.
```

### Prompt 6: Find Configuration Files
```
List all configuration files in [YOUR_USERNAME/YOUR_REPO]:
- .env files
- config.json, config.yml
- package.json
- docker-compose.yml

Show me their paths.
```

---

## Pull Requests

### Prompt 7: List Open PRs
```
Show me all open pull requests in [YOUR_USERNAME/YOUR_REPO].
For each PR:
- PR number and title
- Author
- Created date
- Number of comments
- Status (mergeable or not)
```

### Prompt 8: Filter PRs by Label
```
Show me all pull requests in [YOUR_USERNAME/YOUR_REPO] with labels
"bug" or "hotfix".

Include both open and recently closed (last 30 days).
```

### Prompt 9: Find PRs by Author
```
Show me all pull requests in [YOUR_USERNAME/YOUR_REPO] created by
[GITHUB_USERNAME] in the last month.
```

---

## Issues

### Prompt 10: List Open Issues
```
Show me all open issues in [YOUR_USERNAME/YOUR_REPO].
Sort by:
1. Issues with "bug" label first
2. Then by creation date (newest first)
```

### Prompt 11: Search Issues by Keyword
```
Search issues in [YOUR_USERNAME/YOUR_REPO] for keywords:
"crash", "memory leak", or "performance"

Show me the issue numbers, titles, and current status.
```

### Prompt 12: Find Stale Issues
```
Show me all open issues in [YOUR_USERNAME/YOUR_REPO] that haven't been
updated in the last 60 days.

These might need triage or closure.
```

---

## Branches

### Prompt 13: List Branches
```
List all branches in [YOUR_USERNAME/YOUR_REPO].
Highlight which branches have:
- Open pull requests
- Recent commits (last 7 days)
- No activity (might be stale)
```

### Prompt 14: Find Feature Branches
```
Show me all branches in [YOUR_USERNAME/YOUR_REPO] that match patterns:
- feature/*
- fix/*
- hotfix/*

For each, tell me when it was last updated.
```

---

## File Operations

### Prompt 15: Read File Contents
```
Read the contents of README.md from [YOUR_USERNAME/YOUR_REPO].
Summarize:
- What is this project?
- How do you install it?
- How do you run it?
```

### Prompt 16: Check File History
```
Show me the commit history for the file "src/checkout.js" in
[YOUR_USERNAME/YOUR_REPO].

Who made changes to this file recently?
```

### Prompt 17: Compare File Versions
```
Show me the diff for file "src/auth/session.js" between:
- The current main branch
- The commit from 7 days ago

What changed?
```

---

## Advanced Integration

### Prompt 18: GitHub + Linear Cross-Reference
```
1. Get Linear issue WRK-2 details
2. Search GitHub kissflow/prompt2finetune (branch: workshop-sample) for:
   - Commits mentioning "WRK-2"
   - PRs with "WRK-2" in title or description
   - Code changes related to the CDN issue

3. Summarize: Is there already work happening on this issue?

Expected commits to find:
- 00bca23 - Switch CDN provider (introduced the bug)
- 4ea4fe2 - Add CDN retry logic (attempted fix)
```

### Prompt 19: GitHub + MongoDB Investigation
```
1. Query MongoDB workshop_demo.production_bugs for the checkout crash bug (ticket_id: WRK-1)
2. Note the commit_sha field in the bug record (d30be37)
3. Search GitHub kissflow/prompt2finetune (branch: workshop-sample) for:
   - Commit d30be37 (the one that introduced the bug)
   - Commit 2e3fcd1 (the fix)
4. Read the mcp/workshop-code/checkout-service/checkout.js file

Connect the dots: MongoDB error → GitHub commits → Actual code with bug/fix
```

### Prompt 20: Release Notes Generation
```
Generate release notes for [YOUR_USERNAME/YOUR_REPO] based on:
1. All commits merged to main in the last 7 days
2. All PRs merged in the last 7 days
3. Group by: Features, Bug Fixes, Other

Format as markdown suitable for GitHub release.
```

---

## Workshop Exercises

### Exercise 1: Bug Investigation
**Task:** Investigate the checkout crash bug using GitHub

```
The checkout crash bug (WRK-1) is affecting checkout-service.

1. Search kissflow/prompt2finetune (branch: workshop-sample) for files containing "checkout"
2. Look at commits mentioning "WRK-1" in the message
3. Find commits d30be37 (introduced bug) and 2e3fcd1 (fixed it)
4. Read mcp/workshop-code/checkout-service/checkout.js

What was the bug? How was it fixed?

Expected finding: Null pointer crash due to missing cart validation
```

### Exercise 2: Code Review Prep
**Task:** Prepare for code review

```
I have an open PR in [YOUR_USERNAME/YOUR_REPO] (PR #[NUMBER]).

Help me prepare for code review by:
1. Summarizing what this PR changes
2. Listing all files modified
3. Checking if there are any related open issues
4. Suggesting which team members should review (based on file history)
```

### Exercise 3: Deployment Readiness
**Task:** Check if we're ready to deploy

```
We're planning to deploy to production today.

Check [YOUR_USERNAME/YOUR_REPO] for:
1. Any open PRs with "hotfix" or "critical" labels
2. Recent commits to main (last 24 hours)
3. Open issues with "blocker" label
4. Tell me: Are we ready to deploy, or should we wait?
```

---

## Tips for Writing GitHub Prompts

### Always Specify Repository
Include the full repo path:
```
❌ "Show me recent commits"
✅ "Show me recent commits in myusername/myrepo"
```

### Use Time Ranges
Be specific about timeframes:
```
✅ "commits from the last 7 days"
✅ "PRs merged in the last month"
✅ "issues opened in 2026"
```

### Combine Filters
You can stack multiple filters:
```
✅ "Show me open PRs with label 'bug' created by alice in the last week"
```

### Leverage Code Search
GitHub's code search is powerful:
```
✅ "Search for TODO comments in JavaScript files"
✅ "Find all files importing the 'express' package"
✅ "Show me all functions named 'validateUser'"
```

---

## Troubleshooting

### "Bad Credentials" Error
If GitHub MCP shows authentication error:
1. Check your token in `claude_desktop_config.json`
2. Verify token has correct scopes (repo, read:org, read:user)
3. Test token manually:
   ```bash
   curl -H "Authorization: token ghp_YOUR_TOKEN" https://api.github.com/user
   ```

### Rate Limiting
GitHub API has rate limits (5000/hour for authenticated requests):
- If hit, wait an hour or use a different token
- Check remaining quota:
  ```bash
  curl -H "Authorization: token ghp_YOUR_TOKEN" https://api.github.com/rate_limit
  ```

### Repository Not Found
If Claude can't find your repository:
1. Ensure token has access to the repo (especially for private repos)
2. Check spelling: username/repo-name (case-sensitive!)
3. Verify repo exists: https://github.com/username/repo-name

---

**Next:** [MongoDB Query Prompts](03-mongodb-queries.md)
