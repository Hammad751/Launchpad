"use client"

import { useAnimatedCounter } from "@/hooks/use-animated-counter"
import { Loader2 } from "lucide-react"

interface AnimatedStatProps {
  value: number
  suffix?: string
  prefix?: string
  decimals?: number
  duration?: number
  delay?: number
  isLoading?: boolean
}

export function AnimatedStat({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 2000,
  delay = 0,
  isLoading = false,
}: AnimatedStatProps) {
  const { count, isAnimating } = useAnimatedCounter({
    end: value,
    duration,
    delay,
  })

  const formatValue = (num: number) => {
    if (decimals > 0) {
      return num.toFixed(decimals)
    }
    return num.toLocaleString()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    )
  }

  return (
    <span className={`transition-all duration-300 ${isAnimating ? "text-purple-300" : "text-white"}`}>
      {prefix}
      {formatValue(count)}
      {suffix}
    </span>
  )
}
