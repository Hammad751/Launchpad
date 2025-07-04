# Smart contract frontend

## Overview

This repository will stay in sync with your deployed chats on [v0.dev](https://v0.dev).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.dev](https://v0.dev).

## Deployment

Your project is live at:

**https://lunchpad.vrccoin.io/**

## Configuration

### Network Setup

The application is configured via the `.env` file. To switch between testnet and mainnet:

1. Open `.env` file
2. Change `NEXT_PUBLIC_NETWORK=testnet` to `NEXT_PUBLIC_NETWORK=mainnet` (or vice versa)
3. Restart your development server

### Current Networks

**Testnet (Default):**
- Chain ID: 1999
- Name: DXB Chain Testnet
- RPC: https://rpc-testnet-1.vrcchain.com
- Explorer: https://dxb.vrcchain.com

**Mainnet:**
- Chain ID: 7131
- Name: VRCN Chain
- RPC: https://rpc-mainnet-4.vrcchain.com
- Explorer: https://vrcchain.com

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository
