# Filesystem MCP Reading Prompts

Copy-pasteable prompts for Filesystem integration demos and exercises.

---

## Basic File Reading

### Prompt 1: Read README
```
Read the README.md file from the sample project directory.
Summarize:
- What is this project?
- What's the tech stack?
- What services are there?
```

### Prompt 2: Read CHANGELOG
```
Read the CHANGELOG.md file from the sample project.
Tell me:
- What's the current version?
- What changed in the latest release?
- Any recent bug fixes?
```

### Prompt 3: Read Configuration
```
Read the config.json file from the sample project.
Show me:
- Which features are enabled?
- Which features are disabled?
- Any relevant configuration for debugging production issues?
```

---

## Directory Exploration

### Prompt 4: List Files
```
List all files in the sample project directory.
Show:
- File names
- File types (extension)
- Approximate file sizes
```

### Prompt 5: Find Specific Files
```
Search the sample project directory for files matching:
- *.md (markdown files)
- *.json (config files)
- *.js (JavaScript files)

List what you find.
```

---

## Content Analysis

### Prompt 6: Architecture Overview
```
Read the README.md file.
Extract and summarize:
- System architecture diagram description
- Microservices and their ports
- Technology stack used
- Database and caching layers
```

### Prompt 7: Current Sprint Goals
```
Read the README.md file and find the "Current Sprint" section.
Tell me:
- Sprint version number
- Sprint start and end dates
- Sprint goals and focus areas
- Any mentioned blockers or risks?
```

### Prompt 8: Recent Changes Summary
```
Read the CHANGELOG.md file.
Summarize changes from the last 3 releases:
- What features were added?
- What bugs were fixed?
- Any breaking changes?
- Any performance improvements?
```

### Prompt 9: Feature Flags Analysis
```
Read the config.json file.
Create a table showing:
- Feature name
- Status (enabled/disabled)
- Whether it's related to current sprint work

Which features are disabled but planned for this sprint?
```

### Prompt 10: Configuration Risks
```
Read the config.json file.
Identify any configuration that might be risky:
- Short timeouts that could cause issues
- High limits that might cause resource problems
- Security settings that might be too permissive
```

---

## Cross-File Analysis

### Prompt 11: Version Consistency Check
```
Check version consistency across files:
1. Read README.md - what version is mentioned?
2. Read CHANGELOG.md - what's the latest version?
3. Read config.json - what version is in the app config?

Do they all match? If not, which one is outdated?
```

### Prompt 12: Feature Implementation Status
```
Based on reading all three files (README, CHANGELOG, config.json):

For "dark mode" feature:
- Is it mentioned in the README as a sprint goal?
- Is it in the CHANGELOG (planned or implemented)?
- Is it enabled in config.json?

What's the implementation status?
```

---

## Integration with Other Data

### Prompt 13: Filesystem + MongoDB Cross-Reference
```
1. Read config.json to see which services are enabled
2. Query MongoDB workshop_demo.production_bugs
3. Cross-reference: Are there bugs for any disabled services?
4. If so, maybe the services were disabled due to bugs?
```

### Prompt 14: Filesystem + Linear Alignment
```
1. Read README.md - get the current sprint goals
2. Query Linear for all issues in the Workshop team
3. Compare: Do the Linear issues align with sprint goals in README?
4. Any mismatch or missing work?
```

### Prompt 15: Documentation + Deployments
```
1. Read CHANGELOG.md - what was fixed in v2.3.1?
2. Query MongoDB workshop_demo.deployments for v2.3.1 deployment
3. Compare: Does the deployment note match the CHANGELOG?
4. When was it deployed vs when was CHANGELOG updated?
```

---

## Workshop Exercises

### Exercise 1: Sprint Readiness Check
**Task:** Verify documentation is up to date

```
Check if documentation is current:
1. Read README.md - current version mentioned?
2. Read CHANGELOG.md - latest version?
3. Read config.json - app version?
4. Query MongoDB deployments - latest deployed version?

Are all these in sync? If not, what needs updating?
```

### Exercise 2: Configuration Audit
**Task:** Find configuration issues

```
Read config.json and identify:
1. Any feature flags that don't match README sprint goals
2. Timeout values that might be too short (<30s)
3. Limits that might be too high or too low
4. Any disabled features that should be enabled

Recommend changes.
```

### Exercise 3: Change Impact Analysis
**Task:** Understand recent changes

```
1. Read CHANGELOG.md for the last 3 releases
2. For each bug fix mentioned:
   - Which service was affected?
   - Search MongoDB for related production_bugs
   - Is the bug resolved or still open?
3. Summary: Are our recent fixes actually working?
```

---

## Advanced Prompts

### Prompt 16: Technology Stack Extraction
```
Read the README.md file.
Extract and create a structured list of:
- Frontend technologies and versions
- Backend technologies and versions
- Databases and versions
- Cloud/infrastructure services
- Monitoring and observability tools

Format as a table.
```

### Prompt 17: Service Dependencies Map
```
Based on the README.md architecture section:
1. List all microservices
2. For each service, identify:
   - What it depends on (DB, Redis, other services)
   - What port it runs on
   - Current known issues (from README)
3. Create a dependency map
```

### Prompt 18: Performance Metrics Review
```
Read the README.md file and find the "Performance Benchmarks" section.
For each metric:
- What's the target?
- What's the current value?
- Is it meeting the target (✅) or warning (⚠️)?

Which metrics need attention?
```

### Prompt 19: Team and Ownership Info
```
Read the README.md file and extract:
- Team members and their roles
- Who owns which service/component?
- Contact information (Slack handles)

Create an on-call reference guide.
```

### Prompt 20: Security Configuration Review
```
Read config.json and review security settings:
- Is CORS enabled? What origins are allowed?
- Is rate limiting enabled? What are the limits?
- JWT expiration time - too long or too short?
- Helmet security headers enabled?

Any security concerns?
```

---

## Tips for Writing Filesystem Prompts

### Specify File Names Clearly
```
❌ "Read the readme"
✅ "Read the README.md file"
```

### Use Relative Paths (MCP is already scoped)
```
✅ "Read README.md"
✅ "Read config.json"
(No need for full paths - filesystem MCP knows the directory)
```

### Ask for Specific Information
```
❌ "Tell me about the config"
✅ "Read config.json and tell me which features are enabled"
```

### Combine Multiple Files
```
✅ "Read README.md and CHANGELOG.md. Do the versions match?"
```

---

## Troubleshooting

### File Not Found
If Claude can't find a file:
```
List all files in the sample project directory.
```
Then use the exact filename shown.

### Permission Denied
If access is denied:
```bash
# Check filesystem MCP path in config
cat ~/Library/Application\ Support/Claude/claude_desktop_config.json | grep filesystem

# Verify path exists and is readable
ls -la /Users/jimisaac/prompt2finetune/mcp/sample-project
```

### Wrong Directory
If Claude is looking in the wrong place:
- Filesystem MCP is scoped to the directory in your config
- Check your `claude_desktop_config.json` has the correct path
- Path must be absolute, not relative

---

## Security Note

**⚠️ Important:** Filesystem MCP is read-only by default, but be careful:
- Only grant access to specific project directories
- Never allow access to sensitive directories (~/.ssh, ~/.aws, etc.)
- Review file permissions before granting access
- Use absolute paths to avoid confusion

---

**Next:** [Notion Integration Prompts](05-notion-docs.md)
