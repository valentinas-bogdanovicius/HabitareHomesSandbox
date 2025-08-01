require('dotenv').config({ path: './config.env' });
const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 8000; // Always use port 8000
const CHECK_INTERVAL = 30000; // Check every 30 seconds

// GitHub credentials from environment variables
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GIT_REPO_URL = process.env.GIT_REPO_URL;

// Variable to store the detected repository URL
let detectedRepoUrl = null;
let lastUpdateTime = new Date();

// Function to create authenticated git URL
function getAuthenticatedGitUrl(originalUrl) {
    if (GITHUB_USERNAME && GITHUB_TOKEN && originalUrl.includes('github.com')) {
        // Convert https://github.com/user/repo.git to https://username:token@github.com/user/repo.git
        return originalUrl.replace('https://github.com/', `https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/`);
    }
    return originalUrl;
}

// Function to detect repository URL
function detectRepositoryUrl() {
    return new Promise((resolve, reject) => {
        if (GIT_REPO_URL) {
            console.log('Using repository URL from environment variable:', GIT_REPO_URL);
            resolve(GIT_REPO_URL);
            return;
        }
        
        exec('git remote get-url origin', (error, stdout, stderr) => {
            if (error) {
                console.error('Failed to detect repository URL:', error.message);
                reject(error);
                return;
            }
            
            const repoUrl = stdout.trim();
            console.log('Detected repository URL:', repoUrl);
            resolve(repoUrl);
        });
    });
}

// Function to execute git commands with authentication
function execGitCommand(command, callback) {
    console.log(`Executing: ${command.replace(GITHUB_TOKEN || '', '***')}`); // Hide token in logs
    exec(command, callback);
}

// Disable caching for all responses to always show latest changes
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    next();
});

// Serve static files
app.use(express.static(__dirname));

// Serve index.htm as the default page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.htm'));
});

// API endpoint to manually trigger update
app.post('/api/update', (req, res) => {
    console.log('Manual update triggered...');
    checkAndUpdate().then(updated => {
        res.json({ updated, message: updated ? 'Updated successfully' : 'Already up to date' });
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});

// API endpoint to check update status
app.get('/api/status', (req, res) => {
    exec('git rev-list HEAD...origin/main --count', (error, stdout) => {
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        const behindCount = parseInt(stdout.trim());
        res.json({ 
            behindCount,
            upToDate: behindCount === 0,
            serverRunning: true 
        });
    });
});

async function checkAndUpdate() {
    return new Promise(async (resolve, reject) => {
        try {
            // Ensure we have the repository URL
            if (!detectedRepoUrl) {
                detectedRepoUrl = await detectRepositoryUrl();
            }
            
            // Get the authenticated URL for fetch and pull operations
            const fetchCommand = GITHUB_USERNAME && GITHUB_TOKEN 
                ? `git fetch ${getAuthenticatedGitUrl(detectedRepoUrl)} main:refs/remotes/origin/main`
                : 'git fetch origin main';
            
            // Fetch latest changes
            execGitCommand(fetchCommand, (error) => {
                if (error) {
                    console.error('Git fetch failed:', error.message);
                    reject(error);
                    return;
                }

                // Check if we're behind
                exec('git rev-list HEAD...origin/main --count', (error, stdout) => {
                    if (error) {
                        console.error('Git check failed:', error.message);
                        reject(error);
                        return;
                    }

                    const behindCount = parseInt(stdout.trim());
                    
                    if (behindCount > 0) {
                        console.log(`Found ${behindCount} new commits. Updating...`);
                        
                        // Pull latest changes with authentication
                        const pullCommand = GITHUB_USERNAME && GITHUB_TOKEN 
                            ? `git pull ${getAuthenticatedGitUrl(detectedRepoUrl)} main`
                            : 'git pull origin main';
                        
                        execGitCommand(pullCommand, (error, stdout, stderr) => {
                            if (error) {
                                console.error('Git pull failed:', error.message);
                                reject(error);
                                return;
                            }
                            
                                                    console.log('Repository updated successfully!');
                        console.log(stdout);
                        lastUpdateTime = new Date();
                        resolve(true);
                        });
                    } else {
                        console.log('Repository is up to date.');
                        resolve(false);
                    }
                });
            });
        } catch (error) {
            console.error('Failed to detect repository URL:', error.message);
            reject(error);
        }
    });
}

// Auto-check for updates every 30 seconds
setInterval(async () => {
    try {
        await checkAndUpdate();
    } catch (error) {
        console.error('Auto-update check failed:', error.message);
    }
}, CHECK_INTERVAL);

app.listen(PORT, async () => {
    console.log(`🚀 Habitare Homes server running on http://localhost:8000`);
    console.log(`📡 Auto-checking for git updates every ${CHECK_INTERVAL/1000} seconds`);
    console.log('💡 Manual update: POST to /api/update');
    console.log('📊 Status check: GET /api/status');
    
    // Detect repository URL at startup
    try {
        detectedRepoUrl = await detectRepositoryUrl();
        console.log(`🔗 Repository: ${detectedRepoUrl}`);
        
        // Show authentication status
        if (GITHUB_USERNAME && GITHUB_TOKEN) {
            console.log(`🔐 Authentication: Configured for user '${GITHUB_USERNAME}'`);
        } else {
            console.log('⚠️  Authentication: Using system git credentials (may prompt for login)');
        }
    } catch (error) {
        console.error('⚠️  Could not detect repository URL:', error.message);
    }
    
    // Initial update check
    checkAndUpdate().catch(err => {
        console.error('Initial update check failed:', err.message);
    });
    
    console.log('🟢 Ready! Auto-updates enabled - no browser refresh, no popups!');
});