@echo off
echo ========================================
echo Test Backend (Node.js/Express)
echo ========================================
echo.

echo Checking if node_modules exists...
if not exist "node_modules" (
    echo ⚠️  Dependencies not installed
    echo Installing dependencies...
    call npm install
)

echo ✅ Dependencies ready
echo.

echo Starting Express server...
echo Server will run on http://localhost:5000
echo.
echo Press Ctrl+C to stop the server
echo.

node server/index.js
