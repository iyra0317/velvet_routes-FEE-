@echo off
echo ========================================
echo VelvetRoutes API Test Script
echo ========================================
echo.

set API_URL=http://localhost:5000/api

echo Testing API endpoints...
echo.

echo [1] Health Check
curl -s %API_URL%/health
echo.
echo.

echo [2] Get All Inventory
curl -s "%API_URL%/inventory?limit=5"
echo.
echo.

echo [3] Search Hotels
curl -s "%API_URL%/inventory?travelMode=HOTEL"
echo.
echo.

echo [4] Search Flights
curl -s "%API_URL%/inventory?travelMode=FLIGHT"
echo.
echo.

echo [5] Search Cars
curl -s "%API_URL%/inventory?travelMode=CAR"
echo.
echo.

echo ========================================
echo Test Complete!
echo ========================================
echo.
echo To test more endpoints, see API_DOCUMENTATION.md
echo.
pause
