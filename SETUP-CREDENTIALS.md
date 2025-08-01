# Setup GitHub Credentials for Auto-Update

## Step 1: Create a GitHub Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Fill in:
   - **Note**: "Habitare Homes Auto-Update"
   - **Expiration**: Choose your preference (1 year recommended)
   - **Scopes**: Check **"repo"** (full repository access)
4. Click **"Generate token"**
5. **Copy the token immediately** (you won't see it again!)

## Step 2: Update config.env File

1. Open `config.env` file
2. Replace the placeholder values:
   ```
   GITHUB_USERNAME=your-actual-github-username
   GITHUB_TOKEN=ghp_your-actual-personal-access-token
   ```
3. **Repository URL is auto-detected** - no need to set GIT_REPO_URL unless you want to override

## Step 3: Restart the Server

1. Stop the current server (Ctrl+C)
2. Run: `node server.js` or use `launch-node.bat`

## How It Works

- **Auto-Detection**: Server automatically detects your repository URL using `git remote get-url origin`
- **Environment Override**: You can set `GIT_REPO_URL` in config.env to override auto-detection
- **Authentication**: Uses your GitHub token for all git operations (no more popups!)

## Server Startup Messages

When you start the server, you'll see:
```
🚀 Habitare Homes server running on http://localhost:8080
🔗 Repository: https://github.com/Metasiteorg/HabitareHomes.git
🔐 Authentication: Configured for user 'your-username'
```

## Security Note

- The `config.env` file contains sensitive credentials
- Never commit this file to git (it's in .gitignore)
- Keep your personal access token secure