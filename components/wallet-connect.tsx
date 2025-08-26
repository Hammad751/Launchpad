"use client"

import { useAccount, useConnect, useDisconnect } from "wagmi"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wallet, LogOut, Copy, Check } from "lucide-react"
import { useState } from "react"

export function WalletConnect() {
  const { address, isConnected } = useAccount()
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
      <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm w-full max-w-sm sm:max-w-md">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Wallet className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <Badge className="bg-green-100 text-green-800 border-green-200 mb-1 sm:mb-2 text-xs">Connected</Badge>
                <div className="flex items-center gap-1 sm:gap-2">
                  <code className="text-xs sm:text-sm bg-gray-100 px-2 py-1 rounded font-mono truncate">
                    <span className="sm:hidden">
                      {address.slice(0, 6)}...{address.slice(-4)}
                    </span>
                    <span className="hidden sm:inline">
                      {address.slice(0, 8)}...{address.slice(-6)}
                    </span>
                  </code>
                  <Button variant="ghost" size="sm" onClick={copyAddress} className="h-6 w-6 p-0 flex-shrink-0">
                    {copied ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />}
                  </Button>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => disconnect()}
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm w-full sm:w-auto"
            >
              <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Disconnect</span>
              <span className="sm:hidden">Disconnect</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm w-full max-w-sm sm:max-w-md">
      <CardContent className="p-4 sm:p-6">
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
            <Wallet className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">Connect Wallet</h3>
            <p className="text-xs sm:text-sm text-gray-600">Choose a wallet to connect to the VRCN network</p>
          </div>
          <div className="space-y-2">
            {[...new Map(connectors.map(conn => [conn.name, conn])).values()].map((connector) => (
              <Button
                key={connector.uid}
                onClick={() => connect({ connector })}
                disabled={isPending}
                className="w-full h-10 sm:h-12 text-sm sm:text-base bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {/* {isPending ? "Connecting..." : `Connect ${connector.name}`} */}
                {isPending ? "Connecting..." : "Connect Wallet" }
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
