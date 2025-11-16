# 📦 Git Push Guide

## Step-by-Step Instructions to Push to GitHub

### 1. Initialize Git (if not already done)

```bash
git init
```

### 2. Add Remote Repository

```bash
git remote add origin https://github.com/iyra0317/velvet_routes-FEE-.git
```

If remote already exists, update it:
```bash
git remote set-url origin https://github.com/iyra0317/velvet_routes-FEE-.git
```

### 3. Check Current Status

```bash
git status
```

### 4. Add All Files

```bash
git add .
```

### 5. Commit Changes

```bash
git commit -m "Initial commit: Velvet Routes Travel Booking Platform"
```

### 6. Push to GitHub

**Option A: Push to main branch (recommended)**
```bash
git branch -M main
git push -u origin main --force
```

**Option B: Push to master branch**
```bash
git push -u origin master --force
```

**Note:** The `--force` flag will overwrite the existing repository content.

### 7. Verify on GitHub

Go to: https://github.com/iyra0317/velvet_routes-FEE-.git

You should see all your files!

---

## 🔄 For Future Updates

After making changes:

```bash
# Check what changed
git status

# Add changes
git add .

# Commit with message
git commit -m "Your update message here"

# Push to GitHub
git push origin main
```

---

## 🚨 If You Get Errors

### Error: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/iyra0317/velvet_routes-FEE-.git
```

### Error: "failed to push some refs"
```bash
git pull origin main --allow-unrelated-histories
git push origin main
```

Or force push:
```bash
git push origin main --force
```

### Error: "Permission denied"
- Make sure you're logged into GitHub
- Check if you have write access to the repository
- Use GitHub Desktop or authenticate via browser

---

## 📝 Useful Git Commands

```bash
# View commit history
git log

# View remote URL
git remote -v

# Create new branch
git checkout -b feature-name

# Switch branch
git checkout main

# Pull latest changes
git pull origin main

# View differences
git diff
```

---

## ✅ What Will Be Pushed

All project files including:
- ✅ Client (React frontend)
- ✅ Server (Node.js backend)
- ✅ Configuration files (.env, package.json)
- ✅ Documentation (README.md, GET_API_KEYS_NOW.md)
- ✅ Start script (start.bat)

**Note:** `node_modules/` is excluded via `.gitignore`

---

## 🎯 Quick Commands (Copy & Paste)

```bash
# Complete push sequence
git init
git remote add origin https://github.com/iyra0317/velvet_routes-FEE-.git
git add .
git commit -m "Initial commit: Velvet Routes Travel Platform"
git branch -M main
git push -u origin main --force
```

---

**Your code will be live on GitHub!** 🚀
