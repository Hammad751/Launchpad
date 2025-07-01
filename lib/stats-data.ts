"use client"

import { useEffect } from "react"

import { useState } from "react"

// Simulated stats that could come from an API
export interface StatsData {
  tokensDeployed: number
  successRate: number
  happyUsers: number
  totalVolume?: string
  averageGasUsed?: number
}

// Function to generate realistic stats
export function generateStats(): StatsData {
  const baseStats = {
    tokensDeployed: 1247,
    successRate: 99.8,
    happyUsers: 892,
    totalVolume: "2.4M",
    averageGasUsed: 45000,
  }

  // Add some randomness to make it feel more dynamic
  const randomVariation = () => Math.floor(Math.random() * 10) - 5

  return {
    tokensDeployed: baseStats.tokensDeployed + randomVariation(),
    successRate: Math.max(99.0, Math.min(100, baseStats.successRate + (Math.random() * 0.4 - 0.2))),
    happyUsers: baseStats.happyUsers + randomVariation(),
    totalVolume: baseStats.totalVolume,
    averageGasUsed: baseStats.averageGasUsed + randomVariation() * 1000,
  }
}

// Hook to get stats with periodic updates
export function useStats() {
  const [stats, setStats] = useState<StatsData>(generateStats())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initial loading
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    // Update stats periodically (every 30 seconds)
    const updateInterval = setInterval(() => {
      setStats(generateStats())
    }, 30000)

    return () => {
      clearTimeout(loadingTimer)
      clearInterval(updateInterval)
    }
  }, [])

  return { stats, isLoading }
}
