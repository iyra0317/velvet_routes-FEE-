# MySQL Setup Guide for VelvetRoutes

## 📋 Prerequisites

- MySQL installed and running (MySQL 8.0+ recommended)
- Node.js installed (v18+)

## 🚀 Quick Setup

### Step 1: Create MySQL Database

**Option A: Using MySQL Command Line**
```bash
# Open MySQL command line
mysql -u root -p

# Enter your password, then create database
CREATE DATABASE velvetroutes;

# Verify it was created
SHOW DATABASES;

# Exit MySQL
EXIT;
```

**Option B: Using MySQL Workbench**
1. Open MySQL Workbench
2. Connect to your local MySQL server
3. Click "Create a new schema" button
4. Name it: `velvetroutes`
5. Click "Apply"

### Step 2: Configure Database Connection

Open the `.env` file and update the DATABASE_URL:

```env
DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/velvetroutes"
```

**Replace:**
- `root` - with your MySQL username (usually "root")
- `YOUR_PASSWORD` - with your MySQL password
- `localhost` - with your MySQL host (usually "localhost")
- `3306` - with your MySQL port (usually 3306)

**Example:**
```env
DATABASE_URL="mysql://root:mypassword123@localhost:3306/velvetroutes"
```

### Step 3: Run Setup Script

Double-click `setup-database.bat` or run in terminal:
```bash
setup-database.bat
```

This will:
1. ✅ Install dependencies
2. ✅ Generate Prisma Client
3. ✅ Create database tables (migrations)
4. ✅ Seed sample data

### Step 4: Start the Server

```bash
npm run dev
```

You should see:
```
========================================
🚀 VelvetRoutes API Server
========================================
📡 Server running on port 5000
🌐 API: http://localhost:5000/api
========================================
```

### Step 5: Verify Setup

**Test API:**
```bash
test-api.bat
```

**Or open browser:**
```
http://localhost:5000/api/health
```

**View database:**
```bash
npm run db:studio
```
Opens at http://localhost:5555

## ✅ Success!

Your MySQL database is now set up with:
- 17 tables created
- Sample data loaded
- API server running

## 🔧 Manual Setup (Alternative)

If the automated script doesn't work:

```bash
# 1. Install dependencies
npm install

# 2. Generate Prisma Client
npm run db:generate

# 3. Create tables (run migrations)
npm run db:migrate

# 4. Load sample data
npm run db:seed

# 5. Start server
npm run dev
```

## 🗄️ Database Tables Created

After setup, you'll have these tables:
- User, Profile
- Provider, InventoryItem
- Hotel, Flight, Car, Train, Bus
- Booking, BookingItem
- Payment, Invoice
- Review, Notification
- Search, AuditLog

## 📊 Sample Data Loaded

- **2 Users**: Admin and regular user
- **3 Hotels**: Paris, Tokyo, NYC
- **3 Flights**: International routes
- **2 Cars**: Rental cars
- **1 Booking**: Sample booking with payment

**Test Credentials:**
- Admin: admin@velvetroutes.com / admin123
- User: john.doe@example.com / password123

## 🐛 Troubleshooting

### Issue: "Can't connect to MySQL server"

**Solutions:**
1. Check if MySQL is running:
   - Windows: Check Services for "MySQL80" or "MySQL"
   - Or run: `mysql -u root -p` to test connection

2. Verify your password in `.env`

3. Check MySQL port (default is 3306)

### Issue: "Access denied for user"

**Solution:**
Update your DATABASE_URL with correct username/password:
```env
DATABASE_URL="mysql://root:YOUR_ACTUAL_PASSWORD@localhost:3306/velvetroutes"
```

### Issue: "Unknown database 'velvetroutes'"

**Solution:**
Create the database first:
```bash
mysql -u root -p
CREATE DATABASE velvetroutes;
EXIT;
```

### Issue: "Migration failed"

**Solution:**
Reset and try again:
```bash
npm run db:reset
setup-database.bat
```

### Issue: "Port 5000 already in use"

**Solution:**
Change PORT in `.env`:
```env
PORT=3000
```

## 📝 Useful Commands

```bash
# Database
npm run db:generate      # Generate Prisma Client
npm run db:migrate       # Create/update tables
npm run db:seed          # Load sample data
npm run db:studio        # Open database GUI
npm run db:push          # Push schema without migration
npm run db:reset         # Reset database (⚠️ deletes all data)

# Server
npm run dev              # Start dev server
npm run server           # Start production server

# Testing
test-api.bat             # Test API endpoints
check-database.bat       # Check database connection
```

## 🔍 Verify Database

### Using MySQL Command Line:
```bash
mysql -u root -p
USE velvetroutes;
SHOW TABLES;
SELECT COUNT(*) FROM User;
SELECT COUNT(*) FROM Hotel;
EXIT;
```

### Using MySQL Workbench:
1. Open MySQL Workbench
2. Connect to server
3. Select `velvetroutes` schema
4. Browse tables

### Using Prisma Studio:
```bash
npm run db:studio
```
Opens GUI at http://localhost:5555

## 🎯 Next Steps

1. **Test the API** - Run `test-api.bat`
2. **View data** - Run `npm run db:studio`
3. **Read API docs** - See `API_DOCUMENTATION.md`
4. **Start building** - Check `PROJECT_SUMMARY.md`

## 💡 MySQL vs PostgreSQL

Your project is now configured for MySQL. The main differences:
- ✅ Connection string format: `mysql://` instead of `postgresql://`
- ✅ Default port: 3306 instead of 5432
- ✅ Prisma schema: Already set to `provider = "mysql"`

Everything else works the same!

## 🆘 Need Help?

Check these files:
- `HOW_TO_RUN.md` - General run instructions
- `API_DOCUMENTATION.md` - API reference
- `DATABASE_SETUP.md` - Database details
- `QUICKSTART.md` - Quick start guide

## ✨ You're All Set!

Your VelvetRoutes API is now running with MySQL! 🚀
