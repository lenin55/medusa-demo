#!/bin/bash
# Medusa Demo - Vercel Environment Variables Setup
# Double-click this file from Finder to run it in Terminal

set -e

BACKEND_URL="https://medusa-demo-backend.onrender.com"
STOREFRONT_URL="https://medusa-demo-storefront-lenin55s-projects.vercel.app"
PUBLISHABLE_KEY="pk_c2789ba135c4ecadef1b985d17724a64170aefcc5ad9ff2ff3bd24f7ffd0debe"
REVALIDATE_SECRET="supersecret"
DEFAULT_REGION="us"
PROJECT_NAME="medusa-demo-storefront"
TEAM_SLUG="lenin55s-projects"

echo ""
echo "============================================"
echo "  Medusa Demo — Vercel Setup Script"
echo "============================================"
echo ""

# Install Vercel CLI if not present
if ! command -v vercel &> /dev/null; then
  echo "📦 Installing Vercel CLI..."
  npm install -g vercel
fi

echo "✅ Vercel CLI ready: $(vercel --version)"
echo ""

# Check login status / login if needed
echo "🔐 Checking Vercel login..."
if ! vercel whoami --scope "$TEAM_SLUG" &>/dev/null; then
  echo "Please log in to Vercel:"
  vercel login
fi

echo "✅ Logged in as: $(vercel whoami)"
echo ""

# Navigate to repo root (storefront dir)
cd "$(dirname "$0")/my-medusa-store-storefront"

# Link project if not already linked
if [ ! -f ".vercel/project.json" ]; then
  echo "🔗 Linking Vercel project..."
  vercel link --yes --project "$PROJECT_NAME" --scope "$TEAM_SLUG"
fi

echo ""
echo "📋 Setting environment variables..."

set_env() {
  local NAME=$1
  local VALUE=$2
  echo "  → Setting $NAME"
  # Remove existing if it exists, then add fresh
  vercel env rm "$NAME" production --yes 2>/dev/null || true
  echo "$VALUE" | vercel env add "$NAME" production
}

set_env "MEDUSA_BACKEND_URL"                    "$BACKEND_URL"
set_env "NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY"    "$PUBLISHABLE_KEY"
set_env "NEXT_PUBLIC_BASE_URL"                  "$STOREFRONT_URL"
set_env "NEXT_PUBLIC_DEFAULT_REGION"            "$DEFAULT_REGION"
set_env "REVALIDATE_SECRET"                     "$REVALIDATE_SECRET"

echo ""
echo "✅ All environment variables set!"
echo ""
echo "🚀 Triggering production deployment..."
vercel deploy --prod --yes

echo ""
echo "============================================"
echo "  🎉 Done! Your storefront is deploying."
echo "  URL: $STOREFRONT_URL"
echo "  (Takes ~2 mins to build)"
echo "============================================"
echo ""
read -p "Press Enter to close..."
