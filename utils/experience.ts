'use client'

import { useState, useEffect } from 'react'

/**
 * Dynamic Experience Calculator for MD. Mominul Islam
 * Calibrated to start at 1.9y and automatically increments as real calendar time passes.
 */

// Baseline start date calibrated to produce 1.9 years
export const CAREER_START_DATE = new Date('2024-12-08T00:00:00.000Z')

export function getExperience() {
  const now = new Date()
  const diffMs = Math.max(0, now.getTime() - CAREER_START_DATE.getTime())
  
  // Total years in decimal, guaranteed at least 1.9
  const totalYears = Math.max(1.9, diffMs / (1000 * 60 * 60 * 24 * 365.25))
  
  const formatted = `${totalYears.toFixed(1)}Y`
  const formattedPlus = `${totalYears.toFixed(1)}Y+`
  const formattedFull = `${totalYears.toFixed(1)}+ Years`

  return {
    raw: totalYears,
    formatted,
    formattedPlus,
    formattedFull,
    startDate: CAREER_START_DATE,
  }
}

export function useLiveExperience() {
  const [mounted, setMounted] = useState(false)
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setMounted(true)
    setNow(new Date())

    const interval = setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!mounted || !now) {
    return {
      yearsFormatted: '1.9Y',
      days: 694,
      timeFormatted: '12:00:00',
      liveDetail: '694d 12h 00m 00s',
    }
  }

  const diffMs = Math.max(0, now.getTime() - CAREER_START_DATE.getTime())
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60)
  const seconds = Math.floor((diffMs / 1000) % 60)

  const pad = (n: number) => n.toString().padStart(2, '0')
  const totalYears = Math.max(1.9, diffMs / (1000 * 60 * 60 * 24 * 365.25))

  return {
    yearsFormatted: `${totalYears.toFixed(1)}Y`,
    days: totalDays,
    timeFormatted: `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`,
    liveDetail: `${totalDays}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`,
  }
}
