'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Users,
  Eye,
  Smartphone,
  Monitor,
  Tablet,
  RefreshCw,
  ArrowUpRight,
  ShieldCheck,
  CreditCard,
  Clock,
  Globe,
  Radio,
  CheckCircle2,
} from 'lucide-react'

interface VisitorRecord {
  id: string
  ip: string
  device: 'Desktop' | 'Mobile' | 'Tablet'
  browser: string
  os: string
  screen: string
  path: string
  referrer: string
  timestamp: string
}

interface AnalyticsData {
  totalVisitors: number
  deviceStats: { Desktop: number; Mobile: number; Tablet: number }
  browserStats: Record<string, number>
  recentVisitors: VisitorRecord[]
  payments: any[]
  lastUpdated: string
}

export default function DashboardPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)

  const fetchAnalytics = async (isManual = false) => {
    if (isManual) setIsRefreshing(true)
    try {
      const res = await fetch(`/api/analytics/track?t=${Date.now()}`, {
        cache: 'no-store',
      })
      if (res.ok) {
        const json = await res.json()
        setData(json)
        setLastRefreshed(new Date())
      }
    } catch (err) {
      console.error('Failed to load dashboard analytics:', err)
    } finally {
      setLoading(false)
      if (isManual) setTimeout(() => setIsRefreshing(false), 500)
    }
  }

  useEffect(() => {
    fetchAnalytics()
    // Auto-refresh every 5 seconds for real-time live sync
    const interval = setInterval(() => {
      fetchAnalytics()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const totalVisitors = data?.totalVisitors || 0
  const deviceStats = data?.deviceStats || { Desktop: 0, Mobile: 0, Tablet: 0 }
  const totalDevices = (deviceStats.Desktop + deviceStats.Mobile + deviceStats.Tablet) || 1
  const mobilePct = Math.round((deviceStats.Mobile / totalDevices) * 100)
  const desktopPct = Math.round((deviceStats.Desktop / totalDevices) * 100)
  const tabletPct = 100 - mobilePct - desktopPct

  const formatTimeAgo = (isoString: string) => {
    try {
      const diffSec = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000)
      if (diffSec < 10) return 'Just now'
      if (diffSec < 60) return `${diffSec}s ago`
      const diffMin = Math.floor(diffSec / 60)
      if (diffMin < 60) return `${diffMin}m ago`
      const diffHr = Math.floor(diffMin / 60)
      if (diffHr < 24) return `${diffHr}h ago`
      return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } catch (e) {
      return 'Recent'
    }
  }

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Top Navbar */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-[#0f172a]/80 border border-slate-800 backdrop-blur-md shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-black text-lg">
              M
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-white tracking-wide">
                  Md. Mominul Islam
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE TRACKER
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Real-Time Visitor & Analytics Dashboard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <button
              onClick={() => fetchAnalytics(true)}
              disabled={isRefreshing}
              className="px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-xs font-mono font-semibold text-slate-200 flex items-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw size={13} className={isRefreshing ? 'animate-spin text-emerald-400' : ''} />
              <span>{isRefreshing ? 'Syncing...' : 'Refresh'}</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-mono font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-500/10 transition-all"
            >
              <span>View Website</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </header>

        {/* Highlight Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Total Visitors Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-[#0f172a] to-[#0f172a] border border-emerald-500/30 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between text-xs font-mono text-emerald-400 mb-2">
              <span className="flex items-center gap-1.5 uppercase font-bold tracking-wider">
                <Users size={14} />
                Real Visitors
              </span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-[10px]">
                dhuklei barbe
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-4xl sm:text-5xl font-black font-mono text-white tracking-tight">
                {loading ? '...' : totalVisitors.toLocaleString()}
              </p>
            </div>
            <p className="text-xs text-slate-400 mt-2 font-mono flex items-center gap-1">
              <CheckCircle2 size={12} className="text-emerald-400" />
              <span>প্রতিবারে ১ জন করে লাইভ কাউন্ট হয়</span>
            </p>
          </div>

          {/* Device Distribution */}
          <div className="p-5 rounded-2xl bg-[#0f172a] border border-slate-800 shadow-lg">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span className="flex items-center gap-1.5 uppercase font-bold tracking-wider">
                <Smartphone size={14} className="text-sky-400" />
                Mobile vs PC
              </span>
              <span className="text-[10px] text-slate-500">Breakdown</span>
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <div>
                <p className="text-2xl font-bold font-mono text-sky-400">{mobilePct}%</p>
                <p className="text-[11px] text-slate-400 font-mono">Mobile</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold font-mono text-purple-400">{desktopPct}%</p>
                <p className="text-[11px] text-slate-400 font-mono">Desktop</p>
              </div>
            </div>
            {/* Progress bar */}
            <div className="w-full h-1.5 bg-slate-800 rounded-full mt-3 overflow-hidden flex">
              <div className="bg-sky-400 h-full" style={{ width: `${mobilePct}%` }} />
              <div className="bg-purple-400 h-full" style={{ width: `${desktopPct}%` }} />
            </div>
          </div>

          {/* Payments Received */}
          <div className="p-5 rounded-2xl bg-[#0f172a] border border-slate-800 shadow-lg">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span className="flex items-center gap-1.5 uppercase font-bold tracking-wider">
                <CreditCard size={14} className="text-amber-400" />
                Payments
              </span>
              <span className="text-[10px] text-amber-400/80">bKash/Nagad</span>
            </div>
            <p className="text-3xl sm:text-4xl font-black font-mono text-white tracking-tight">
              {data?.payments?.length || 0}
            </p>
            <p className="text-xs text-slate-400 mt-2 font-mono">
              পেমেন্ট ভেরিফিকেশন রেকর্ড
            </p>
          </div>

          {/* Live Sync Status */}
          <div className="p-5 rounded-2xl bg-[#0f172a] border border-slate-800 shadow-lg">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span className="flex items-center gap-1.5 uppercase font-bold tracking-wider">
                <Radio size={14} className="text-emerald-400 animate-pulse" />
                System Status
              </span>
              <span className="text-[10px] text-emerald-400">100% ONLINE</span>
            </div>
            <p className="text-xl font-bold font-mono text-emerald-400 mt-1">
              Active Cloud
            </p>
            <p className="text-xs text-slate-400 mt-2 font-mono truncate">
              Last sync: {formatTimeAgo(lastRefreshed.toISOString())}
            </p>
          </div>

        </div>

        {/* Main Content Grid: Recent Visitors & Payment Log */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column (8 cols): Recent Visitors Live Stream */}
          <div className="lg:col-span-8 p-5 sm:p-6 rounded-2xl bg-[#0f172a] border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Eye size={16} className="text-emerald-400" />
                <h2 className="text-sm font-bold uppercase tracking-wider font-mono text-white">
                  Real Visitor Feed (সাম্প্রতিক ভিজিটর)
                </h2>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                Auto-refreshes every 5s
              </span>
            </div>

            {loading ? (
              <div className="py-12 text-center text-slate-500 font-mono text-xs">
                Loading visitor logs...
              </div>
            ) : !data?.recentVisitors?.length ? (
              <div className="py-12 text-center space-y-2">
                <p className="text-slate-400 text-sm font-mono">No recent sessions recorded yet.</p>
                <p className="text-xs text-slate-600">Open the homepage in another browser tab to see real-time hits.</p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
                {data.recentVisitors.map((v, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 flex items-center justify-between gap-3 text-xs transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 flex-shrink-0">
                        {v.device === 'Mobile' ? (
                          <Smartphone size={15} className="text-sky-400" />
                        ) : v.device === 'Tablet' ? (
                          <Tablet size={15} className="text-amber-400" />
                        ) : (
                          <Monitor size={15} className="text-purple-400" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 font-mono">
                          <span className="font-bold text-white truncate">
                            {v.device} • {v.browser}
                          </span>
                          <span className="text-[10px] text-slate-500 hidden sm:inline">
                            ({v.os})
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 font-mono truncate">
                          Page: <span className="text-emerald-400">{v.path}</span>
                          {v.screen && <span className="text-slate-600"> • {v.screen}</span>}
                        </p>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0 font-mono">
                      <span className="text-[11px] font-bold text-emerald-400">
                        {formatTimeAgo(v.timestamp)}
                      </span>
                      <p className="text-[10px] text-slate-500">
                        {new Date(v.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column (4 cols): Payment Submissions */}
          <div className="lg:col-span-4 p-5 sm:p-6 rounded-2xl bg-[#0f172a] border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <CreditCard size={16} className="text-amber-400" />
                <h2 className="text-sm font-bold uppercase tracking-wider font-mono text-white">
                  Payments (পেমেন্ট)
                </h2>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                {data?.payments?.length || 0} Total
              </span>
            </div>

            {!data?.payments?.length ? (
              <div className="py-12 text-center text-slate-500 font-mono text-xs">
                No payment transactions recorded yet.
              </div>
            ) : (
              <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                {data.payments.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1.5 text-xs font-mono"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-400 uppercase text-[11px]">
                        {p.method}
                      </span>
                      <span className="font-bold text-emerald-400 text-sm">
                        ৳{p.amount} BDT
                      </span>
                    </div>
                    <div className="text-slate-300 text-[11px]">
                      TrxID: <span className="font-bold text-white select-all">{p.trxId}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-800">
                      <span>Sender: {p.senderNumber}</span>
                      <span>{p.createdAt ? formatTimeAgo(p.createdAt) : ''}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  )
}
