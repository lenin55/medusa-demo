# Deploy Medusa Backend to Railway (Free, No Sleep)

Railway gives $5/month free credit — plenty for a demo backend that never sleeps.

## Steps

### 1. Sign up / log in to Railway
Go to: https://railway.app
Sign in with GitHub (same account: Lenin55)

### 2. Create a new project from your GitHub repo
- Click "New Project" → "Deploy from GitHub repo"
- Select: `Lenin55/medusa-demo`
- Set the **Root Directory** to: `my-medusa-store-backend`
  (or wherever your Medusa backend folder is)

### 3. Add environment variables in Railway
In your Railway service → Variables tab, add:

```
DATABASE_URL=<your Neon DB connection string from DEPLOYMENT_INFO.md>
JWT_SECRET=supersecret
COOKIE_SECRET=supersecret
STORE_CORS=https://medusa-demo-storefront-Lenin55s-projects.vercel.app
ADMIN_CORS=https://medusa-demo-storefront-Lenin55s-projects.vercel.app
AUTH_CORS=https://medusa-demo-storefront-Lenin55s-projects.vercel.app
```

### 4. Get your Railway backend URL
Railway gives you a URL like: `https://your-service.up.railway.app`

### 5. Update Vercel env var
Run the update-backend-url.command script with your new Railway URL.
