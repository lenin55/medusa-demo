# Medusa Demo — Deployment Info

## ✅ GitHub Repo
https://github.com/lenin55/medusa-demo

**Push your code first (run in Terminal):**
```bash
cd /Users/leninm/Documents/Work/medusa-demo
git remote add origin https://github.com/lenin55/medusa-demo.git
git push -u origin main
```

---

## ✅ Neon PostgreSQL (FREE)
Project: medusa-demo  
Region: AWS US East 1 (N. Virginia)  
Connection string:
```
postgresql://neondb_owner:npg_ja2pmvxgQnF1@ep-small-bar-am73mpu5-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

---

## ✅ Generated Secrets
```
JWT_SECRET=f797368fc7bcf742be554d3129f292e3ab12370371028168b9649eee29a4118b
COOKIE_SECRET=4079bd7bc592314405c519c6054ab7ef15990583c21bd41d8c24841e76bd44cf
```

---

## ⚙️ Render (Backend — FREE, replaces Railway whose trial expired)
Service name: medusa-demo-backend  
Root directory: backend  
Build command: npm install && npm run build  
Start command: npx medusa migrations run && npm start  
Node version: 20

### Environment Variables to add in Render dashboard:
```
DATABASE_URL=postgresql://neondb_owner:npg_ja2pmvxgQnF1@ep-small-bar-am73mpu5-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
JWT_SECRET=f797368fc7bcf742be554d3129f292e3ab12370371028168b9649eee29a4118b
COOKIE_SECRET=4079bd7bc592314405c519c6054ab7ef15990583c21bd41d8c24841e76bd44cf
NODE_ENV=production
PORT=10000
STORE_CORS=https://YOUR-STORE.vercel.app
ADMIN_CORS=https://YOUR-BACKEND.onrender.com
AUTH_CORS=https://YOUR-BACKEND.onrender.com,https://YOUR-STORE.vercel.app
```
(Update STORE_CORS, ADMIN_CORS, AUTH_CORS once you have the actual URLs)

---

## ⚙️ Vercel (Storefront — FREE)
Root directory: storefront

### Environment Variables to add in Vercel dashboard:
```
MEDUSA_BACKEND_URL=https://YOUR-BACKEND.onrender.com
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_c2789ba135c4ecadef1b985d17724a64170aefcc5ad9ff2ff3bd24f7ffd0debe
NEXT_PUBLIC_BASE_URL=https://YOUR-STORE.vercel.app
NEXT_PUBLIC_DEFAULT_REGION=us
REVALIDATE_SECRET=supersecret
```

---

## ⚠️ Note on Render Free Tier
Render free tier spins down after 15 min of inactivity (~50 sec cold start on first visit).  
To avoid cold starts during a client demo, open the backend URL ~1 min before your demo starts.  
URL pattern: https://medusa-demo-backend.onrender.com/health
