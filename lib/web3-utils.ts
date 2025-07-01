"use client"

import { useState, useEffect } from "react"

// Simple Web3 utilities without wagmi/viem
declare global {
  interface Window {
    ethereum?: any
  }
}

export interface WalletState {
  isConnected: boolean
  address: string | null
  chainId: number | null
  isConnecting: boolean
}

export function useWallet() {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    chainId: null,
    isConnecting: false,
  })

  const connect = async () => {
    if (!window.ethereum) {
      throw new Error("No wallet found. Please install MetaMask or another Web3 wallet.")
    }

    try {
      setWallet((prev) => ({ ...prev, isConnecting: true }))

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      const chainId = await window.ethereum.request({
        method: "eth_chainId",
      })

      setWallet({
        isConnected: true,
        address: accounts[0],
        chainId: Number.parseInt(chainId, 16),
        isConnecting: false,
      })
    } catch (error) {
      setWallet((prev) => ({ ...prev, isConnecting: false }))
      throw error
    }
  }

  const disconnect = () => {
    setWallet({
      isConnected: false,
      address: null,
      chainId: null,
      isConnecting: false,
    })
  }

  const switchToNetwork = async (chainId: number) => {
    if (!window.ethereum) return

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      })
    } catch (error: any) {
      // If network doesn't exist, add it
      if (error.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: `0x${chainId.toString(16)}`,
              chainName: "DXB Chain",
              nativeCurrency: {
                name: "VRCN",
                symbol: "VRCN",
                decimals: 18,
              },
              rpcUrls: ["https://rpc-testnet-1.vrcchain.com"],
              blockExplorerUrls: ["https://dxb.vrcchain.com"],
            },
          ],
        })
      }
    }
  }

  // Check if already connected on mount
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          })

          if (accounts.length > 0) {
            const chainId = await window.ethereum.request({
              method: "eth_chainId",
            })

            setWallet({
              isConnected: true,
              address: accounts[0],
              chainId: Number.parseInt(chainId, 16),
              isConnecting: false,
            })
          }
        } catch (error) {
          console.error("Failed to check wallet connection:", error)
        }
      }
    }

    checkConnection()

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnect()
        } else {
          setWallet((prev) => ({ ...prev, address: accounts[0] }))
        }
      })

      window.ethereum.on("chainChanged", (chainId: string) => {
        setWallet((prev) => ({ ...prev, chainId: Number.parseInt(chainId, 16) }))
      })
    }
  }, [])

  return {
    ...wallet,
    connect,
    disconnect,
    switchToNetwork,
  }
}

export async function sendTransaction(to: string, data: string, value = "0") {
  if (!window.ethereum) {
    throw new Error("No wallet found")
  }

  const accounts = await window.ethereum.request({
    method: "eth_accounts",
  })

  if (accounts.length === 0) {
    throw new Error("Wallet not connected")
  }

  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [
      {
        from: accounts[0],
        to,
        data,
        value: `0x${Number.parseInt(value).toString(16)}`,
      },
    ],
  })

  return txHash
}

export function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}
