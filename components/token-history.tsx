"use client"

import { useState, useEffect } from "react"
import { useAccount } from "wagmi"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useTokenHistory } from "@/hooks/use-token-history"
import type { DeployedToken } from "@/types/token"
import {
  History,
  Coins,
  ExternalLink,
  Search,
  TrendingUp,
  Hash,
  Copy,
  Check,
  AlertCircle,
  Sparkles,
  RefreshCw,
  Loader2,
  Construction,
  Info,
} from "lucide-react"
import { getExplorerUrl, isMainnetChain, isMainnetContractReadyByChainId } from "@/lib/network-config"

export function TokenHistory() {
  const { address, isConnected, chain } = useAccount()
  const { tokens, isLoading, error, refreshTokens } = useTokenHistory()
  const [filteredTokens, setFilteredTokens] = useState<DeployedToken[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)

  // Filter tokens based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredTokens(tokens)
    } else {
      const filtered = tokens.filter(
        (token) =>
          token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          token.address.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredTokens(filtered)
    }
  }, [tokens, searchQuery])

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedAddress(text)
      setTimeout(() => setCopiedAddress(null), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  const formatSupply = (supply: string) => {
    const num = Number(supply)
    if (num >= 1000000000) {
      return `${(num / 1000000000).toFixed(1)}B`
    } else if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toLocaleString()
  }

  if (!isConnected) {
    return (
      <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm mx-4 sm:mx-0">
        <CardContent className="p-8 sm:p-12 text-center">
          <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
            <History className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Connect Your Wallet</h3>
          <p className="text-sm sm:text-base text-gray-600">
            Connect your wallet to view your token deployment history
          </p>
        </CardContent>
      </Card>
    )
  }

  if (isConnected && chain?.id && isMainnetChain(chain.id) && !isMainnetContractReadyByChainId(chain.id)) {
    return (
      <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm mx-4 sm:mx-0">
        <CardContent className="p-8 sm:p-12 text-center">
          <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
            <Construction className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Mainnet Contract Not Ready</h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
            The mainnet contract is not yet deployed. Please switch to testnet to view your token history.
          </p>
          <Alert className="border-orange-200 bg-orange-50 max-w-md mx-auto">
            <Info className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800 text-sm">
              <strong>Development Mode:</strong> Switch to testnet (Chain ID: 1999) to access full functionality.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm mx-4 sm:mx-0">
        <CardContent className="p-8 sm:p-12 text-center">
          <Loader2 className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-purple-600 mx-auto mb-3 sm:mb-4" />
          <p className="text-sm sm:text-base text-gray-600">Loading your deployed tokens...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6 px-4 sm:px-0">
      {/* Header */}
      <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
        <CardHeader className="px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg w-fit">
              <History className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl sm:text-2xl font-bold">My Token History</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                View all tokens you've deployed through the factory contract
              </CardDescription>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs sm:text-sm px-2 sm:px-3 py-1">
                Total Tokens: {tokens.length}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={refreshTokens}
                disabled={isLoading}
                className="flex items-center gap-2 bg-transparent text-xs sm:text-sm"
              >
                <RefreshCw className={`h-3 w-3 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
            <div className="relative flex-1 sm:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
              <Input
                placeholder="Search by name, symbol, or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 sm:pl-10 h-8 sm:h-10 text-xs sm:text-sm"
              />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Error State */}
      {error && (
        <Alert variant="destructive" className="border-red-200">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-sm">{error}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={refreshTokens}
              className="bg-transparent text-xs sm:text-sm w-fit"
            >
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Token List */}
      {filteredTokens.length === 0 && !error ? (
        <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
          <CardContent className="p-8 sm:p-12 text-center">
            {tokens.length === 0 ? (
              <div>
                <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                  <Coins className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">No Tokens Deployed</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                  You haven't deployed any tokens yet. Create your first token to get started!
                </p>
                <Alert className="border-purple-200 bg-purple-50 max-w-md mx-auto">
                  <Sparkles className="h-4 w-4 text-purple-600" />
                  <AlertDescription className="text-purple-800 text-sm">
                    <strong>How it works:</strong> Your deployed tokens are fetched directly from the blockchain using
                    the factory contract's getAllUserTokens() function.
                  </AlertDescription>
                </Alert>
              </div>
            ) : (
              <div>
                <AlertCircle className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">No Results Found</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  No tokens match your search criteria. Try a different search term.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
          {filteredTokens.map((token, index) => (
            <Card
              key={token.address}
              className="border-0 shadow-xl bg-white/95 backdrop-blur-sm hover:shadow-2xl transition-shadow"
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start justify-between">
                  {/* Left side - Token Info */}
                  <div className="flex items-start gap-3 sm:gap-4 flex-1">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm sm:text-lg flex-shrink-0">
                      {token.symbol.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      {/* Token Name and Badge Row */}
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-base sm:text-lg font-bold text-gray-800 truncate">{token.name}</h3>
                        <Badge className="bg-purple-100 text-purple-800 border-purple-200 text-xs">
                          {token.symbol}
                        </Badge>
                        <span className="text-xs sm:text-sm text-gray-500">#{index + 1}</span>
                        {/* View Button aligned with token name */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            const url = getExplorerUrl(`/address/${token.address}`)
                            window.open(url, "_blank", "noopener,noreferrer")
                          }}
                          className="flex items-center gap-1 text-xs h-6 px-2 ml-auto"
                        >
                          <ExternalLink className="h-3 w-3" />
                          View
                        </Button>
                      </div>

                      {/* Token Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs text-gray-500">Total Supply</p>
                            <p className="font-semibold text-xs sm:text-sm">{formatSupply(token.totalSupply)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Hash className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-gray-500">Contract Address</p>
                            <div className="flex items-center gap-1">
                              <code className="text-xs bg-gray-100 px-1 sm:px-2 py-1 rounded font-mono truncate">
                                {token.address.slice(0, 6)}...{token.address.slice(-4)}
                              </code>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-5 w-5 p-0 flex-shrink-0"
                                onClick={() => copyToClipboard(token.address)}
                              >
                                {copiedAddress === token.address ? (
                                  <Check className="h-3 w-3 text-green-600" />
                                ) : (
                                  <Copy className="h-3 w-3" />
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
