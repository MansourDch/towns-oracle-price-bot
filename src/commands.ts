import {
  getPriceFromChainlink,
  formatPriceMessage,
  getUnsupportedSymbolMessage,
  getSupportedSymbols,
} from './oracle';

interface CommandResponse {
  text: string;
  embeds?: any[];
}

/**
 * Handle the /price command
 * Fetches and formats the price from Chainlink oracle
 */
export async function handlePriceCommand(
  symbol: string
): Promise<CommandResponse> {
  try {
    // Fetch price from Chainlink oracle
    const priceData = await getPriceFromChainlink(symbol);

    if (!priceData) {
      return {
        text: getUnsupportedSymbolMessage(),
      };
    }

    // Format and return the response
    const formattedMessage = formatPriceMessage(priceData);

    return {
      text: formattedMessage,
      embeds: [
        {
          title: `${priceData.symbol}/USD Price`,
          description: `$${priceData.price}`,
          fields: [
            {
              name: 'Network',
              value: 'Base',
              inline: true,
            },
            {
              name: 'Oracle',
              value: 'Chainlink',
              inline: true,
            },
            {
              name: 'Round ID',
              value: priceData.roundId.toString(),
              inline: true,
            },
          ],
          timestamp: new Date(priceData.timestamp * 1000).toISOString(),
          color: 0x375c7f,
        },
      ],
    };
  } catch (error) {
    console.error('Error handling price command:', error);
    return {
      text: 'An error occurred while fetching the price. Please try again later.',
    };
  }
}

/**
 * Get help information for available commands
 */
export function getHelpCommand(): CommandResponse {
  const symbols = getSupportedSymbols();
  return {
    text: `Towns Oracle Price Bot Help\n\nAvailable Commands:\n/price [SYMBOL] - Get the current price for a crypto asset\n\nSupported Symbols: ${symbols.join(', ')}\n\nExample:\n/price ETH - Get the ETH/USD price\n\nPowered by Chainlink Oracles on Base Network`,
  };
}
