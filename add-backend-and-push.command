#!/bin/bash
# Fix: Add my-medusa-store backend to git and push to main so Render can deploy it
set -e

cd "$(dirname "$0")"

echo "=== Super Shop Backend Deploy Fix ==="
echo ""

# Remove any stale git lock
rm -f .git/index.lock
echo "✓ Cleared any git locks"

# Verify .medusa/server exists (the pre-built artifacts Render needs)
if [ ! -d "my-medusa-store/.medusa/server" ]; then
  echo "✗ ERROR: my-medusa-store/.medusa/server not found!"
  echo "  Run 'npm run build' inside my-medusa-store first."
  read -p "Press Enter to exit..."
  exit 1
fi
echo "✓ Pre-built server artifacts found"

# Stage my-medusa-store
git add my-medusa-store/
echo "✓ Staged my-medusa-store/"

# Show what's being added
ADDED=$(git diff --cached --name-only | head -20)
echo ""
echo "Files being committed (first 20):"
echo "$ADDED"
echo ""

# Commit
git commit -m "feat: add my-medusa-store backend with pre-built artifacts for Render"
echo "✓ Committed"

# Push to main
git push origin HEAD:main
echo ""
echo "✓ Pushed to main!"
echo ""
echo "=== Render will now auto-deploy. Check: ==="
echo "   https://dashboard.render.com/web/srv-d7d2f3n41pts739p1reg/events"
echo ""
read -p "Press Enter to close..."
