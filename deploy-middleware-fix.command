#!/bin/bash
# Deploy middleware timeout fix + 60s function timeout
set -e

REPO_DIR="/Users/leninm/Documents/Work/medusa"

echo "📦 Navigating to repo root..."
cd "$REPO_DIR"

echo "🧹 Clearing any stale git lock files..."
rm -f .git/HEAD.lock .git/index.lock

echo "🔧 Staging fixes..."
git add my-medusa-store-storefront/src/middleware.ts
git add my-medusa-store-storefront/vercel.json

echo "💾 Committing..."
git commit -m "fix: 60s function timeout + middleware fallback for Render free-tier cold starts"

echo "🚀 Pushing to GitHub main..."
git push origin HEAD:main --force

echo ""
echo "🚀 Deploying to Vercel..."
vercel deploy --prod

echo ""
echo "✅ Done!"
echo "   URL: https://medusa-demo-storefront-Lenin55s-projects.vercel.app"
echo ""
read -p "Press Enter to close..."
