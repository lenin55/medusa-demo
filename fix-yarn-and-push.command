#!/bin/bash
# Fix: remove .yarnrc.yml so GitHub deploys use npm
set -e

REPO_DIR="/Users/leninm/Documents/Work/medusa"
cd "$REPO_DIR"

echo "🧹 Clearing stale git locks..."
rm -f .git/HEAD.lock .git/index.lock

echo "🗑️  Removing .yarnrc.yml from git tracking..."
git rm my-medusa-store-storefront/.yarnrc.yml

echo "💾 Committing..."
git commit -m "fix: remove .yarnrc.yml so Vercel GitHub deploys use npm"

echo "🚀 Pushing to GitHub main..."
git push origin HEAD:main --force

echo ""
echo "✅ Done! Future GitHub-triggered deployments will use npm."
echo ""
read -p "Press Enter to close..."
