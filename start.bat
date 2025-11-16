@echo off
echo Starting Velvet Routes...
echo.
echo Backend will run on http://localhost:5000
echo Frontend will run on http://localhost:3000
echo.
echo Press Ctrl+C to stop both servers
echo.
start cmd /k "npm run server"
timeout /t 3 /nobreak > nul
start cmd /k "npm run client"
