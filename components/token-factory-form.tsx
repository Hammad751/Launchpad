"use client"

import type React from "react"
import { useState } from "react"
import { useAccount } from "wagmi"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { useTokenFactory } from "@/hooks/use-token-factory"
import type { TokenDeploymentData } from "@/types/token"
import {
  Loader2,
  Rocket,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Coins,
  DollarSign,
  FileText,
  Hash,
  TrendingUp,
  Info,
  Sparkles,
  Construction,
} from "lucide-react"
import {
  getExplorerUrl,
  getCurrentNetworkConfig,
  isTestnet,
  isMainnetChain,
  isMainnetContractReadyByChainId,
} from "@/lib/network-config"

export function TokenFactoryForm() {
  const { address, isConnected } = useAccount()
  const { chain } = useAccount()
  const { deployToken, isLoading, error, txHash, deployedTokenAddress } = useTokenFactory()

  const [formData, setFormData] = useState<TokenDeploymentData>({
    name: "",
    symbol: "",
    totalSupply: "",
    description: "",
    paymentAmount: "0.01",
  })

  const [errors, setErrors] = useState<Partial<TokenDeploymentData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<TokenDeploymentData> = {}

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
    } else if (Number(formData.totalSupply) > 1000000000000) {
      newErrors.totalSupply = "Total supply cannot exceed 1 trillion"
    }

    if (!formData.paymentAmount.trim()) {
      newErrors.paymentAmount = "Payment amount is required"
    } else if (isNaN(Number(formData.paymentAmount)) || Number(formData.paymentAmount) < 0.01) {
      newErrors.paymentAmount = "Minimum payment amount is 0.01 VRCN"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      await deployToken(formData)
    } catch (err) {
      console.error("Deployment failed:", err)
    }
  }

  const handleInputChange = (field: keyof TokenDeploymentData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  if (!isConnected) {
    return (
      <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm mx-4 sm:mx-0">
        <CardHeader className="text-center pb-6 sm:pb-8 px-4 sm:px-6">
          <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-3 sm:mb-4">
            <Coins className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Connect Your Wallet
          </CardTitle>
          <CardDescription className="text-base sm:text-lg text-gray-600">
            Connect your wallet to start creating your custom token
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center pb-6 sm:pb-8 px-4 sm:px-6">
          <Alert className="border-purple-200 bg-purple-50">
            <Info className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
            <AlertDescription className="text-purple-800 text-left text-sm sm:text-base">
              <strong>Why connect a wallet?</strong>
              <br />• Deploy your token to the blockchain
              <br />• Pay deployment fees securely
              <br />• Manage your created tokens
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6 sm:space-y-8 px-4 sm:px-0">
      {/* Mainnet Warning */}
      {chain?.id && isMainnetChain(chain.id) && !isMainnetContractReadyByChainId(chain.id) && (
        <Alert className="border-orange-200 bg-orange-50">
          <Construction className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
          <AlertDescription className="text-orange-800 text-sm sm:text-base">
            <strong>Development Mode:</strong> Mainnet contract address is not yet configured. This is for development
            and testing purposes only. The contract address will be updated when the mainnet deployment is ready.
          </AlertDescription>
        </Alert>
      )}

      {/* Token Creation Form */}
      <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
        <CardHeader className="pb-4 sm:pb-6 px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg w-fit">
              <Rocket className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl sm:text-2xl font-bold">Create Your Token</CardTitle>
              <CardDescription className="text-sm sm:text-base mt-1">
                Fill in the details below to deploy your custom ERC-20 token
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs sm:text-sm px-2 sm:px-3 py-1">
              Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 sm:space-y-8 px-4 sm:px-6">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Token Basic Info */}
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <Coins className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                <h3 className="text-base sm:text-lg font-semibold">Token Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                    <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
                    Token Name *
                  </Label>
                  <Input
                    id="name"
                    placeholder="e.g., My Awesome Token"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`h-10 sm:h-12 text-sm sm:text-base ${errors.name ? "border-red-500 focus:border-red-500" : "focus:border-purple-500"}`}
                  />
                  {errors.name && (
                    <p className="text-xs sm:text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.name}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">The full name of your token (e.g., "Bitcoin")</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="symbol" className="text-sm font-medium flex items-center gap-2">
                    <Hash className="h-3 w-3 sm:h-4 sm:w-4" />
                    Token Symbol *
                  </Label>
                  <Input
                    id="symbol"
                    placeholder="e.g., MAT"
                    value={formData.symbol}
                    onChange={(e) => handleInputChange("symbol", e.target.value.toUpperCase())}
                    className={`h-10 sm:h-12 text-sm sm:text-base ${errors.symbol ? "border-red-500 focus:border-red-500" : "focus:border-purple-500"}`}
                    maxLength={10}
                  />
                  {errors.symbol && (
                    <p className="text-xs sm:text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.symbol}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">Short identifier for your token (e.g., "BTC")</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="totalSupply" className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                  Total Supply *
                </Label>
                <Input
                  id="totalSupply"
                  type="number"
                  placeholder="e.g., 1000000"
                  value={formData.totalSupply}
                  onChange={(e) => handleInputChange("totalSupply", e.target.value)}
                  className={`h-10 sm:h-12 text-sm sm:text-base ${errors.totalSupply ? "border-red-500 focus:border-red-500" : "focus:border-purple-500"}`}
                />
                {errors.totalSupply && (
                  <p className="text-xs sm:text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.totalSupply}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  Total number of tokens that will be created and sent to your wallet
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium flex items-center gap-2">
                  <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
                  Description (Optional)
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your token's purpose, utility, and vision..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={3}
                  className="resize-none focus:border-purple-500 text-sm sm:text-base"
                />
                <p className="text-xs text-gray-500">Help others understand what your token is for</p>
              </div>
            </div>

            {/* Payment Section */}
            <div className="border-t pt-4 sm:pt-6">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                <h3 className="text-base sm:text-lg font-semibold">Deployment Cost</h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentAmount" className="text-sm font-medium">
                  Deployment Fee (VRCN) *
                </Label>
                <Input
                  id="paymentAmount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder="0.01"
                  value={formData.paymentAmount}
                  onChange={(e) => handleInputChange("paymentAmount", e.target.value)}
                  className={`h-10 sm:h-12 text-sm sm:text-base ${errors.paymentAmount ? "border-red-500 focus:border-red-500" : "focus:border-green-500"}`}
                />
                {errors.paymentAmount && (
                  <p className="text-xs sm:text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.paymentAmount}
                  </p>
                )}
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-xs sm:text-sm text-green-800">
                    <strong>Minimum Required: 0.01 {getCurrentNetworkConfig().currency.symbol}</strong>
                    <br />• Smart contract deployment {isTestnet() ? "(Testnet)" : "(Mainnet)"}
                    <br />• Token creation and minting
                    <br />• Gas fees covered
                    <br />• Instant token transfer to your wallet
                  </p>
                </div>
              </div>
            </div>

            {/* Status Messages */}
            {error && (
              <Alert variant="destructive" className="border-red-200">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-sm sm:text-base">{error}</AlertDescription>
              </Alert>
            )}

            {txHash && (
              <Alert className="border-blue-200 bg-blue-50">
                <CheckCircle2 className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <div className="space-y-2">
                    <p className="font-medium text-sm sm:text-base">Transaction submitted successfully! 🚀</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <span className="text-xs sm:text-sm">TX Hash:</span>
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-blue-100 px-2 py-1 rounded font-mono break-all sm:break-normal">
                          <span className="sm:hidden">
                            {txHash.slice(0, 8)}...{txHash.slice(-6)}
                          </span>
                          <span className="hidden sm:inline">
                            {txHash.slice(0, 10)}...{txHash.slice(-8)}
                          </span>
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 flex-shrink-0"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            const url = getExplorerUrl(`/tx/${txHash}`)
                            window.open(url, "_blank", "noopener,noreferrer")
                          }}
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {deployedTokenAddress && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <div className="space-y-3">
                    <p className="font-bold text-base sm:text-lg">🎉 Token deployed successfully!</p>
                    <div className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <span className="text-xs sm:text-sm font-medium">Contract Address:</span>
                        <div className="flex items-center gap-2">
                          <code className="text-xs bg-green-100 px-2 py-1 rounded font-mono break-all sm:break-normal">
                            <span className="sm:hidden">
                              {deployedTokenAddress.slice(0, 8)}...{deployedTokenAddress.slice(-6)}
                            </span>
                            <span className="hidden sm:inline">
                              {deployedTokenAddress.slice(0, 10)}...{deployedTokenAddress.slice(-8)}
                            </span>
                          </code>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 flex-shrink-0"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              const url = getExplorerUrl(`/address/${deployedTokenAddress}`)
                              window.open(url, "_blank", "noopener,noreferrer")
                            }}
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm">
                        Your {formData.name} ({formData.symbol}) tokens have been sent to your wallet!
                      </p>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg"
              disabled={
                isLoading || (chain?.id && isMainnetChain(chain.id) && !isMainnetContractReadyByChainId(chain.id))
              }
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                  <span className="hidden sm:inline">Deploying Your Token...</span>
                  <span className="sm:hidden">Deploying...</span>
                </>
              ) : chain?.id && isMainnetChain(chain.id) && !isMainnetContractReadyByChainId(chain.id) ? (
                <>
                  <Construction className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline">Mainnet Contract Not Ready</span>
                  <span className="sm:hidden">Contract Not Ready</span>
                </>
              ) : (
                <>
                  <Rocket className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline">Deploy Token ({formData.paymentAmount} VRCN)</span>
                  <span className="sm:hidden">Deploy ({formData.paymentAmount} VRCN)</span>
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Token Preview */}
      {(formData.name || formData.symbol || formData.totalSupply) && (
        <Card className="border-0 shadow-xl bg-gradient-to-r from-purple-50 to-pink-50">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
              Token Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="text-center p-3 sm:p-4 bg-white rounded-lg shadow-sm">
                <p className="text-xs sm:text-sm text-gray-500">Name</p>
                <p className="font-semibold text-sm sm:text-lg break-words">{formData.name || "Token Name"}</p>
              </div>
              <div className="text-center p-3 sm:p-4 bg-white rounded-lg shadow-sm">
                <p className="text-xs sm:text-sm text-gray-500">Symbol</p>
                <p className="font-semibold text-sm sm:text-lg">{formData.symbol || "SYMBOL"}</p>
              </div>
              <div className="text-center p-3 sm:p-4 bg-white rounded-lg shadow-sm">
                <p className="text-xs sm:text-sm text-gray-500">Total Supply</p>
                <p className="font-semibold text-sm sm:text-lg">
                  {formData.totalSupply ? Number(formData.totalSupply).toLocaleString() : "0"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
