@echo off
echo Killing any existing processes on port 8000...
taskkill /f /im node.exe 2>nul
taskkill /f /im python.exe 2>nul
echo.

echo Installing dependencies (if needed)...
if not exist node_modules (
    echo Installing Node.js dependencies...
    npm install
)

echo Starting Habitare Homes auto-updating server...
echo Server will be available at: http://localhost:8000
echo Press Ctrl+C to stop the server
echo.
node server.js