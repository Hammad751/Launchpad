"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { WalletConnect } from "@/components/wallet-connect"
import { TokenFactoryForm } from "@/components/token-factory-form"
import { TokenHistory } from "@/components/token-history"
import { AnimatedStat } from "@/components/animated-stat"
import { useStats } from "@/lib/stats-data"
import { useWallet } from "@/lib/web3-utils"
import {
  Coins,
  History,
  Sparkles,
  Zap,
  Shield,
  Globe,
  Rocket,
  Star,
  TrendingUp,
  Users,
  Activity,
  BarChart3,
} from "lucide-react"

export default function HomePage() {
  const { isConnected } = useWallet()
  const [activeTab, setActiveTab] = useState<"deploy" | "history">("deploy")
  const { stats, isLoading: statsLoading } = useStats()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // Prevent hydration mismatch
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-3000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-4 pt-16 pb-12">
          <div className="text-center mb-16">
            {/* Logo/Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-3xl flex items-center justify-center shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-500">
                  <Coins className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                  <Sparkles className="w-4 h-4 text-yellow-900" />
                </div>
              </div>
            </div>

            {/* Main heading */}
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Token
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                Factory
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              Create and deploy custom ERC-20 tokens on DXB Chain in minutes.
              <br className="hidden md:block" />
              <span className="text-purple-300">No coding required, just fill in the details and launch!</span>
            </p>

            {/* Feature badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 border-purple-400/30 px-6 py-3 text-sm font-medium backdrop-blur-sm">
                <Zap className="w-4 h-4 mr-2" />
                Instant Deploy
              </Badge>
              <Badge className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-200 border-blue-400/30 px-6 py-3 text-sm font-medium backdrop-blur-sm">
                <Shield className="w-4 h-4 mr-2" />
                Secure & Audited
              </Badge>
              <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-200 border-green-400/30 px-6 py-3 text-sm font-medium backdrop-blur-sm">
                <Globe className="w-4 h-4 mr-2" />
                DXB Chain Native
              </Badge>
              <Badge className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 text-orange-200 border-orange-400/30 px-6 py-3 text-sm font-medium backdrop-blur-sm">
                <Star className="w-4 h-4 mr-2" />
                Professional Grade
              </Badge>
            </div>

            {/* Dynamic Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              <div className="text-center p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-400/20 backdrop-blur-sm">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-2">
                  <AnimatedStat
                    value={stats.tokensDeployed}
                    suffix="+"
                    duration={2500}
                    delay={200}
                    isLoading={statsLoading}
                  />
                </div>
                <div className="text-gray-400 text-sm font-medium">Tokens Deployed</div>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl border border-green-400/20 backdrop-blur-sm">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-2">
                  <AnimatedStat
                    value={stats.successRate}
                    suffix="%"
                    decimals={1}
                    duration={2000}
                    delay={400}
                    isLoading={statsLoading}
                  />
                </div>
                <div className="text-gray-400 text-sm font-medium">Success Rate</div>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-2xl border border-blue-400/20 backdrop-blur-sm">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-2">
                  <AnimatedStat
                    value={stats.happyUsers}
                    suffix="+"
                    duration={2200}
                    delay={600}
                    isLoading={statsLoading}
                  />
                </div>
                <div className="text-gray-400 text-sm font-medium">Happy Users</div>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 rounded-2xl border border-orange-400/20 backdrop-blur-sm">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-2">
                  <AnimatedStat
                    value={2.4}
                    suffix="M"
                    decimals={1}
                    duration={1800}
                    delay={800}
                    isLoading={statsLoading}
                  />
                </div>
                <div className="text-gray-400 text-sm font-medium">Total Volume</div>
              </div>
            </div>

            {/* Live activity indicator */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-8">
              <Activity className="w-4 h-4 text-green-400 animate-pulse" />
              <span>Live stats updating every 30 seconds</span>
            </div>
          </div>

          {/* Wallet Connection */}
          <div className="flex justify-center mb-12">
            <div className="w-full max-w-2xl">
              <WalletConnect />
            </div>
          </div>

          {/* Navigation Tabs - Only show when wallet is connected */}
          {isConnected && (
            <div className="flex justify-center mb-12">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-2 border border-white/10 shadow-2xl">
                <div className="flex gap-2">
                  <Button
                    variant={activeTab === "deploy" ? "default" : "ghost"}
                    onClick={() => setActiveTab("deploy")}
                    className={`flex items-center gap-3 px-8 py-4 rounded-xl transition-all duration-300 font-semibold ${
                      activeTab === "deploy"
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25 scale-105"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Rocket className="h-5 w-5" />
                    Deploy Token
                  </Button>
                  <Button
                    variant={activeTab === "history" ? "default" : "ghost"}
                    onClick={() => setActiveTab("history")}
                    className={`flex items-center gap-3 px-8 py-4 rounded-xl transition-all duration-300 font-semibold ${
                      activeTab === "history"
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25 scale-105"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <History className="h-5 w-5" />
                    My Tokens
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 pb-16">
          <div className="max-w-6xl mx-auto">
            {isConnected ? (
              <div className="space-y-8">
                {activeTab === "deploy" ? (
                  <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
                    <CardHeader className="text-center pb-8">
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl">
                          <Rocket className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <CardTitle className="text-3xl font-bold text-white mb-2">Deploy Your Token</CardTitle>
                      <CardDescription className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Fill in the details below to create and deploy your custom ERC-20 token on DXB Chain
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <TokenFactoryForm />
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
                    <CardHeader className="text-center pb-8">
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-xl">
                          <History className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <CardTitle className="text-3xl font-bold text-white mb-2">Your Token Portfolio</CardTitle>
                      <CardDescription className="text-lg text-gray-300 max-w-2xl mx-auto">
                        View and manage all the tokens you've deployed through our platform
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <TokenHistory />
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-6 opacity-50">
                    <Coins className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h3>
                  <p className="text-lg text-gray-400 mb-8">
                    Connect your wallet above to begin creating and deploying your custom tokens
                  </p>
                  <div className="grid grid-cols-1 gap-4 text-sm text-gray-500">
                    <div className="flex items-center justify-center gap-2">
                      <Shield className="w-4 h-4" />
                      Secure wallet connection
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Zap className="w-4 h-4" />
                      Deploy in under 2 minutes
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Globe className="w-4 h-4" />
                      Native DXB Chain support
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
