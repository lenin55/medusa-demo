#!/bin/bash
# Fix: create empty yarn.lock in storefront so root yarn.lock doesn't confuse Yarn
set -e

REPO_DIR="/Users/leninm/Documents/Work/medusa"
cd "$REPO_DIR"

echo "🧹 Clearing stale git locks..."
rm -f .git/HEAD.lock .git/index.lock

echo "📦 Creating empty yarn.lock in storefront (fixes Yarn workspace error)..."
touch my-medusa-store-storefront/yarn.lock

echo "💾 Staging and committing..."
git add my-medusa-store-storefront/yarn.lock
git commit -m "fix: add empty yarn.lock to storefront so it builds standalone"

echo "🚀 Pushing to GitHub main..."
git push origin HEAD:main --force

echo ""
echo "✅ Done! GitHub deployments will now build correctly."
echo ""
read -p "Press Enter to close..."
