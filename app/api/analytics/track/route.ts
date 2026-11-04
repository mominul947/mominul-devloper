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
  totalVisitors: 1,
  deviceStats: { Desktop: 1, Mobile: 0, Tablet: 0 },
  browserStats: { Chrome: 1 },
  recentVisitors: [],
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
      isNewVisitor = false,
    } = body

    // NEVER track dashboard or admin paths
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
      return NextResponse.json({ success: true, ignored: true })
    }

    const ua = request.headers.get('user-agent') || ''
    const { device, browser, os } = parseUserAgent(ua)

    const rawIp =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      request.headers.get('cf-connecting-ip') ||
      '127.0.0.1'
    const clientIp = rawIp.split(',')[0].trim()

    const analytics = readJsonFileSafe<AnalyticsData>('analytics.json', defaultAnalytics)

    // ONLY increment if it's a real new visitor/session
    if (isNewVisitor) {
      analytics.totalVisitors = (analytics.totalVisitors || 0) + 1

      analytics.deviceStats = analytics.deviceStats || { Desktop: 0, Mobile: 0, Tablet: 0 }
      analytics.deviceStats[device] = (analytics.deviceStats[device] || 0) + 1

      analytics.browserStats = analytics.browserStats || {}
      analytics.browserStats[browser] = (analytics.browserStats[browser] || 0) + 1

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
      if (analytics.recentVisitors.length > 50) {
        analytics.recentVisitors.length = 50
      }

      writeJsonFileSafe('analytics.json', analytics)
    }

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
    const analytics = readJsonFileSafe<AnalyticsData>('analytics.json', defaultAnalytics)
    const payments = readJsonFileSafe<any[]>('payments.json', [])

    return NextResponse.json({
      success: true,
      totalVisitors: analytics.totalVisitors || 1,
      deviceStats: analytics.deviceStats || { Desktop: 1, Mobile: 0, Tablet: 0 },
      browserStats: analytics.browserStats || { Chrome: 1 },
      recentVisitors: analytics.recentVisitors || [],
      payments: payments || [],
      lastUpdated: new Date().toISOString(),
    })
  } catch (err: any) {
    console.error('Analytics GET error:', err)
    return NextResponse.json({ error: 'Failed to retrieve analytics' }, { status: 500 })
  }
}

// Allow Mominul to reset or adjust counter directly from dashboard
export async function PUT(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const { count = 1, clearHistory = false } = body

    const analytics = readJsonFileSafe<AnalyticsData>('analytics.json', defaultAnalytics)
    analytics.totalVisitors = Math.max(0, parseInt(count, 10) || 0)

    if (clearHistory) {
      analytics.recentVisitors = []
      analytics.deviceStats = { Desktop: 0, Mobile: 0, Tablet: 0 }
    }

    writeJsonFileSafe('analytics.json', analytics)

    return NextResponse.json({
      success: true,
      totalVisitors: analytics.totalVisitors,
    })
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to update counter' }, { status: 500 })
  }
}
