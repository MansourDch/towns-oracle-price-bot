import { createPublicClient, http, Contract } from 'viem';
import { base } from 'viem/chains';

// Chainlink AggregatorV3Interface ABI (minimal)
const AGGREGATOR_ABI = [
  {
    inputs: [],
    name: 'latestRoundData',
    outputs: [
      { name: 'roundId', type: 'uint80' },
      { name: 'answer', type: 'int256' },
      { name: 'startedAt', type: 'uint256' },
      { name: 'updatedAt', type: 'uint256' },
      { name: 'answeredInRound', type: 'uint80' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

// Chainlink Price Feed Addresses on Base
const PRICE_FEEDS: Record<string, `0x${string}`> = {
  'ETH': '0x71041dddad3595F7452727923F21707a2E0b1285',
  'BTC': '0xc333e631F6D186fE41343749176334C34503B433',
  'LINK': '0xd2D8e9e8F4A8087597D32e6E390B99D0f24d2850',
  'USDC': '0x7e860098F58bBFC8648a4311b374B1D669a2bc6B',
};

// Create viem public client for Base
const publicClient = createPublicClient({
  chain: base,
  transport: http(),
});

export interface PriceData {
  symbol: string;
  price: string;
  decimals: number;
  timestamp: number;
  roundId: bigint;
}

/**
 * Fetch the latest price for a given symbol from Chainlink Oracle
 */
export async function getPriceFromChainlink(
  symbol: string
): Promise<PriceData | null> {
  const upperSymbol = symbol.toUpperCase();
  const feedAddress = PRICE_FEEDS[upperSymbol];

  if (!feedAddress) {
    return null;
  }

  try {
    // Get latest round data
    const roundData = (await publicClient.readContract({
      address: feedAddress,
      abi: AGGREGATOR_ABI,
      functionName: 'latestRoundData',
    })) as any;

    // Get decimals
    const decimals = (await publicClient.readContract({
      address: feedAddress,
      abi: AGGREGATOR_ABI,
      functionName: 'decimals',
    })) as number;

    const price = Number(roundData.answer) / Math.pow(10, decimals);

    return {
      symbol: upperSymbol,
      price: price.toFixed(2),
      decimals,
      timestamp: Number(roundData.updatedAt),
      roundId: roundData.roundId,
    };
  } catch (error) {
    console.error(`Error fetching price for ${symbol}:`, error);
    return null;
  }
}

/**
 * Get list of supported price feeds
 */
export function getSupportedSymbols(): string[] {
  return Object.keys(PRICE_FEEDS);
}

/**
 * Format price for display
 */
export function formatPriceMessage(data: PriceData): string {
  return `💰 **${data.symbol}/USD**: $${data.price}\n_Verified by Chainlink on Base 🔵_`;
}

/**
 * Get unsupported symbol response
 */
export function getUnsupportedSymbolMessage(): string {
  const supported = getSupportedSymbols().join(', ');
  return `❌ Symbol not supported. Available symbols: ${supported}`;
}
