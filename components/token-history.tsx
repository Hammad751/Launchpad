"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ExternalLink, Copy, Coins, AlertCircle, Star, Calendar, Hash, TrendingUp } from "lucide-react"
import { useWallet } from "@/lib/web3-utils"
import { useToast } from "@/hooks/use-toast"

// Mock data for demonstration
const mockTokens = [
  {
    address: "0x1234567890123456789012345678901234567890",
    name: "My Awesome Token",
    symbol: "MAT",
    totalSupply: "1000000",
    decimals: 18,
    deployedAt: "2024-01-15",
  },
  {
    address: "0x0987654321098765432109876543210987654321",
    name: "Demo Coin",
    symbol: "DEMO",
    totalSupply: "500000",
    decimals: 18,
    deployedAt: "2024-01-10",
  },
]

export function TokenHistory() {
  const { isConnected, chainId } = useWallet()
  const { toast } = useToast()

  const copyAddress = async (tokenAddress: string) => {
    await navigator.clipboard.writeText(tokenAddress)
    toast({
      title: "Address copied!",
      description: "Token address copied to clipboard",
    })
  }

  const openInExplorer = (tokenAddress: string) => {
    window.open(`https://dxb.vrcchain.com/address/${tokenAddress}`, "_blank")
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
      <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-400/30">
        <CardContent className="p-12 text-center">
          <AlertCircle className="w-16 h-16 text-orange-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Wallet Required</h3>
          <p className="text-gray-300">Please connect your wallet to view your token deployment history.</p>
        </CardContent>
      </Card>
    )
  }

  if (chainId !== 1999) {
    return (
      <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-400/30">
        <CardContent className="p-12 text-center">
          <AlertCircle className="w-16 h-16 text-orange-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Wrong Network</h3>
          <p className="text-gray-300">Please switch to DXB Chain to view your tokens.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with stats */}
      <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <Coins className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-white">Token Portfolio</CardTitle>
                <CardDescription className="text-gray-300">Your deployed tokens on DXB Chain</CardDescription>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-4 border border-purple-400/20">
              <div className="flex items-center gap-3">
                <Star className="w-8 h-8 text-purple-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{mockTokens.length}</p>
                  <p className="text-sm text-gray-400">Total Tokens</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg p-4 border border-green-400/20">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-green-400" />
                <div>
                  <p className="text-2xl font-bold text-white">
                    {mockTokens.reduce((acc, token) => acc + Number(token.totalSupply), 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-400">Total Supply</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-lg p-4 border border-blue-400/20">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-blue-400" />
                <div>
                  <p className="text-2xl font-bold text-white">
                    {mockTokens.length > 0 ? new Date(mockTokens[0].deployedAt).toLocaleDateString() : "N/A"}
                  </p>
                  <p className="text-sm text-gray-400">Latest Deploy</p>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Token Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockTokens.map((token, index) => (
          <Card
            key={token.address}
            className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10"
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {token.symbol.charAt(0)}
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg">{token.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-purple-500/20 text-purple-200 border-purple-400/30 text-xs">
                        {token.symbol}
                      </Badge>
                      <span className="text-xs text-gray-500">#{index + 1}</span>
                    </div>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-200 border-blue-400/30">
                  ERC-20
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Token stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-xs text-gray-400">Total Supply</span>
                  </div>
                  <p className="text-white font-semibold">{formatSupply(token.totalSupply)}</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <div className="flex items-center gap-2 mb-1">
                    <Hash className="w-4 h-4 text-purple-400" />
                    <span className="text-xs text-gray-400">Decimals</span>
                  </div>
                  <p className="text-white font-semibold">{token.decimals}</p>
                </div>
              </div>

              {/* Contract address */}
              <div className="space-y-2">
                <span className="text-gray-400 text-sm flex items-center gap-2">
                  <Hash className="w-4 h-4" />
                  Contract Address
                </span>
                <div className="flex items-center gap-2 p-3 bg-white/5 rounded-lg border border-white/10">
                  <code className="text-purple-300 font-mono text-xs flex-1 break-all">{token.address}</code>
                  <Button
                    onClick={() => copyAddress(token.address)}
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-white/20"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    onClick={() => openInExplorer(token.address)}
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-white/20"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              {/* Deploy date */}
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>Deployed on {new Date(token.deployedAt).toLocaleDateString()}</span>
              </div>

              {/* Action button */}
              <Button
                onClick={() => openInExplorer(token.address)}
                className="w-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 hover:from-purple-600/30 hover:to-pink-600/30 border border-purple-400/30 text-white transition-all duration-300"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View on DXB Explorer
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Demo notice */}
      <Alert className="border-blue-200/20 bg-blue-500/10">
        <AlertCircle className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-200">
          <strong>Demo Mode:</strong> This shows sample tokens. In the full version, your actual deployed tokens would
          be fetched from the blockchain.
        </AlertDescription>
      </Alert>
    </div>
  )
}
