@echo off
echo ========================================
echo VelvetRoutes MySQL Database Setup
echo ========================================
echo.
echo IMPORTANT: Make sure you have:
echo 1. MySQL running
echo 2. Created database: CREATE DATABASE velvetroutes;
echo 3. Updated DATABASE_URL in .env file
echo.
pause
echo.

echo [1/5] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo.

echo [2/5] Generating Prisma Client...
call npm run db:generate
if %errorlevel% neq 0 (
    echo ERROR: Failed to generate Prisma Client
    pause
    exit /b 1
)
echo.

echo [3/5] Running database migrations...
call npm run db:migrate
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Failed to run migrations
    echo.
    echo Common issues:
    echo 1. MySQL is not running
    echo 2. Database 'velvetroutes' doesn't exist
    echo 3. Wrong password in DATABASE_URL
    echo.
    echo To create database:
    echo   mysql -u root -p
    echo   CREATE DATABASE velvetroutes;
    echo   EXIT;
    echo.
    pause
    exit /b 1
)
echo.

echo [4/5] Seeding database with sample data...
call npm run db:seed
if %errorlevel% neq 0 (
    echo ERROR: Failed to seed database
    pause
    exit /b 1
)
echo.

echo [5/5] Verifying setup...
echo.
echo ========================================
echo MySQL Database Setup Complete!
echo ========================================
echo.
echo Database: velvetroutes (MySQL)
echo Tables: 17 tables created
echo Sample Data: Loaded successfully
echo.
echo Test Credentials:
echo   Admin: admin@velvetroutes.com / admin123
echo   User:  john.doe@example.com / password123
echo.
echo Next steps:
echo   1. Start server: npm run dev
echo   2. View database: npm run db:studio
echo   3. Test API: test-api.bat
echo   4. Read docs: MYSQL_SETUP.md
echo.
pause
