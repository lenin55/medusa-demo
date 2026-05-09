#!/bin/bash
# Run this script from Terminal to push medusa-demo to GitHub
# Usage: bash push-to-github.sh

set -e

DEMO_DIR="/Users/leninm/Documents/Work/medusa-demo"
REMOTE="https://github.com/lenin55/medusa-demo.git"

echo "📦 Navigating to medusa-demo..."
cd "$DEMO_DIR"

echo "🔗 Adding GitHub remote..."
git remote remove origin 2>/dev/null || true
git remote add origin "$REMOTE"

echo "🚀 Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Done! Code is live at: https://github.com/lenin55/medusa-demo"
