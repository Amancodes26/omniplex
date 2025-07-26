```
#!/bin/bash
# Azure Next.js Deployment Script
# This script prepares a Next.js app for deployment to Azure App Service
# It creates the proper directory structure with .next directly instead of relying on a startup script

set -e

mkdir -p deployment-package

# Copy standalone files
echo "Copying standalone files..."
cp -R .next/standalone/* deployment-package/
echo "✅ Standalone files copied"

# Create .next directory directly (Azure supports it in deployment)
echo "Creating .next directory in deployment package..."
mkdir -p deployment-package/.next
echo "✅ .next directory created"

# Copy static files
if [ -d .next/static ]; then
  echo "Copying static files..."
  cp -R .next/static deployment-package/.next/static
  echo "✅ Static files copied"
fi

# Copy server directory
if [ -d .next/server ]; then
  echo "Copying server directory..."
  cp -R .next/server deployment-package/.next/server
  echo "✅ Server directory copied"
fi

# Copy BUILD_ID and other essential files directly to .next
echo "Copying BUILD_ID..."
cp .next/BUILD_ID deployment-package/.next/BUILD_ID
echo "✅ BUILD_ID copied"

echo "Copying manifest files..."
[ -f .next/routes-manifest.json ] && cp .next/routes-manifest.json deployment-package/.next/
[ -f .next/prerender-manifest.json ] && cp .next/prerender-manifest.json deployment-package/.next/
[ -f .next/package.json ] && cp .next/package.json deployment-package/.next/
[ -f .next/required-server-files.json ] && cp .next/required-server-files.json deployment-package/.next/
[ -f .next/app-build-manifest.json ] && cp .next/app-build-manifest.json deployment-package/.next/
[ -f .next/build-manifest.json ] && cp .next/build-manifest.json deployment-package/.next/

# Copy public folder
if [ -d public ]; then
  echo "Copying public folder..."
  cp -R public deployment-package/public
  echo "✅ Public folder copied"
fi

# Copy package files
cp package.json deployment-package/
cp yarn.lock deployment-package/
echo "✅ Package files copied"

# Final verification
echo ""
echo "=== FINAL VERIFICATION ==="
echo "BUILD_ID verification:"
if [ -f deployment-package/.next/BUILD_ID ]; then
  echo "✅ BUILD_ID found in deployment package"
  echo "Content: $(cat deployment-package/.next/BUILD_ID)"
else
  echo "❌ BUILD_ID NOT found in deployment package"
  exit 1
fi

echo "Server manifest verification:"
if [ -f deployment-package/.next/server/pages-manifest.json ]; then
  echo "✅ pages-manifest.json found"
else
  echo "❌ pages-manifest.json NOT found"
  exit 1
fi

echo "Deployment package structure:"
find deployment-package -type f -name "*.json" | grep -E "(BUILD_ID|manifest)" | head -10

```