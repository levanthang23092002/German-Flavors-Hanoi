@echo off
cd /d "%~dp0"
echo.
echo  German Flavors Hanoi - Local Server
echo  Open: http://localhost:8765
echo  Press Ctrl+C to stop
echo.
npx --yes http-server -p 8765 -c-1 -o /index.html
