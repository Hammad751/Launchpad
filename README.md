# Smart contract frontend

## Overview

Crypto Launchpad is a decentralized token creation platform built on Ethereum-compatible blockchains. It allows users to seamlessly create and deploy their own ERC-20 tokens using an intuitive frontend interface, without writing any code.

The platform uses an upgradeable smart contract architecture via the ERC1967 proxy pattern to ensure modularity and future-proof deployments. Each user-deployed token is fully owned by the creator, with built-in ownership transfer functionality and no mint/burn permissions after deployment for added trust and immutability.

The frontend is developed using Next.js and Tailwind CSS, providing a clean and responsive UI optimized for both desktop and mobile.

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

1. The user enters the token details: name, symbol, and initial supply.
2. A small creation fee is required to proceed with deployment.
3. After submitting the form, the user clicks the "Deploy Token" button.
4. A wallet (like MetaMask) prompts the user to confirm the transaction.
5. Once confirmed, a new ERC-20 token contract is deployed to the blockchain.
6. The user becomes the owner of the newly deployed token, with full control over it.
