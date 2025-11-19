# 📁 File Guide - What Each File Does

## 🎯 Start Here

| File | Purpose | When to Use |
|------|---------|-------------|
| **📖_READ_ME_FIRST.txt** | Quick overview | First time setup |
| **START_HERE_MYSQL.md** | Simple MySQL setup | Setting up database |
| **README.md** | Main project documentation | Understanding the project |

## 📚 Setup Guides

| File | Purpose | Details |
|------|---------|---------|
| **START_HERE_MYSQL.md** | Simple 5-step MySQL setup | Best for beginners |
| **MYSQL_SETUP.md** | Detailed MySQL guide | Troubleshooting & advanced |
| **MYSQL_QUICK_START.txt** | Quick reference | Copy-paste commands |

## 🔧 Scripts (Double-click to run)

| File | What It Does |
|------|--------------|
| **setup-database.bat** | Creates tables & loads sample data |
| **start.bat** | Starts both frontend & backend |
| **test-api.bat** | Tests API endpoints |
| **check-database.bat** | Verifies database connection |
| **create-mysql-database.bat** | Helper to create MySQL database |

## 📖 Documentation

| File | Content |
|------|---------|
| **API_DOCUMENTATION.md** | Complete API reference with examples |
| **PROJECT_SUMMARY.md** | Architecture & project overview |
| **DEPLOYMENT_CHECKLIST.md** | Production deployment guide |
| **GET_API_KEYS_NOW.md** | Get free travel API keys |
| **GIT_PUSH_GUIDE.md** | Push code to GitHub |

## ⚙️ Configuration Files

| File | Purpose |
|------|---------|
| **.env** | Your environment variables (passwords, keys) |
| **.env.example** | Template for .env file |
| **package.json** | Node.js dependencies & scripts |
| **tsconfig.json** | TypeScript configuration |
| **.gitignore** | Files to exclude from Git |

## 📂 Folders

| Folder | Contains |
|--------|----------|
| **client/** | React frontend application |
| **server/** | Node.js backend API |
| **prisma/** | Database schema & migrations |
| **node_modules/** | Installed packages (auto-generated) |

## 🗂️ Inside Folders

### server/
```
server/
├── index.ts              - Main server file
├── routes/               - API endpoints
│   └── api.routes.ts     - All API routes
└── services/             - Business logic
    ├── booking.service.ts
    ├── inventory.service.ts
    ├── payment.service.ts
    ├── user.service.ts
    └── notification.service.ts
```

### prisma/
```
prisma/
├── schema.prisma         - Database schema (17 tables)
├── seed.ts               - Sample data loader
└── migrations/           - Database version history
```

### client/
```
client/
├── src/
│   ├── pages/            - React pages
│   ├── components/       - Reusable components
│   └── App.js            - Main React app
└── public/               - Static files
```

## 🎯 Quick Reference

### First Time Setup
1. Read: **📖_READ_ME_FIRST.txt**
2. Follow: **START_HERE_MYSQL.md**
3. Run: **setup-database.bat**
4. Start: **start.bat**

### Daily Development
- Start app: **start.bat**
- View database: `npm run db:studio`
- Test API: **test-api.bat**

### Need Help?
- Setup issues: **MYSQL_SETUP.md**
- API questions: **API_DOCUMENTATION.md**
- Project info: **PROJECT_SUMMARY.md**

### Deployment
- Read: **DEPLOYMENT_CHECKLIST.md**
- Get APIs: **GET_API_KEYS_NOW.md**
- Push code: **GIT_PUSH_GUIDE.md**

## 🗑️ Files You Can Ignore

These are auto-generated or system files:
- `node_modules/` - Installed packages
- `package-lock.json` - Dependency lock file
- `.git/` - Git version control
- `dist/` - Compiled TypeScript (if exists)

## 📝 Files You Should Edit

| File | When to Edit |
|------|--------------|
| **.env** | Add your passwords & API keys |
| **server/routes/api.routes.ts** | Add new API endpoints |
| **server/services/*.ts** | Add business logic |
| **prisma/schema.prisma** | Change database structure |
| **client/src/** | Modify frontend |

## 🚫 Files You Should NOT Edit

| File | Why |
|------|-----|
| **node_modules/** | Auto-generated |
| **package-lock.json** | Auto-managed |
| **prisma/migrations/** | Database history |
| **.git/** | Version control |

## 💡 Pro Tips

1. **Always start with** `📖_READ_ME_FIRST.txt`
2. **Keep .env secret** - Never share or commit
3. **Use scripts** - They make life easier
4. **Read guides** - They save time
5. **Check docs** - Answers are there

## 🎓 Learning Path

### Beginner
1. Read `📖_READ_ME_FIRST.txt`
2. Follow `START_HERE_MYSQL.md`
3. Run `setup-database.bat`
4. Explore with `npm run db:studio`

### Intermediate
1. Read `API_DOCUMENTATION.md`
2. Study `server/services/`
3. Modify `server/routes/api.routes.ts`
4. Test with `test-api.bat`

### Advanced
1. Read `PROJECT_SUMMARY.md`
2. Study `prisma/schema.prisma`
3. Read `DEPLOYMENT_CHECKLIST.md`
4. Deploy to production

## 🆘 Troubleshooting

| Problem | Check This File |
|---------|----------------|
| Setup issues | MYSQL_SETUP.md |
| API errors | API_DOCUMENTATION.md |
| Database problems | MYSQL_SETUP.md |
| Deployment | DEPLOYMENT_CHECKLIST.md |
| Git issues | GIT_PUSH_GUIDE.md |

## ✨ Summary

**Essential Files:**
- 📖_READ_ME_FIRST.txt (start here!)
- START_HERE_MYSQL.md (setup guide)
- setup-database.bat (setup script)
- start.bat (run app)

**Everything else is documentation to help you!**

---

*Keep this guide handy for reference!*
