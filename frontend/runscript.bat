@echo off
REM Set the PYTHONPATH environment variable
set PYTHONPATH=C:\Users\mathe\OneDrive\Desktop\College Projects\ess-hotel-project\backend


REM Start the backend server
start cmd /k "uvicorn src.main:app --reload"

REM Start the frontend development server
npm run dev

pause