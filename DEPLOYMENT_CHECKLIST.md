# Towns Oracle Price Bot - Deployment Checklist

## Quick Start Checklist

Follow this checklist to deploy your bot to Towns in under 30 minutes.

---

## Phase 1: Prerequisites Setup (5 minutes)

- [ ] Node.js v20+ installed (`node --version`)
- [ ] Bun installed (`bun --version`)
- [ ] GitHub account created with SSH key configured
- [ ] Render.com account created
- [ ] Towns account active at app.towns.com
- [ ] This repository cloned locally

---

## Phase 2: Create Towns Bot Account (5 minutes)

### Steps:
- [ ] Navigate to https://app.towns.com/developer
- [ ] Click "Create Bot"
- [ ] Fill in bot name: "Price Oracle Bot" (or your choice)
- [ ] Add description: "Real-time Chainlink crypto prices"
- [ ] Click "Create"

### Save These Credentials:
- [ ] Copy `APP_PRIVATE_DATA` and save securely
- [ ] Copy `JWT_SECRET` and save securely
- [ ] ⚠️ **Do NOT share these credentials**
- [ ] ⚠️ **Do NOT commit them to GitHub**

---

## Phase 3: Prepare Local Development (3 minutes)

### Steps:
- [ ] Clone repo: `git clone https://github.com/MansourDch/towns-oracle-price-bot.git`
- [ ] Navigate to project: `cd towns-oracle-price-bot`
- [ ] Copy env file: `cp .env.example .env`
- [ ] Edit `.env` file:
  - [ ] Paste `APP_PRIVATE_DATA` value
  - [ ] Paste `JWT_SECRET` value
  - [ ] Set `PORT=5123`
  - [ ] Set `NODE_ENV=development`
- [ ] Install dependencies: `bun install`
- [ ] Build project: `bun run build`
- [ ] Test locally: `bun run dev` (should see bot logs)

---

## Phase 4: Push to GitHub (2 minutes)

### Steps:
- [ ] Create new repository on GitHub: https://github.com/new
- [ ] Set repository name to: `towns-oracle-price-bot`
- [ ] Make it public
- [ ] Copy the new repository URL
- [ ] In your local project:
  - [ ] `git remote set-url origin YOUR_NEW_REPO_URL`
  - [ ] `git push -u origin main`
- [ ] Verify files are on GitHub

---

## Phase 5: Deploy to Render.com (10 minutes)

### 5.1 Create Render Account
- [ ] Go to https://render.com/
- [ ] Sign up (use GitHub account for faster setup)
- [ ] Complete email verification

### 5.2 Create Web Service
- [ ] Log in to Render dashboard
- [ ] Click "New +" → "Web Service"
- [ ] Connect GitHub account if prompted
- [ ] Select your `towns-oracle-price-bot` repository
- [ ] Click "Connect"

### 5.3 Configure Service
- [ ] **Name**: `towns-oracle-price-bot`
- [ ] **Language**: `Node`
- [ ] **Build Command**: `bun install && bun run build`
- [ ] **Start Command**: `bun run start`
- [ ] **Region**: Select closest to you

### 5.4 Set Environment Variables
In the Environment section, add:

| Key | Value |
|-----|-------|
| `APP_PRIVATE_DATA` | Your saved value |
| `JWT_SECRET` | Your saved value |
| `PORT` | `5123` |
| `NODE_ENV` | `production` |
| `BASE_RPC_URL` | `https://mainnet.base.org` |

- [ ] All variables entered correctly
- [ ] No typos in variable names
- [ ] No extra spaces in values

### 5.5 Deploy
- [ ] Click "Create Web Service"
- [ ] Wait for build to complete (3-5 minutes)
- [ ] Watch logs for errors
- [ ] Deployment URL appears (save this URL)

### 5.6 Verify Deployment
- [ ] Check Render dashboard shows "Live" status
- [ ] No errors in logs
- [ ] Bot is running successfully

---

## Phase 6: Configure Webhook in Towns (3 minutes)

### Steps:
- [ ] Go back to https://app.towns.com/developer
- [ ] Click on your bot
- [ ] Find "Webhook URL" field
- [ ] Enter: `https://YOUR-RENDER-URL.onrender.com/webhook`
  - [ ] Replace YOUR-RENDER-URL with actual Render URL
  - [ ] **Do NOT forget the `/webhook` path**
- [ ] Click "Save"
- [ ] Scroll to "Forwarding Settings"
- [ ] Select "Mentions, Commands, Replies & Reactions"
- [ ] Click "Save"

---

## Phase 7: Install Bot to Space (2 minutes)

### Steps:
- [ ] Open Towns app
- [ ] Go to a space you own or administer
- [ ] Click "Space Settings" (gear icon)
- [ ] Select "Bots" tab
- [ ] Search for your bot by name
- [ ] Click "Install"
- [ ] Review and grant permissions
- [ ] Click "Confirm"

---

## Phase 8: Test the Bot (2 minutes)

### Steps:
- [ ] Go to a channel in the space
- [ ] Type: `/price ETH`
- [ ] Bot responds with current ETH price ✅
- [ ] Try other commands:
  - [ ] `/price BTC`
  - [ ] `/price LINK`
  - [ ] `/price USDC`
- [ ] All commands work ✅

---

## Phase 9: Verify Production Status

- [ ] Bot shows as "Online" in Towns app
- [ ] Render shows "Live" status
- [ ] No errors in Render logs (check every 5 min)
- [ ] Response time acceptable (<2 seconds)
- [ ] All price feeds returning correct data

---

## Post-Deployment Verification

### Monitor for 24 Hours:
- [ ] Check Render logs daily for errors
- [ ] Test bot commands multiple times
- [ ] Monitor response times
- [ ] Verify price accuracy
- [ ] Check for any webhook failures

### Share Your Bot:
- [ ] Share bot link with Towns community
- [ ] Post on social media (X/Twitter, Discord)
- [ ] Add to Towns bot directory
- [ ] Get community feedback

---

## Troubleshooting Reference

### Bot Not Responding?
1. [ ] Verify webhook URL in Towns settings (with `/webhook`)
2. [ ] Check Render logs for errors
3. [ ] Verify JWT_SECRET and APP_PRIVATE_DATA are correct
4. [ ] Ensure bot is installed in the space
5. [ ] Check forwarding settings allow commands

### Webhook Verification Failed?
1. [ ] Check JWT_SECRET is exactly as created (copy-paste)
2. [ ] No extra spaces or line breaks
3. [ ] Redeploy on Render if just updated
4. [ ] Check Render logs for specific error

### Slow Responses?
1. [ ] First request may be slow due to Render free tier
2. [ ] Check Base network status
3. [ ] Verify Chainlink feeds are responding
4. [ ] Monitor Render CPU/memory usage

---

## Support & Resources

- Towns Documentation: https://docs.towns.com/build/bots/introduction
- Render Docs: https://render.com/docs
- Chainlink Data Feeds: https://docs.chain.link/data-feeds
- GitHub Issues: https://github.com/MansourDch/towns-oracle-price-bot/issues

---

## Success!

🎉 **Congratulations!** Your Towns Oracle Price Bot is now live!

### What's Next?
- Share your bot with other Towns communities
- Add more price feeds
- Implement additional features
- Monitor bot performance
- Gather user feedback for improvements

---

**Deployment Time**: ~30 minutes total
**Status**: ✅ Ready for Production
