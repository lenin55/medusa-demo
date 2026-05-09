#!/bin/bash
# Deploy Super Shop: rename + keep-warm + all fixes
set -e

REPO_DIR="/Users/leninm/Documents/Work/medusa"

echo "🛍️  Deploying Super Shop..."
cd "$REPO_DIR"

echo "🧹 Clearing stale git locks..."
rm -f .git/HEAD.lock .git/index.lock

echo "🔧 Staging all changes..."
git add my-medusa-store-storefront/
git add .github/workflows/keep-warm.yml

echo "💾 Committing..."
git commit -m "feat: rename to Super Shop + keep-warm GitHub Action + middleware/timeout fixes"

echo "🚀 Pushing to GitHub main..."
git push origin HEAD:main --force

echo ""
echo "🚀 Deploying to Vercel..."
vercel deploy --prod

echo ""
echo "✅ Super Shop is live!"
echo "   URL: https://medusa-demo-storefront-Lenin55s-projects.vercel.app"
echo "   Keep-warm: GitHub Actions will ping backend every 10 mins"
echo ""
read -p "Press Enter to close..."
