# 🗄️ Install MySQL - Simple Guide

## ⚠️ MySQL Not Found

Your system doesn't have MySQL installed. Here are your options:

---

## 🎯 OPTION 1: Install MySQL (Recommended)

### Download & Install

1. **Download MySQL Installer**
   - Go to: https://dev.mysql.com/downloads/installer/
   - Choose: "Windows (x86, 32-bit), MSI Installer" (larger file ~400MB)
   - Click "Download"
   - Click "No thanks, just start my download"

2. **Run Installer**
   - Double-click the downloaded file
   - Choose: "Developer Default" (includes everything you need)
   - Click "Next"

3. **Install Components**
   - Click "Execute" to install all components
   - Wait for installation (5-10 minutes)
   - Click "Next"

4. **Configure MySQL Server**
   - Type and Networking: Keep defaults (Port 3306)
   - Click "Next"
   
5. **Set Root Password**
   - Choose a password (remember this!)
   - Example: `admin123` or `root123`
   - Click "Next"

6. **Windows Service**
   - Keep "Configure MySQL Server as a Windows Service" checked
   - Service Name: MySQL80
   - Click "Next"

7. **Apply Configuration**
   - Click "Execute"
   - Wait for completion
   - Click "Finish"

8. **Complete Installation**
   - Click "Next" through remaining screens
   - Click "Finish"

### ✅ Verify Installation

Open Command Prompt and run:
```bash
mysql --version
```

Should show: `mysql Ver 8.0.x`

---

## 🎯 OPTION 2: Install XAMPP (Easier Alternative)

XAMPP includes MySQL, PHP, and Apache in one package.

### Download & Install

1. **Download XAMPP**
   - Go to: https://www.apachefriends.org/
   - Download for Windows
   - File size: ~150MB

2. **Run Installer**
   - Double-click downloaded file
   - Click "Next"
   - Select components (MySQL is required)
   - Choose installation folder (default: C:\xampp)
   - Click "Next" and "Install"

3. **Start XAMPP**
   - Open XAMPP Control Panel
   - Click "Start" next to MySQL
   - MySQL should turn green

4. **Access phpMyAdmin**
   - Open browser: http://localhost/phpmyadmin
   - This is your MySQL GUI

### ✅ Create Database in XAMPP

1. Open phpMyAdmin: http://localhost/phpmyadmin
2. Click "New" in left sidebar
3. Database name: `velvetroutes`
4. Click "Create"

---

## 🎯 OPTION 3: Use SQLite (No Installation)

If you want to skip MySQL installation, use SQLite instead.

### Update Prisma Schema

1. Open `prisma/schema.prisma`
2. Change this line:
   ```prisma
   datasource db {
     provider = "mysql"
     url      = env("DATABASE_URL")
   }
   ```
   To:
   ```prisma
   datasource db {
     provider = "sqlite"
     url      = "file:./dev.db"
   }
   ```

3. Update `.env`:
   ```env
   DATABASE_URL="file:./dev.db"
   ```

4. Run setup:
   ```bash
   npm run db:generate
   npm run db:migrate
   npm run db:seed
   ```

**Note:** SQLite is simpler but less powerful than MySQL.

---

## 📝 After Installing MySQL

### Step 1: Update .env File

Open `.env` and update with your MySQL password:

```env
DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/velvetroutes"
```

Example:
```env
DATABASE_URL="mysql://root:admin123@localhost:3306/velvetroutes"
```

### Step 2: Create Database

**Using MySQL Workbench:**
1. Open MySQL Workbench
2. Connect to Local instance
3. Click "Create Schema" icon
4. Name: `velvetroutes`
5. Click "Apply"

**Using Command Line:**
```bash
mysql -u root -p
# Enter password
CREATE DATABASE velvetroutes;
SHOW DATABASES;
EXIT;
```

**Using phpMyAdmin (XAMPP):**
1. Go to http://localhost/phpmyadmin
2. Click "New"
3. Database name: `velvetroutes`
4. Click "Create"

### Step 3: Run Setup

```bash
setup-database.bat
```

This will:
- Generate Prisma Client
- Create tables
- Load sample data

### Step 4: Start Application

```bash
start.bat
```

---

## 🔍 Check MySQL Status

### Windows Services

1. Press `Win + R`
2. Type: `services.msc`
3. Press Enter
4. Look for "MySQL80" or "MySQL"
5. Status should be "Running"

### Command Line

```bash
# Check if MySQL is running
sc query MySQL80

# Start MySQL service
net start MySQL80

# Stop MySQL service
net stop MySQL80
```

### XAMPP Control Panel

1. Open XAMPP Control Panel
2. MySQL should show green "Running"
3. If not, click "Start"

---

## 🐛 Troubleshooting

### "MySQL service won't start"

**Solution 1:** Check if port 3306 is in use
```bash
netstat -ano | findstr :3306
```

**Solution 2:** Restart computer and try again

**Solution 3:** Reinstall MySQL

### "Can't connect to MySQL"

1. Check MySQL is running
2. Verify password in `.env`
3. Check port is 3306
4. Try connecting with MySQL Workbench

### "Access denied for user 'root'"

1. Check password in `.env`
2. Reset MySQL root password:
   - Stop MySQL service
   - Follow MySQL password reset guide

---

## 💡 Recommendations

### For Beginners
✅ **Install XAMPP** - Easiest option with GUI

### For Developers
✅ **Install MySQL** - More professional, better performance

### For Quick Testing
✅ **Use SQLite** - No installation needed

---

## 🆘 Need Help?

### MySQL Resources
- Official Docs: https://dev.mysql.com/doc/
- Download: https://dev.mysql.com/downloads/
- Community: https://forums.mysql.com/

### XAMPP Resources
- Official Site: https://www.apachefriends.org/
- Documentation: https://www.apachefriends.org/docs/
- Forum: https://community.apachefriends.org/

---

## ✅ Quick Checklist

After installation:
- [ ] MySQL is installed
- [ ] MySQL service is running
- [ ] Database `velvetroutes` is created
- [ ] `.env` file has correct password
- [ ] Can connect to MySQL
- [ ] Ready to run `setup-database.bat`

---

## 🎉 Next Steps

Once MySQL is installed and running:

1. ✅ Create database: `velvetroutes`
2. ✅ Update `.env` with password
3. ✅ Run: `setup-database.bat`
4. ✅ Start app: `start.bat`
5. ✅ Open: http://localhost:3000

---

*Choose the option that works best for you and follow the steps!*
