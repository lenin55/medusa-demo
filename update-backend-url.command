#!/bin/bash
# Update Vercel backend URL after moving to Railway
set -e

echo "Enter your new Railway backend URL (e.g. https://your-service.up.railway.app):"
read -p "Railway URL: " RAILWAY_URL

if [ -z "$RAILWAY_URL" ]; then
  echo "❌ No URL provided."
  exit 1
fi

REPO_DIR="/Users/leninm/Documents/Work/medusa"
PROJECT_ID="prj_d2HZ6L76trEUYexLHrb1wtnu3thT"
TEAM_ID="team_NJJcdF05O003pZR5KvEcSPhN"

echo ""
echo "🔑 Reading Vercel token..."
TOKEN=$(node -e "
  const os = require('os');
  const path = require('path');
  const fs = require('fs');
  const dirs = [
    path.join(os.homedir(), 'Library/Application Support/com.vercel.cli/auth.json'),
    path.join(os.homedir(), '.local/share/com.vercel.cli/auth.json'),
    path.join(os.homedir(), '.config/vercel/auth.json'),
    path.join(os.homedir(), '.vercel/auth.json'),
  ];
  for (const d of dirs) {
    try {
      const data = JSON.parse(fs.readFileSync(d, 'utf8'));
      const token = data.token || (Object.values(data)[0] && Object.values(data)[0].token);
      if (token) { process.stdout.write(token); break; }
    } catch(e) {}
  }
" 2>/dev/null)

echo "✅ Got token"

echo ""
echo "🔧 Updating MEDUSA_BACKEND_URL in Vercel to: $RAILWAY_URL"

# Update env var via Vercel CLI
cd "$REPO_DIR/my-medusa-store-storefront"
echo "$RAILWAY_URL" | vercel env rm MEDUSA_BACKEND_URL production --yes 2>/dev/null || true
echo "$RAILWAY_URL" | vercel env add MEDUSA_BACKEND_URL production

echo ""
echo "🚀 Triggering new Vercel deployment..."
cd "$REPO_DIR"
vercel deploy --prod

echo ""
echo "✅ Done! Your Super Shop storefront is redeploying with the new backend."
echo ""
read -p "Press Enter to close..."
