@echo off
echo Starting Habitare Homes local server with auto-update...
echo.

:start
echo Checking for git updates...
git fetch origin main

for /f %%i in ('git rev-list HEAD...origin/main --count') do set BEHIND=%%i

if %BEHIND% gtr 0 (
    echo Found %BEHIND% new commits. Updating...
    git pull origin main
    echo Update complete! Restarting server...
    echo.
) else (
    echo Repository is up to date.
)

echo Starting server on http://localhost:8000
echo Press Ctrl+C to stop the server
echo.
start "" "http://localhost:8000"
python -m http.server 8000

echo Server stopped. Checking for updates in 5 seconds...
timeout /t 5 /nobreak >nul
goto start