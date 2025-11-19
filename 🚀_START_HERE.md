# 🚀 VelvetRoutes - Complete Setup Guide

## ⚠️ IMPORTANT: MySQL Not Installed

Your system doesn't have MySQL installed yet. Follow this guide step by step.

---

## 📋 Current Status

✅ **Frontend (React)** - Ready to run  
✅ **Backend (Node.js)** - Ready to run  
❌ **Database (MySQL)** - Not installed  

---

## 🎯 STEP 1: Install MySQL

### Option A: Install MySQL (Recommended)

1. **Download MySQL**
   - Go to: https://dev.mysql.com/downloads/installer/
   - Download "Windows (x86, 32-bit), MSI Installer" (~400MB)
   - Click "No thanks, just start my download"

2. **Install MySQL**
   - Run the installer
   - Choose "Developer Default"
   - Click "Execute" to install
   - Set root password (remember this!)
   - Example password: `admin123`
   - Complete installation

3. **Verify Installation**
   ```bash
   mysql --version
   ```

### Option B: Install XAMPP (Easier)

1. **Download XAMPP**
   - Go to: https://www.apachefriends.org/
   - Download for Windows (~150MB)

2. **Install XAMPP**
   - Run installer
   - Install to C:\xampp
   - Complete installation

3. **Start MySQL**
   - Open XAMPP Control Panel
   - Click "Start" next to MySQL

**📖 Detailed instructions:** Read `INSTALL_MYSQL.md`

---

## 🎯 STEP 2: Create Database

### If you installed MySQL:

**Option 1: Using MySQL Workbench**
1. Open MySQL Workbench
2. Connect to Local instance
3. Click "Create Schema" icon (cylinder with +)
4. Name: `velvetroutes`
5. Click "Apply"

**Option 2: Using Command Line**
```bash
mysql -u root -p
# Enter your password
CREATE DATABASE velvetroutes;
EXIT;
```

### If you installed XAMPP:

1. Open browser: http://localhost/phpmyadmin
2. Click "New" in left sidebar
3. Database name: `velvetroutes`
4. Click "Create"

---

## 🎯 STEP 3: Configure Database Connection

1. **Open `.env` file** in the project root

2. **Update the DATABASE_URL** with your MySQL password:
   ```env
   DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/velvetroutes"
   ```

   **Examples:**
   ```env
   # If your password is admin123
   DATABASE_URL="mysql://root:admin123@localhost:3306/velvetroutes"
   
   # If your password is root
   DATABASE_URL="mysql://root:root@localhost:3306/velvetroutes"
   
   # If you have no password (XAMPP default)
   DATABASE_URL="mysql://root:@localhost:3306/velvetroutes"
   ```

3. **Save the file**

---

## 🎯 STEP 4: Setup Database Tables

Run this command to create all tables and load sample data:

```bash
setup-database.bat
```

This will:
- ✅ Install dependencies
- ✅ Generate Prisma Client
- ✅ Create 17 database tables
- ✅ Load sample data (users, hotels, flights, etc.)

**Expected output:**
```
✅ Created users and profiles
✅ Created providers
✅ Created inventory items
✅ Created sample booking
✅ Created sample reviews
✅ Created sample notifications
🎉 Database seeding completed successfully!
```

---

## 🎯 STEP 5: Test Everything

### Test Backend Only

```bash
test-backend.bat
```

Open browser: http://localhost:5000

### Test Frontend Only

```bash
test-frontend.bat
```

Opens: http://localhost:3000

### Test Both Together

```bash
start.bat
```

This starts both frontend and backend!

---

## 🎯 STEP 6: Verify Database

### View Database in GUI

```bash
npm run db:studio
```

Opens Prisma Studio at: http://localhost:5555

You should see:
- 2 Users (admin & regular user)
- 3 Hotels
- 3 Flights
- 2 Cars
- 1 Sample booking

### Test API Endpoints

```bash
test-api.bat
```

This tests:
- Health check
- Get inventory
- Search hotels
- Search flights
- Search cars

---

## ✅ Success Checklist

Your setup is complete when:

- [ ] MySQL is installed and running
- [ ] Database `velvetroutes` is created
- [ ] `.env` has correct MySQL password
- [ ] `setup-database.bat` ran successfully
- [ ] Backend starts without errors (port 5000)
- [ ] Frontend starts without errors (port 3000)
- [ ] Can view database in Prisma Studio
- [ ] API endpoints respond correctly

---

## 🧪 Test Credentials

After setup, use these to test:

**Admin Account:**
- Email: admin@velvetroutes.com
- Password: admin123

**Regular User:**
- Email: john.doe@example.com
- Password: password123

---

## 🐛 Troubleshooting

### "MySQL not found"
- **Solution:** Install MySQL or XAMPP (see STEP 1)
- **Check:** Run `check-mysql.bat`

### "Can't connect to MySQL"
- **Solution:** Check MySQL is running
- **Windows:** Services → MySQL80 should be "Running"
- **XAMPP:** Control Panel → MySQL should be green

### "Access denied for user 'root'"
- **Solution:** Check password in `.env` file
- **Verify:** Password matches what you set during MySQL installation

### "Database 'velvetroutes' doesn't exist"
- **Solution:** Create the database (see STEP 2)
- **Verify:** Run `SHOW DATABASES;` in MySQL

### "Port 5000 already in use"
- **Solution:** Change PORT in `.env` to 3001 or another port

### "Migration failed"
- **Solution:** Reset and try again
  ```bash
  npm run db:reset
  setup-database.bat
  ```

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| **🚀_START_HERE.md** | This file - complete setup guide |
| **INSTALL_MYSQL.md** | Detailed MySQL installation guide |
| **START_HERE_MYSQL.md** | Quick MySQL setup reference |
| **MYSQL_SETUP.md** | MySQL troubleshooting guide |
| **API_DOCUMENTATION.md** | API endpoints reference |
| **PROJECT_SUMMARY.md** | Project architecture overview |

---

## 🛠️ Helper Scripts

| Script | What It Does |
|--------|--------------|
| **check-mysql.bat** | Check if MySQL is installed |
| **create-database-mysql.bat** | Instructions to create database |
| **setup-database.bat** | Setup tables & load data |
| **test-backend.bat** | Test backend only |
| **test-frontend.bat** | Test frontend only |
| **start.bat** | Start both frontend & backend |
| **test-api.bat** | Test API endpoints |

---

## 💡 Quick Commands

```bash
# Check MySQL status
check-mysql.bat

# Setup database
setup-database.bat

# Start application
start.bat

# View database
npm run db:studio

# Test API
test-api.bat
```

---

## 🎯 Summary

### What You Need to Do:

1. **Install MySQL** (or XAMPP)
2. **Create database** named `velvetroutes`
3. **Update `.env`** with your MySQL password
4. **Run** `setup-database.bat`
5. **Start** `start.bat`
6. **Open** http://localhost:3000

### Time Required:
- MySQL installation: 10-15 minutes
- Database setup: 2-3 minutes
- Total: ~20 minutes

### What You'll Have:
- ✅ Full-stack travel booking platform
- ✅ React frontend
- ✅ Node.js backend
- ✅ MySQL database with sample data
- ✅ 17 database tables
- ✅ Working API endpoints
- ✅ Test accounts ready to use

---

## 🆘 Need Help?

1. **MySQL Installation Issues**
   - Read: `INSTALL_MYSQL.md`
   - Run: `check-mysql.bat`

2. **Database Setup Issues**
   - Read: `MYSQL_SETUP.md`
   - Check: `.env` file configuration

3. **API Issues**
   - Read: `API_DOCUMENTATION.md`
   - Run: `test-api.bat`

4. **General Questions**
   - Read: `README.md`
   - Check: `PROJECT_SUMMARY.md`

---

## 🎉 Ready to Start!

Follow the steps above and you'll have a fully functional travel booking platform!

**Start with STEP 1: Install MySQL**

Good luck! 🚀

---

*Last updated: November 2024*
