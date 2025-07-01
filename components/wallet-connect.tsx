"use client"

import { useAccount, useConnect, useDisconnect } from "wagmi"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wallet, LogOut, Copy, Check, Zap } from "lucide-react"
import { useState } from "react"

export function WalletConnect() {
  const { address, isConnected, chain } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const [copied, setCopied] = useState(false)

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (isConnected && address) {
    return (
      <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                <Wallet className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-lg">
                    {address.slice(0, 6)}...{address.slice(-4)}
                  </span>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={copyAddress}>
                    {copied ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />}
                  </Button>
                </div>
                {chain && (
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    <Zap className="w-3 h-3 mr-1" />
                    {chain.name}
                  </Badge>
                )}
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => disconnect()}
              className="flex items-center gap-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600"
            >
              <LogOut className="h-4 w-4" />
              Disconnect
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
      <CardContent className="p-8">
        <div className="text-center space-y-6">
          <div className="h-20 w-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-auto shadow-lg">
            <Wallet className="h-10 w-10 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-2xl mb-2">Connect Wallet</h3>
            <p className="text-gray-600">Choose your preferred wallet to get started</p>
          </div>
          <div className="space-y-3 max-w-sm mx-auto">
            {connectors.map((connector) => (
              <Button
                key={connector.uid}
                onClick={() => connect({ connector })}
                disabled={isPending}
                variant="outline"
                className="w-full justify-start gap-3 h-12 hover:bg-purple-50 hover:border-purple-200"
              >
                <Wallet className="h-5 w-5" />
                <span className="font-medium">
                  {connector.name === "Injected" ? "MetaMask / Trust Wallet" : connector.name}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
