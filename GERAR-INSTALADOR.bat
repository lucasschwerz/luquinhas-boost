@echo off
cd /d "%~dp0"
call npm install
call npm run build
start "" dist
echo.
echo Pronto! Mande o instalador "Luquinhas Boost Setup" (.exe) da pasta dist para seus amigos.
pause
