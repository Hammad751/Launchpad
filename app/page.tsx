"use client"

import { useState } from "react"
import { TokenFactoryForm } from "@/components/token-factory-form"
import { TokenHistory } from "@/components/token-history"
import { WalletConnect } from "@/components/wallet-connect"
import { ComprehensiveNetworkManager } from "@/components/comprehensive-network-manager"
import { Button } from "@/components/ui/button"
import { History, Plus } from "lucide-react"
import { useAccount } from "wagmi"
import { NetworkIndicator } from "@/components/network-indicator"
import Image from "next/image"
import Footer from "@/components/ui/footer"

export default function HomePage() {
  const { isConnected } = useAccount()
  const [activeTab, setActiveTab] = useState<"create" | "history">("create")

  return (
   <>
   <div className="min-h-screen bg-[navy]">
      {/* Animated background elements */}

      <div className="relative z-10">
        {/* Header */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-12 pb-4 sm:pb-8">
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="p-1 sm:p-3 bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl">
                <Image src="/logo.svg" alt="VRCN Logo" width={45} height={45} />
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl sm:text-xl md:text-3xl font-bold text-white">
                  VRCN
                </h1>
                <h2 className="text-xl sm:text-lg md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200 mt-1">
                  Launchpad
                </h2>
              </div>
            </div>
            <p className="text-base sm:text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed px-4">
              The Ultimate Token Creation Platform on VRCN Chain
              <br className="hidden sm:block" />
              Effortlessly launch your own custom tokens in just minutes 
               <br className="hidden sm:block" />
              No coding, No hassle!
            </p>
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
      <Footer />
  </>   
  )
}
