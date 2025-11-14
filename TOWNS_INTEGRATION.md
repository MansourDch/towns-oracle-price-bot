# Towns Protocol Integration Guide

## Overview

This guide will walk you through integrating the **Towns Oracle Price Bot** into the Towns Protocol. The bot will be deployed as a chat bot that provides real-time Chainlink oracle prices within Towns communities.

## Prerequisites

Before you begin, ensure you have:

- ✅ Node.js v20+ installed ([install with Homebrew](https://brew.sh/): `brew install node`)
- ✅ [Bun](https://bun.sh/docs/installation) installed
- ✅ A [GitHub account](https://github.com/signup) with SSH key configured
- ✅ A [Render.com](https://render.com/) account (for bot hosting)
- ✅ A Towns account at [app.towns.com](https://app.towns.com/)

## Step 1: Create a Bot Account in Towns

### 1.1 Access the Developer Portal

1. Go to [app.towns.com/developer](https://app.towns.com/developer)
2. Click **"Create Bot"** button
3. Fill in the bot details:
   - **Bot Name**: `Price Oracle Bot` (or your preferred name)
   - **Bot Description**: `Real-time crypto price oracle powered by Chainlink`
   - **Bot Avatar**: (optional - upload an image)
4. Click **"Create Bot"**

### 1.2 Save Your Credentials

After creation, you'll receive two critical credentials:

- **`APP_PRIVATE_DATA`**: Your bot's private key and encryption device (base64 encoded)
- **`JWT_SECRET`**: Used to verify webhook requests from Towns servers

⚠️ **IMPORTANT**: Store these securely. You'll need them for deployment.

## Step 2: Prepare Your Bot for Deployment

### 2.1 Update package.json

Ensure your `package.json` has the correct scripts configured:

```json
{
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.ts"
  }
}
```

### 2.2 Configure Environment Variables

Copy `.env.example` to `.env` and update with your credentials:

```bash
cp .env.example .env
```

Edit `.env` and add:

```env
APP_PRIVATE_DATA=your_bot_private_data_here
JWT_SECRET=your_jwt_secret_here
PORT=5123
```

### 2.3 Push to GitHub

```bash
git add .
git commit -m "chore: Add Towns integration files"
git push origin main
```

## Step 3: Deploy to Render.com

### 3.1 Sign Up for Render

1. Go to [render.com](https://render.com/)
2. Click **"Sign Up"** (you can use your GitHub account)
3. Complete the registration

### 3.2 Create a New Web Service

1. Log in to Render Dashboard
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub account if prompted
4. Select the `towns-oracle-price-bot` repository

### 3.3 Configure Deployment Settings

Fill in the deployment configuration:

| Setting | Value |
|---------|-------|
| **Name** | `towns-oracle-price-bot` |
| **Language** | `Node` |
| **Build Command** | `bun install && bun run build` |
| **Start Command** | `bun run start` |
| **Region** | Select your preferred region |

### 3.4 Add Environment Variables

1. Scroll to **"Environment"** section
2. Add the following variables:

| Key | Value |
|-----|-------|
| `APP_PRIVATE_DATA` | Your APP_PRIVATE_DATA from bot creation |
| `JWT_SECRET` | Your JWT_SECRET from bot creation |
| `PORT` | `5123` |
| `NODE_ENV` | `production` |
| `BASE_RPC_URL` | `https://mainnet.base.org` |

### 3.5 Deploy

1. Click **"Create Web Service"**
2. Render will automatically:
   - Clone your repository
   - Install dependencies with `bun install`
   - Build with `bun run build`
   - Start the bot with `bun run start`
3. Wait for deployment to complete (3-5 minutes)
4. You'll receive a URL like: `https://towns-oracle-price-bot.onrender.com`

**Note**: Save this URL - you'll need it for the next step!

## Step 4: Configure the Bot in Towns

### 4.1 Set Webhook URL

1. Return to [app.towns.com/developer](https://app.towns.com/developer)
2. Click on your bot
3. Scroll to **"Webhook URL"**
4. Enter: `https://towns-oracle-price-bot.onrender.com/webhook`
5. Click **"Save"**

⚠️ **Important**: Don't forget the `/webhook` path at the end!

### 4.2 Configure Forwarding Settings

1. In the bot settings, scroll to **"Forwarding Settings"**
2. Select **"Mentions, Commands, Replies & Reactions"** (recommended for this bot)
3. Click **"Save"**

This setting allows the bot to:
- Respond to @mentions
- Execute slash commands
- React to messages
- Handle command replies

## Step 5: Install Bot to a Space

### 5.1 Add Bot to Your Space

1. Open the Towns app
2. Navigate to a space you own or administer
3. Go to **Space Settings** → **Bots**
4. Search for your bot by its name or username
5. Click **"Install"**
6. Grant necessary permissions when prompted

### 5.2 Test the Bot

In any channel where the bot is installed, try:

```
/price ETH
```

The bot should respond with the current ETH/USD price from Chainlink! 🎉

## Step 6: Supported Commands

Your bot supports the following commands:

### /price [SYMBOL]

Fetches real-time price from Chainlink oracle

**Supported Symbols:**
- `ETH` - Ethereum
- `BTC` - Bitcoin
- `LINK` - Chainlink
- `USDC` - USD Coin

**Examples:**
```
/price ETH
/price BTC
/price LINK
/price USDC
```

**Response Format:**
```
💰 **ETH/USD**: $3,450.23
_Verified by Chainlink on Base 🔵_
```

## Step 7: Monitoring & Maintenance

### Monitor Bot Logs

1. In Render Dashboard, select your service
2. Click **"Logs"** tab to view real-time logs
3. Check for any errors or issues

### Common Issues

#### Bot doesn't respond to commands
- ✅ Verify webhook URL is correct (with `/webhook` path)
- ✅ Check Render logs for errors
- ✅ Ensure bot has correct permissions in the space

#### "Webhook verification failed"
- ✅ Verify JWT_SECRET is correct
- ✅ Ensure APP_PRIVATE_DATA is properly formatted
- ✅ Redeploy bot if credentials were recently updated

#### Slow response times
- ✅ Free tier Render services may spin down after 15 minutes of inactivity
- ✅ First request after spin-down may take 30-60 seconds
- ✅ Consider upgrading to a paid Render plan for production

## Step 8: Advanced Configuration

### Add More Price Feeds

To add support for additional price feeds:

1. Edit `src/oracle.ts`
2. Add new feed addresses to `PRICE_FEEDS` object:

```typescript
const PRICE_FEEDS: Record<string, `0x${string}`> = {
  'ETH': '0x71041dddad3595F7452727923F21707a2E0b1285',
  'BTC': '0xc333e631F6D186fE41343749176334C34503B433',
  'LINK': '0xd2D8e9e8F4A8087597D32e6E390B99D0f24d2850',
  'USDC': '0x7e860098F58bBFC8648a4311b374B1D669a2bc6B',
  // Add new feeds here
  'YOUR_SYMBOL': '0x...', // Chainlink feed address
};
```

3. Commit and push changes
4. Render will automatically redeploy

### Add Slash Commands

The bot uses slash commands for interaction. To add custom commands:

1. Edit `src/commands.ts`
2. Add new command handler functions
3. Update `src/index.ts` to route to new handlers

## Step 9: Additional Resources

- 📖 **Towns Docs**: https://docs.towns.com/build/bots/introduction
- 🔗 **Chainlink Data Feeds**: https://docs.chain.link/data-feeds
- 🌐 **Base Network**: https://base.org/
- 🚀 **Render Deployment**: https://render.com/docs

## Troubleshooting

### "Bot not receiving messages"

1. Verify bot is installed in the space
2. Check forwarding settings in developer portal
3. Ensure webhook URL is publicly accessible
4. Check Render logs: `tail -f logs`

### "Invalid credentials"

1. Regenerate credentials in Towns Developer Portal
2. Update `.env` and redeploy
3. Wait 5 minutes for changes to propagate

### "Webhook verification failed"

1. Verify JWT_SECRET is exactly as created
2. Ensure no extra spaces or characters
3. Redeploy bot on Render

## Support

For issues or questions:

1. Check the [Towns Discord](https://discord.gg/towns)
2. Review [Towns documentation](https://docs.towns.com/)
3. File an issue on this [GitHub repository](https://github.com/MansourDch/towns-oracle-price-bot/issues)

## Next Steps

✅ Bot is now live and integrated with Towns!

**What you can do next:**
- Share your bot with other Towns communities
- Add more price feeds or features
- Build additional bots for other use cases
- Contribute to the open-source project

Happy building! 🎉
