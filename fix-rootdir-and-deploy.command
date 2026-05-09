#!/bin/bash
# Fix Vercel root directory setting and deploy
set -e

REPO_DIR="/Users/leninm/Documents/Work/medusa"
PROJECT_ID="prj_d2HZ6L76trEUYexLHrb1wtnu3thT"
TEAM_ID="team_NJJcdF05O003pZR5KvEcSPhN"

echo "📦 Navigating to repo root..."
cd "$REPO_DIR"

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
" 2>/dev/null) || true

if [ -z "$TOKEN" ]; then
  echo "❌ Could not find Vercel token. Trying alternate method..."
  # Try reading from global vercel config directory
  TOKEN=$(find ~/Library/Application\ Support/com.vercel.cli -name "auth.json" 2>/dev/null | head -1 | xargs python3 -c "import sys,json; d=json.load(open(sys.argv[1])); print(d.get('token','') or list(d.values())[0].get('token',''))" 2>/dev/null) || true
fi

if [ -z "$TOKEN" ]; then
  echo "❌ Could not read Vercel token automatically."
  echo ""
  echo "Please open: https://vercel.com/account/tokens"
  echo "Create a token, then paste it here:"
  read -p "Vercel Token: " TOKEN
fi

if [ -z "$TOKEN" ]; then
  echo "❌ No token provided. Exiting."
  exit 1
fi

echo "✅ Got token"
echo ""
echo "🔧 Updating Vercel project root directory to 'my-medusa-store-storefront'..."
RESULT=$(curl -s -X PATCH \
  "https://api.vercel.com/v9/projects/$PROJECT_ID?teamId=$TEAM_ID" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"rootDirectory": "my-medusa-store-storefront"}')

echo "$RESULT" | python3 -c "import sys,json; d=json.load(sys.stdin); print('✅ Root directory updated to:', d.get('rootDirectory','unknown'))" 2>/dev/null || echo "$RESULT"

echo ""
echo "🚀 Deploying to production..."
vercel deploy --prod

echo ""
echo "✅ Done!"
echo "   Watch: https://vercel.com/Lenin55s-projects/medusa-demo-storefront"
echo ""
read -p "Press Enter to close..."
