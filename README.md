# 📊 Solana Wallet Tracker (Crypto Portfolio Tracker)

A real-time **crypto portfolio tracking tool** focused on Solana.  
It fetches and aggregates token balances, SOL holdings, and calculates the USD value using live price feeds.

## 🧠 Core Purpose

Give users a **complete overview of their wallet**, including:

- All SPL tokens
- Native SOL
- Total value in USD
- [WIP] Spam token detection and filtering
- [WIP] Historical snapshots / charting
- [WIP] Multi-wallet portfolio analytics

## ⚙️ Features

- ✅ Fetch all token balances via Helius or Solana RPC
- ✅ Get live price data using Birdeye or Pyth
- ✅ Calculate net portfolio value
- ✅ Group wallets by user
- ✅ Sync with PostgreSQL
- 🔄 Dynamic WebSocket subscriptions
- 🧠 Extendable API for frontend dashboards


## 🛠️ Tech Stack

- TypeScript + Node.js
- Helius API (WebSocket + REST)
- Birdeye API / Pyth (prices)
- PostgreSQL + Prisma
- Vercel (frontend deployment)

## 🚀 Future Features

- ✅ Multi-wallet tracking
- [ ] User-defined token tags ("stable", "LP", "airdrop")
- [ ] Alerting for large balance change or whale movements
- [ ] CSV Export / Weekly report email
- [ ] Add Raydium LPs and staking positions
- [ ] Integrate `nft_badge_system` to award NFTs based on activity

## 📌 Status

This project is **actively under development** and not yet production-ready.  
Many features are in `WIP` or `prototype` stages.


