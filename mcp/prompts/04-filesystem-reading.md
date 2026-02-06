# Filesystem MCP Reading Prompts

Copy-pasteable prompts for Filesystem integration demos and exercises.

---

## Basic File Reading

### Prompt 1: Read Workshop Code Overview
```
Read the file mcp/workshop-code/README.md
Summarize:
- What are the 3 bug stories?
- Which commits are involved?
- What's the status of each bug?
```

### Prompt 2: Read Checkout Service Code
```
Read the file mcp/workshop-code/checkout-service/checkout.js

What bug was introduced and on which line?
How was it fixed?
```

---

## Code Analysis

### Prompt 1: Analyze Memory Leak Code
```
Read mcp/workshop-code/auth-service/session-manager.js

1. What's causing the memory leak?
2. Where is the problematic code (line numbers)?
3. What's the attempted fix?
4. Is the fix complete?
```

### Prompt 2: Analyze CDN Issues
```
Read mcp/workshop-code/media-service/cdn-handler.js

1. What CDN change was made (which commit)?
2. Why did it cause 503 errors?
3. What retry logic was added?
4. Does the retry solve the root problem?
```

---

## Integration with Other Data

### Prompt 1: Code + MongoDB Cross-Reference
```
1. Read mcp/workshop-code/checkout-service/checkout.js
2. Query MongoDB workshop_demo.production_bugs for ticket_id "WRK-1"
3. Compare: Does the MongoDB error message match the code bug?
4. What line in the code caused the error?
```

### Prompt 2: Code + GitHub + Linear
```
For the auth memory leak (WRK-3):
1. Read mcp/workshop-code/auth-service/session-manager.js
2. Search GitHub kissflow/prompt2finetune for commits mentioning "WRK-3"
3. Check Linear for issue WRK-3 status
4. Is the fix deployed yet?
```

---

## Workshop Exercises

### Exercise 1: Bug Investigation
**Task:** Investigate all 3 bugs using code files

```
For each bug (WRK-1, WRK-2, WRK-3):
1. Read the related code file
2. Identify the problematic code
3. Check if there's a fix in the code comments
4. Cross-reference with MongoDB to see error counts
```

### Exercise 2: Code Review
**Task:** Review the attempted fixes

```
1. Read all 3 code files in mcp/workshop-code/
2. For each attempted fix:
   - Is the fix properly implemented?
   - Are there still vulnerabilities?
   - What else should be fixed?
3. Recommend next steps for each service
```

---

## Tips

**Specify Full File Paths:**
```
✅ "Read mcp/workshop-code/checkout-service/checkout.js"
❌ "Read checkout.js"
```

**Ask for Specific Code Sections:**
```
✅ "What's on line 127 of checkout.js?"
✅ "Find the processCart function"
```

---

**Next:** [Notion Integration Prompts](05-notion-docs.md)
