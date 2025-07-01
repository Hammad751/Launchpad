"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Loader2,
  Coins,
  AlertCircle,
  Rocket,
  DollarSign,
  FileText,
  Hash,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  Info,
} from "lucide-react"
import { useWallet } from "@/lib/web3-utils"
import { useToast } from "@/hooks/use-toast"

interface TokenFormData {
  name: string
  symbol: string
  totalSupply: string
  decimals: string
  description: string
}

export function TokenFactoryForm() {
  const { isConnected, address, chainId } = useWallet()
  const { toast } = useToast()
  const [formData, setFormData] = useState<TokenFormData>({
    name: "",
    symbol: "",
    totalSupply: "",
    decimals: "18",
    description: "",
  })

  const [errors, setErrors] = useState<Partial<TokenFormData>>({})
  const [isDeploying, setIsDeploying] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: Partial<TokenFormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Token name is required"
    } else if (formData.name.length < 3) {
      newErrors.name = "Token name must be at least 3 characters"
    }

    if (!formData.symbol.trim()) {
      newErrors.symbol = "Token symbol is required"
    } else if (formData.symbol.length < 2 || formData.symbol.length > 10) {
      newErrors.symbol = "Symbol must be between 2-10 characters"
    }

    if (!formData.totalSupply.trim()) {
      newErrors.totalSupply = "Total supply is required"
    } else if (isNaN(Number(formData.totalSupply)) || Number(formData.totalSupply) <= 0) {
      newErrors.totalSupply = "Total supply must be a positive number"
    }

    const decimals = Number(formData.decimals)
    if (isNaN(decimals) || decimals < 0 || decimals > 18) {
      newErrors.decimals = "Decimals must be between 0 and 18"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isConnected || !validateForm() || chainId !== 1999) return

    setIsDeploying(true)
    try {
      // This is a demo - in reality you'd call your smart contract
      // For now, we'll simulate the deployment
      await new Promise((resolve) => setTimeout(resolve, 3000))

      toast({
        title: "Token Deployed Successfully! 🎉",
        description: `${formData.name} (${formData.symbol}) has been deployed to DXB Chain`,
      })

      // Reset form
      setFormData({
        name: "",
        symbol: "",
        totalSupply: "",
        decimals: "18",
        description: "",
      })
    } catch (error: any) {
      toast({
        title: "Deployment Failed",
        description: error.message || "Failed to deploy token",
        variant: "destructive",
      })
    } finally {
      setIsDeploying(false)
    }
  }

  const handleInputChange = (field: keyof TokenFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  if (!isConnected) {
    return (
      <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-400/30">
        <CardContent className="p-8 text-center">
          <AlertCircle className="w-16 h-16 text-orange-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Wallet Required</h3>
          <p className="text-gray-300">Please connect your wallet to deploy tokens.</p>
        </CardContent>
      </Card>
    )
  }

  if (chainId !== 1999) {
    return (
      <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-400/30">
        <CardContent className="p-8 text-center">
          <AlertCircle className="w-16 h-16 text-orange-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Wrong Network</h3>
          <p className="text-gray-300">Please switch to DXB Chain to deploy tokens.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      {/* Connected wallet info */}
      <Card className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-400/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-200 font-medium">
                Connected to {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
            </div>
            <Badge className="bg-emerald-500/20 text-emerald-200 border-emerald-400/30">Ready to Deploy</Badge>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Token Information Section */}
        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Coins className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-white text-xl">Token Information</CardTitle>
                <CardDescription className="text-gray-300">Define your token's basic properties</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-white font-medium flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Token Name *
                </Label>
                <Input
                  id="name"
                  placeholder="e.g., My Awesome Token"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 transition-colors ${
                    errors.name ? "border-red-400 focus:border-red-400" : ""
                  }`}
                />
                {errors.name && (
                  <p className="text-red-400 text-sm flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name}
                  </p>
                )}
                <p className="text-xs text-gray-400">The full name of your token (e.g., "Bitcoin")</p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="symbol" className="text-white font-medium flex items-center gap-2">
                  <Hash className="w-4 h-4" />
                  Token Symbol *
                </Label>
                <Input
                  id="symbol"
                  placeholder="e.g., MAT"
                  value={formData.symbol}
                  onChange={(e) => handleInputChange("symbol", e.target.value.toUpperCase())}
                  className={`h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 transition-colors ${
                    errors.symbol ? "border-red-400 focus:border-red-400" : ""
                  }`}
                  maxLength={10}
                />
                {errors.symbol && (
                  <p className="text-red-400 text-sm flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.symbol}
                  </p>
                )}
                <p className="text-xs text-gray-400">Short identifier for your token (e.g., "BTC")</p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="totalSupply" className="text-white font-medium flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Total Supply *
                </Label>
                <Input
                  id="totalSupply"
                  type="number"
                  placeholder="e.g., 1000000"
                  value={formData.totalSupply}
                  onChange={(e) => handleInputChange("totalSupply", e.target.value)}
                  className={`h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 transition-colors ${
                    errors.totalSupply ? "border-red-400 focus:border-red-400" : ""
                  }`}
                />
                {errors.totalSupply && (
                  <p className="text-red-400 text-sm flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.totalSupply}
                  </p>
                )}
                <p className="text-xs text-gray-400">Total number of tokens to be created</p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="decimals" className="text-white font-medium flex items-center gap-2">
                  <Hash className="w-4 h-4" />
                  Decimals
                </Label>
                <Input
                  id="decimals"
                  type="number"
                  min="0"
                  max="18"
                  value={formData.decimals}
                  onChange={(e) => handleInputChange("decimals", e.target.value)}
                  className={`h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 transition-colors ${
                    errors.decimals ? "border-red-400 focus:border-red-400" : ""
                  }`}
                />
                {errors.decimals && (
                  <p className="text-red-400 text-sm flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.decimals}
                  </p>
                )}
                <p className="text-xs text-gray-400">Number of decimal places (18 is standard)</p>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="description" className="text-white font-medium flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Description (Optional)
              </Label>
              <Textarea
                id="description"
                placeholder="Describe your token's purpose, utility, and vision..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="min-h-[120px] bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 transition-colors resize-none"
                rows={4}
              />
              <p className="text-xs text-gray-400">Help others understand what your token is for</p>
            </div>
          </CardContent>
        </Card>

        {/* Deployment Cost Section */}
        <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-400/30">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-white text-xl">Deployment Cost</CardTitle>
                <CardDescription className="text-green-200">One-time fee to deploy your token</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-white">Total Cost:</span>
                <span className="text-2xl font-bold text-green-400">0.01 VRCN</span>
              </div>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>• Smart contract deployment</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between">
                  <span>• Token creation & minting</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between">
                  <span>• Gas fees</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between">
                  <span>• Instant token transfer</span>
                  <span>Included</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Token Preview */}
        {(formData.name || formData.symbol || formData.totalSupply) && (
          <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                Token Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white/10 rounded-lg border border-white/20">
                  <p className="text-sm text-gray-400 mb-1">Name</p>
                  <p className="font-bold text-lg text-white">{formData.name || "Token Name"}</p>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-lg border border-white/20">
                  <p className="text-sm text-gray-400 mb-1">Symbol</p>
                  <p className="font-bold text-lg text-white">{formData.symbol || "SYMBOL"}</p>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-lg border border-white/20">
                  <p className="text-sm text-gray-400 mb-1">Total Supply</p>
                  <p className="font-bold text-lg text-white">
                    {formData.totalSupply ? Number(formData.totalSupply).toLocaleString() : "0"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Deploy Button */}
        <Card className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-400/30">
          <CardContent className="p-6">
            <Button
              type="submit"
              disabled={isDeploying || !formData.name || !formData.symbol || !formData.totalSupply}
              className="w-full h-16 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isDeploying ? (
                <>
                  <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                  Deploying Your Token...
                </>
              ) : (
                <>
                  <Rocket className="mr-3 h-6 w-6" />
                  Deploy Token (0.01 VRCN)
                </>
              )}
            </Button>

            {!isDeploying && (
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
                  <Info className="w-4 h-4" />
                  Your tokens will be sent to your wallet immediately after deployment
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
