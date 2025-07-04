"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAutoNetworkAdapter } from "@/hooks/use-auto-network-adapter"
import {
  Wifi,
  WifiOff,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Network,
  Zap,
  Construction,
  ArrowRightLeft,
} from "lucide-react"

export function ComprehensiveNetworkManager() {
  const {
    chainId,
    networkType,
    config,
    isSupported,
    isReady,
    isConnected,
    isLoading,
    error,
    canSwitchNetwork,
    availableNetworks,
    switchToNetwork,
    refreshNetworkState,
    clearError,
  } = useAutoNetworkAdapter()

  if (!isConnected) {
    return (
      <Card className="border-gray-200">
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-center gap-2 text-gray-500">
            <WifiOff className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-sm">No wallet connected</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <Network className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="hidden sm:inline">Network Status</span>
          <span className="sm:hidden">Network</span>
          {isLoading && <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-6">
        {/* Current Network Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full flex-shrink-0 ${
                isReady ? "bg-green-500" : isSupported ? "bg-yellow-500" : "bg-red-500"
              }`}
            />
            <div className="min-w-0 flex-1">
              <p className="font-medium text-sm sm:text-base truncate">{config?.chainName || `Chain ${chainId}`}</p>
              <p className="text-xs sm:text-sm text-gray-500">
                ID: {chainId} • {networkType?.toUpperCase() || "Unknown"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            {isReady ? (
              <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                <CheckCircle className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                <span className="hidden sm:inline">Ready</span>
                <span className="sm:hidden">OK</span>
              </Badge>
            ) : isSupported ? (
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 text-xs">
                <Construction className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                <span className="hidden sm:inline">Pending</span>
                <span className="sm:hidden">Pending</span>
              </Badge>
            ) : (
              <Badge variant="destructive" className="text-xs">
                <AlertTriangle className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                <span className="hidden sm:inline">Unsupported</span>
                <span className="sm:hidden">Error</span>
              </Badge>
            )}
          </div>
        </div>

        {/* Contract Status */}
        {config && (
          <div className="bg-gray-50 rounded-lg p-2 sm:p-3 space-y-1 sm:space-y-2">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-gray-600">Contract:</span>
              <code className="bg-white px-1 sm:px-2 py-1 rounded text-xs">
                <span className="sm:hidden">
                  {config.contractAddress.slice(0, 4)}...{config.contractAddress.slice(-4)}
                </span>
                <span className="hidden sm:inline">
                  {config.contractAddress.slice(0, 6)}...{config.contractAddress.slice(-4)}
                </span>
              </code>
            </div>
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-gray-600">Explorer:</span>
              <a
                href={config.explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-xs"
              >
                View
              </a>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4" />
            <AlertDescription className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm">
              <span className="break-words">{error}</span>
              <Button variant="outline" size="sm" onClick={clearError} className="text-xs w-fit bg-transparent">
                Dismiss
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Network Switching */}
        {canSwitchNetwork && !isReady && (
          <div className="space-y-2 sm:space-y-3">
            <p className="text-xs sm:text-sm font-medium text-gray-700">Switch to supported network:</p>
            <div className="flex flex-col sm:flex-row gap-2">
              {availableNetworks.map((network) => (
                <Button
                  key={network.chainId}
                  variant={chainId === network.chainId ? "default" : "outline"}
                  size="sm"
                  onClick={() => switchToNetwork(network.chainId === 1999 ? "testnet" : "mainnet")}
                  disabled={isLoading || chainId === network.chainId}
                  className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                >
                  {network.chainId === 1999 ? <Zap className="h-3 w-3" /> : <Wifi className="h-3 w-3" />}
                  <span className="truncate">{network.chainName}</span>
                  {chainId === network.chainId && <CheckCircle className="h-3 w-3" />}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={refreshNetworkState}
            disabled={isLoading}
            className="flex items-center gap-1 sm:gap-2 bg-transparent text-xs sm:text-sm"
          >
            <RefreshCw className={`h-3 w-3 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>

          {canSwitchNetwork && isSupported && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => switchToNetwork(networkType === "testnet" ? "mainnet" : "testnet")}
              disabled={isLoading}
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
            >
              <ArrowRightLeft className="h-3 w-3" />
              <span className="hidden sm:inline">Switch to {networkType === "testnet" ? "Mainnet" : "Testnet"}</span>
              <span className="sm:hidden">Switch</span>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
