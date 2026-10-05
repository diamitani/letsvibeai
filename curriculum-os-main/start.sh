#!/bin/bash
# CurriculumOS Full Stack — Start Script
# Starts both the FastAPI backend and Next.js frontend

set -e

ROOT="$(cd "$(dirname "$0")" && pwd)"
BACKEND_DIR="$ROOT/backend"
FRONTEND_DIR="$ROOT/frontend"

echo "============================================"
echo "  CurriculumOS — Full Stack Launch"
echo "============================================"
echo ""

# Start backend
echo "🚀 Starting backend on http://localhost:8000 ..."
cd "$BACKEND_DIR"
.venv/bin/python3 run_server.py &
BACKEND_PID=$!
echo "   Backend PID: $BACKEND_PID"

# Wait for backend
sleep 2

# Start frontend
echo "🎨 Starting frontend on http://localhost:3002 ..."
cd "$FRONTEND_DIR"
npx next dev -p 3002 &
FRONTEND_PID=$!
echo "   Frontend PID: $FRONTEND_PID"

echo ""
echo "============================================"
echo "  ✅ CurriculumOS is running!"
echo ""
echo "  Frontend:  http://localhost:3002"
echo "  Backend:   http://localhost:8000"
echo "  API Docs:  http://localhost:8000/docs"
echo ""
echo "  Press Ctrl+C to stop all services"
echo "============================================"

# Trap Ctrl+C to clean up
trap "echo 'Shutting down...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit 0" INT TERM

# Wait for either process
wait
