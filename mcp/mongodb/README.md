# MongoDB Setup for MCP Workshop

This directory contains the MongoDB seeding script and setup instructions for the MCP workshop.

## Quick Start

```bash
# 1. Ensure MongoDB is running
mongosh --eval "db.version()"

# 2. Install dependencies
npm install

# 3. Run the seeding script
node seed-mongo.js
```


## MongoDB Installation

### Option A: Docker (Recommended)

Easiest method for quick setup:

```bash
# Pull and run MongoDB 7
docker run -d \
  -p 27017:27017 \
  --name mcp-mongo \
  mongo:7

# Verify it's running
docker ps | grep mcp-mongo

# Stop container when done
docker stop mcp-mongo

# Start container again
docker start mcp-mongo
```

### Option B: Local Installation

#### macOS
```bash
brew tap mongodb/brew
brew install mongodb-community@7.0
brew services start mongodb-community@7.0

# Verify
mongosh --eval "db.version()"
```


#### Windows
1. Download MongoDB Community Server: https://www.mongodb.com/try/download/community
2. Run the installer
3. Select "Complete" installation
4. Install as a Windows Service
5. Verify in PowerShell:
   ```powershell
   mongosh --eval "db.version()"
   ```



```bash
# Connect to MongoDB
mongosh mongodb://localhost:27017/workshop_demo

# In mongosh:
> db.production_bugs.countDocuments()
5

> db.deployments.countDocuments()
4

> db.production_bugs.find({ severity: "critical" }).pretty()
# Should show 2 documents (WRK-2 checkout crash, auth memory leak)

> db.deployments.find({ status: "rollback" }).pretty()
# Should show 1 document (media-service v3.0.0)
```

## Sample Queries

Try these queries during the workshop:

```javascript
// 1. Find all critical bugs
db.production_bugs.find({
  severity: "critical",
  status: "open"
})

// 2. Find untracked bugs (no ticket_id)
db.production_bugs.find({
  ticket_id: null
})

// 3. Find bugs with high error counts
db.production_bugs.find({
  error_count: { $gt: 100 }
}).sort({ error_count: -1 })

// 4. Find recent deployments
db.deployments.find().sort({ deployed_at: -1 }).limit(5)

// 5. Find failed or rolled back deployments
db.deployments.find({
  status: { $in: ["rollback", "failed"] }
})

// 6. Cross-reference: bugs related to recent deployments
db.production_bugs.find({
  service: { $in: ["checkout-service", "media-service"] }
})
```

## Workshop Integration

The MongoDB MCP server allows Claude to query this data using natural language:

**Example prompts:**
```
"Show me all critical production bugs that are currently open"

"Which services have been deployed in the last week?"

"Find all bugs with more than 100 errors and show me which ones
don't have Linear tickets yet"

"Compare the deployment history with the production bugs -
are there any correlations?"
```

Claude will translate these prompts into MongoDB queries and return results!

## Troubleshooting

### Connection refused
```bash
# Check if MongoDB is running
# Docker:
docker ps | grep mcp-mongo

# macOS:
brew services list | grep mongodb

# Ubuntu:
sudo systemctl status mongod

# Windows:
sc query MongoDB
```

### Port already in use
```bash
# Check what's using port 27017
lsof -i :27017

# Kill the process or use a different port in connection string
```

### Authentication errors
If you set up MongoDB with authentication:
```javascript
const uri = "mongodb://username:password@localhost:27017/workshop_demo?authSource=admin";
```

### Reset data
Simply run the seeding script again - it drops existing collections first:
```bash
node seed-mongo.js
```

## Next Steps

After seeding MongoDB:

1. ✅ Verify data with `mongosh`
2. ✅ Configure MongoDB MCP server in Claude Desktop
3. ✅ Test with a simple query: "How many production bugs are there?"
4. ✅ Continue to workshop: [Demo Script](../workshop/demo-script.md)

---

**Questions?** Check the [Troubleshooting Guide](../TROUBLESHOOTING.md)
