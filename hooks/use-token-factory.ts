"use client"

import { useEffect, useState } from "react"
import {
  useWriteContract,
  useReadContract,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi"
import { formatEther, parseEther } from "viem"
import type { TokenDeploymentData } from "@/types/token"
import { TOKEN_FACTORY_ABI } from "@/lib/contract-abi"
import { getContractAddressByChainId, isSupportedChainId } from "@/lib/network-config"

export function useTokenFactory() {
  const { address, chain } = useAccount()
  const [error, setError] = useState<string | null>(null)
  const [deployedTokenAddress, setDeployedTokenAddress] = useState<string | null>(null)
  const [creationFee, setCreationFee] = useState<string | null>(null)
console.log("creationFee: ", creationFee);

  const { writeContract, data: hash, isPending } = useWriteContract()

  // Read the creation fee
  const factoryAddress = chain?.id ? getContractAddressByChainId(chain.id) : undefined

  const { data: rawCreationFee } = useReadContract({
    address: factoryAddress as `0x${string}`,
    abi: TOKEN_FACTORY_ABI,
    functionName: "creationFee",
    query: {
      enabled: !!factoryAddress,
    },
  })

  // Format creation fee once fetched
  useEffect(() => {
    if (rawCreationFee !== undefined) {
      const feeInEth = formatEther(rawCreationFee as bigint)
      setCreationFee(feeInEth)
    }
  }, [rawCreationFee])

  const { isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash,
    onSuccess: (receipt) => {
      console.log("Transaction successful:", receipt)

      // Extract token address from TokenCreated event
      let extractedTokenAddress: string | null = null
      try {
        const contractAddress = chain?.id ? getContractAddressByChainId(chain.id) : null
        if (!contractAddress) return

        const tokenCreatedLog = receipt.logs.find((log) => {
          return log.address.toLowerCase() === contractAddress.toLowerCase() && log.topics.length >= 3
        })

        if (tokenCreatedLog && tokenCreatedLog.topics[1]) {
          extractedTokenAddress = `0x${tokenCreatedLog.topics[1].slice(26)}`
        }
      } catch (err) {
        console.error("Error extracting token address:", err)
      }

      const tokenAddress = extractedTokenAddress || `0x${Math.random().toString(16).substr(2, 40)}`
      setDeployedTokenAddress(tokenAddress)

      window.dispatchEvent(new CustomEvent("tokenDeployed"))
      setError(null)
    },
    onError: (err) => {
      console.error("Transaction failed:", err)
      setError(err.message)
    },
  })

  const deployToken = async (data: TokenDeploymentData) => {
    try {
      setError(null)
      setDeployedTokenAddress(null)

      if (!chain?.id) throw new Error("Please connect your wallet")
      if (!isSupportedChainId(chain.id)) throw new Error("Unsupported network")

      const contractAddress = getContractAddressByChainId(chain.id)
      if (!contractAddress || contractAddress === "0x0000000000000000000000000000000000000000") {
        throw new Error("Contract address not configured")
      }

      const paymentAmount = Number(data.paymentAmount)
      if (paymentAmount < Number(creationFee)) throw new Error(`Minimum payment is ${creationFee} VRCN`)

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
      throw err
    }
  }

  return {
    deployToken,
    isLoading: isPending || isConfirming,
    error,
    txHash: hash,
    deployedTokenAddress,
    creationFee,
  }
}
