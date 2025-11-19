@echo off
echo ========================================
echo Create VelvetRoutes Database in MySQL
echo ========================================
echo.

echo OPTION 1: Using MySQL Workbench (Easiest)
echo ------------------------------------------
echo 1. Open MySQL Workbench
echo 2. Connect to your local MySQL server
echo 3. Click the "Create Schema" icon (cylinder with +)
echo 4. Name: velvetroutes
echo 5. Click "Apply"
echo.
echo.

echo OPTION 2: Using MySQL Command Line
echo -----------------------------------
echo.
echo If you have MySQL in PATH, run these commands:
echo.
echo mysql -u root -p
echo (Enter your password)
echo CREATE DATABASE velvetroutes;
echo SHOW DATABASES;
echo EXIT;
echo.
echo.

echo OPTION 3: Using phpMyAdmin
echo ---------------------------
echo 1. Open phpMyAdmin (usually http://localhost/phpmyadmin)
echo 2. Click "New" in left sidebar
echo 3. Database name: velvetroutes
echo 4. Click "Create"
echo.
echo.

echo After creating the database:
echo 1. Update your MySQL password in .env file
echo 2. Run: setup-database.bat
echo.
pause
