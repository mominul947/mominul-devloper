'use client'

import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'

export default function DhakaTime({ className = '' }: { className?: string }) {
  const [timeStr, setTimeStr] = useState<string>('')

  useEffect(() => {
    const update = () => {
      const formatted = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(new Date())
      setTimeStr(formatted)
    }

    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!timeStr) return null

  return (
    <span className={`inline-flex items-center gap-1.5 font-mono text-xs ${className}`}>
      <Clock size={12} className="text-emerald-400 animate-spin-slow" />
      <span className="font-semibold text-emerald-400">{timeStr}</span>
      <span className="text-[10px] text-slate-400 uppercase tracking-wider">Dhaka (UTC+6)</span>
    </span>
  )
}

