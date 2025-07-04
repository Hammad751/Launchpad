export type NetworkType = "testnet" | "mainnet"

export interface NetworkConfig {
  chainId: number
  chainName: string
  rpcUrl: string
  explorerUrl: string
  contractAddress: string
  currency: {
    name: string
    symbol: string
    decimals: number
  }
}

// ✅ SINGLE SOURCE OF TRUTH - Only change addresses here!
export const NETWORK_CONFIGS: Record<NetworkType, NetworkConfig> = {
  testnet: {
    chainId: 1999,
    chainName: "DXB Chain Testnet",
    rpcUrl: "https://rpc-testnet-1.vrcchain.com",
    explorerUrl: "https://dxb.vrcchain.com",
    contractAddress: "0x06200EcfC49FEf79d844Eb66596fD10094dE8860", // ✅ Testnet contract
    currency: {
      name: "VRCN",
      symbol: "VRCN",
      decimals: 18,
    },
  },
  mainnet: {
    chainId: 7131,
    chainName: "VRCN Chain",
    rpcUrl: "https://rpc-mainnet-4.vrcchain.com",
    explorerUrl: "https://vrcchain.com",
    contractAddress: "0x0000000000000000000000000000000000000000", // ✅ CHANGE ONLY THIS for mainnet!
    currency: {
      name: "VRCN",
      symbol: "VRCN",
      decimals: 18,
    },
  },
}

// Chain ID lookup map
const CHAIN_ID_TO_NETWORK: Record<number, NetworkType> = {
  1999: "testnet",
  7131: "mainnet",
}

// Core functions
export const detectNetworkFromChainId = (chainId?: number): NetworkType | null => {
  return chainId ? CHAIN_ID_TO_NETWORK[chainId] || null : null
}

export const getNetworkConfigByChainId = (chainId?: number): NetworkConfig | null => {
  const networkType = detectNetworkFromChainId(chainId)
  return networkType ? NETWORK_CONFIGS[networkType] : null
}

export const isSupportedChainId = (chainId?: number): boolean => {
  return chainId ? chainId in CHAIN_ID_TO_NETWORK : false
}

export const getSupportedChainIds = (): number[] => {
  return Object.keys(CHAIN_ID_TO_NETWORK).map(Number)
}

// Helper functions
export const isTestnetChain = (chainId?: number): boolean => {
  return detectNetworkFromChainId(chainId) === "testnet"
}

export const isMainnetChain = (chainId?: number): boolean => {
  return detectNetworkFromChainId(chainId) === "mainnet"
}

export const getContractAddressByChainId = (chainId?: number): string | null => {
  return getNetworkConfigByChainId(chainId)?.contractAddress || null
}

export const getExplorerUrlByChainId = (chainId?: number, path = ""): string | null => {
  const config = getNetworkConfigByChainId(chainId)
  return config ? `${config.explorerUrl}${path}` : null
}

// Default/fallback functions (when no wallet connected)
export const getDefaultNetwork = (): NetworkType => {
  const network = process.env.NEXT_PUBLIC_NETWORK as NetworkType
  return network === "mainnet" || network === "testnet" ? network : "testnet"
}

export const getDefaultNetworkConfig = (): NetworkConfig => {
  return NETWORK_CONFIGS[getDefaultNetwork()]
}

// Legacy functions for backward compatibility
export const getCurrentNetwork = (): NetworkType => getDefaultNetwork()
export const getCurrentNetworkConfig = (): NetworkConfig => getDefaultNetworkConfig()
export const isTestnet = (): boolean => getDefaultNetwork() === "testnet"
export const isMainnet = (): boolean => getDefaultNetwork() === "mainnet"
export const getContractAddress = (): string => getDefaultNetworkConfig().contractAddress
export const getExplorerUrl = (path = ""): string => {
  const config = getDefaultNetworkConfig()
  return `${config.explorerUrl}${path}`
}

// Validation functions
export const isMainnetContractReady = (): boolean => {
  return getDefaultNetworkConfig().contractAddress !== "0x0000000000000000000000000000000000000000"
}

export const isMainnetContractReadyByChainId = (chainId?: number): boolean => {
  if (!isMainnetChain(chainId)) return true
  const config = getNetworkConfigByChainId(chainId)
  return config ? config.contractAddress !== "0x0000000000000000000000000000000000000000" : false
}

// Debug function
export const debugNetworkConfig = (chainId?: number): void => {
  console.log("🐛 Network Debug:", {
    supportedChainIds: getSupportedChainIds(),
    connectedChainId: chainId || null,
    isSupported: isSupportedChainId(chainId),
    detectedNetwork: detectNetworkFromChainId(chainId),
    isTestnet: isTestnetChain(chainId),
    isMainnet: isMainnetChain(chainId),
    defaultNetwork: getDefaultNetwork(),
  })
}
