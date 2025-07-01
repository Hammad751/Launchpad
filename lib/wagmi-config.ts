import { createConfig, http } from "wagmi"
import { injected } from "wagmi/connectors"
import { defineChain } from "viem"

// Define your custom chain using viem's defineChain for better compatibility
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
    injected({
      target: "metaMask",
    }),
  ],
  ssr: false, // Disable SSR to prevent hydration issues
})

declare module "wagmi" {
  interface Register {
    config: typeof config
  }
}
