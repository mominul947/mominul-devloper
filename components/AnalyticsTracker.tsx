'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return ''
  let id = localStorage.getItem('portfolio_sid')
  if (!id) {
    id = 'vis_' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36)
    localStorage.setItem('portfolio_sid', id)
  }
  return id
}

export default function AnalyticsTracker() {
  const pathname = usePathname()
  const activeSectionRef = useRef<string>('hero')
  const sectionTimesRef = useRef<Record<string, number>>({})
  const pageSecondsRef = useRef<number>(0)
  const isFirstLoadRef = useRef<boolean>(true)

  // 1. Route Change & Initial Pageview Tracker
  useEffect(() => {
    const sessionId = getOrCreateSessionId()
    if (!sessionId) return

    // Notify server of new pageview
    const payload = {
      sessionId,
      pathname,
      isNewPage: true,
      pageTimeSpent: 0,
      sectionTimes: {},
      referrer: typeof document !== 'undefined' ? document.referrer || 'Direct' : 'Direct',
      screen: typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}` : '1920x1080',
    }

    try {
      fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => {})
    } catch (e) {}

    pageSecondsRef.current = 0
    sectionTimesRef.current = {}
  }, [pathname])

  // 2. Section Intersection Observer (Which section is user looking at)
  useEffect(() => {
    if (typeof window === 'undefined' || pathname !== '/') return

    const sections = document.querySelectorAll('section[id], header[id], div[id="hero"]')
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            const id = entry.target.id
            if (id) {
              activeSectionRef.current = id
            }
          }
        })
      },
      {
        root: null,
        threshold: [0.3, 0.6],
      }
    )

    sections.forEach((sec) => observer.observe(sec))

    return () => {
      observer.disconnect()
    }
  }, [pathname])

  // 3. Heartbeat Timer (Ticks every 1 second, flushes every 10 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      // Accumulate page time
      pageSecondsRef.current += 1

      // Accumulate active section dwell time (if on home page)
      if (pathname === '/') {
        const currentSec = activeSectionRef.current || 'hero'
        sectionTimesRef.current[currentSec] = (sectionTimesRef.current[currentSec] || 0) + 1
      }

      // Flush to server every 10 seconds
      if (pageSecondsRef.current >= 10) {
        flushTracking()
      }
    }, 1000)

    const flushTracking = () => {
      const sessionId = getOrCreateSessionId()
      if (!sessionId || pageSecondsRef.current === 0) return

      const payload = {
        sessionId,
        pathname,
        isNewPage: false,
        pageTimeSpent: pageSecondsRef.current,
        sectionTimes: { ...sectionTimesRef.current },
        referrer: document.referrer || 'Direct',
        screen: `${window.screen.width}x${window.screen.height}`,
      }

      pageSecondsRef.current = 0
      sectionTimesRef.current = {}

      try {
        fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true,
        }).catch(() => {})
      } catch (e) {}
    }

    // Flush on page leave or tab hidden
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        flushTracking()
      }
    }

    window.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('beforeunload', flushTracking)

    return () => {
      clearInterval(interval)
      window.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('beforeunload', flushTracking)
      flushTracking()
    }
  }, [pathname])

  return null
}

