# API Integrations Documentation

This document provides a comprehensive overview of all external API integrations used in the Peach Frontend application, including their endpoints, authentication methods, purposes, and configurations.

## Table of Contents
1. [Birdeye API](#birdeye-api)
2. [Mango Data API](#mango-data-api)
3. [Mango Router API](#mango-router-api)
4. [Mango Data OpenBook API](#mango-data-openbook-api)
5. [Jupiter APIs](#jupiter-apis)
6. [Notifications API](#notifications-api)
7. [Whitelist API](#whitelist-api)
8. [Dexscreener API](#dexscreener-api)
9. [OpenSerum API](#openserum-api)
10. [Pyth Network](#pyth-network)
11. [Health Check APIs](#health-check-apis)
12. [Sentry Monitoring](#sentry-monitoring)

---

## Birdeye API

**Location**: `/apis/birdeye/helpers.ts`, `/apis/traffic/helpers.ts`, `/pages/api/tokens.ts`

### Endpoints
- **Base URL**: `https://public-api.birdeye.so/`
- **WebSocket**: `wss://public-api.birdeye.so/socket`
- **Token List**: `defi/tokenlist?sort_by=v24hUSD&sort_type=desc&offset={offset}&limit={limit}`
- **Price History**: `defi/history_price?address={address}&address_type=token&type={type}&time_from={start}&time_to={end}`

### Authentication
- **Method**: API Key
- **Header**: `X-API-KEY`
- **Chain Header**: `x-chain: solana`
- **Environment Variable**: `NEXT_PUBLIC_BIRDEYE_API_KEY`
- **Default Fallback**: `5afdc994b457493ea9a8882fbf695f46`

### Purpose/Functionality
- Token price data and historical charts
- Token list with volume filtering
- Real-time price updates via WebSocket
- Market data for trading interface

### Request/Response Formats
- **Request**: JSON over HTTPS/WSS
- **Response**: JSON format with data wrapper
- **Rate Limits**: Not explicitly specified in code

---

## Mango Data API

**Location**: `/utils/constants.ts`, `/hooks/useFollowedAccounts.ts`, `/hooks/useProfileDetails.ts`, `/apis/mngo/index.ts`

### Endpoints
- **Base URL**: `https://api.mngo.cloud/data/v4`
- **User Following**: `/user-data/following?wallet-pk={walletPk}`
- **Profile Details**: `/user-data/profile-details?wallet-pk={walletPk}`
- **Private Accounts**: `/user-data/private-accounts`
- **Account Hidden**: `/user-data/account-hidden?mango-account={mangoAccount}`
- **Filled Orders**: `/user-data/filled-orders?mango-account={mangoAccount}&id={orderIds}`
- **Token Stats**: `/token-historical-stats?mango-group={groupId}&mint={mint}`
- **Leaderboard**: `/leaderboard-season-rank?season-id={seasonId}`
- **Account Tier**: `/account-tier?mango-account={account}&season-id={seasonId}`
- **Account Points**: `/account-points-and-rank?mango-account={account}&season-id={seasonId}`
- **Current Season**: `/current-season`

### Authentication
- **Method**: No authentication required for most endpoints
- **Query Parameters**: wallet-pk, mango-account for user-specific data

### Purpose/Functionality
- User account data and social features
- Trading history and statistics
- Leaderboard and rewards system
- Account privacy settings
- Token performance metrics

### Request/Response Formats
- **Request**: GET requests with query parameters
- **Response**: JSON format
- **Caching**: 10 minutes cache time, 1 minute stale time
- **Rate Limits**: 3 retries on failure

---

## Mango Router API

**Location**: `/utils/constants.ts`

### Endpoints
- **Base URL**: `https://autobahn.mngo.cloud/m4b137o2h72m`

### Authentication
- **Method**: Not specified in available code

### Purpose/Functionality
- Route optimization for trading operations
- Transaction routing and execution

### Request/Response Formats
- **Format**: Not detailed in available code
- **Rate Limits**: Not specified

---

## Mango Data OpenBook API

**Location**: `/utils/constants.ts`

### Endpoints
- **Base URL**: `https://api.mngo.cloud/openbook/v1`

### Authentication
- **Method**: Not specified in available code

### Purpose/Functionality
- OpenBook market data integration
- Order book and trading data

### Request/Response Formats
- **Format**: Not detailed in available code
- **Rate Limits**: Not specified

---

## Jupiter APIs

**Location**: `/utils/constants.ts`

### Endpoints
- **Token List Mainnet**: `https://token.jup.ag/all`
- **Token List Devnet**: `https://api.jup.ag/api/tokens/devnet`
- **Price API**: `https://price.jup.ag/v4/`
- **Quote API V6**: `https://quote-api.jup.ag/v6`

### Authentication
- **Method**: No authentication required

### Purpose/Functionality
- Token metadata and listings
- Price feeds for supported tokens
- Swap quote calculations
- DEX aggregation services

### Request/Response Formats
- **Request**: GET requests
- **Response**: JSON format
- **Rate Limits**: Not specified in code

---

## Notifications API

**Location**: `/apis/notifications/`, `/utils/constants.ts`

### Endpoints
- **Base URL**: `https://notifications-api.herokuapp.com/`
- **WebSocket**: `wss://notifications-api.herokuapp.com/ws`
- **Settings**: `/notifications/user/getSettings`

### Authentication
- **Method**: Token-based authentication
- **Headers**: 
  - `authorization: {token}`
  - `publickey: {walletAddress}`
  - `mango-account: {mangoAccount}`

### Purpose/Functionality
- Real-time notifications for trading events
- User notification preferences
- WebSocket connection for live updates
- Fill notifications and alerts

### Request/Response Formats
- **Request**: JSON over HTTPS/WSS
- **Response**: JSON format
- **WebSocket**: Ping/pong every 30 seconds
- **Rate Limits**: 2 retry attempts with 5-second delay

---

## Whitelist API

**Location**: `/apis/whitelist.ts`, `/utils/constants.ts`

### Endpoints
- **Base URL**: `https://api.mngo.cloud/whitelist/v1/`
- **Check Whitelist**: `/isWhiteListed?wallet={wallet}`

### Authentication
- **Method**: No authentication required
- **Query Parameter**: wallet address

### Purpose/Functionality
- Wallet whitelist verification
- Access control for restricted features

### Request/Response Formats
- **Request**: GET with query parameters
- **Response**: JSON with `found` boolean field
- **Rate Limits**: Not specified

---

## Dexscreener API

**Location**: `/components/governance/ListToken/ListToken.tsx`

### Endpoints
- **Base URL**: `https://api.dexscreener.com/latest/dex/search`
- **Token Search**: `/search?q={tokenMint}`

### Authentication
- **Method**: No authentication required

### Purpose/Functionality
- Token pair discovery
- Pool information for Raydium and Orca
- Market data for governance token listings

### Request/Response Formats
- **Request**: GET with query parameters
- **Response**: JSON with pairs array
- **Rate Limits**: Not specified

---

## OpenSerum API

**Location**: `/next.config.js`

### Endpoints
- **Proxied URL**: `/openSerumApi/:path*`
- **Actual URL**: `https://openserum.io/api/serum/:path*`

### Authentication
- **Method**: Proxied through Next.js (CORS bypass)

### Purpose/Functionality
- Serum DEX market data
- Order book information
- Trading pair details

### Request/Response Formats
- **Request**: Proxied through Next.js rewrites
- **Response**: JSON format
- **Rate Limits**: Not specified

---

## Pyth Network

**Location**: `/utils/governance/listingTools.ts`, `/pages/dashboard/index.tsx`

### Endpoints
- **Program ID**: `MAINNET_PYTH_PROGRAM`
- **HTTP Client**: `PythHttpClient`

### Authentication
- **Method**: On-chain program calls

### Purpose/Functionality
- Oracle price feeds
- Real-time price data for tokens
- Price validation for governance proposals

### Request/Response Formats
- **Request**: Solana program calls
- **Response**: On-chain data structures
- **Rate Limits**: Blockchain network limits

---

## Health Check APIs

**Location**: `/hooks/useOffchainServicesHealth.ts`

### Endpoints
- **Database Health**: `https://api.mngo.cloud/data/health/db`
- **Redis Health**: `https://api.mngo.cloud/data/health/redis`
- **Server Health**: `https://api.mngo.cloud/data/health/server`

### Authentication
- **Method**: No authentication required

### Purpose/Functionality
- System health monitoring
- Service availability checks
- Status page integration

### Request/Response Formats
- **Request**: GET requests
- **Response**: HTTP status codes (200, 300, 500)
- **Polling**: Every 60 seconds
- **Rate Limits**: Not specified

---

## Sentry Monitoring

**Location**: `/next.config.js`

### Configuration
- **Organization**: `mango`
- **Project**: `mango-v4-ui`
- **Tunnel Route**: `/monitoring`

### Authentication
- **Method**: Sentry DSN configuration

### Purpose/Functionality
- Error tracking and monitoring
- Performance monitoring
- Source map uploads
- Client-side error reporting

### Request/Response Formats
- **Request**: Automated error reports
- **Response**: Sentry platform processing
- **Rate Limits**: Sentry platform limits

---

## Summary

This application integrates with **12 major external APIs** and services, ranging from market data providers to monitoring solutions. Most APIs use simple HTTP GET requests with JSON responses, while some require API keys or token-based authentication. The application implements proper error handling, retry mechanisms, and caching strategies for optimal performance and reliability.

**Key Integration Patterns:**
- REST APIs with JSON responses
- WebSocket connections for real-time data
- API key authentication where required
- Proxy configurations for CORS handling
- Health monitoring and error tracking
- Caching and retry strategies for reliability