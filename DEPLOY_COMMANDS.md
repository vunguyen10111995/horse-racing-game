# Deployment Commands Reference

## 📋 All Commands You Need

---

## 🎯 Initial Setup

### 1. Update Vite Config

```bash
# Edit vite.config.js
# Change line 8: base: "/YOUR-REPO-NAME/"
```

### 2. Initialize Git (if needed)

```bash
git init
git add .
git commit -m "Initial commit - Horse Racing PWA"
```

### 3. Connect to GitHub

```bash
# Replace with your repository URL
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Verify remote
git remote -v

# Push to GitHub
git push -u origin main
```

---

## 🔄 Regular Updates

### Push Changes

```bash
# Check status
git status

# Add all changes
git add .

# Commit with message
git commit -m "Your update message"

# Push to GitHub (triggers auto-deploy)
git push origin main
```

### Quick Update (one-liner)

```bash
git add . && git commit -m "Update" && git push origin main
```

---

## 🧪 Testing Commands

### Local Development

```bash
# Start dev server
npm run dev

# Open http://localhost:5173
```

### Build & Preview

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Open http://localhost:4173
```

### Run Tests

```bash
# Unit tests
npm run test:unit

# Unit tests (watch mode)
npm run test:unit -- --watch

# E2E tests
npm run test:e2e

# E2E tests (UI mode)
npm run test:e2e:ui
```

### Linting

```bash
# Run linter
npm run lint

# Fix linting issues
npm run lint -- --fix
```

---

## 🔍 Git Commands

### Check Status

```bash
# See what changed
git status

# See commit history
git log --oneline

# See remote URL
git remote -v
```

### Branches

```bash
# Create new branch
git checkout -b feature-name

# Switch branch
git checkout main

# List branches
git branch -a

# Delete branch
git branch -d feature-name
```

### Undo Changes

```bash
# Discard local changes
git checkout -- .

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1
```

---

## 🚀 GitHub Actions Commands

### Trigger Manual Deployment

1. Go to **Actions** tab on GitHub
2. Click **Deploy to GitHub Pages**
3. Click **Run workflow**
4. Select branch: `main`
5. Click **Run workflow**

### View Deployment Logs

1. Go to **Actions** tab
2. Click on latest workflow run
3. Click on job (build/deploy)
4. View detailed logs

---

## 📦 Build Commands

### Standard Build

```bash
npm run build
```

### Production Build

```bash
NODE_ENV=production npm run build
```

### Build with Analysis

```bash
npm run build -- --mode production
```

### Clean Build

```bash
# Remove old build
rm -rf dist

# Build fresh
npm run build
```

---

## 🔧 Configuration Commands

### Update Dependencies

```bash
# Check for updates
npm outdated

# Update all dependencies
npm update

# Update specific package
npm update package-name
```

### Install Dependencies

```bash
# Install all dependencies
npm install

# Install specific package
npm install package-name

# Install dev dependency
npm install --save-dev package-name
```

### Clean Install

```bash
# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Fresh install
npm install
```

---

## 🌐 Deployment URLs

### Local Development

```
http://localhost:5173
```

### Local Preview

```
http://localhost:4173
```

### GitHub Pages (after deployment)

```
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

---

## 📊 Useful Git Commands

### View Changes

```bash
# See what changed in files
git diff

# See staged changes
git diff --staged

# See changes for specific file
git diff filename
```

### Stash Changes

```bash
# Save changes temporarily
git stash

# List stashes
git stash list

# Apply last stash
git stash pop

# Apply specific stash
git stash apply stash@{0}
```

### Tags

```bash
# Create tag
git tag v1.0.0

# Push tag
git push origin v1.0.0

# List tags
git tag -l
```

---

## 🔄 Update Service Worker

### Increment Cache Version

```javascript
// Edit public/service-worker.js
const CACHE_NAME = "horse-racing-v2"; // Increment version
```

### Deploy Update

```bash
git add public/service-worker.js
git commit -m "Update Service Worker cache version"
git push origin main
```

---

## 🎨 Add Icons

### Create Icons Directory

```bash
mkdir -p public/icons
```

### Add Icons

```bash
# Copy your icons to public/icons/
cp /path/to/icon-192x192.png public/icons/
cp /path/to/icon-512x512.png public/icons/
# ... add all required sizes
```

### Commit Icons

```bash
git add public/icons/
git commit -m "Add PWA icons"
git push origin main
```

---

## 🐛 Troubleshooting Commands

### Check Node Version

```bash
node --version
# Should be v18+ or v20+
```

### Check NPM Version

```bash
npm --version
```

### Clear NPM Cache

```bash
npm cache clean --force
```

### Reinstall Dependencies

```bash
rm -rf node_modules package-lock.json
npm install
```

### Check Build Output

```bash
# Build and check dist folder
npm run build
ls -la dist/
```

---

## 📱 Test on Mobile

### Using ngrok (expose localhost)

```bash
# Install ngrok
npm install -g ngrok

# Start dev server
npm run dev

# In another terminal, expose port
ngrok http 5173

# Use provided URL on mobile device
```

---

## 🔐 Environment Variables

### Set Environment Variable

```bash
# Linux/Mac
export NODE_ENV=production

# Windows (PowerShell)
$env:NODE_ENV="production"

# Windows (CMD)
set NODE_ENV=production
```

---

## 📚 Quick Reference

### Complete Deployment Flow

```bash
# 1. Update vite.config.js (change base path)

# 2. Build and test locally
npm run build
npm run preview

# 3. Commit and push
git add .
git commit -m "Ready for deployment"
git push origin main

# 4. Check GitHub Actions
# Go to Actions tab on GitHub

# 5. Visit your site
# https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

---

## 🎯 Most Used Commands

```bash
# Development
npm run dev

# Build
npm run build

# Preview
npm run preview

# Test
npm run test:unit

# Lint
npm run lint

# Git push
git add . && git commit -m "Update" && git push origin main
```

---

## 🆘 Emergency Commands

### Revert to Previous Commit

```bash
# Find commit hash
git log --oneline

# Revert to specific commit
git revert COMMIT_HASH

# Push revert
git push origin main
```

### Force Push (use with caution!)

```bash
# Only if you're sure!
git push origin main --force
```

### Reset to Remote

```bash
# Discard all local changes
git fetch origin
git reset --hard origin/main
```

---

## 🎉 Success Commands

### Check Deployment Status

```bash
# View git log
git log --oneline -5

# Check remote
git remote -v

# Check branch
git branch -a
```

### Share Your Site

```bash
# Your site URL
echo "https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/"
```

---

## 📖 Help Commands

```bash
# Git help
git --help

# NPM help
npm --help

# Specific command help
git push --help
npm run --help
```

---

## 🎊 You're All Set!

Use these commands to deploy and manage your Horse Racing PWA! 🏇✨

For detailed explanations, see `DEPLOYMENT_GUIDE.md`
