"use client"

import { useState, useEffect } from "react"

interface UseAnimatedCounterProps {
  end: number
  start?: number
  duration?: number
  delay?: number
}

export function useAnimatedCounter({ end, start = 0, duration = 2000, delay = 0 }: UseAnimatedCounterProps) {
  const [count, setCount] = useState(start)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true)
      const startTime = Date.now()
      const startValue = start
      const endValue = end
      const totalDuration = duration

      const animate = () => {
        const now = Date.now()
        const elapsed = now - startTime
        const progress = Math.min(elapsed / totalDuration, 1)

        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3)
        const currentValue = Math.floor(startValue + (endValue - startValue) * easeOut)

        setCount(currentValue)

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          setIsAnimating(false)
        }
      }

      requestAnimationFrame(animate)
    }, delay)

    return () => clearTimeout(timer)
  }, [end, start, duration, delay])

  return { count, isAnimating }
}
