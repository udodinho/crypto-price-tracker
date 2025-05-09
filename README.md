# Crypto Price Tracker

A simple cryptocurrency price tracker built with Next.js and React Query that fetches real-time data from the CoinGecko API.

### Features

- Displays live price data for Bitcoin (BTC), Ethereum (ETH), Solana (SOL), Polygon (MATIC), and Dogecoin (DOGE)
- Shows current price in USD and 24-hour price change percentage
- Auto-refreshes data every 30 seconds
- Search functionality to look up other cryptocurrencies
- Sorting by name, price, and 24-hour change percentage

### Requirements

- Next.js

- React Query (@tanstack/react-query)

- Tailwind CSS

## Setup Instructions

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Nodejs: You should have Node installed. [Download nodejs](https://nodejs.org)

### Installation

Clone the repo and install dependencies

```shell
git clone https://github.com/udodinho/crypto-price-tracker.git
cd crypto-price-tracker
```

```shell
$ npm install
```

### Start server

```shell
$ npm run dev
```

### Project Structure

- app/ - Contains the Next.js app router pages and layout
- components/ - React components used throughout the application
  - CryptoList.tsx - Main component for displaying the list of cryptocurrencies
  - CryptoItem.tsx - Component for individual cryptocurrency items
  - Search.tsx - Search input component
  - Header.tsx - Header component with title
  - LoadingState.tsx - Loading indicator component
  - ErrorState.tsx - Error display component



## Scaling to Handle 100+ Coins and Multiple APIs

1. Implement Pagination:

    - Add server-side pagination to limit the number of results fetched at once
    - Implement infinite scrolling or traditional pagination UI

2. API Management:

    - Create a unified data service layer that abstracts away API details
    - Implement API key rotation and rate limiting protection
    - Add fallback APIs for redundancy (e.g., if CoinGecko fails, try CoinMarketCap)

3. User Experience:
    - Add preferences storage for favorite coins (local storage or user accounts)
    - Implement theme settings
    - Add price alerts functionality

# crypto-price-tracker
