import dotenv from 'dotenv';
import { handlePriceCommand } from './commands';

dotenv.config();

/**
 * Towns Protocol Chainlink Oracle Price Bot
 * 
 * This bot provides real-time cryptocurrency prices from Chainlink oracles
 * on the Base network through the Towns Protocol.
 */

// Bot event handler interface (extensible for your Towns SDK setup)
interface BotMessage {
  text: string;
  user: string;
  timestamp: number;
}

interface BotResponse {
  text: string;
  embeds?: any[];
}

/**
 * Main bot initialization
 * Connect to your Towns Protocol endpoint and register the price command
 */
async function initializeBot(): Promise<void> {
  console.log('🤖 Towns Protocol Chainlink Oracle Price Bot initializing...');
  console.log('🔗 Connecting to Base network...');
  console.log('✅ Bot ready! Use /price [SYMBOL] to check prices');
  console.log('📊 Supported symbols: ETH, BTC, LINK, USDC');
}

/**
 * Main message handler
 * Routes commands to appropriate handlers
 */
async function handleMessage(message: BotMessage): Promise<BotResponse | null> {
  const text = message.text.trim();

  // Check for price command
  if (text.startsWith('/price')) {
    const parts = text.split(' ');
    const symbol = parts[1]?.toUpperCase();
    
    if (!symbol) {
      return {
        text: '❌ Please specify a symbol. Usage: /price [ETH|BTC|LINK|USDC]',
      };
    }

    return await handlePriceCommand(symbol);
  }

  return null;
}

/**
 * Graceful shutdown
 */
process.on('SIGINT', () => {
  console.log('\n🛑 Bot shutting down...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Bot shutting down...');
  process.exit(0);
});

// Initialize bot
initializeBot().catch((error) => {
  console.error('❌ Failed to initialize bot:', error);
  process.exit(1);
});

// Export for Town SDK integration
export { handleMessage, initializeBot };
