import { NextResponse } from 'next/server'
import { readJsonFileSafe, writeJsonFileSafe } from '@/lib/storage'

interface SessionRecord {
  id: string
  ip: string
  device: 'Desktop' | 'Mobile' | 'Tablet'
  browser: string
  os: string
  referrer: string
  screen: string
  firstSeen: string
  lastActive: string
  totalTimeSpentSeconds: number
  currentPage: string
  pages: Record<string, { views: number; timeSpentSeconds: number }>
  sections: Record<string, number> // sectionId -> dwell time in seconds
}

interface AnalyticsData {
  totalVisitors: number
  totalPageviews: number
  totalTimeSpentSeconds: number
  pageStats: Record<string, { views: number; timeSpentSeconds: number }>
  sectionStats: Record<string, number> // total seconds held on each section
  deviceStats: Record<string, number>
  browserStats: Record<string, number>
  sessions: SessionRecord[]
}

const defaultAnalytics: AnalyticsData = {
  totalVisitors: 0,
  totalPageviews: 0,
  totalTimeSpentSeconds: 0,
  pageStats: {},
  sectionStats: {},
  deviceStats: { Desktop: 0, Mobile: 0, Tablet: 0 },
  browserStats: {},
  sessions: [],
}

function getStoredAnalytics(): AnalyticsData {
  return readJsonFileSafe<AnalyticsData>('analytics.json', defaultAnalytics)
}

function saveStoredAnalytics(data: AnalyticsData) {
  writeJsonFileSafe('analytics.json', data)
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
    const body = await request.json()
    const {
      sessionId,
      pathname = '/',
      pageTimeSpent = 0, // seconds spent since last ping
      sectionTimes = {}, // { [sectionId: string]: seconds }
      referrer = 'Direct',
      screen = '1920x1080',
      isNewPage = false,
    } = body

    if (!sessionId) {
      return NextResponse.json({ error: 'sessionId required' }, { status: 400 })
    }

    const ua = request.headers.get('user-agent') || ''
    const ipRaw =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      'Localhost'

    const { device, browser, os } = parseUserAgent(ua)
    const analytics = getStoredAnalytics()
    const now = new Date().toISOString()

    // Find existing session or create new
    let session = analytics.sessions.find((s) => s.id === sessionId)
    const isFirstTime = !session

    if (!session) {
      session = {
        id: sessionId,
        ip: ipRaw,
        device,
        browser,
        os,
        referrer: referrer || 'Direct',
        screen,
        firstSeen: now,
        lastActive: now,
        totalTimeSpentSeconds: 0,
        currentPage: pathname,
        pages: {
          [pathname]: { views: 1, timeSpentSeconds: 0 },
        },
        sections: {},
      }
      analytics.sessions.unshift(session)
      analytics.totalVisitors += 1

      // Device & Browser counts
      analytics.deviceStats[device] = (analytics.deviceStats[device] || 0) + 1
      analytics.browserStats[browser] = (analytics.browserStats[browser] || 0) + 1
    } else {
      session.lastActive = now
      session.currentPage = pathname
    }

    // Pageview increment
    if (isNewPage) {
      analytics.totalPageviews += 1
      if (!session.pages[pathname]) {
        session.pages[pathname] = { views: 0, timeSpentSeconds: 0 }
      }
      session.pages[pathname].views += 1

      if (!analytics.pageStats[pathname]) {
        analytics.pageStats[pathname] = { views: 0, timeSpentSeconds: 0 }
      }
      analytics.pageStats[pathname].views += 1
    }

    // Accumulate Page Time
    const addedPageTime = Math.max(0, Math.min(Number(pageTimeSpent) || 0, 300)) // cap at 5 min per tick for sanity
    if (addedPageTime > 0) {
      session.totalTimeSpentSeconds += addedPageTime
      analytics.totalTimeSpentSeconds += addedPageTime

      if (!session.pages[pathname]) {
        session.pages[pathname] = { views: 1, timeSpentSeconds: 0 }
      }
      session.pages[pathname].timeSpentSeconds += addedPageTime

      if (!analytics.pageStats[pathname]) {
        analytics.pageStats[pathname] = { views: 1, timeSpentSeconds: 0 }
      }
      analytics.pageStats[pathname].timeSpentSeconds += addedPageTime
    }

    // Accumulate Section Hold Times
    if (sectionTimes && typeof sectionTimes === 'object') {
      for (const [secId, secDuration] of Object.entries(sectionTimes)) {
        const d = Math.max(0, Math.min(Number(secDuration) || 0, 120))
        if (d > 0) {
          session.sections[secId] = (session.sections[secId] || 0) + d
          analytics.sectionStats[secId] = (analytics.sectionStats[secId] || 0) + d
        }
      }
    }

    // Cap stored sessions to 300 most recent
    if (analytics.sessions.length > 300) {
      analytics.sessions.length = 300
    }

    saveStoredAnalytics(analytics)

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('Analytics track error:', err)
    return NextResponse.json({ error: 'Failed to record tracking' }, { status: 500 })
  }
}

