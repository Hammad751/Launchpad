"use client"

import { useMemo } from "react"
import { useState, useEffect } from "react"
import { useAccount, useReadContract, useReadContracts } from "wagmi"
import { TOKEN_FACTORY_ABI } from "@/lib/contract-abi"
import { getContractAddressByChainId, isSupportedChainId, isMainnetChain } from "@/lib/network-config"
import type { DeployedToken } from "@/types/token"

// ERC20 ABI for getting token details
const ERC20_ABI = [
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const

export function useTokenHistory() {
  const { address, isConnected, chain } = useAccount()
  const [tokens, setTokens] = useState<DeployedToken[]>([])
  const [isLoadingDetails, setIsLoadingDetails] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<any>({})

  // Get contract address for current chain
  const contractAddress = chain?.id ? getContractAddressByChainId(chain.id) : null
  const isChainSupported = chain?.id ? isSupportedChainId(chain.id) : false

  // Debug logging with null checks
  useEffect(() => {
    const debugData = {
      address: address || null,
      isConnected: Boolean(isConnected),
      chain: chain?.name || null,
      chainId: chain?.id || null,
      contractAddress: contractAddress || null,
      isChainSupported: Boolean(isChainSupported),
      abiHasGetAllUserTokens:
        TOKEN_FACTORY_ABI?.some?.((item) => item?.type === "function" && item?.name === "getAllUserTokens") || false,
    }

    console.log("🔍 Token History Debug Info:", debugData)
    setDebugInfo(debugData)
  }, [address, isConnected, chain, contractAddress, isChainSupported])

  // Get all user tokens from the contract with enhanced error handling
  const {
    data: userTokenAddresses,
    isLoading: isLoadingAddresses,
    error: addressesError,
    refetch: refetchAddresses,
    status: addressesStatus,
  } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: TOKEN_FACTORY_ABI,
    functionName: "getAllUserTokens",
    args: address ? [address as `0x${string}`] : undefined,
    query: {
      enabled: Boolean(
        address &&
          isConnected &&
          chain?.id &&
          isChainSupported &&
          contractAddress &&
          contractAddress !== "0x0000000000000000000000000000000000000000",
      ),
      retry: 2,
      retryDelay: 2000,
      staleTime: 30000,
      gcTime: 60000,
    },
  })

  // Enhanced logging with null safety
  useEffect(() => {
    const logData = {
      status: addressesStatus || "unknown",
      isLoading: Boolean(isLoadingAddresses),
      data: userTokenAddresses || null,
      dataType: typeof userTokenAddresses,
      isArray: Array.isArray(userTokenAddresses),
      arrayLength: Array.isArray(userTokenAddresses) ? userTokenAddresses.length : 0,
      error: addressesError || null,
      errorMessage: addressesError?.message || null,
      enabled: Boolean(
        address &&
          isConnected &&
          chain?.id &&
          isChainSupported &&
          contractAddress &&
          contractAddress !== "0x0000000000000000000000000000000000000000",
      ),
      chainId: chain?.id || null,
      contractAddress: contractAddress || null,
    }

    console.log("📊 Contract Call Status:", logData)

    // Log individual addresses if it's an array
    if (Array.isArray(userTokenAddresses) && userTokenAddresses.length > 0) {
      console.log("🎯 Token Addresses Found:", userTokenAddresses)
      userTokenAddresses.forEach((addr, index) => {
        if (addr && typeof addr === "string") {
          console.log(`  ${index + 1}. ${addr}`)
        }
      })
    }
  }, [
    addressesStatus,
    isLoadingAddresses,
    userTokenAddresses,
    addressesError,
    address,
    isConnected,
    chain,
    contractAddress,
    isChainSupported,
  ])

  // Prepare contracts for batch reading token details with enhanced validation
  const tokenContracts = useMemo(() => {
    try {
      // Ensure we have a valid array of addresses
      if (!userTokenAddresses || !Array.isArray(userTokenAddresses) || userTokenAddresses.length === 0) {
        console.log("❌ No valid token addresses to process")
        return []
      }

      console.log(`🔄 Preparing contracts for ${userTokenAddresses.length} tokens`)

      const contracts = userTokenAddresses.flatMap((tokenAddress, index) => {
        // Validate each address with null checks
        if (
          !tokenAddress ||
          typeof tokenAddress !== "string" ||
          !tokenAddress.startsWith("0x") ||
          tokenAddress.length !== 42
        ) {
          console.warn(`⚠️ Invalid token address at index ${index}:`, tokenAddress)
          return []
        }

        try {
          return [
            {
              address: tokenAddress as `0x${string}`,
              abi: ERC20_ABI,
              functionName: "name" as const,
            },
            {
              address: tokenAddress as `0x${string}`,
              abi: ERC20_ABI,
              functionName: "symbol" as const,
            },
            {
              address: tokenAddress as `0x${string}`,
              abi: ERC20_ABI,
              functionName: "totalSupply" as const,
            },
          ]
        } catch (contractError) {
          console.error(`❌ Error preparing contract for ${tokenAddress}:`, contractError)
          return []
        }
      })

      return contracts
    } catch (error) {
      console.error("❌ Error in tokenContracts useMemo:", error)
      return []
    }
  }, [userTokenAddresses])

  // Batch read all token details with error handling
  const {
    data: tokenDetailsData,
    isLoading: isLoadingTokenDetails,
    error: tokenDetailsError,
  } = useReadContracts({
    contracts: tokenContracts,
    query: {
      enabled: tokenContracts.length > 0,
      retry: 1,
      retryDelay: 1000,
    },
  })

  // Process token details when data changes with comprehensive error handling
  useEffect(() => {
    try {
      // Validate that we have valid array data
      if (!Array.isArray(userTokenAddresses) || userTokenAddresses.length === 0) {
        console.log("📭 No token addresses to process")
        setTokens([])
        setError(null)
        return
      }

      if (!tokenDetailsData || !Array.isArray(tokenDetailsData)) {
        console.log("⏳ Waiting for token details data...")
        return
      }

      if (isLoadingTokenDetails) {
        console.log("🔄 Still loading token details...")
        return
      }

      console.log("🔄 Processing token details for", userTokenAddresses.length, "tokens")
      setIsLoadingDetails(true)

      const processedTokens: DeployedToken[] = []

      for (let i = 0; i < userTokenAddresses.length; i++) {
        try {
          const tokenAddress = userTokenAddresses[i]

          // Skip invalid addresses
          if (
            !tokenAddress ||
            typeof tokenAddress !== "string" ||
            !tokenAddress.startsWith("0x") ||
            tokenAddress.length !== 42
          ) {
            console.warn(`⚠️ Skipping invalid address at index ${i}:`, tokenAddress)
            continue
          }

          const baseIndex = i * 3

          // Get the results for this token with null checks
          const nameResult = tokenDetailsData[baseIndex] || null
          const symbolResult = tokenDetailsData[baseIndex + 1] || null
          const totalSupplyResult = tokenDetailsData[baseIndex + 2] || null

          console.log(`📋 Token ${i + 1} (${tokenAddress}):`, {
            nameResult,
            symbolResult,
            totalSupplyResult,
          })

          const name =
            nameResult?.status === "success" && nameResult.result ? (nameResult.result as string) : "Unknown Token"
          const symbol =
            symbolResult?.status === "success" && symbolResult.result ? (symbolResult.result as string) : "UNK"
          const totalSupplyBigInt =
            totalSupplyResult?.status === "success" && totalSupplyResult.result
              ? (totalSupplyResult.result as bigint)
              : BigInt(0)
          const totalSupply = (totalSupplyBigInt / BigInt(10 ** 18)).toString()

          const deployedToken: DeployedToken = {
            address: tokenAddress,
            name,
            symbol,
            totalSupply,
            deployer: address || "",
            deploymentTx: "",
            timestamp: Date.now(),
          }

          processedTokens.push(deployedToken)
          console.log(`✅ Processed token ${i + 1}:`, deployedToken)
        } catch (tokenError) {
          console.error(`❌ Error processing token at index ${i}:`, tokenError)
          continue
        }
      }

      console.log(`🎉 Successfully processed ${processedTokens.length} tokens`)
      setTokens(processedTokens.reverse()) // Show newest first
      setError(null)
    } catch (err) {
      console.error("❌ Error processing token details:", err)
      setError("Failed to process token details")
    } finally {
      setIsLoadingDetails(false)
    }
  }, [userTokenAddresses, tokenDetailsData, isLoadingTokenDetails, address])

  // Handle errors with comprehensive null checking
  useEffect(() => {
    try {
      if (!isChainSupported && chain?.id) {
        setError(`Unsupported network. Please switch to a supported network.`)
        return
      }

      if (!contractAddress && isChainSupported) {
        setError("Contract not available on this network")
        return
      }

      if (contractAddress === "0x0000000000000000000000000000000000000000") {
        if (chain?.id && isMainnetChain(chain.id)) {
          setError("Mainnet contract is not yet deployed. Please use testnet for now.")
        } else {
          setError("Contract address not configured for this network")
        }
        return
      }

      if (addressesError) {
        console.error("❌ Contract Error Details:", {
          error: addressesError,
          message: addressesError?.message || "Unknown error",
          cause: addressesError?.cause || null,
          name: addressesError?.name || "Unknown",
          stack: addressesError?.stack || null,
        })

        // More specific error messages
        let errorMessage = "Failed to fetch user tokens from contract"
        const errorMsg = addressesError?.message || ""

        if (errorMsg.includes("Cannot read properties of null")) {
          errorMessage = "Configuration error - please refresh the page"
        } else if (errorMsg.includes("m.transports[e] is not a function")) {
          errorMessage = "Transport configuration error - check wagmi config"
        } else if (errorMsg.includes("execution reverted")) {
          errorMessage = "Contract call reverted - function may not exist or have wrong parameters"
        } else if (errorMsg.includes("network")) {
          errorMessage = "Network error - check your connection and RPC"
        } else if (errorMsg.includes("insufficient funds")) {
          errorMessage = "Insufficient funds for gas"
        } else if (errorMsg.includes("CALL_EXCEPTION")) {
          errorMessage = "Contract call failed - check contract address and function name"
        }

        setError(errorMessage)
      } else if (tokenDetailsError) {
        setError("Failed to fetch token details")
        console.error("Token details error:", tokenDetailsError)
      } else {
        setError(null)
      }
    } catch (errorHandlingError) {
      console.error("❌ Error in error handling:", errorHandlingError)
      setError("An unexpected error occurred")
    }
  }, [addressesError, tokenDetailsError, isChainSupported, contractAddress, chain?.id])

  // Listen for new token deployments with error handling
  useEffect(() => {
    const handleTokenDeployed = () => {
      try {
        console.log("🚀 New token deployed, refreshing...")
        refetchAddresses()
      } catch (error) {
        console.error("❌ Error handling token deployed event:", error)
      }
    }

    window.addEventListener("tokenDeployed", handleTokenDeployed)
    return () => {
      window.removeEventListener("tokenDeployed", handleTokenDeployed)
    }
  }, [refetchAddresses])

  const refreshTokens = () => {
    try {
      console.log("🔄 Manual refresh triggered")
      refetchAddresses()
    } catch (error) {
      console.error("❌ Error in manual refresh:", error)
    }
  }

  return {
    tokens,
    isLoading: isLoadingAddresses || isLoadingTokenDetails || isLoadingDetails,
    error,
    refreshTokens,
    debugInfo,
    rawData: {
      userTokenAddresses: userTokenAddresses || null,
      addressesError: addressesError || null,
      addressesStatus: addressesStatus || "unknown",
      isArray: Array.isArray(userTokenAddresses),
      arrayLength: Array.isArray(userTokenAddresses) ? userTokenAddresses.length : 0,
      contractAddress: contractAddress || null,
      isChainSupported: Boolean(isChainSupported),
    },
  }
}
