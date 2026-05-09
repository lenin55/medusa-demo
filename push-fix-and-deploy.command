#!/bin/bash
# Push storefront + build fix to GitHub — Vercel will auto-deploy
set -e

REPO_DIR="/Users/leninm/Documents/Work/medusa"

echo "📦 Navigating to repo root..."
cd "$REPO_DIR"

echo "🧹 Clearing any stale git lock files..."
rm -f .git/HEAD.lock
rm -f .git/index.lock

echo "🔧 Staging all storefront files..."
git add my-medusa-store-storefront/

echo "💾 Committing..."
git commit -m "fix: add storefront with graceful generateStaticParams for free-tier backend"

echo "🚀 Pushing to GitHub main branch (origin)..."
git push origin HEAD:main --force

echo ""
echo "✅ Done! Vercel will auto-deploy from the new commit."
echo "   Watch: https://vercel.com/Lenin55s-projects/medusa-demo-storefront"
echo ""
read -p "Press Enter to close..."
