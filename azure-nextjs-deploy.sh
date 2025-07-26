#!/bin/bash
# Azure Next.js Deployment Script
# This script prepares a Next.js app for deployment to Azure App Service
# It creates the proper directory structure with .next directly instead of relying on a startup script

set -e

echo "🚀 Starting Azure deployment package creation..."

# Verify prerequisites
echo "🔍 Verifying build prerequisites..."
if [ ! -d ".next" ]; then
    echo "❌ ERROR: .next directory not found!"
    echo "Please run 'npm run build' or 'yarn build' first."
    exit 1
fi

if [ ! -d ".next/standalone" ]; then
    echo "❌ ERROR: .next/standalone directory not found!"
    echo "Make sure your next.config.js has 'output: standalone' configured."
    exit 1
fi

echo "✅ Prerequisites verified"

# Clean up previous deployment package
echo "🧹 Cleaning up previous deployment package..."
rm -rf deployment-package
echo "✅ Cleanup completed"

# Create deployment package directory (using deployment-package for artifact upload)
mkdir -p deployment-package

# Copy standalone files
echo "📦 Copying standalone files..."
cp -R .next/standalone/* deployment-package/
echo "✅ Standalone files copied"

# CRITICAL: Copy the .next directory INTO the standalone directory
# This is required because server.js expects .next to be at the same level
# Rename to next-build to avoid GitHub Actions artifact issues with dot directories
echo "Copying .next directory into standalone structure..."
cp -R .next deployment-package/next-build
echo "✅ .next directory copied as next-build to avoid artifact issues"

# Copy public folder (if not already in standalone)
if [ -d public ]; then
  echo "Copying public folder..."
  cp -R public deployment-package/public
  echo "✅ Public folder copied"
fi

# Copy package files
cp package.json deployment-package/
cp yarn.lock deployment-package/

# Copy startup script as backup
cp startup.sh deployment-package/
chmod +x deployment-package/startup.sh
echo "✅ Package files and startup script copied"

# Final verification
echo ""
echo "=== FINAL VERIFICATION ==="
echo "BUILD_ID verification:"
if [ -f deployment-package/next-build/BUILD_ID ]; then
  echo "✅ BUILD_ID found in deployment package"
  echo "Content: $(cat deployment-package/next-build/BUILD_ID)"
else
  echo "❌ BUILD_ID NOT found in deployment package"
  exit 1
fi

echo "Server.js verification:"
if [ -f deployment-package/server.js ]; then
  echo "✅ server.js found in deployment package"
else
  echo "❌ server.js NOT found in deployment package"
  exit 1
fi

echo "Server manifest verification:"
if [ -f deployment-package/next-build/server/pages-manifest.json ]; then
  echo "✅ pages-manifest.json found"
else
  echo "❌ pages-manifest.json NOT found"
  echo "Contents of next-build/server directory:"
  ls -la deployment-package/next-build/server/ || echo "No server directory found"
  exit 1
fi

echo "App router manifest verification:"
if [ -f deployment-package/next-build/server/app-paths-manifest.json ]; then
  echo "✅ app-paths-manifest.json found"
else
  echo "⚠️ app-paths-manifest.json not found (may be pages router only)"
fi

echo ""
echo "Deployment package structure verification:"
echo "Root level files:"
ls -la deployment-package/ | head -10
echo ""
echo "next-build directory contents:"
ls -la deployment-package/next-build/ | head -10

echo ""
echo "🎉 DEPLOYMENT PACKAGE READY!"
echo "============================="
echo "Package location: ./deployment-package/"
echo "Total size: $(du -sh deployment-package/)"
echo ""
echo "Key files verified:"
echo "✅ server.js (entry point)"
echo "✅ next-build/BUILD_ID (build identifier)"
echo "✅ next-build/server/ (server components)"
echo "✅ next-build/static/ (static assets)"
echo "✅ public/ (public assets)"
echo ""
echo "🚀 Ready for Azure App Service deployment!"
