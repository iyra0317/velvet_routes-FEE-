@echo off
echo ========================================
echo VelvetRoutes - Database Check
echo ========================================
echo.

echo Checking MySQL installation...
mysql --version
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] MySQL is not installed or not in PATH!
    pause
    exit /b 1
)
echo [OK] MySQL is installed
echo.

echo Checking if database exists...
mysql -u root -p -e "SHOW DATABASES LIKE 'velvetroutes';"
echo.

echo To view your database visually, run:
echo   npm run db:studio
echo.

echo To connect via command line:
echo   mysql -u root -p
echo   USE velvetroutes;
echo   SHOW TABLES;
echo.

pause
