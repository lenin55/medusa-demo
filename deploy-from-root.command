#!/bin/bash
# Deploy storefront to Vercel from the repo root
# This lets Vercel CLI use the project's configured root directory correctly

set -e

REPO_DIR="/Users/leninm/Documents/Work/medusa"
PROJECT_NAME="medusa-demo-storefront"
TEAM_SLUG="Lenin55s-projects"

echo "📦 Navigating to repo root..."
cd "$REPO_DIR"

echo "🔗 Linking Vercel project (if needed)..."
if [ ! -f ".vercel/project.json" ]; then
  vercel link --yes --project "$PROJECT_NAME"
fi

echo ""
echo "🚀 Deploying to production from repo root..."
vercel deploy --prod

echo ""
echo "✅ Done!"
echo "   Watch: https://vercel.com/Lenin55s-projects/medusa-demo-storefront"
echo ""
read -p "Press Enter to close..."
