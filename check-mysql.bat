@echo off
echo ========================================
echo Check MySQL Installation
echo ========================================
echo.

echo Checking MySQL service...
sc query MySQL80 2>nul
if %errorlevel% equ 0 (
    echo ✅ MySQL80 service found!
    echo.
    sc query MySQL80
) else (
    sc query MySQL 2>nul
    if %errorlevel% equ 0 (
        echo ✅ MySQL service found!
        echo.
        sc query MySQL
    ) else (
        echo ❌ MySQL service not found
        echo.
        echo MySQL might not be installed or service has different name.
        echo.
        echo To install MySQL:
        echo 1. Download from: https://dev.mysql.com/downloads/installer/
        echo 2. Run installer
        echo 3. Choose "Developer Default"
        echo 4. Set root password
        echo 5. Complete installation
    )
)

echo.
echo.
echo Checking common MySQL paths...
echo.

if exist "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" (
    echo ✅ Found: C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe
    set MYSQL_PATH=C:\Program Files\MySQL\MySQL Server 8.0\bin
) else if exist "C:\Program Files\MySQL\MySQL Server 8.4\bin\mysql.exe" (
    echo ✅ Found: C:\Program Files\MySQL\MySQL Server 8.4\bin\mysql.exe
    set MYSQL_PATH=C:\Program Files\MySQL\MySQL Server 8.4\bin
) else if exist "C:\xampp\mysql\bin\mysql.exe" (
    echo ✅ Found: C:\xampp\mysql\bin\mysql.exe
    set MYSQL_PATH=C:\xampp\mysql\bin
) else (
    echo ❌ MySQL executable not found in common locations
    echo.
    echo Please check if MySQL is installed.
)

echo.
echo.
echo ========================================
echo Next Steps:
echo ========================================
echo.
echo 1. Make sure MySQL service is running
echo 2. Open MySQL Workbench or phpMyAdmin
echo 3. Create database: velvetroutes
echo 4. Update .env with your MySQL password
echo 5. Run: setup-database.bat
echo.
pause
