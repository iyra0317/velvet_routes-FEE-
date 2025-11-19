@echo off
echo ========================================
echo Test Frontend (React)
echo ========================================
echo.

echo Checking if client folder exists...
if not exist "client" (
    echo ❌ Client folder not found!
    pause
    exit /b 1
)

echo ✅ Client folder found
echo.

echo Checking if node_modules exists in client...
if not exist "client\node_modules" (
    echo ⚠️  Dependencies not installed
    echo Installing client dependencies...
    cd client
    call npm install
    cd ..
)

echo ✅ Dependencies ready
echo.

echo Starting React development server...
echo This will open http://localhost:3000 in your browser
echo.
echo Press Ctrl+C to stop the server
echo.

cd client
npm start
