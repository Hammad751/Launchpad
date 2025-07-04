"use client"

import { useEffect } from "react"
import { useNetworkManager } from "./use-network-manager"

/**
 * Hook that automatically adapts the app to the connected network
 * Handles automatic state updates, error management, and network-specific configurations
 */
export function useAutoNetworkAdapter() {
  const networkManager = useNetworkManager()

  const { chainId, networkType, config, isSupported, isReady, isConnected, error } = networkManager

  // Auto-refresh token history when network changes
  useEffect(() => {
    if (isConnected && isSupported && isReady && chainId) {
      console.log(`🔄 Network changed to ${networkType} (${chainId}), refreshing app state...`)

      // Dispatch events to refresh various parts of the app
      window.dispatchEvent(
        new CustomEvent("networkChanged", {
          detail: { chainId, networkType, config },
        }),
      )

      // Refresh token history
      window.dispatchEvent(new CustomEvent("tokenDeployed"))

      // Refresh any other network-dependent data
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("networkRefresh"))
      }, 1000)
    }
  }, [chainId, networkType, isSupported, isReady, isConnected, config])

  // Auto-log network status for debugging
  useEffect(() => {
    if (isConnected) {
      console.log("🌐 Auto Network Adapter Status:", {
        chainId,
        networkType,
        isSupported,
        isReady,
        contractAddress: config?.contractAddress,
        error: error || "None",
      })
    }
  }, [chainId, networkType, isSupported, isReady, isConnected, config, error])

  return networkManager
}
