#!/usr/bin/env node

/**
 * MCP Workshop Installation Verification Script
 *
 * This script verifies that all prerequisites are installed and configured
 * correctly for the MCP workshop.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

const CHECK = '✅';
const CROSS = '❌';
const WARNING = '⚠️';
const INFO = 'ℹ️';

let failCount = 0;
let warnCount = 0;

// Helper functions
function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function success(message) {
  log(`${CHECK} ${message}`, colors.green);
}

function fail(message) {
  log(`${CROSS} ${message}`, colors.red);
  failCount++;
}

function warn(message) {
  log(`${WARNING} ${message}`, colors.yellow);
  warnCount++;
}

function info(message) {
  log(`${INFO} ${message}`, colors.cyan);
}

function header(message) {
  console.log('');
  log('━'.repeat(60), colors.bright);
  log(message, colors.bright);
  log('━'.repeat(60), colors.bright);
}

function exec(command) {
  try {
    return execSync(command, { encoding: 'utf-8', stdio: 'pipe' }).trim();
  } catch (error) {
    return null;
  }
}

// Check functions
function checkNodeVersion() {
  header('🔍 Checking Node.js');

  const version = exec('node --version');
  if (!version) {
    fail('Node.js not found');
    info('Install Node.js from https://nodejs.org');
    return false;
  }

  const major = parseInt(version.slice(1).split('.')[0]);
  if (major < 18) {
    fail(`Node.js ${version} found, but v18+ required`);
    info('Update Node.js to version 18 or later');
    return false;
  }

  success(`Node.js ${version} installed`);

  const npmVersion = exec('npm --version');
  if (npmVersion) {
    success(`npm ${npmVersion} installed`);
  }

  return true;
}

function checkMongoDB() {
  header('🔍 Checking MongoDB');

  // Try to connect using mongosh
  const version = exec('mongosh --version');
  if (!version) {
    warn('mongosh not found - MongoDB shell not installed');
    info('This is optional but recommended for debugging');
    return true;
  }

  success(`mongosh installed: ${version.split('\n')[0]}`);

  // Try to connect
  const result = exec('mongosh mongodb://localhost:27017 --eval "db.version()" --quiet');
  if (!result) {
    fail('MongoDB not running on localhost:27017');
    info('Start MongoDB:');
    info('  Docker: docker start mcp-mongo');
    info('  macOS: brew services start mongodb-community');
    info('  Ubuntu: sudo systemctl start mongod');
    return false;
  }

  success(`MongoDB running (version ${result})`);

  // Check workshop database
  const dbCheck = exec('mongosh mongodb://localhost:27017/workshop_demo --eval "db.production_bugs.countDocuments()" --quiet');
  if (dbCheck) {
    const count = parseInt(dbCheck);
    if (count === 5) {
      success(`workshop_demo database seeded (${count} production bugs)`);
    } else {
      warn(`workshop_demo has ${count} bugs, expected 5`);
      info('Re-run seeding: cd mongodb && node seed-mongo.js');
    }

    const deployCount = exec('mongosh mongodb://localhost:27017/workshop_demo --eval "db.deployments.countDocuments()" --quiet');
    if (deployCount && parseInt(deployCount) === 4) {
      success(`Deployments collection seeded (${deployCount} documents)`);
    }
  } else {
    fail('workshop_demo database not found');
    info('Run seeding script: cd mongodb && node seed-mongo.js');
  }

  return true;
}

function checkSampleProjectFiles() {
  header('🔍 Checking Sample Project Files');

  const projectDir = path.join(__dirname, '..', 'sample-project');
  const requiredFiles = ['README.md', 'CHANGELOG.md', 'config.json'];

  let allFound = true;
  for (const file of requiredFiles) {
    const filePath = path.join(projectDir, file);
    if (fs.existsSync(filePath)) {
      success(`Found ${file}`);
    } else {
      fail(`Missing ${file}`);
      allFound = false;
    }
  }

  return allFound;
}

function checkClaudeDesktopConfig() {
  header('🔍 Checking Claude Desktop Configuration');

  // Determine config path based on OS
  let configPath;
  const platform = os.platform();

  if (platform === 'darwin') {
    configPath = path.join(os.homedir(), 'Library', 'Application Support', 'Claude', 'claude_desktop_config.json');
  } else if (platform === 'win32') {
    configPath = path.join(process.env.APPDATA, 'Claude', 'claude_desktop_config.json');
  } else {
    configPath = path.join(os.homedir(), '.config', 'Claude', 'claude_desktop_config.json');
  }

  if (!fs.existsSync(configPath)) {
    fail('Claude Desktop config file not found');
    info(`Expected at: ${configPath}`);
    info('Install Claude Desktop from https://claude.ai/download');
    return false;
  }

  success('Claude Desktop config file found');

  // Try to parse config
  try {
    const configContent = fs.readFileSync(configPath, 'utf-8');
    const config = JSON.parse(configContent);

    if (!config.mcpServers) {
      warn('No MCP servers configured in Claude Desktop');
      info('Add MCP server configuration to claude_desktop_config.json');
      return false;
    }

    const servers = Object.keys(config.mcpServers);
    success(`${servers.length} MCP server(s) configured: ${servers.join(', ')}`);

    const expectedServers = ['linear', 'github', 'mongodb', 'filesystem', 'notion'];
    const missing = expectedServers.filter(s => !servers.includes(s));

    if (missing.length > 0) {
      warn(`Missing MCP servers: ${missing.join(', ')}`);
      info('See setup/claude-desktop-config.json for configuration template');
    } else {
      success('All 5 workshop MCP servers configured!');
    }

    // Check GitHub token
    if (config.mcpServers.github && config.mcpServers.github.env) {
      const token = config.mcpServers.github.env.GITHUB_PERSONAL_ACCESS_TOKEN;
      if (!token || token.includes('YOUR_TOKEN')) {
        warn('GitHub token not configured');
        info('Add your GitHub personal access token to the config');
      } else {
        success('GitHub token configured');
      }
    }

    return true;
  } catch (error) {
    fail(`Error parsing config: ${error.message}`);
    info('Check JSON syntax in claude_desktop_config.json');
    return false;
  }
}

function checkGitHubCLI() {
  header('🔍 Checking GitHub CLI (Optional)');

  const ghVersion = exec('gh --version');
  if (!ghVersion) {
    info('GitHub CLI (gh) not installed');
    info('This is optional - MCP will work without it');
    info('Install: https://cli.github.com');
    return true;
  }

  success(`GitHub CLI installed: ${ghVersion.split('\n')[0]}`);

  const authStatus = exec('gh auth status 2>&1');
  if (authStatus && authStatus.includes('Logged in')) {
    success('GitHub CLI authenticated');
  } else {
    info('GitHub CLI not authenticated (optional)');
    info('Authenticate with: gh auth login');
  }

  return true;
}

function checkDocker() {
  header('🔍 Checking Docker (Optional)');

  const dockerVersion = exec('docker --version');
  if (!dockerVersion) {
    info('Docker not installed');
    info('This is optional if you\'re using local MongoDB');
    info('Install: https://docs.docker.com/get-docker/');
    return true;
  }

  success(`Docker installed: ${dockerVersion}`);

  // Check if MongoDB container is running
  const mongoContainer = exec('docker ps --filter name=mcp-mongo --format "{{.Names}}"');
  if (mongoContainer && mongoContainer.includes('mcp-mongo')) {
    success('MongoDB Docker container running');
  } else {
    info('MongoDB Docker container not running');
    info('Start with: docker start mcp-mongo');
  }

  return true;
}

function printSummary() {
  console.log('');
  log('━'.repeat(60), colors.bright);
  log('📊 VERIFICATION SUMMARY', colors.bright);
  log('━'.repeat(60), colors.bright);
  console.log('');

  if (failCount === 0 && warnCount === 0) {
    success('🎉 All checks passed! You\'re ready for the workshop.');
  } else if (failCount === 0) {
    warn(`⚠️  ${warnCount} warning(s) - review and fix if needed`);
    info('You can proceed, but some features may not work');
  } else {
    fail(`❌ ${failCount} error(s) and ${warnCount} warning(s)`);
    info('Fix the errors above before starting the workshop');
  }

  console.log('');
  log('Next steps:', colors.cyan);

  if (failCount > 0) {
    console.log('  1. Fix the errors listed above');
    console.log('  2. Run this script again to verify');
  } else {
    console.log('  1. Open Claude Desktop');
    console.log('  2. Check that MCP servers show as connected (🔌 icon)');
    console.log('  3. Start the workshop: workshop/demo-script.md');
  }

  console.log('');
  log('━'.repeat(60), colors.bright);
}

// Main execution
async function main() {
  log('🔍 MCP Workshop Setup Verification', colors.bright);
  log('━'.repeat(60), colors.bright);
  console.log('');

  checkNodeVersion();
  checkMongoDB();
  checkSampleProjectFiles();
  checkClaudeDesktopConfig();
  checkGitHubCLI();
  checkDocker();

  printSummary();

  process.exit(failCount > 0 ? 1 : 0);
}

main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
