"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Wallet,
  CheckCircle,
  Copy,
  Sparkles,
  Shield,
  Zap,
  Globe,
  ExternalLink,
  LogOut,
  Star,
  Layers,
  AlertCircle,
} from "lucide-react"
import { useWallet, formatAddress } from "@/lib/web3-utils"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function WalletConnect() {
  const { isConnected, address, chainId, isConnecting, connect, disconnect, switchToNetwork } = useWallet()
  const { toast } = useToast()

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address)
      toast({
        title: "Address copied!",
        description: "Wallet address copied to clipboard",
      })
    }
  }

  const handleConnect = async () => {
    try {
      await connect()

      // Switch to DXB Chain if not already on it
      if (chainId !== 1999) {
        await switchToNetwork(1999)
      }

      toast({
        title: "Wallet Connected!",
        description: "Successfully connected to DXB Chain",
      })
    } catch (error: any) {
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet",
        variant: "destructive",
      })
    }
  }

  if (isConnected && address) {
    return (
      <div className="space-y-4">
        {/* Wrong network warning */}
        {chainId !== 1999 && (
          <Alert variant="destructive" className="bg-orange-500/10 border-orange-400/30">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-orange-200 flex items-center justify-between">
              <span>Please switch to DXB Chain to continue</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => switchToNetwork(1999)}
                className="ml-4 bg-transparent border-orange-400/30 text-orange-300 hover:bg-orange-500/20"
              >
                Switch Network
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <Card className="relative overflow-hidden bg-gradient-to-br from-emerald-500/10 via-green-500/5 to-teal-500/10 backdrop-blur-xl border border-emerald-400/20 shadow-2xl">
          {/* Success glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-green-500/5 animate-pulse"></div>

          {/* Floating particles */}
          <div className="absolute top-4 right-8 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
          <div className="absolute top-8 right-4 w-1 h-1 bg-green-400 rounded-full animate-ping delay-1000"></div>
          <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-teal-400 rounded-full animate-ping delay-2000"></div>

          <CardHeader className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-xl transform hover:scale-105 transition-transform duration-300">
                    <Wallet className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                    <CheckCircle className="w-4 h-4 text-emerald-900" />
                  </div>
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-white mb-1">Wallet Connected</CardTitle>
                  <CardDescription className="text-emerald-200 text-base">
                    Ready to deploy amazing tokens
                  </CardDescription>
                </div>
              </div>
              <Button
                onClick={disconnect}
                variant="outline"
                className="bg-red-500/10 border-red-400/30 text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-all duration-300"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Disconnect
              </Button>
            </div>
          </CardHeader>

          <CardContent className="relative z-10 space-y-6">
            {/* Status badges */}
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-emerald-500/20 text-emerald-200 border-emerald-400/30 px-4 py-2">
                <CheckCircle className="w-4 h-4 mr-2" />
                Connected
              </Badge>
              <Badge
                className={`px-4 py-2 ${
                  chainId === 1999
                    ? "bg-blue-500/20 text-blue-200 border-blue-400/30"
                    : "bg-orange-500/20 text-orange-200 border-orange-400/30"
                }`}
              >
                <Globe className="w-4 h-4 mr-2" />
                {chainId === 1999 ? "DXB Chain" : `Chain ${chainId}`}
              </Badge>
              <Badge className="bg-purple-500/20 text-purple-200 border-purple-400/30 px-4 py-2">
                <Shield className="w-4 h-4 mr-2" />
                Secure
              </Badge>
            </div>

            {/* Address display */}
            <div className="bg-white/5 rounded-xl border border-white/10 p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Wallet Address</p>
                  <code className="text-lg font-mono text-emerald-300 font-semibold">{formatAddress(address)}</code>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={copyAddress}
                    size="sm"
                    variant="ghost"
                    className="h-10 w-10 p-0 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => window.open(`https://dxb.vrcchain.com/address/${address}`, "_blank")}
                    size="sm"
                    variant="ghost"
                    className="h-10 w-10 p-0 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <Shield className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                <p className="text-xs text-gray-300">Secure</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <p className="text-xs text-gray-300">Fast</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <Star className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <p className="text-xs text-gray-300">Premium</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <Card className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-3/4 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      <CardHeader className="text-center relative z-10 pb-8">
        {/* Hero icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all duration-500 hover:rotate-12">
              <Wallet className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <Sparkles className="w-4 h-4 text-yellow-900" />
            </div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <Layers className="w-3 h-3 text-blue-900" />
            </div>
          </div>
        </div>

        <CardTitle className="text-3xl font-bold mb-4">
          <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Connect Your Wallet
          </span>
        </CardTitle>
        <CardDescription className="text-lg text-gray-300 max-w-md mx-auto">
          Connect your Web3 wallet to start creating amazing tokens on DXB Chain
        </CardDescription>

        {/* Feature highlights */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <Badge className="bg-purple-500/20 text-purple-200 border-purple-400/30 px-4 py-2">
            <Shield className="w-4 h-4 mr-2" />
            Bank-Grade Security
          </Badge>
          <Badge className="bg-blue-500/20 text-blue-200 border-blue-400/30 px-4 py-2">
            <Zap className="w-4 h-4 mr-2" />
            Lightning Fast
          </Badge>
          <Badge className="bg-green-500/20 text-green-200 border-green-400/30 px-4 py-2">
            <Globe className="w-4 h-4 mr-2" />
            Multi-Chain Ready
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="relative z-10 space-y-8">
        {/* Connect Button */}
        <div className="text-center">
          <Button
            onClick={handleConnect}
            disabled={isConnecting}
            className="h-16 px-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-purple-400/30 hover:border-purple-400/50 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 text-lg"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                <Wallet className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="font-bold">{isConnecting ? "Connecting..." : "Connect Wallet"}</div>
                <div className="text-xs text-gray-400">MetaMask, Coinbase, or any Web3 wallet</div>
              </div>
            </div>
          </Button>
        </div>

        {/* Security notice */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-400/20 p-6 text-center">
          <Shield className="w-8 h-8 text-blue-400 mx-auto mb-3" />
          <h4 className="text-white font-semibold mb-2">🔒 Your Security is Our Priority</h4>
          <p className="text-sm text-gray-400 leading-relaxed">
            All wallet connections are secured with industry-standard encryption. We never store your private keys or
            personal information.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
