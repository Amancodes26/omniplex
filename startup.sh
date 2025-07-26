#!/bin/bash
# Azure App Service startup script for Next.js
# This script handles the .next directory renaming and starts the application

echo "🚀 Starting Azure App Service Next.js application..."

# Check current directory
echo "Current directory: $(pwd)"
echo "Contents:"
ls -la

# Handle next-build to .next renaming if needed
if [ -d "next-build" ] && [ ! -d ".next" ]; then
    echo "🔄 Renaming next-build to .next..."
    mv next-build .next
    echo "✅ Renamed next-build to .next"
fi

# Verify .next directory exists
if [ ! -d ".next" ]; then
    echo "❌ ERROR: .next directory not found!"
    echo "Available directories:"
    ls -la
    exit 1
fi

echo "✅ .next directory verified"

# Verify server.js exists
if [ ! -f "server.js" ]; then
    echo "❌ ERROR: server.js not found!"
    echo "Available files:"
    ls -la
    exit 1
fi

echo "✅ server.js verified"

# Start the Next.js application
echo "🎯 Starting Next.js server..."
exec node server.js
