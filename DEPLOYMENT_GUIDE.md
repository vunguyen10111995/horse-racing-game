# Deployment Guide - GitHub Pages

## 🚀 Complete Guide to Deploy Your Horse Racing Game

This guide will help you deploy your PWA to GitHub Pages with automatic CI/CD.

---

## 📋 Prerequisites

- ✅ GitHub account
- ✅ Git installed locally
- ✅ Your code ready to deploy

---

## 🎯 Quick Start (3 Steps)

### Step 1: Update Repository Name

Edit `vite.config.js` and change the repository name:

```javascript
base: process.env.NODE_ENV === "production" ? "/YOUR-REPO-NAME/" : "/",
```

Replace `YOUR-REPO-NAME` with your actual GitHub repository name.

### Step 2: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Horse Racing PWA"

# Add remote (replace with your repository URL)
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Push to main branch
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Done! Your site will deploy automatically

---

## 📝 Detailed Setup Instructions

### 1. Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click **New repository**
3. Name it (e.g., `horse-racing-game`)
4. Choose **Public** or **Private**
5. **Don't** initialize with README (you already have one)
6. Click **Create repository**

### 2. Configure Vite for GitHub Pages

The `vite.config.js` has been updated with:

```javascript
base: process.env.NODE_ENV === "production" ? "/horse-racing-game/" : "/",
```

**Important:** Change `horse-racing-game` to match your repository name!

### 3. Initialize Git (if needed)

```bash
# Check if git is initialized
git status

# If not initialized, run:
git init
git add .
git commit -m "Initial commit"
```

### 4. Connect to GitHub

```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Verify remote
git remote -v

# Push to GitHub
git push -u origin main
```

### 5. Enable GitHub Pages

1. Go to your repository: `https://github.com/YOUR-USERNAME/YOUR-REPO-NAME`
2. Click **Settings** tab
3. Click **Pages** in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. Save

### 6. Wait for Deployment

1. Go to **Actions** tab
2. You'll see the workflow running
3. Wait for it to complete (usually 2-3 minutes)
4. Your site will be live at: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

---

## 🔧 CI/CD Workflow Explained

The `.github/workflows/deploy.yml` file automates:

### Build Job:

1. ✅ Checkout code
2. ✅ Setup Node.js 20
3. ✅ Install dependencies
4. ✅ Run linter
5. ✅ Run unit tests (63 tests)
6. ✅ Build project
7. ✅ Upload build artifacts

### Deploy Job:

1. ✅ Deploy to GitHub Pages
2. ✅ Make site live

### Triggers:

- **Automatic:** Every push to `main` branch
- **Manual:** Click "Run workflow" in Actions tab

---

## 📊 What Gets Deployed

### Included:

- ✅ All built assets (JS, CSS)
- ✅ Service Worker
- ✅ PWA Manifest
- ✅ Icons (when you add them)
- ✅ All game functionality

### Optimized:

- ✅ Minified JavaScript
- ✅ Minified CSS
- ✅ Optimized assets
- ✅ Tree-shaken code

---

## 🧪 Testing Before Deployment

### Local Testing:

```bash
# Build the project
npm run build

# Preview the build
npm run preview

# Open http://localhost:4173
```

### Test Production Build:

```bash
# Set NODE_ENV to production
NODE_ENV=production npm run build
npm run preview
```

---

## 🔄 Updating Your Site

### Automatic Deployment:

Every time you push to `main`, the site updates automatically!

```bash
# Make changes to your code
# ...

# Commit and push
git add .
git commit -m "Update game features"
git push origin main

# GitHub Actions will automatically deploy!
```

### Manual Deployment:

1. Go to **Actions** tab
2. Click **Deploy to GitHub Pages**
3. Click **Run workflow**
4. Select branch
5. Click **Run workflow**

---

## 🌐 Custom Domain (Optional)

### Using Custom Domain:

1. Buy a domain (e.g., `horseracing.com`)
2. Go to **Settings** → **Pages**
3. Enter your domain in **Custom domain**
4. Add DNS records at your domain provider:

```
Type: CNAME
Name: www
Value: YOUR-USERNAME.github.io
```

5. Wait for DNS propagation (up to 24 hours)
6. Enable **Enforce HTTPS**

---

## 🎨 Adding Icons

Before deployment, add your PWA icons to `public/icons/`:

```bash
# Create icons directory
mkdir -p public/icons

# Add your icons (required sizes)
# - icon-192x192.png
# - icon-512x512.png
# - icon-16x16.png
# - icon-32x32.png
# ... (see PWA_SETUP.md for all sizes)
```

**Quick solution:** Use [PWA Icon Generator](https://www.pwabuilder.com/imageGenerator)

---

## 🐛 Troubleshooting

### Issue: 404 Error After Deployment

**Solution:** Check `vite.config.js` base path matches your repository name:

```javascript
base: "/YOUR-REPO-NAME/"; // Must match exactly!
```

### Issue: Service Worker Not Working

**Solution:** GitHub Pages uses HTTPS by default, so Service Worker should work.
If not, check browser console for errors.

### Issue: Workflow Fails

**Solution:** Check Actions tab for error details. Common issues:

- Linting errors → Run `npm run lint` locally
- Test failures → Run `npm run test:unit` locally
- Build errors → Run `npm run build` locally

### Issue: Assets Not Loading

**Solution:** Ensure all asset paths are relative:

- ✅ `/assets/image.png` (correct)
- ❌ `C:/Users/...` (wrong)

---

## 📈 Monitoring Deployment

### Check Deployment Status:

1. Go to **Actions** tab
2. Click on latest workflow run
3. See detailed logs for each step

### View Deployment History:

1. Go to **Settings** → **Pages**
2. See all deployments
3. Each deployment has a unique URL

---

## 🎯 Post-Deployment Checklist

### After First Deployment:

- [ ] Visit your site: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`
- [ ] Test all game features
- [ ] Test offline mode (DevTools → Network → Offline)
- [ ] Test PWA installation
- [ ] Check Service Worker (DevTools → Application)
- [ ] Test on mobile devices
- [ ] Share with friends! 🎉

---

## 📱 Testing on Mobile

### iOS (Safari):

1. Open site on iPhone/iPad
2. Tap Share button
3. Select "Add to Home Screen"
4. Open from home screen
5. Should work in full-screen mode!

### Android (Chrome):

1. Open site on Android
2. Tap menu (⋮)
3. Select "Add to Home Screen"
4. Open from home screen
5. Should work like native app!

---

## 🔐 Security

### HTTPS:

- ✅ GitHub Pages provides HTTPS automatically
- ✅ Service Worker requires HTTPS (except localhost)
- ✅ PWA features work on HTTPS

### Environment Variables:

If you need secrets (API keys, etc.):

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add your secrets
4. Use in workflow: `${{ secrets.YOUR_SECRET }}`

---

## 💰 Cost

### GitHub Pages:

- ✅ **FREE** for public repositories
- ✅ **FREE** for private repositories (with limits)
- ✅ **100 GB bandwidth/month**
- ✅ **100 GB storage**

### Limits:

- Source repository: 1 GB max
- Published site: 1 GB max
- 10 builds per hour

---

## 🚀 Performance Tips

### Optimize Build:

```bash
# Analyze bundle size
npm run build -- --mode production

# Check dist folder size
du -sh dist/
```

### Enable Compression:

GitHub Pages automatically serves gzip/brotli compressed files!

### Cache Strategy:

Service Worker handles caching automatically for offline support.

---

## 📊 Analytics (Optional)

### Add Google Analytics:

1. Get tracking ID from Google Analytics
2. Add to `index.html`:

```html
<!-- Google Analytics -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "GA_TRACKING_ID");
</script>
```

---

## 🎉 Success!

Your Horse Racing Game is now deployed to GitHub Pages!

### Your Site URL:

```
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

### Features:

- ✅ Automatic deployments on push
- ✅ HTTPS enabled
- ✅ PWA features working
- ✅ Offline support
- ✅ Installable as app
- ✅ Fast loading
- ✅ All tests passing

---

## 📚 Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [PWA Checklist](https://web.dev/pwa-checklist/)

---

## 🆘 Need Help?

### Common Commands:

```bash
# Local development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test:unit

# Run linter
npm run lint

# Check git status
git status

# Push to GitHub
git push origin main
```

### Useful Links:

- Repository: `https://github.com/YOUR-USERNAME/YOUR-REPO-NAME`
- Actions: `https://github.com/YOUR-USERNAME/YOUR-REPO-NAME/actions`
- Settings: `https://github.com/YOUR-USERNAME/YOUR-REPO-NAME/settings/pages`
- Live Site: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

---

## 🎊 Congratulations!

You've successfully set up CI/CD and deployed your Horse Racing PWA to GitHub Pages! 🏇✨

**Share your game with the world!**
