# Towns Protocol Chainlink Oracle Price Bot

A real-time crypto price oracle bot built for the Towns Protocol that fetches on-chain prices directly from Chainlink Data Feeds on the Base network.

## Features

- **Real-time On-Chain Prices**: Fetches prices directly from Chainlink Oracles on Base
- **Multiple Assets**: Support for ETH, BTC, LINK, USDC, and more
- **Slash Command**: Easy `/price` command for instant price checks
- **Towns Protocol Integration**: Built with Towns SDK for seamless community interaction
- **Verified by Chainlink**: Every price is verified with Chainlink's oracle infrastructure

## Supported Price Feeds

- ETH/USD: 0x71041dddad3595F7452727923F21707a2E0b1285
- BTC/USD: 0xc333e631F6D186fE41343749176334C34503B433
- LINK/USD: 0xd2D8e9e8F4A8087597D32e6E390B99D0f24d2850
- USDC/USD: 0x7e860098F58bBFC8648a4311b374B1D669a2bc6B

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
npm start
```

## Setup

1. Create a `.env` file with your bot credentials
2. Install dependencies
3. Run the bot

## Usage

Once running, users can interact with the bot using:

```
/price ETH
/price BTC
/price LINK
/price USDC
```

The bot will respond with the current price fetched directly from Chainlink Oracles.

## Architecture

- `src/index.ts` - Bot initialization and setup
- `src/commands.ts` - Slash command definitions
- `src/oracle.ts` - Chainlink oracle integration logic

## License

MIT
