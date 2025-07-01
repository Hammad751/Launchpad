import { createConfig, http } from "wagmi"
import { injected, walletConnect, coinbaseWallet, safe } from "wagmi/connectors"
import { defineChain } from "viem"

// Define your custom chain (DXB Chain)
export const dxbChain = defineChain({
  id: 1999,
  name: "DXB Chain",
  nativeCurrency: {
    decimals: 18,
    name: "VRCN",
    symbol: "VRCN",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc-testnet-1.vrcchain.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "DXB Explorer",
      url: "https://dxb.vrcchain.com",
    },
  },
  testnet: true,
})

export const config = createConfig({
  chains: [dxbChain],
  transports: {
    [dxbChain.id]: http("https://rpc-testnet-1.vrcchain.com", {
      timeout: 10000,
      retryCount: 3,
      retryDelay: 1000,
    }),
  },
  connectors: [
    // MetaMask - Most popular wallet
    injected({
      target: "metaMask",
    }),

    // Trust Wallet - Mobile-first wallet
    injected({
      target: "trustWallet",
    }),

    // Coinbase Wallet - Major exchange wallet
    coinbaseWallet({
      appName: "Token Factory",
      appLogoUrl: "https://example.com/logo.png",
    }),

    // Rabby Wallet - Multi-chain wallet
    injected({
      target: "rabby",
    }),

    // Brave Wallet - Built into Brave browser
    injected({
      target: "brave",
    }),

    // Phantom - Popular Solana wallet that also supports EVM
    injected({
      target: "phantom",
    }),

    // OKX Wallet - Major exchange wallet
    injected({
      target: "okx",
    }),

    // Bitget Wallet - Exchange wallet
    injected({
      target: "bitget",
    }),

    // Bybit Wallet - Exchange wallet
    injected({
      target: "bybit",
    }),

    // Binance Wallet - Major exchange wallet
    injected({
      target: "binance",
    }),

    // Exodus - Desktop and mobile wallet
    injected({
      target: "exodus",
    }),

    // Frame - Desktop wallet
    injected({
      target: "frame",
    }),

    // OneKey - Hardware and software wallet
    injected({
      target: "onekey",
    }),

    // TokenPocket - Multi-chain wallet
    injected({
      target: "tokenpocket",
    }),

    // Zerion - DeFi wallet
    injected({
      target: "zerion",
    }),

    // Rainbow - Mobile-first wallet
    injected({
      target: "rainbow",
    }),

    // Talisman - Polkadot/Substrate wallet that supports EVM
    injected({
      target: "talisman",
    }),

    // XDEFI Wallet - Multi-chain DeFi wallet
    injected({
      target: "xdefi",
    }),

    // Backpack - Solana wallet with EVM support
    injected({
      target: "backpack",
    }),

    // Dawn Wallet - Gaming-focused wallet
    injected({
      target: "dawn",
    }),

    // Enkrypt - Multi-chain wallet
    injected({
      target: "enkrypt",
    }),

    // Frontier Wallet - Mobile DeFi wallet
    injected({
      target: "frontier",
    }),

    // Keplr - Cosmos wallet with EVM support
    injected({
      target: "keplr",
    }),

    // Kaikas - Klaytn wallet
    injected({
      target: "kaikas",
    }),

    // Math Wallet - Multi-chain wallet
    injected({
      target: "mathWallet",
    }),

    // SafePal - Hardware and software wallet
    injected({
      target: "safepal",
    }),

    // SubWallet - Polkadot wallet with EVM support
    injected({
      target: "subwallet",
    }),

    // Taho (formerly Tally Ho) - Community-owned wallet
    injected({
      target: "taho",
    }),

    // Uniswap Wallet - DEX wallet
    injected({
      target: "uniswap",
    }),

    // Zeal - Privacy-focused wallet
    injected({
      target: "zeal",
    }),

    // WalletConnect v2 - Universal wallet connector
    walletConnect({
      projectId: "YOUR_WALLETCONNECT_PROJECT_ID", // Replace with your actual project ID
      metadata: {
        name: "Token Factory",
        description: "Create and deploy custom ERC-20 tokens on DXB Chain",
        url: "https://your-domain.com",
        icons: ["https://example.com/logo.png"],
      },
      showQrModal: true,
    }),

    // Safe (Gnosis Safe) - Multi-signature wallet
    safe({
      allowedDomains: [/gnosis-safe\.io$/, /app\.safe\.global$/],
      debug: false,
    }),

    // Generic injected connector as fallback for any other wallet
    injected(),
  ],
  ssr: false,
})

declare module "wagmi" {
  interface Register {
    config: typeof config
  }
}
