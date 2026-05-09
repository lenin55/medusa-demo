#!/bin/bash
# Trigger Vercel redeploy of the latest deployment (env vars are now set)
echo "🚀 Redeploying with the new env vars now set..."

vercel redeploy dpl_C35uhb6ZCbDXXLDMyGp9kx1Rhf4h --target production

echo ""
echo "✅ Done! Watch: https://vercel.com/Lenin55s-projects/medusa-demo-storefront"
echo ""
read -p "Press Enter to close..."
