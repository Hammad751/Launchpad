export interface TokenDeploymentData {
  name: string
  symbol: string
  totalSupply: string
  description?: string
  paymentAmount: string
}

export interface DeployedToken {
  address: string
  name: string
  symbol: string
  totalSupply: string
  deployer: string
  deploymentTx: string
  timestamp: number
}
