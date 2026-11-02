import { NextResponse } from 'next/server'
import { verifyAdminRequest } from '@/lib/admin-auth'
import { readJsonFileSafe, writeJsonFileSafe } from '@/lib/storage'

export const dynamic = 'force-dynamic'

const defaultAnalytics = {
  totalVisitors: 0,
  totalPageviews: 0,
  totalTimeSpentSeconds: 0,
  pageStats: {},
  sectionStats: {},
  deviceStats: { Desktop: 0, Mobile: 0, Tablet: 0 },
  browserStats: {},
  sessions: [],
}

export async function GET(request: Request) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json(
      { error: 'অননুমোদিত অ্যাক্সেস! অনুগ্রহ করে প্রথমে লগইন করুন।' },
      { status: 401 }
    )
  }

  try {
    const data = readJsonFileSafe('analytics.json', defaultAnalytics)

    // Calculate active visitors right now (active within the last 3 minutes)
    const now = Date.now()
    const activeThresholdMs = 3 * 60 * 1000
    const activeVisitors = (data.sessions || []).filter((s: any) => {
      const lastActiveMs = new Date(s.lastActive).getTime()
      return now - lastActiveMs <= activeThresholdMs
    }).length

    // Sort sections by hold time descending
    const sortedSections = Object.entries(data.sectionStats || {})
      .map(([section, seconds]) => ({ section, seconds: Number(seconds) }))
      .sort((a, b) => b.seconds - a.seconds)

    // Sort pages by views descending
    const sortedPages = Object.entries(data.pageStats || {})
      .map(([path, stats]: [string, any]) => ({
        path,
        views: stats.views,
        timeSpentSeconds: stats.timeSpentSeconds,
        avgSeconds: stats.views > 0 ? Math.round(stats.timeSpentSeconds / stats.views) : 0,
      }))
      .sort((a, b) => b.views - a.views)

    return NextResponse.json({
      summary: {
        totalVisitors: data.totalVisitors || (data.sessions || []).length,
        totalPageviews: data.totalPageviews,
        activeVisitors,
        totalTimeSpentSeconds: data.totalTimeSpentSeconds,
        avgTimePerVisitor:
          data.totalVisitors > 0
            ? Math.round(data.totalTimeSpentSeconds / data.totalVisitors)
            : 0,
      },
      sortedSections,
      sortedPages,
      deviceStats: data.deviceStats,
      browserStats: data.browserStats,
      recentSessions: (data.sessions || []).slice(0, 50),
    })
  } catch (err) {
    console.error('Error fetching admin analytics:', err)
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json(
      { error: 'অননুমোদিত অ্যাক্সেস! অনুগ্রহ করে প্রথমে লগইন করুন।' },
      { status: 401 }
    )
  }

  try {
    writeJsonFileSafe('analytics.json', defaultAnalytics)
    return NextResponse.json({ success: true, message: 'Analytics data reset successfully' })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to reset analytics' }, { status: 500 })
  }
}
