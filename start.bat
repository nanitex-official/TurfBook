@echo off
echo ========================================
echo   TurfHub - Turf Booking System
echo ========================================
echo.
echo Starting Backend Server...
echo.

cd server
start "TurfHub Backend" cmd /k "npm start"

timeout /t 3 /nobreak > nul

cd ..

echo.
echo Starting Frontend...
echo.

start "TurfHub Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo   Both servers are starting!
echo ========================================
echo   Frontend: http://localhost:5173
echo   Backend:  http://localhost:5000
echo ========================================
echo.
echo Press any key to close this window...
pause > nul
