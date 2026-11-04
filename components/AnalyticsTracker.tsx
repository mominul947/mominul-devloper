'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export default function AnalyticsTracker() {
  const pathname = usePathname()
  const trackedRef = useRef<boolean>(false)

  useEffect(() => {
    // 1. NEVER track admin or dashboard pages
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
      return
    }

    // 2. Check if this is a real new session
    let isNewVisitor = false
    if (typeof window !== 'undefined') {
      const existing = sessionStorage.getItem('portfolio_visited_session')
      if (!existing) {
        sessionStorage.setItem('portfolio_visited_session', 'true')
        isNewVisitor = true
      }
    }

    // Avoid double firing within same session
    if (trackedRef.current && !isNewVisitor) return
    trackedRef.current = true

    const payload = {
      isNewVisitor,
      pathname,
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
  }, [pathname])

  return null
}
