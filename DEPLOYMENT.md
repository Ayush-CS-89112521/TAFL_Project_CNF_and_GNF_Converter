# 🚀 Deployment Guide: TAFL Project on Vercel

> Complete step-by-step guide to deploy the TAFL CNF & GNF Converter to Vercel

## Table of Contents

- [Quick Start (5 Minutes)](#quick-start-5-minutes)
- [Option 1: Deploy Using GitHub (Recommended)](#option-1-deploy-using-github-recommended)
- [Option 2: Deploy Using Vercel CLI](#option-2-deploy-using-vercel-cli)
- [Verification](#verification)
- [Auto-Deployment on Git Push](#auto-deployment-on-git-push)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)
- [Custom Domain Setup](#custom-domain-setup)

---

## Quick Start (5 Minutes)

### Prerequisites
- ✅ GitHub account with your repo pushed
- ✅ Vercel account (free at [vercel.com](https://vercel.com))

### Deploy in 3 Steps

**Step 1:** Visit [vercel.com/dashboard](https://vercel.com/dashboard)

**Step 2:** Click "Add New..." → "Project" → "Import Git Repository"
- Search for: `TAFL_Project_CNF_and_GNF_Converter`
- Select your repository

**Step 3:** Click "Deploy"
- Vercel auto-detects Vite configuration
- Build and deploy happens automatically (2-5 minutes)

**Done!** You'll get a live URL:
```
https://tafl-cnf-gnf.vercel.app
```

---

## Option 1: Deploy Using GitHub (Recommended)

### Step 1: Push Code to GitHub

Ensure everything is committed and pushed:

```bash
cd "Tafl Project 25"
git status
git add .
git commit -m "Deploy: ready for Vercel"
git push origin main
```

Verify on GitHub:
- Go to [github.com/YOUR-USERNAME/TAFL_Project_CNF_and_GNF_Converter](https://github.com)
- Confirm latest commit is visible

### Step 2: Import to Vercel

1. **Sign in to Vercel Dashboard**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click your avatar → ensure you're in correct team/account

2. **Create New Project**
   - Click "Add New..." button
   - Select "Project" from dropdown

3. **Import GitHub Repository**
   - Click "Import Git Repository"
   - In search box, type: `TAFL_Project_CNF_and_GNF_Converter`
   - Select your repository from search results
   - Click "Import"

### Step 3: Configure Project

Vercel auto-detects settings. Verify:
- **Project Name**: `tafl-cnf-gnf` (or your preferred name)
- **Framework Preset**: `Vite` (should be auto-detected)
- **Root Directory**: `.` (current directory)
- **Build Command**: (leave empty for auto-detect or use) `npm run build`
- **Output Directory**: (leave empty for auto-detect or use) `dist`
- **Install Command**: (leave empty for auto-detect)

**No Environment Variables needed for this project.**

### Step 4: Deploy

Click the **"Deploy"** button and wait:
- Vercel will download your code
- Install dependencies (~1 minute)
- Build project (~1 minute)
- Deploy to CDN (~1 minute)
- Total: 2-5 minutes

### Step 5: Access Your Live Site

Once deployment completes, you'll see:
```
✓ Production Deployment
https://tafl-cnf-gnf.vercel.app [or your custom name]
```

**Copy this URL** and share it! Your site is live! 🎉

---

## Option 2: Deploy Using Vercel CLI

Useful for automated deployments or if you prefer terminal.

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

Verify installation:
```bash
vercel --version
```

### Step 2: Login to Vercel

```bash
vercel login
```

Follow browser prompts to authenticate with your Vercel account.

### Step 3: Deploy

From your project root:

```bash
cd "Tafl Project 25"
vercel --prod
```

Follow the interactive prompts:
```
? Set up and deploy "~/Desktop/Tafl Project 25"? [Y/n] → Y
? Which scope should contain your project? → [Your account/team]
? Link to existing project? [y/N] → N (for first-time setup)
? What's your project's name? → tafl-cnf-gnf
? In which directory is your code located? → .
? Want to modify these settings? [y/N] → N

Deployment complete!
https://tafl-cnf-gnf.vercel.app
```

### Step 4: Future Deployments

For subsequent deployments:

```bash
vercel --prod
```

Or for preview/staging:
```bash
vercel
```

---

## Verification

### Test Your Deployment

1. **Visit your URL** (e.g., https://tafl-cnf-gnf.vercel.app)
2. **Test core functionality**:
   - [ ] Input a grammar: `S → aA | b` and `A → a`
   - [ ] Click "Convert to CNF"
   - [ ] Navigate through transformation steps
   - [ ] Click "Convert to GNF"
   - [ ] View dependency graph
   - [ ] Test PDF export
   - [ ] Use archive/history feature

3. **Verify no console errors**:
   - Press F12 (Developer Tools)
   - Check Console tab for JavaScript errors
   - Check Network tab for failed resource loads

### Check Build Logs

**Method 1: Vercel Dashboard**
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click your project
3. Click **Deployments** tab
4. Click your deployment
5. Scroll to see build logs and errors

**Method 2: Vercel CLI**
```bash
vercel logs --prod
```

### Common Verification Issues

**Issue**: Site shows "404 Not Found"
- **Cause**: Still building (wait another minute)
- **Solution**: Refresh page (Ctrl+F5 / Cmd+Shift+R)

**Issue**: CSS/styling looks wrong
- **Cause**: Assets still loading
- **Solution**: Hard refresh or wait 30 seconds

**Issue**: Features don't work
- **Cause**: Check console errors
- **Solution**: See troubleshooting section below

---

## Auto-Deployment on Git Push

After initial setup, **Vercel automatically builds and deploys** whenever you push to GitHub.

### How It Works

```bash
# Make code changes locally
echo "new feature code" >> src/App.tsx

# Commit and push
git add .
git commit -m "feat: add new transformation"
git push origin main

# Vercel automatically:
# 1. Detects push via GitHub webhook (instant)
# 2. Downloads latest code (instant)
# 3. Builds project (1-2 minutes)
# 4. Deploys to production (instant)
# 5. Sends you deployment notification
```

### Check Auto-Deploy Status

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click your project
3. **Deployments** tab shows history with timestamps
4. Most recent at top = currently live version

### Monitor Builds

You can also watch in VS Code:
```bash
# In terminal, watch for GitHub changes
git log --oneline -5

# Then check Vercel dashboard for corresponding deployments
```

---

## Environment Variables

### What Are They?

Environment variables store sensitive data (API keys, database URLs, etc.) without hardcoding them.

### This Project

**Currently**: No environment variables needed ✓

**In future** (if you add):
- Cloud storage integration (S3, Firebase)
- Analytics API keys
- Backend API endpoints
- Third-party service credentials

### How to Add

1. **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Click "Add New"
3. Enter:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://api.example.com`
   - **Select Environments**: Production, Preview, Development
4. Save → Vercel redeploys automatically

### Local Testing

Create `.env.local` in project root:

```
VITE_API_URL=https://localhost:3000
VITE_PUBLIC_KEY=test-key
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

**Note**: Only variables starting with `VITE_` are exposed to browser (security feature).

---

## Troubleshooting

### Build Failed with TypeScript Error

**Error Message in Vercel**: `error TS2307: Cannot find module...`

**Solution**:
```bash
# 1. Check locally
npm run build

# 2. If it fails locally, fix errors and retry

# 3. If it works locally but fails on Vercel:
rm -r node_modules package-lock.json
npm install
npm run build

# 4. Push to GitHub
git add .
git commit -m "fix: resolve build errors"
git push origin main

# 5. Vercel auto-redeploys with latest dependencies
```

### Deployment Succeeds but Site Blank/404

**Cause**: Output directory misconfigured

**Solution**:
1. Vercel Dashboard → Your Project → **Settings** → **Build & Development Settings**
2. Verify:
   - **Output Directory**: `dist`
   - **Build Command**: `npm run build`
3. Manually trigger redeploy:
   - Go to **Deployments** tab
   - Click "..." on latest deployment
   - Select **Redeploy**

### CSS/Images Not Loading

**Cause**: Asset paths relative to wrong location

**Solution**:
1. Check `vite.config.ts` includes: `base: '/',`
2. Verify images in `public/` folder are committed
3. Run `npm run build` locally and check `dist/` folder has all assets

### Site Very Slow

**Cause**: Large bundle size or network issues

**Check Bundle Size**:
```bash
npm run build

# Output shows size:
# dist/assets/index.js  650.73 kB → 156.24 kB (gzipped)
```

This is normal for this project. Initial load is 1-2 seconds, then fast.

### LocalStorage/History Lost

**Expected Behavior**: Browser storage is local to each browser/device—doesn't sync.

**Solution**:
- Export important grammars as PDF before clearing cache
- Use Archive feature to save conversions to GitHub

### Error: Vercel Build Step Timeout

**Cause**: Build taking >15 minutes (rare)

**Solution**:
1. Check for infinite loops or very slow dependencies
2. Verify `vite.config.ts` doesn't have heavy operations in build
3. Try building locally: `npm run build --debug`
4. Ask in Vercel support if persistent

---

## Custom Domain Setup (Optional)

### Add Your Own Domain

After deployment is working, add custom domain:

1. **Vercel Dashboard** → Your Project → **Settings** → **Domains**

2. **Click "Add Domain"**
   - Enter your domain: `myproject.com`
   - Or subdomain: `grammar.myproject.com`
   - Click "Add"

3. **Configure DNS**
   - Vercel shows you the DNS records to add
   - Typical: Add CNAME record pointing to Vercel
   - Example for GoDaddy/Namecheap:
     ```
     Host: myproject.com
     Type: CNAME
     Value: cname.vercel-dns.com
     ```

4. **Wait for DNS Propagation**
   - Usually <1 hour
   - Can take up to 24 hours
   - Check status in Vercel Dashboard

### Verify Domain

```bash
# Check if domain resolves
nslookup myproject.com

# Should show CNAME pointing to Vercel
```

---

## Performance Monitoring

### Build Metrics

**Current Project Stats**:
- **Build Time**: 40-60 seconds
- **Bundle Size**: 650 KB (uncompressed) → 156 KB (gzipped)
- **Initial Page Load**: <1 second
- **Time to Interactive**: 2-3 seconds

### Vercel Analytics (Free)

1. Vercel Dashboard → Your Project
2. View metrics:
   - Deployments history
   - Build time trend
   - Request counts
   - Error logs

### Add Google Analytics (Optional)

```typescript
// src/main.tsx
if (window.location.hostname !== 'localhost') {
  const script = document.createElement('script');
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
  script.async = true;
  document.head.appendChild(script);
  
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
}
```

Replace `G-XXXXXXXXXX` with your Google Analytics ID.

---

## Rollback to Previous Version

Need to undo a deployment?

### Rollback Steps

1. **Vercel Dashboard** → Your Project → **Deployments**

2. **Find the Version You Want**
   - List shows all deployments with timestamps
   - Click one to see what changed

3. **Promote to Production**
   - Click "..." (three dots) next to deployment
   - Select "Promote to Production"
   - Vercel instantly serves that version

### Automatic Rollback

If new deployment has build errors:
- Vercel **keeps previous version live** ✓
- No downtime
- Check logs and fix issues
- Redeploy when ready

---

## Continuous Deployment Workflow

### Recommended Git + Vercel Flow

**For New Features**:

```bash
# 1. Create feature branch
git checkout -b feature/add-latex-export

# 2. Make changes
# Editor: write code in src/components/ExportPanel/index.tsx

# 3. Test locally
npm run dev
# Browser: test in http://localhost:5173

# 4. Commit changes
git add .
git commit -m "feat: add LaTeX export option"

# 5. Push to GitHub
git push origin feature/add-latex-export

# 6. Create Pull Request
# Go to GitHub.com → Compare & pull request
# Vercel automatically builds preview of PR
# Get preview URL to test

# 7. Merge when satisfied
# Click "Merge pull request" on GitHub
# Main branch push triggers production deployment

# 8. Verify live deployment
# Check https://tafl-cnf-gnf.vercel.app
```

**For Hotfixes** (urgent bugs):

```bash
# Skip branch, commit directly to main
git checkout main
git pull origin main

# Make fix
echo "bug fix code" >> src/App.tsx

# Commit and push
git add .
git commit -m "fix: urgent bug"
git push origin main

# Vercel auto-deploys within 2-5 minutes
```

---

## FAQ

### Q: Is Vercel free?
**A**: Yes! Hobby plan is free for personal projects. See [vercel.com/pricing](https://vercel.com/pricing)

### Q: Can I use my own domain?
**A**: Yes, add it in Vercel Dashboard → Settings → Domains

### Q: How do I update my site?
**A**: Just `git push origin main` — Vercel auto-deploys!

### Q: What if the build fails?
**A**: Check Vercel Dashboard → Deployments → click failed build for error logs

### Q: Can I add a backend API?
**A**: Yes, with Vercel Functions ([vercel.com/docs/functions](https://vercel.com/docs/functions))

### Q: Is my site secure?
**A**: Yes, Vercel uses HTTPS by default and has 99.99% uptime SLA

### Q: How do I enable SSL/HTTPS?
**A**: Automatic for all Vercel deployments ✓

### Q: Can I deploy multiple projects?
**A**: Yes, unlimited projects on free plan

### Q: What if Vercel has issues?
**A**: Can rollback to previous version in seconds. Or redeploy to GitHub Pages/Netlify as backup

---

## Summary Checklist

- [ ] Code pushed to GitHub (`git push origin main`)
- [ ] Vercel account created ([vercel.com](https://vercel.com))
- [ ] Project imported in Vercel Dashboard
- [ ] Deployment completed (check Deployments tab)
- [ ] Live URL accessed and tested
- [ ] Core features verified (CNF, GNF, export, archive)
- [ ] No console errors (check Developer Tools)

---

## Next Steps

1. **Follow Quick Start** (5 minutes)
2. **Test your live deployment** ✓
3. **Share your URL** with friends/colleagues
4. **Add custom domain** (optional)
5. **Set up custom analytics** (optional)

---

## Support & Resources

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Vercel Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
- **GitHub Issues**: [Report bugs in your repo](https://github.com/Ayush-CS-89112521/TAFL_Project_CNF_and_GNF_Converter/issues)
- **Email Support**: In Vercel Dashboard (Pro plan)

---

## Glossary

| Term | Meaning |
|------|---------|
| **Vercel** | Serverless platform for hosting web apps (like Heroku, Netlify) |
| **Build** | Process of compiling TypeScript → JavaScript |
| **Deploy** | Upload and serve your code on the internet |
| **Production** | Live version served to real users |
| **Preview** | Temporary preview version of a branch |
| **Rollback** | Revert to a previous version |
| **CDN** | Content Delivery Network (serves files from nearest server) |
| **HTTPS** | Secure connection protocol (automatic) |
| **Domain** | Your custom URL (e.g., myproject.com) |

---

**Happy Deploying! 🚀**

For questions, consult the resources above or check your Vercel Dashboard.
