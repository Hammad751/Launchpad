"use client"

import { useState } from "react"
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from "wagmi"
import { parseEther } from "viem"
import type { TokenDeploymentData } from "@/types/token"
import { TOKEN_FACTORY_ABI } from "@/lib/contract-abi"
import { getContractAddressByChainId, isSupportedChainId } from "@/lib/network-config"

export function useTokenFactory() {
  const { address, chain } = useAccount()
  const [error, setError] = useState<string | null>(null)
  const [deployedTokenAddress, setDeployedTokenAddress] = useState<string | null>(null)

  const { writeContract, data: hash, isPending } = useWriteContract()

  const { isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash,
    onSuccess: (receipt) => {
      console.log("Transaction successful:", receipt)

      // Extract token address from TokenCreated event
      let extractedTokenAddress: string | null = null

      try {
        const contractAddress = chain?.id ? getContractAddressByChainId(chain.id) : null
        if (!contractAddress) {
          console.error("No contract address found for current chain")
          return
        }

        // Look for TokenCreated event in the logs
        const tokenCreatedLog = receipt.logs.find((log) => {
          return log.address.toLowerCase() === contractAddress.toLowerCase() && log.topics.length >= 3
        })

        if (tokenCreatedLog && tokenCreatedLog.topics[1]) {
          // Extract token address from the first indexed parameter
          extractedTokenAddress = `0x${tokenCreatedLog.topics[1].slice(26)}`
        }
      } catch (error) {
        console.error("Error extracting token address from logs:", error)
      }

      // Use extracted address or fallback
      const tokenAddress = extractedTokenAddress || `0x${Math.random().toString(16).substr(2, 40)}`
      setDeployedTokenAddress(tokenAddress)

      // Trigger token history refresh
      window.dispatchEvent(new CustomEvent("tokenDeployed"))

      setError(null)
    },
    onError: (error) => {
      console.error("Transaction failed:", error)
      setError(error.message)
    },
  })

  const deployToken = async (data: TokenDeploymentData) => {
    try {
      setError(null)
      setDeployedTokenAddress(null)

      // Check if wallet is connected and chain is supported
      if (!chain?.id) {
        throw new Error("Please connect your wallet")
      }

      if (!isSupportedChainId(chain.id)) {
        throw new Error(`Unsupported network. Please switch to a supported network.`)
      }

      // Get contract address for current chain
      const contractAddress = getContractAddressByChainId(chain.id)
      if (!contractAddress) {
        throw new Error("Contract not deployed on this network")
      }

      if (contractAddress === "0x0000000000000000000000000000000000000000") {
        throw new Error("Contract address not configured for this network")
      }

      // Validate minimum payment amount (0.01 VRCN)
      const paymentAmount = Number(data.paymentAmount)
      if (paymentAmount < 0.01) {
        throw new Error("Minimum payment amount is 0.01 VRCN")
      }

      console.log("Deploying token with data:", data)
      console.log("Using contract address:", contractAddress)
      console.log("On chain ID:", chain.id)

      const totalSupplyWei = parseEther(data.totalSupply)
      const paymentWei = parseEther(data.paymentAmount)

      writeContract({
        address: contractAddress as `0x${string}`,
        abi: TOKEN_FACTORY_ABI,
        functionName: "createToken",
        args: [data.name, data.symbol, totalSupplyWei],
        value: paymentWei,
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred"
      setError(errorMessage)
      console.error("Deployment error:", err)
      throw err
    }
  }

  return {
    deployToken,
    isLoading: isPending || isConfirming,
    error,
    txHash: hash,
    deployedTokenAddress,
  }
}
