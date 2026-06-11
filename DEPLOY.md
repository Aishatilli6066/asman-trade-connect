# ASMAN Prime Hub — Vercel Deployment Guide

## What was changed for Vercel

| File | Change |
|---|---|
| `vite.config.ts` | Added `nitro: { preset: "vercel" }`, removed CF server entry |
| `vercel.json` | Created — tells Vercel to use Bun and Nitro's Build Output API |
| `wrangler.jsonc` | Deleted — Cloudflare Workers config, not needed |
| `package.json` | Removed `@cloudflare/vite-plugin` dependency |
| `.gitignore` | Added `.vercel/` (build output) |

## What was NOT changed

- `src/lib/email.server.ts` — nodemailer SMTP, untouched
- `src/lib/forms.functions.ts` — all 3 form handlers, untouched
- All form components — untouched
- All routes, assets, styles — untouched

---

## Environment Variables Required on Vercel

Add these in **Vercel Dashboard → Project → Settings → Environment Variables**.
Set them for **Production**, **Preview**, and **Development** environments.

| Variable | Value | Notes |
|---|---|---|
| `SMTP_USER` | `contact@asmanprimehub.com` | Your Namecheap Private Email address |
| `SMTP_PASS` | *(your email password)* | The password for contact@asmanprimehub.com |

**SMTP config (already hardcoded in `src/lib/email.server.ts` — no env var needed):**
- Host: `mail.privateemail.com`
- Port: `465`
- Secure (SSL): `true`

---

## Step-by-Step: Push to GitHub

The GitHub repository is already configured:
`https://github.com/Aishatilli6066/asman-trade-connect`

### Option A — Push from Replit UI (recommended)
1. In Replit, click the **Git** icon in the left sidebar
2. You will see the pending commits
3. Click **Push** to send them to GitHub

### Option B — Push via Replit Shell
1. Open the Replit Shell
2. Run:
   ```bash
   git push origin main
   ```
3. If prompted for credentials, use your GitHub username and a
   **Personal Access Token** (not your password) from:
   GitHub → Settings → Developer Settings → Personal Access Tokens → Tokens (classic)
   Scope needed: `repo`

---

## Step-by-Step: Deploy to Vercel

### 1. Create Vercel account (if needed)
Go to https://vercel.com and sign up with your GitHub account.

### 2. Import the GitHub repository
1. In Vercel Dashboard, click **Add New → Project**
2. Select **Import Git Repository**
3. Find `asman-trade-connect` and click **Import**

### 3. Configure the project
Vercel will auto-detect the framework. Verify or set these settings:

| Setting | Value |
|---|---|
| Framework Preset | **Other** (Nitro handles everything) |
| Root Directory | `.` (leave blank) |
| Build Command | `bun run build` |
| Output Directory | *(leave blank — auto-detected from `.vercel/output`)* |
| Install Command | `bun install --frozen-lockfile` |
| Node.js Version | **20.x** (or 22.x) |

### 4. Add Environment Variables
Before clicking Deploy, scroll to **Environment Variables** and add:

```
SMTP_USER = contact@asmanprimehub.com
SMTP_PASS = [your email password]
```

### 5. Click Deploy
Vercel will:
1. Install dependencies with Bun
2. Run `bun run build` → generates `.vercel/output/`
3. Deploy static assets to Vercel's CDN
4. Deploy SSR + form handler as a Node.js serverless function

---

## Step-by-Step: Connect asmanprimehub.com

### Add the apex domain
1. Vercel Dashboard → Project → **Settings → Domains**
2. Click **Add Domain**
3. Enter: `asmanprimehub.com`
4. Vercel will show you DNS records to add

### Add the www subdomain
5. Also add: `www.asmanprimehub.com`
6. Vercel will auto-configure a redirect from `www` → apex (or vice versa, your choice)

### Update DNS at Namecheap
Log in to Namecheap → Domain List → **Manage** → **Advanced DNS**

Add these records (Vercel will show exact values):

| Type | Host | Value |
|---|---|---|
| A | `@` | `76.76.21.21` (Vercel's IP) |
| CNAME | `www` | `cname.vercel-dns.com` |

> ⚠️ **Important:** Do NOT remove your existing MX records for email.
> Only add/change the A and CNAME records above.
> Your `mail.privateemail.com` MX records must stay intact for email to keep working.

### SSL
Vercel automatically provisions a free SSL certificate (Let's Encrypt) once DNS propagates (usually within 1–24 hours).

---

## Build Verification Results

Run on: 2026-06-11

```
✓ Preset:     nitro:vercel
✓ Client:     .vercel/output/static/  (all assets + CSS)
✓ Server fn:  .vercel/output/functions/__server.func/
✓ nodemailer: bundled (400 kB) — SMTP works on Vercel Node.js runtime
✓ forms:      forms.functions bundled — all 3 form handlers present
✓ Config:     .vercel/output/config.json — routes configured correctly
✓ Build time: ~30 seconds total
```

---

## After Deploying — Test Email

Once live on Vercel, test each form once:
1. Submit the **Consultation Request** form
2. Check `contact@asmanprimehub.com` for the notification email
3. Check the submitter email for the confirmation

If emails are not arriving, check Vercel Function Logs:
Vercel Dashboard → Project → **Deployments → Functions** → View logs for `__server`
