'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return ''
  let id = sessionStorage.getItem('portfolio_sid')
  if (!id) {
    id = 'vis_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36)
    sessionStorage.setItem('portfolio_sid', id)
  }
  return id
}

export default function AnalyticsTracker() {
  const pathname = usePathname()
  const lastPathRef = useRef<string>('')

  useEffect(() => {
    // Avoid double counting same exact page transition in rapid succession
    if (lastPathRef.current === pathname) return
    lastPathRef.current = pathname

    const sessionId = getOrCreateSessionId()

    const payload = {
      sessionId,
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
