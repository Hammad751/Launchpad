"use client"

import { useState, useEffect, useCallback } from "react"
import { useAccount, useChainId, useSwitchChain } from "wagmi"
import {
  detectNetworkFromChainId,
  getNetworkConfigByChainId,
  isSupportedChainId,
  isMainnetContractReadyByChainId,
  getSupportedChainIds,
  NETWORK_CONFIGS,
  type NetworkConfig,
  type NetworkType,
} from "@/lib/network-config"

export interface NetworkState {
  // Current network info
  chainId: number | null
  networkType: NetworkType | null
  config: NetworkConfig | null
  isSupported: boolean
  isReady: boolean // Contract is deployed and ready

  // Status flags
  isConnected: boolean
  isLoading: boolean
  error: string | null

  // Network switching
  canSwitchNetwork: boolean
  availableNetworks: NetworkConfig[]
}

export interface NetworkActions {
  switchToNetwork: (networkType: NetworkType) => Promise<void>
  switchToChainId: (chainId: number) => Promise<void>
  refreshNetworkState: () => void
  clearError: () => void
}

export function useNetworkManager(): NetworkState & NetworkActions {
  const { isConnected, address } = useAccount()
  const chainId = useChainId()
  const { switchChain, isPending: isSwitchPending } = useSwitchChain()

  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Derive network state from current chain
  const networkType = detectNetworkFromChainId(chainId)
  const config = getNetworkConfigByChainId(chainId)
  const isSupported = isSupportedChainId(chainId)
  const isReady = isSupported && (config ? isMainnetContractReadyByChainId(chainId) : false)

  // Available networks for switching
  const availableNetworks = Object.values(NETWORK_CONFIGS)

  // Network switching functions
  const switchToNetwork = useCallback(
    async (targetNetworkType: NetworkType) => {
      try {
        setError(null)
        setIsLoading(true)

        const targetConfig = NETWORK_CONFIGS[targetNetworkType]
        if (!targetConfig) {
          throw new Error(`Network configuration not found for ${targetNetworkType}`)
        }

        console.log(`🔄 Switching to ${targetNetworkType} (Chain ID: ${targetConfig.chainId})`)

        await switchChain({ chainId: targetConfig.chainId })

        console.log(`✅ Successfully switched to ${targetNetworkType}`)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : `Failed to switch to ${targetNetworkType}`
        console.error(`❌ Network switch error:`, err)
        setError(errorMessage)
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [switchChain],
  )

  const switchToChainId = useCallback(
    async (targetChainId: number) => {
      try {
        setError(null)
        setIsLoading(true)

        const targetNetworkType = detectNetworkFromChainId(targetChainId)
        if (!targetNetworkType) {
          throw new Error(`Unsupported chain ID: ${targetChainId}`)
        }

        console.log(`🔄 Switching to Chain ID: ${targetChainId}`)

        await switchChain({ chainId: targetChainId })

        console.log(`✅ Successfully switched to Chain ID: ${targetChainId}`)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : `Failed to switch to chain ${targetChainId}`
        console.error(`❌ Chain switch error:`, err)
        setError(errorMessage)
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [switchChain],
  )

  const refreshNetworkState = useCallback(() => {
    console.log("🔄 Refreshing network state...")
    setError(null)
    // Force re-evaluation of network state
    window.dispatchEvent(new CustomEvent("networkRefresh"))
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Auto-detect network changes and log comprehensive info
  useEffect(() => {
    if (!isConnected) {
      console.log("👤 Wallet not connected")
      return
    }

    console.log("🌐 Network State Update:", {
      chainId,
      networkType,
      isSupported,
      isReady,
      contractAddress: config?.contractAddress,
      explorerUrl: config?.explorerUrl,
      supportedChainIds: getSupportedChainIds(),
    })

    // Auto-clear errors when network changes successfully
    if (isSupported && isReady) {
      setError(null)
    }

    // Auto-set error for unsupported networks
    if (chainId && !isSupported) {
      setError(`Unsupported network (Chain ID: ${chainId}). Please switch to a supported network.`)
    }

    // Auto-set error for mainnet when contract not ready
    if (isSupported && !isReady && networkType === "mainnet") {
      setError("Mainnet contract is not yet deployed. Please switch to testnet or wait for mainnet deployment.")
    }
  }, [chainId, networkType, isSupported, isReady, config, isConnected])

  // Listen for custom network refresh events
  useEffect(() => {
    const handleNetworkRefresh = () => {
      console.log("🔄 Network refresh event received")
      // This will trigger re-evaluation of all derived state
    }

    window.addEventListener("networkRefresh", handleNetworkRefresh)
    return () => window.removeEventListener("networkRefresh", handleNetworkRefresh)
  }, [])

  return {
    // Network state
    chainId,
    networkType,
    config,
    isSupported,
    isReady,

    // Connection state
    isConnected,
    isLoading: isLoading || isSwitchPending,
    error,

    // Network options
    canSwitchNetwork: Boolean(switchChain),
    availableNetworks,

    // Actions
    switchToNetwork,
    switchToChainId,
    refreshNetworkState,
    clearError,
  }
}
