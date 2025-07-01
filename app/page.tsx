"use client"

import { useState } from "react"
import { TokenFactoryForm } from "@/components/token-factory-form"
import { TokenHistory } from "@/components/token-history"
import { WalletConnect } from "@/components/wallet-connect"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Coins, Zap, Shield, Sparkles, History, Plus } from "lucide-react"
import { useAccount } from "wagmi"

export default function HomePage() {
  const { isConnected } = useAccount()
  const [activeTab, setActiveTab] = useState<"create" | "history">("create")

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="container mx-auto px-4 pt-12 pb-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl">
                <Coins className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white">
                Token
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">
                  Factory
                </span>
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Create and deploy your custom ERC-20 tokens in minutes.
              <br className="hidden md:block" />
              No coding required, just fill in the details and launch!
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
                <Zap className="w-4 h-4 mr-2" />
                Instant Deploy
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
                <Shield className="w-4 h-4 mr-2" />
                Secure & Audited
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                Custom Features
              </Badge>
            </div>
          </div>

          {/* Wallet Connection */}
          <div className="flex justify-center mb-12">
            <WalletConnect />
          </div>

          {/* Navigation Tabs - Only show when wallet is connected */}
          {isConnected && (
            <div className="flex justify-center mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 flex gap-2">
                <Button
                  variant={activeTab === "create" ? "default" : "ghost"}
                  onClick={() => setActiveTab("create")}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
                    activeTab === "create" ? "bg-white text-purple-600 shadow-lg" : "text-white hover:bg-white/20"
                  }`}
                >
                  <Plus className="h-4 w-4" />
                  Create Token
                </Button>
                <Button
                  variant={activeTab === "history" ? "default" : "ghost"}
                  onClick={() => setActiveTab("history")}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
                    activeTab === "history" ? "bg-white text-purple-600 shadow-lg" : "text-white hover:bg-white/20"
                  }`}
                >
                  <History className="h-4 w-4" />
                  My Tokens
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 pb-12">
          <div className="max-w-4xl mx-auto">
            {isConnected ? (
              activeTab === "create" ? (
                <TokenFactoryForm />
              ) : (
                <TokenHistory />
              )
            ) : (
              <div className="text-center text-white/60">
                <p className="text-lg">Connect your wallet to get started</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
