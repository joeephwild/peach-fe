# RPC Endpoints Documentation

This document provides a comprehensive overview of all RPC (Remote Procedure Call) endpoints and configurations used in the Peach Frontend application, including protocols, methods, connection details, and error handling mechanisms.

## Table of Contents
1. [Solana RPC Endpoints](#solana-rpc-endpoints)
2. [Lite RPC Configuration](#lite-rpc-configuration)
3. [WebSocket RPC Connections](#websocket-rpc-connections)
4. [Mango v4 Program RPC](#mango-v4-program-rpc)
5. [Jupiter RPC Integration](#jupiter-rpc-integration)
6. [Governance RPC Calls](#governance-rpc-calls)
7. [Error Handling Mechanisms](#error-handling-mechanisms)
8. [Connection Management](#connection-management)

---

## Solana RPC Endpoints

**Location**: `/components/settings/RpcSettings.tsx`, `/store/mangoStore.ts`, `/utils/constants.ts`

### Protocol
- **Type**: JSON-RPC 2.0 over HTTPS/WSS
- **Transport**: HTTP/HTTPS for standard calls, WebSocket for subscriptions

### Available RPC Providers

#### Mainnet Providers
1. **Triton (Recommended)**
   - **URL**: `https://mango.rpcpool.com/{API_KEY}`
   - **WebSocket**: `wss://mango.rpcpool.com/{API_KEY}`
   - **Authentication**: API Key required
   - **Features**: High performance, low latency

2. **Helius**
   - **URL**: `https://mainnet.helius-rpc.com/?api-key={API_KEY}`
   - **WebSocket**: `wss://mainnet.helius-rpc.com/?api-key={API_KEY}`
   - **Authentication**: API Key required
   - **Features**: Enhanced RPC methods

3. **QuickNode**
   - **URL**: `https://example.solana-mainnet.quiknode.pro/{API_KEY}/`
   - **WebSocket**: `wss://example.solana-mainnet.quiknode.pro/{API_KEY}/`
   - **Authentication**: API Key required
   - **Features**: Global infrastructure

4. **Solana Foundation**
   - **URL**: `https://api.mainnet-beta.solana.com`
   - **WebSocket**: `wss://api.mainnet-beta.solana.com`
   - **Authentication**: None (public)
   - **Features**: Official Solana RPC

#### Devnet Providers
1. **Solana Devnet**
   - **URL**: `https://api.devnet.solana.com`
   - **WebSocket**: `wss://api.devnet.solana.com`
   - **Authentication**: None (public)
   - **Features**: Development testing

### RPC Methods Used

#### Account Operations
- `getAccountInfo`: Retrieve account data
- `getMultipleAccounts`: Batch account retrieval
- `getProgramAccounts`: Filter accounts by program

#### Transaction Operations
- `sendTransaction`: Submit transactions
- `confirmTransaction`: Transaction confirmation
- `getTransaction`: Retrieve transaction details
- `getSignatureStatuses`: Check transaction status
- `simulateTransaction`: Dry-run transactions

#### Block and Slot Operations
- `getSlot`: Current slot number
- `getBlockHeight`: Current block height
- `getRecentBlockhash`: Recent blockhash for transactions
- `getFeeForMessage`: Calculate transaction fees

#### Subscription Methods (WebSocket)
- `accountSubscribe`: Account change notifications
- `programSubscribe`: Program account notifications
- `signatureSubscribe`: Transaction confirmation
- `slotSubscribe`: Slot change notifications
- `blockPrioritizationFeesSubscribe`: Fee estimation

### Input/Output Schemas

#### Standard Request Format
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "methodName",
  "params": []
}
```

#### Standard Response Format
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {},
  "error": {
    "code": -32000,
    "message": "Error description"
  }
}
```

---

## Lite RPC Configuration

**Location**: `/components/MangoProvider.tsx`, `/utils/constants.ts`

### Protocol
- **Type**: JSON-RPC 2.0 over WebSocket
- **Purpose**: Fee estimation and priority fee subscriptions

### Endpoints
- **Mainnet**: `wss://mango.rpcpool.com/{API_KEY}` (converted from HTTPS)
- **Connection**: Automatic HTTPS to WSS conversion

### Methods
- `blockPrioritizationFeesSubscribe`: Real-time fee estimation
- **Parameters**: 
  - `addresses`: Array of account addresses to monitor
  - `commitment`: Confirmation level ("processed", "confirmed", "finalized")

### Response Format
```json
{
  "subscription": 123,
  "result": {
    "prioritizationFee": 5000,
    "slot": 123456789
  }
}
```

---

## WebSocket RPC Connections

**Location**: `/components/MangoProvider.tsx`, `/hooks/useConnection.ts`

### Connection Management
- **Auto-reconnection**: Implemented with exponential backoff
- **Heartbeat**: Ping/pong mechanism for connection health
- **Subscription Management**: Automatic re-subscription on reconnect

### Subscription Types

#### Account Subscriptions
- **Method**: `accountSubscribe`
- **Purpose**: Monitor account balance and data changes
- **Parameters**: Account public key, commitment level

#### Program Subscriptions
- **Method**: `programSubscribe`
- **Purpose**: Monitor all accounts owned by a program
- **Parameters**: Program ID, filters, commitment level

#### Signature Subscriptions
- **Method**: `signatureSubscribe`
- **Purpose**: Transaction confirmation notifications
- **Parameters**: Transaction signature, commitment level

### Error Handling
- **Connection Errors**: Automatic retry with backoff
- **Subscription Errors**: Re-subscription attempts
- **Timeout Handling**: 30-second timeout for responses

---

## Mango v4 Program RPC

**Location**: `/utils/mango.ts`, `/store/mangoStore.ts`, `/pages/api/tokentiers.ts`

### Protocol
- **Type**: Solana Program RPC calls
- **Program ID**: `4MangoMjqJ2firMokCjjGgoK8d4MXcrgL7XJaL3w6fVg`

### Available Methods

#### Account Management
- `getMangoAccount`: Retrieve Mango account data
- `getMangoGroup`: Get group configuration
- `getAllMangoAccounts`: Batch account retrieval

#### Market Operations
- `getPerpMarkets`: Perpetual market data
- `getSpotMarkets`: Spot market information
- `getTokens`: Token configurations

#### Trading Operations
- `placePerpOrder`: Place perpetual orders
- `placeSpotOrder`: Place spot orders
- `cancelOrder`: Cancel existing orders
- `settleFunds`: Settle trading funds

### Input Parameters
- **Connection**: Solana RPC connection object
- **Group**: Mango group public key
- **Account**: User's Mango account public key
- **Market**: Market public key for trading operations

### Response Formats
- **Account Data**: Deserialized account structures
- **Market Data**: Market configuration and state
- **Transaction Results**: Transaction signatures and confirmations

---

## Jupiter RPC Integration

**Location**: `/utils/jupiter.ts`, `/components/swap/`

### Protocol
- **Type**: HTTP REST API (not traditional RPC)
- **Purpose**: DEX aggregation and swap routing

### Endpoints
- **Quote API**: `https://quote-api.jup.ag/v6/quote`
- **Swap API**: `https://quote-api.jup.ag/v6/swap`
- **Price API**: `https://price.jup.ag/v4/price`

### Methods

#### Quote Generation
- **Endpoint**: `/quote`
- **Parameters**: 
  - `inputMint`: Source token mint
  - `outputMint`: Destination token mint
  - `amount`: Swap amount
  - `slippageBps`: Slippage tolerance

#### Swap Execution
- **Endpoint**: `/swap`
- **Parameters**: Quote object, user public key
- **Response**: Serialized transaction for signing

### Error Handling
- **Rate Limiting**: Automatic retry with exponential backoff
- **Invalid Routes**: Fallback to alternative routes
- **Network Errors**: Connection retry mechanism

---

## Governance RPC Calls

**Location**: `/utils/governance/tools.ts`, `/utils/governance/listingTools.ts`

### Protocol
- **Type**: Solana Program RPC calls
- **Program ID**: `GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw`

### Available Methods

#### Realm Operations
- `fetchRealm`: Get governance realm data
- `fetchGovernances`: Retrieve governance accounts
- `fetchProposals`: Get active proposals

#### Voting Operations
- `castVote`: Submit governance votes
- `createProposal`: Create new proposals
- `executeInstruction`: Execute approved instructions

### Input Parameters
- **Connection**: Solana RPC connection
- **Realm**: Governance realm public key
- **Governance**: Specific governance public key
- **Proposal**: Proposal public key for voting

### Response Formats
- **Realm Data**: Governance configuration and state
- **Proposals**: Proposal details and voting status
- **Vote Records**: Individual vote information

---

## Error Handling Mechanisms

### Connection Errors

#### Network Failures
- **Retry Strategy**: Exponential backoff (1s, 2s, 4s, 8s)
- **Max Retries**: 5 attempts
- **Fallback**: Switch to alternative RPC provider

#### Timeout Handling
- **Request Timeout**: 30 seconds
- **WebSocket Timeout**: 60 seconds
- **Subscription Timeout**: 120 seconds

### RPC-Specific Errors

#### Rate Limiting (HTTP 429)
- **Response**: Automatic retry with increased delay
- **Backoff**: Linear increase (5s, 10s, 15s)
- **Provider Switch**: Rotate to different RPC endpoint

#### Invalid Parameters (HTTP 400)
- **Response**: Log error and return user-friendly message
- **Validation**: Client-side parameter validation
- **Recovery**: Prompt user to correct input

#### Server Errors (HTTP 5xx)
- **Response**: Retry with exponential backoff
- **Fallback**: Switch to backup RPC provider
- **Monitoring**: Error reporting to Sentry

### Transaction Errors

#### Insufficient Funds
- **Detection**: Pre-flight simulation
- **Response**: User notification with balance check
- **Recovery**: Suggest funding account

#### Blockhash Expiration
- **Detection**: Transaction confirmation timeout
- **Response**: Automatic retry with fresh blockhash
- **Prevention**: Recent blockhash caching

#### Network Congestion
- **Detection**: High priority fees required
- **Response**: Dynamic fee adjustment
- **User Control**: Fee preference settings

---

## Connection Management

### Connection Pooling

**Location**: `/store/mangoStore.ts`

#### Pool Configuration
- **Max Connections**: 10 per RPC endpoint
- **Connection Reuse**: HTTP/1.1 keep-alive
- **Load Balancing**: Round-robin across providers

#### Health Monitoring
- **Ping Interval**: 30 seconds
- **Health Check**: `getSlot` method call
- **Failure Threshold**: 3 consecutive failures

### Provider Switching

#### Automatic Failover
- **Trigger**: Connection failure or high latency
- **Selection**: Next available provider in priority order
- **Notification**: User alert for manual provider changes

#### Manual Selection
- **Interface**: RPC Settings component
- **Persistence**: Local storage for user preference
- **Validation**: Connection test before switching

### Performance Optimization

#### Request Batching
- **Method**: `getMultipleAccounts` for batch operations
- **Batch Size**: Maximum 100 accounts per request
- **Parallel Requests**: Up to 5 concurrent batches

#### Caching Strategy
- **Account Data**: 30-second cache for static data
- **Market Data**: 5-second cache for dynamic data
- **Blockhash**: 60-second cache with refresh

#### Subscription Management
- **Deduplication**: Single subscription per unique filter
- **Cleanup**: Automatic unsubscribe on component unmount
- **Reconnection**: Restore all subscriptions after reconnect

---

## Summary

This application utilizes **multiple RPC protocols and endpoints** for comprehensive blockchain interaction:

- **Primary Protocol**: Solana JSON-RPC 2.0
- **Transport Methods**: HTTPS, WebSocket
- **Provider Options**: 5 mainnet, 1 devnet
- **Program Integrations**: Mango v4, Jupiter, Governance
- **Error Handling**: Comprehensive retry and failover mechanisms
- **Performance Features**: Connection pooling, caching, batching

**Key RPC Patterns:**
- JSON-RPC 2.0 standard compliance
- WebSocket subscriptions for real-time data
- Automatic provider failover and health monitoring
- Comprehensive error handling and retry logic
- Performance optimization through caching and batching
- User-configurable RPC provider selection