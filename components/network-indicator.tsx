"use client"

import { Badge } from "@/components/ui/badge"
import { useAutoNetworkAdapter } from "@/hooks/use-auto-network-adapter"
import { AlertTriangle, CheckCircle, Wifi, Construction } from "lucide-react"

export function NetworkIndicator() {
  const { chainId, networkType, config, isSupported, isReady, isConnected, error } = useAutoNetworkAdapter()

  if (!isConnected) {
    return (
      <Badge variant="outline" className="bg-gray-100 text-gray-600 border-gray-200">
        <Wifi className="w-3 h-3 mr-1" />
        No Wallet Connected
      </Badge>
    )
  }

  if (!isSupported) {
    return (
      <div className="flex items-center gap-2">
        <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">
          <AlertTriangle className="w-3 h-3 mr-1" />
          Unsupported Network (ID: {chainId})
        </Badge>
      </div>
    )
  }

  if (!isReady) {
    return (
      <div className="flex items-center gap-2">
        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
          <Construction className="w-3 h-3 mr-1" />
          {config?.chainName} (Contract Pending)
        </Badge>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Badge
        className={`${
          networkType === "testnet"
            ? "bg-orange-100 text-orange-800 border-orange-200"
            : "bg-green-100 text-green-800 border-green-200"
        }`}
      >
        {networkType === "testnet" ? "🧪" : "🌐"} {config?.chainName}
      </Badge>

      <Badge className="bg-green-100 text-green-800 border-green-200">
        <CheckCircle className="w-3 h-3 mr-1" />
        Ready
      </Badge>
    </div>
  )
}
