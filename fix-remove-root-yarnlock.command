#!/bin/bash
# Fix: remove root yarn.lock from git so Vercel uses npm (not Yarn) for GitHub deploys
set -e

REPO_DIR="/Users/leninm/Documents/Work/medusa"
cd "$REPO_DIR"

echo "🧹 Clearing stale git locks..."
rm -f .git/HEAD.lock .git/index.lock

echo "🗑️  Removing root yarn.lock from git tracking (keeping file locally)..."
git rm --cached yarn.lock 2>/dev/null || true

echo "📝 Adding yarn.lock to root .gitignore..."
if ! grep -q "^yarn.lock$" .gitignore 2>/dev/null; then
  echo "yarn.lock" >> .gitignore
fi

echo "🧹 Also remove storefront's empty yarn.lock (no longer needed)..."
git rm --cached my-medusa-store-storefront/yarn.lock 2>/dev/null || true
if ! grep -q "^yarn.lock$" my-medusa-store-storefront/.gitignore 2>/dev/null; then
  echo "yarn.lock" >> my-medusa-store-storefront/.gitignore 2>/dev/null || true
fi

echo "💾 Staging and committing..."
git add .gitignore
git add my-medusa-store-storefront/.gitignore 2>/dev/null || true
git commit -m "fix: remove yarn.lock from git so Vercel GitHub deploys use npm not Yarn"

echo "🚀 Pushing to GitHub main..."
git push origin HEAD:main --force

echo ""
echo "✅ Done! Future GitHub-triggered deployments will detect npm (not Yarn)."
echo "   The 'packageManager: npm@10.9.4' in package.json takes over."
echo ""
read -p "Press Enter to close..."
