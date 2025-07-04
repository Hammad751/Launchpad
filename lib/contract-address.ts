import { getContractAddress } from "./network-config"

// Token Factory Contract Address (dynamically determined by network)
export const TOKEN_FACTORY_ADDRESS = getContractAddress() as const

// Log the current contract address for debugging
console.log(`📄 Using contract address: ${TOKEN_FACTORY_ADDRESS}`)
