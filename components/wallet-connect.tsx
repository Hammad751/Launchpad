"use client"

import { useAccount, useConnect, useDisconnect } from "wagmi"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wallet, LogOut, Copy, Check, Zap, Sparkles, Shield, Globe } from "lucide-react"
import { useState } from "react"

// Enhanced wallet icons mapping with more wallets
const walletIcons: Record<string, string> = {
  metaMask: "🦊",
  trustWallet: "🛡️",
  coinbaseWallet: "🔵",
  walletConnect: "🔗",
  safe: "🔒",
  rabby: "🐰",
  brave: "🦁",
  phantom: "👻",
  okx: "⭕",
  bitget: "🟡",
  bybit: "🟨",
  binance: "🟨",
  exodus: "🚀",
  frame: "🖼️",
  onekey: "🔑",
  tokenpocket: "💰",
  zerion: "0️⃣",
  rainbow: "🌈",
  talisman: "🔮",
  xdefi: "❌",
  backpack: "🎒",
  dawn: "🌅",
  enkrypt: "🔐",
  frontier: "🏔️",
  keplr: "🌌",
  kaikas: "🦘",
  mathWallet: "📊",
  safepal: "🔐",
  subwallet: "📱",
  taho: "🌮",
  uniswap: "🦄",
  zeal: "⚡",
}

// Enhanced wallet display names
const walletNames: Record<string, string> = {
  metaMask: "MetaMask",
  trustWallet: "Trust Wallet",
  coinbaseWallet: "Coinbase Wallet",
  walletConnect: "WalletConnect",
  safe: "Safe (Gnosis)",
  rabby: "Rabby Wallet",
  brave: "Brave Wallet",
  phantom: "Phantom",
  okx: "OKX Wallet",
  bitget: "Bitget Wallet",
  bybit: "Bybit Wallet",
  binance: "Binance Wallet",
  exodus: "Exodus",
  frame: "Frame",
  onekey: "OneKey",
  tokenpocket: "TokenPocket",
  zerion: "Zerion",
  rainbow: "Rainbow",
  talisman: "Talisman",
  xdefi: "XDEFI Wallet",
  backpack: "Backpack",
  dawn: "Dawn Wallet",
  enkrypt: "Enkrypt",
  frontier: "Frontier Wallet",
  keplr: "Keplr",
  kaikas: "Kaikas",
  mathWallet: "Math Wallet",
  safepal: "SafePal",
  subwallet: "SubWallet",
  taho: "Taho",
  uniswap: "Uniswap Wallet",
  zeal: "Zeal",
}

// Wallet categories for better organization
const walletCategories = {
  popular: ["metaMask", "trustWallet", "coinbaseWallet", "rabby", "phantom"],
  exchange: ["okx", "bitget", "bybit", "binance"],
  defi: ["zerion", "uniswap", "xdefi", "frontier"],
  multichain: ["enkrypt", "tokenpocket", "mathWallet", "talisman", "subwallet"],
  other: [
    "brave",
    "exodus",
    "frame",
    "onekey",
    "rainbow",
    "backpack",
    "dawn",
    "keplr",
    "kaikas",
    "safepal",
    "taho",
    "zeal",
    "walletConnect",
    "safe",
  ],
}

export function WalletConnect() {
  const { address, isConnected, chain } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const [copied, setCopied] = useState(false)
  const [showAllWallets, setShowAllWallets] = useState(false)

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Filter and organize connectors
  const organizedConnectors = {
    popular: connectors.filter((c) => walletCategories.popular.includes(c.id.toLowerCase())),
    exchange: connectors.filter((c) => walletCategories.exchange.includes(c.id.toLowerCase())),
    defi: connectors.filter((c) => walletCategories.defi.includes(c.id.toLowerCase())),
    multichain: connectors.filter((c) => walletCategories.multichain.includes(c.id.toLowerCase())),
    other: connectors.filter(
      (c) =>
        walletCategories.other.includes(c.id.toLowerCase()) ||
        !Object.values(walletCategories).flat().includes(c.id.toLowerCase()),
    ),
  }

  const displayConnectors = showAllWallets
    ? connectors
    : [...organizedConnectors.popular, ...organizedConnectors.exchange.slice(0, 2)]

  if (isConnected && address) {
    return (
      <div className="relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-green-400/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-emerald-400/20 rounded-full blur-xl animate-pulse animation-delay-2000"></div>
        </div>

        <Card className="border-0 shadow-2xl bg-gradient-to-br from-green-50 via-white to-emerald-50 backdrop-blur-sm relative overflow-hidden">
          {/* Success indicator line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>

          <CardContent className="p-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                {/* Animated wallet icon */}
                <div className="relative">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-xl transform hover:scale-105 transition-transform duration-200">
                    <Wallet className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 h-6 w-6 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-xl text-gray-800">
                      {address.slice(0, 6)}...{address.slice(-4)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-green-100 rounded-full"
                      onClick={copyAddress}
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4 text-gray-500" />
                      )}
                    </Button>
                  </div>

                  {chain && (
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800 border-green-200 px-3 py-1">
                        <Zap className="w-3 h-3 mr-1" />
                        {chain.name}
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-3 py-1">
                        <Globe className="w-3 h-3 mr-1" />
                        Connected
                      </Badge>
                    </div>
                  )}

                  <p className="text-sm text-gray-600">Ready to deploy tokens on DXB Chain</p>
                </div>
              </div>

              <Button
                variant="outline"
                onClick={() => disconnect()}
                className="flex items-center gap-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-200 px-6 py-3 rounded-xl"
              >
                <LogOut className="h-4 w-4" />
                Disconnect
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-purple-400/10 rounded-full blur-2xl animate-blob"></div>
        <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-pink-400/10 rounded-full blur-2xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-8 left-8 w-24 h-24 bg-blue-400/10 rounded-full blur-2xl animate-blob animation-delay-4000"></div>
      </div>

      <Card className="border-0 shadow-2xl bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 backdrop-blur-sm relative overflow-hidden">
        {/* Decorative top border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>

        <CardContent className="p-10">
          <div className="text-center space-y-8">
            {/* Hero Section */}
            <div className="relative">
              <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 flex items-center justify-center mx-auto shadow-2xl transform hover:scale-105 transition-all duration-300">
                <Wallet className="h-12 w-12 text-white" />
                <div className="absolute -top-2 -right-2 h-8 w-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <h3 className="font-bold text-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Connect Your Wallet
                </h3>
                <p className="text-lg text-gray-600 max-w-md mx-auto">
                  Choose your preferred wallet to start creating tokens on DXB Chain
                </p>
              </div>

              {/* Feature badges */}
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <Badge className="bg-purple-100 text-purple-700 border-purple-200 px-4 py-2">
                  <Shield className="w-4 h-4 mr-2" />
                  Secure Connection
                </Badge>
                <Badge className="bg-pink-100 text-pink-700 border-pink-200 px-4 py-2">
                  <Zap className="w-4 h-4 mr-2" />
                  Instant Setup
                </Badge>
                <Badge className="bg-blue-100 text-blue-700 border-blue-200 px-4 py-2">
                  <Globe className="w-4 h-4 mr-2" />
                  Multi-Chain Support
                </Badge>
              </div>
            </div>

            {/* Popular Wallets */}
            <div className="space-y-6">
              <div className="text-left">
                <h4 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-500" />
                  Popular Wallets
                </h4>
                <p className="text-sm text-gray-600">Most trusted and widely used wallets</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {organizedConnectors.popular.map((connector) => {
                  const walletId = connector.id.toLowerCase()
                  const icon = walletIcons[walletId] || "💼"
                  const displayName = walletNames[walletId] || connector.name

                  return (
                    <Button
                      key={connector.uid}
                      onClick={() => connect({ connector })}
                      disabled={isPending}
                      variant="outline"
                      className="flex flex-col items-center gap-3 h-24 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 hover:border-purple-300 hover:shadow-lg transition-all duration-300 group rounded-2xl border-2"
                    >
                      <span className="text-3xl group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">
                        {icon}
                      </span>
                      <span className="font-semibold text-xs text-center leading-tight text-gray-700 group-hover:text-purple-700">
                        {displayName}
                      </span>
                    </Button>
                  )
                })}
              </div>
            </div>

            {/* Exchange Wallets */}
            {organizedConnectors.exchange.length > 0 && (
              <div className="space-y-6">
                <div className="text-left">
                  <h4 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <Globe className="h-5 w-5 text-blue-500" />
                    Exchange Wallets
                  </h4>
                  <p className="text-sm text-gray-600">Wallets from major cryptocurrency exchanges</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {organizedConnectors.exchange.slice(0, showAllWallets ? undefined : 4).map((connector) => {
                    const walletId = connector.id.toLowerCase()
                    const icon = walletIcons[walletId] || "💼"
                    const displayName = walletNames[walletId] || connector.name

                    return (
                      <Button
                        key={connector.uid}
                        onClick={() => connect({ connector })}
                        disabled={isPending}
                        variant="outline"
                        className="flex flex-col items-center gap-3 h-24 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group rounded-2xl border-2"
                      >
                        <span className="text-3xl group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">
                          {icon}
                        </span>
                        <span className="font-semibold text-xs text-center leading-tight text-gray-700 group-hover:text-blue-700">
                          {displayName}
                        </span>
                      </Button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Show More/Less Button */}
            <div className="pt-4">
              <Button
                variant="ghost"
                onClick={() => setShowAllWallets(!showAllWallets)}
                className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 px-8 py-3 rounded-xl font-semibold transition-all duration-200"
              >
                {showAllWallets
                  ? "Show Less Wallets"
                  : `Show All Wallets (${connectors.length - displayConnectors.length} more)`}
              </Button>
            </div>

            {/* Additional Wallet Categories (when expanded) */}
            {showAllWallets && (
              <div className="space-y-8 pt-4">
                {/* DeFi Wallets */}
                {organizedConnectors.defi.length > 0 && (
                  <div className="space-y-6">
                    <div className="text-left">
                      <h4 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                        <Zap className="h-5 w-5 text-green-500" />
                        DeFi Wallets
                      </h4>
                      <p className="text-sm text-gray-600">Specialized wallets for decentralized finance</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {organizedConnectors.defi.map((connector) => {
                        const walletId = connector.id.toLowerCase()
                        const icon = walletIcons[walletId] || "💼"
                        const displayName = walletNames[walletId] || connector.name

                        return (
                          <Button
                            key={connector.uid}
                            onClick={() => connect({ connector })}
                            disabled={isPending}
                            variant="outline"
                            className="flex flex-col items-center gap-3 h-24 hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50 hover:border-green-300 hover:shadow-lg transition-all duration-300 group rounded-2xl border-2"
                          >
                            <span className="text-3xl group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">
                              {icon}
                            </span>
                            <span className="font-semibold text-xs text-center leading-tight text-gray-700 group-hover:text-green-700">
                              {displayName}
                            </span>
                          </Button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Multi-chain Wallets */}
                {organizedConnectors.multichain.length > 0 && (
                  <div className="space-y-6">
                    <div className="text-left">
                      <h4 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                        <Globe className="h-5 w-5 text-orange-500" />
                        Multi-chain Wallets
                      </h4>
                      <p className="text-sm text-gray-600">Wallets supporting multiple blockchain networks</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {organizedConnectors.multichain.map((connector) => {
                        const walletId = connector.id.toLowerCase()
                        const icon = walletIcons[walletId] || "💼"
                        const displayName = walletNames[walletId] || connector.name

                        return (
                          <Button
                            key={connector.uid}
                            onClick={() => connect({ connector })}
                            disabled={isPending}
                            variant="outline"
                            className="flex flex-col items-center gap-3 h-24 hover:bg-gradient-to-br hover:from-orange-50 hover:to-yellow-50 hover:border-orange-300 hover:shadow-lg transition-all duration-300 group rounded-2xl border-2"
                          >
                            <span className="text-3xl group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">
                              {icon}
                            </span>
                            <span className="font-semibold text-xs text-center leading-tight text-gray-700 group-hover:text-orange-700">
                              {displayName}
                            </span>
                          </Button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Other Wallets */}
                {organizedConnectors.other.length > 0 && (
                  <div className="space-y-6">
                    <div className="text-left">
                      <h4 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                        <Wallet className="h-5 w-5 text-gray-500" />
                        Other Wallets
                      </h4>
                      <p className="text-sm text-gray-600">Additional wallet options and connectors</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {organizedConnectors.other.map((connector) => {
                        const walletId = connector.id.toLowerCase()
                        const icon = walletIcons[walletId] || "💼"
                        const displayName = walletNames[walletId] || connector.name

                        return (
                          <Button
                            key={connector.uid}
                            onClick={() => connect({ connector })}
                            disabled={isPending}
                            variant="outline"
                            className="flex flex-col items-center gap-3 h-24 hover:bg-gradient-to-br hover:from-gray-50 hover:to-slate-50 hover:border-gray-300 hover:shadow-lg transition-all duration-300 group rounded-2xl border-2"
                          >
                            <span className="text-3xl group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">
                              {icon}
                            </span>
                            <span className="font-semibold text-xs text-center leading-tight text-gray-700 group-hover:text-gray-800">
                              {displayName}
                            </span>
                          </Button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="pt-8 border-t border-gray-100">
              <div className="text-xs text-gray-500 max-w-2xl mx-auto space-y-2">
                <p className="font-medium">🔒 Secure & Private Connection</p>
                <p>
                  By connecting a wallet, you agree to our Terms of Service and acknowledge that you have read and
                  understand our Privacy Policy. All wallets support DXB Chain and custom networks.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
