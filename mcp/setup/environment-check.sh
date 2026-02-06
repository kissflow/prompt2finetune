#!/bin/bash

# MCP Workshop Environment Check Script
# This script verifies that all prerequisites are installed

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color
BOLD='\033[1m'

# Counters
PASS=0
FAIL=0
WARN=0

# Helper functions
print_header() {
    echo ""
    echo -e "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BOLD}$1${NC}"
    echo -e "${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
    ((PASS++))
}

print_fail() {
    echo -e "${RED}❌ $1${NC}"
    ((FAIL++))
}

print_warn() {
    echo -e "${YELLOW}⚠️  $1${NC}"
    ((WARN++))
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

check_command() {
    if command -v $1 &> /dev/null; then
        return 0
    else
        return 1
    fi
}

# Main checks
print_header "🔍 MCP Workshop Environment Check"

# 1. Check Node.js
print_header "Checking Node.js"
if check_command node; then
    NODE_VERSION=$(node --version)
    NODE_MAJOR=$(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//')

    if [ "$NODE_MAJOR" -ge 18 ]; then
        print_success "Node.js $NODE_VERSION installed"
    else
        print_fail "Node.js $NODE_VERSION found, but v18+ required"
        print_info "Update Node.js: https://nodejs.org"
    fi

    if check_command npm; then
        NPM_VERSION=$(npm --version)
        print_success "npm $NPM_VERSION installed"
    fi
else
    print_fail "Node.js not found"
    print_info "Install Node.js from https://nodejs.org"
    print_info "macOS: brew install node"
    print_info "Ubuntu: curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -"
fi

# 2. Check MongoDB
print_header "Checking MongoDB"
if check_command mongosh; then
    MONGOSH_VERSION=$(mongosh --version | head -n 1)
    print_success "mongosh installed: $MONGOSH_VERSION"

    # Try to connect
    if mongosh mongodb://localhost:27017 --eval "db.version()" --quiet &> /dev/null; then
        MONGO_VERSION=$(mongosh mongodb://localhost:27017 --eval "db.version()" --quiet)
        print_success "MongoDB running (version $MONGO_VERSION)"

        # Check workshop database
        BUGS_COUNT=$(mongosh mongodb://localhost:27017/workshop_demo --eval "db.production_bugs.countDocuments()" --quiet 2>/dev/null)
        if [ "$BUGS_COUNT" = "3" ]; then
            print_success "workshop_demo database seeded ($BUGS_COUNT production bugs: WRK-1, WRK-2, WRK-3)"
        elif [ -n "$BUGS_COUNT" ]; then
            print_warn "workshop_demo has $BUGS_COUNT bugs, expected 3"
            print_info "Re-run: cd mcp/mongodb && node seed-mongo.js"
        else
            print_fail "workshop_demo database not found"
            print_info "Run: cd mcp/mongodb && npm install && node seed-mongo.js"
        fi
    else
        print_fail "MongoDB not running on localhost:27017"
        print_info "Docker: docker start mcp-mongo"
        print_info "macOS: brew services start mongodb-community"
        print_info "Ubuntu: sudo systemctl start mongod"
    fi
else
    print_warn "mongosh not found (optional but recommended)"
    print_info "Install: https://www.mongodb.com/try/download/shell"
fi

# 3. Check Docker (optional)
print_header "Checking Docker (Optional)"
if check_command docker; then
    DOCKER_VERSION=$(docker --version)
    print_success "Docker installed: $DOCKER_VERSION"

    # Check if MongoDB container exists
    if docker ps -a --filter name=mcp-mongo --format "{{.Names}}" | grep -q mcp-mongo; then
        if docker ps --filter name=mcp-mongo --format "{{.Names}}" | grep -q mcp-mongo; then
            print_success "MongoDB Docker container running"
        else
            print_info "MongoDB container exists but not running"
            print_info "Start with: docker start mcp-mongo"
        fi
    else
        print_info "MongoDB Docker container not found"
        print_info "Create with: docker run -d -p 27017:27017 --name mcp-mongo mongo:7"
    fi
else
    print_info "Docker not installed (optional if using local MongoDB)"
    print_info "Install: https://docs.docker.com/get-docker/"
fi

# 4. Check Claude Desktop config
print_header "Checking Claude Desktop Configuration"

# Detect OS and set config path
if [[ "$OSTYPE" == "darwin"* ]]; then
    CONFIG_PATH="$HOME/Library/Application Support/Claude/claude_desktop_config.json"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    CONFIG_PATH="$HOME/.config/Claude/claude_desktop_config.json"
elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
    CONFIG_PATH="$APPDATA/Claude/claude_desktop_config.json"
else
    CONFIG_PATH="$HOME/.config/Claude/claude_desktop_config.json"
fi

if [ -f "$CONFIG_PATH" ]; then
    print_success "Claude Desktop config file found"

    # Check if jq is available for JSON parsing
    if check_command jq; then
        # Validate JSON
        if jq . "$CONFIG_PATH" &> /dev/null; then
            print_success "Config file is valid JSON"

            # Check for MCP servers
            MCP_SERVERS=$(jq -r '.mcpServers | keys[]' "$CONFIG_PATH" 2>/dev/null)
            if [ -n "$MCP_SERVERS" ]; then
                SERVER_COUNT=$(echo "$MCP_SERVERS" | wc -l | tr -d ' ')
                print_success "$SERVER_COUNT MCP server(s) configured:"
                echo "$MCP_SERVERS" | while read server; do
                    echo "     - $server"
                done

                # Check for all 5 required servers
                REQUIRED_SERVERS=("linear" "github" "mongodb" "filesystem" "notion")
                for server in "${REQUIRED_SERVERS[@]}"; do
                    if echo "$MCP_SERVERS" | grep -q "^$server$"; then
                        : # Server found, do nothing
                    else
                        print_warn "Missing MCP server: $server"
                    fi
                done
            else
                print_warn "No MCP servers configured"
                print_info "See setup/claude-desktop-config.json for template"
            fi
        else
            print_fail "Config file has invalid JSON syntax"
            print_info "Validate with: jq . '$CONFIG_PATH'"
        fi
    else
        print_info "jq not installed (optional) - skipping JSON validation"
        print_info "Install jq: brew install jq (macOS) or apt install jq (Ubuntu)"
    fi
else
    print_fail "Claude Desktop config not found"
    print_info "Expected at: $CONFIG_PATH"
    print_info "Install Claude Desktop: https://claude.ai/download"
fi

# 5. Check GitHub CLI (optional)
print_header "Checking GitHub CLI (Optional)"
if check_command gh; then
    GH_VERSION=$(gh --version | head -n 1)
    print_success "$GH_VERSION installed"

    if gh auth status &> /dev/null; then
        print_success "GitHub CLI authenticated"
    else
        print_info "GitHub CLI not authenticated (optional)"
        print_info "Authenticate with: gh auth login"
    fi
else
    print_info "GitHub CLI not installed (optional)"
    print_info "Install: https://cli.github.com"
fi

# Print summary
echo ""
print_header "📊 SUMMARY"
echo ""

TOTAL=$((PASS + FAIL + WARN))
echo -e "${GREEN}✅ Passed: $PASS${NC}"
echo -e "${RED}❌ Failed: $FAIL${NC}"
echo -e "${YELLOW}⚠️  Warnings: $WARN${NC}"
echo ""

if [ $FAIL -eq 0 ] && [ $WARN -eq 0 ]; then
    echo -e "${GREEN}${BOLD}🎉 All checks passed! You're ready for the workshop.${NC}"
elif [ $FAIL -eq 0 ]; then
    echo -e "${YELLOW}${BOLD}⚠️  $WARN warning(s) - review and fix if needed${NC}"
    print_info "You can proceed, but some features may not work"
else
    echo -e "${RED}${BOLD}❌ $FAIL error(s) found - please fix before proceeding${NC}"
fi

echo ""
echo -e "${BLUE}Next steps:${NC}"
if [ $FAIL -gt 0 ]; then
    echo "  1. Fix the errors listed above"
    echo "  2. Run this script again to verify"
    echo "  3. Open Claude Desktop and check MCP servers (🔌 icon)"
else
    echo "  1. Open Claude Desktop"
    echo "  2. Check that MCP servers show as connected (🔌 icon)"
    echo "  3. Start the workshop: workshop/demo-script.md"
fi

echo ""
print_header "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Exit with appropriate code
if [ $FAIL -gt 0 ]; then
    exit 1
else
    exit 0
fi
