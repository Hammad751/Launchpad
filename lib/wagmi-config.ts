import { createConfig, http } from "wagmi"
import { injected, walletConnect } from "wagmi/connectors"
import { defineChain } from "viem"
import { NETWORK_CONFIGS } from "./network-config"

// Define testnet chain
export const dxbTestnetChain = defineChain({
  id: NETWORK_CONFIGS.testnet.chainId,
  name: NETWORK_CONFIGS.testnet.chainName,
  nativeCurrency: {
    decimals: NETWORK_CONFIGS.testnet.currency.decimals,
    name: NETWORK_CONFIGS.testnet.currency.name,
    symbol: NETWORK_CONFIGS.testnet.currency.symbol,
  },
  rpcUrls: {
    default: {
      http: [NETWORK_CONFIGS.testnet.rpcUrl],
    },
  },
  blockExplorers: {
    default: {
      name: "DXB Testnet Explorer",
      url: NETWORK_CONFIGS.testnet.explorerUrl,
    },
  },
  testnet: true,
})

// Define mainnet chain
export const dxbMainnetChain = defineChain({
  id: NETWORK_CONFIGS.mainnet.chainId,
  name: NETWORK_CONFIGS.mainnet.chainName,
  nativeCurrency: {
    decimals: NETWORK_CONFIGS.mainnet.currency.decimals,
    name: NETWORK_CONFIGS.mainnet.currency.name,
    symbol: NETWORK_CONFIGS.mainnet.currency.symbol,
  },
  rpcUrls: {
    default: {
      http: [NETWORK_CONFIGS.mainnet.rpcUrl],
    },
  },
  blockExplorers: {
    default: {
      name: "DXB Explorer",
      url: NETWORK_CONFIGS.mainnet.explorerUrl,
    },
  },
  testnet: false,
})

// Support both chains in wagmi config
export const config = createConfig({
  chains: [dxbTestnetChain, dxbMainnetChain],
  transports: {
    [dxbTestnetChain.id]: http(NETWORK_CONFIGS.testnet.rpcUrl, {
      timeout: 10000,
      retryCount: 3,
      retryDelay: 1000,
    }),
    [dxbMainnetChain.id]: http(NETWORK_CONFIGS.mainnet.rpcUrl, {
      timeout: 10000,
      retryCount: 3,
      retryDelay: 1000,
    }),
  },
  connectors: [
    injected({
      target: "metaMask",
    }),
  ],
  ssr: false,
})

declare module "wagmi" {
  interface Register {
    config: typeof config
  }
}

console.log("🔗 Wagmi configured for both testnet and mainnet")
console.log("📋 Supported chains:", [dxbTestnetChain.id, dxbMainnetChain.id])
