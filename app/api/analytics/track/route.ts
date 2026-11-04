import { NextResponse } from 'next/server'
import { readJsonFileSafe, writeJsonFileSafe } from '@/lib/storage'

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
}

const defaultAnalytics: AnalyticsData = {
  totalVisitors: 0,
  deviceStats: { Desktop: 0, Mobile: 0, Tablet: 0 },
  browserStats: {},
  recentVisitors: [],
}

async function fetchCloudHitCount(increment = false): Promise<number | null> {
  try {
    const url = `https://hits.sh/mominul-devloper-bd.vercel.app.svg?t=${Date.now()}`
    const res = await fetch(url, {
      cache: 'no-store',
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    })
    const text = await res.text()
    const match = text.match(/hits:\s*(\d+)/i)
    if (match) {
      return parseInt(match[1], 10)
    }
    return null
  } catch (e) {
    return null
  }
}

function parseUserAgent(ua: string): { device: 'Desktop' | 'Mobile' | 'Tablet'; browser: string; os: string } {
  let device: 'Desktop' | 'Mobile' | 'Tablet' = 'Desktop'
  if (/mobile/i.test(ua)) device = 'Mobile'
  else if (/tablet|ipad/i.test(ua)) device = 'Tablet'

  let browser = 'Chrome'
  if (/firefox|fxios/i.test(ua)) browser = 'Firefox'
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = 'Safari'
  else if (/edg/i.test(ua)) browser = 'Edge'
  else if (/opr|opera/i.test(ua)) browser = 'Opera'

  let os = 'Windows'
  if (/android/i.test(ua)) os = 'Android'
  else if (/iphone|ipad|ipod/i.test(ua)) os = 'iOS'
  else if (/macintosh|mac os x/i.test(ua)) os = 'macOS'
  else if (/linux/i.test(ua)) os = 'Linux'

  return { device, browser, os }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const {
      sessionId = `vis_${Date.now()}`,
      pathname = '/',
      referrer = 'Direct',
      screen = '1920x1080',
    } = body

    const ua = request.headers.get('user-agent') || ''
    const { device, browser, os } = parseUserAgent(ua)

    const rawIp =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      request.headers.get('cf-connecting-ip') ||
      '127.0.0.1'
    const clientIp = rawIp.split(',')[0].trim()

    // 1. Increment persistent cloud counter (hits.sh)
    const cloudHits = await fetchCloudHitCount(true)

    // 2. Read local fallback storage
    const analytics = readJsonFileSafe<AnalyticsData>('analytics.json', defaultAnalytics)

    if (cloudHits !== null && cloudHits > analytics.totalVisitors) {
      analytics.totalVisitors = cloudHits
    } else {
      analytics.totalVisitors = (analytics.totalVisitors || 0) + 1
    }

    // 3. Update device and browser stats
    analytics.deviceStats = analytics.deviceStats || { Desktop: 0, Mobile: 0, Tablet: 0 }
    analytics.deviceStats[device] = (analytics.deviceStats[device] || 0) + 1

    analytics.browserStats = analytics.browserStats || {}
    analytics.browserStats[browser] = (analytics.browserStats[browser] || 0) + 1

    // 4. Record new visitor entry
    const newVisitor: VisitorRecord = {
      id: sessionId,
      ip: clientIp,
      device,
      browser,
      os,
      screen,
      path: pathname,
      referrer,
      timestamp: new Date().toISOString(),
    }

    analytics.recentVisitors = analytics.recentVisitors || []
    analytics.recentVisitors.unshift(newVisitor)
    if (analytics.recentVisitors.length > 100) {
      analytics.recentVisitors.length = 100
    }

    writeJsonFileSafe('analytics.json', analytics)

    return NextResponse.json({
      success: true,
      totalVisitors: analytics.totalVisitors,
    })
  } catch (err: any) {
    console.error('Analytics track error:', err)
    return NextResponse.json({ error: 'Failed to record tracking' }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Read local cache
    const analytics = readJsonFileSafe<AnalyticsData>('analytics.json', defaultAnalytics)
    
    // Always check cloud counter for 100% sync
    const cloudHits = await fetchCloudHitCount(false)
    if (cloudHits !== null && cloudHits > analytics.totalVisitors) {
      analytics.totalVisitors = cloudHits
    }

    // Read stored payments
    const payments = readJsonFileSafe<any[]>('payments.json', [])

    return NextResponse.json({
      success: true,
      totalVisitors: analytics.totalVisitors || 1,
      deviceStats: analytics.deviceStats || { Desktop: 0, Mobile: 0, Tablet: 0 },
      browserStats: analytics.browserStats || {},
      recentVisitors: analytics.recentVisitors || [],
      payments: payments || [],
      lastUpdated: new Date().toISOString(),
    })
  } catch (err: any) {
    console.error('Analytics GET error:', err)
    return NextResponse.json({ error: 'Failed to retrieve analytics' }, { status: 500 })
  }
}
