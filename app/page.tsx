"use client"

import { useState } from "react"
import { TokenFactoryForm } from "@/components/token-factory-form"
import { TokenHistory } from "@/components/token-history"
import { WalletConnect } from "@/components/wallet-connect"
import { ComprehensiveNetworkManager } from "@/components/comprehensive-network-manager"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Coins, Zap, Shield, Sparkles, History, Plus } from "lucide-react"
import { useAccount } from "wagmi"
import { NetworkIndicator } from "@/components/network-indicator"
import Image from "next/image"

export default function HomePage() {
  const { isConnected } = useAccount()
  const [activeTab, setActiveTab] = useState<"create" | "history">("create")

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-20 left-20 sm:top-40 sm:left-40 w-40 h-40 sm:w-80 sm:h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-12 pb-4 sm:pb-8">
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="p-1 sm:p-3 bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl">
                {/* <Coins className="h-6 w-6 sm:h-10 sm:w-10 text-white" /> */}
                <Image src="/logo.svg" alt="VRCN Logo" width={45} height={45} />
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white">
                VRCN {" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">
                  Launchpad
                </span>
              </h1>
            </div>
            <p className="text-base sm:text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed px-4">
              The premier token creation platform on VRCN Chain.
              <br className="hidden sm:block" />
              Launch your custom ERC-20 tokens in minutes with no coding required!
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-4 sm:mt-6 px-4">
              <Badge className="bg-white/20 text-white border-white/30 px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Instant Deploy
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Secure & Audited
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Custom Features
              </Badge>
            </div>
          </div>

          {/* Wallet Connection */}
          <div className="flex justify-center mb-6 sm:mb-8 px-4">
            <WalletConnect />
          </div>

          {/* Comprehensive Network Manager - Only show when connected */}
          {isConnected && (
            <div className="flex justify-center mb-6 sm:mb-8 px-4">
              <div className="w-full max-w-md">
                <ComprehensiveNetworkManager />
              </div>
            </div>
          )}

          {/* Simple Network Indicator for header */}
          <div className="flex justify-center mb-6 sm:mb-8 px-4">
            <NetworkIndicator />
          </div>

          {/* Navigation Tabs - Only show when wallet is connected */}
          {isConnected && (
            <div className="flex justify-center mb-6 sm:mb-8 px-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-1 sm:p-2 flex gap-1 sm:gap-2 w-full max-w-sm sm:max-w-none sm:w-auto">
                <Button
                  variant={activeTab === "create" ? "default" : "ghost"}
                  onClick={() => setActiveTab("create")}
                  className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all text-sm sm:text-base flex-1 sm:flex-none ${
                    activeTab === "create" ? "bg-white text-purple-600 shadow-lg" : "text-white hover:bg-white/20"
                  }`}
                >
                  <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden xs:inline">Create Token</span>
                  <span className="xs:hidden">Create</span>
                </Button>
                <Button
                  variant={activeTab === "history" ? "default" : "ghost"}
                  onClick={() => setActiveTab("history")}
                  className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all text-sm sm:text-base flex-1 sm:flex-none ${
                    activeTab === "history" ? "bg-white text-purple-600 shadow-lg" : "text-white hover:bg-white/20"
                  }`}
                >
                  <History className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden xs:inline">My Tokens</span>
                  <span className="xs:hidden">History</span>
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-12">
          <div className="max-w-4xl mx-auto">
            {isConnected ? (
              activeTab === "create" ? (
                <TokenFactoryForm />
              ) : (
                <TokenHistory />
              )
            ) : (
              <div className="text-center text-white/60 px-4">
                <p className="text-base sm:text-lg">Connect your wallet to get started</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
