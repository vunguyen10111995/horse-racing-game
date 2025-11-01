# Quick Deploy Guide - GitHub Pages

## 🚀 Deploy in 5 Minutes!

### Step 1: Update Repository Name (30 seconds)

Edit `vite.config.js` line 8:

```javascript
base: process.env.NODE_ENV === "production" ? "/YOUR-REPO-NAME/" : "/",
```

Replace `YOUR-REPO-NAME` with your GitHub repository name.

---

### Step 2: Create GitHub Repository (1 minute)

1. Go to [github.com/new](https://github.com/new)
2. Name: `horse-racing-game` (or your choice)
3. Public or Private
4. Click **Create repository**

---

### Step 3: Push Code (2 minutes)

```bash
# Initialize git (if needed)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Horse Racing PWA"

# Add remote (replace with YOUR details)
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Push
git push -u origin main
```

---

### Step 4: Enable GitHub Pages (1 minute)

1. Go to your repository on GitHub
2. **Settings** → **Pages**
3. Source: **GitHub Actions**
4. Done!

---

### Step 5: Wait & Enjoy! (2-3 minutes)

1. Go to **Actions** tab
2. Watch workflow run
3. Your site will be live at:

```
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/
```

---

## ✅ That's It!

Your game is now live with:

- ✅ Automatic deployments
- ✅ PWA features
- ✅ Offline support
- ✅ HTTPS enabled

---

## 🔄 Future Updates

Just push to main branch:

```bash
git add .
git commit -m "Update game"
git push origin main
```

Site updates automatically! 🎉

---

## 📚 Full Guide

See `DEPLOYMENT_GUIDE.md` for detailed instructions and troubleshooting.

---

## 🎊 Enjoy!

Share your game: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/` 🏇✨
