import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

interface AppPlayStats {
  downloads: string
  rating: string
  timestamp: number
}

const cacheMap = new Map<string, AppPlayStats>()

const APP_DEFAULTS: Record<string, { downloads: string; rating: string }> = {
  'com.appuser.carbook': { downloads: '5K+', rating: '4.7' },
  'com.appuser.repaimatepro': { downloads: 'Live', rating: '5.0' },
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const appId = searchParams.get('id') || 'com.appuser.carbook'
  const defaults = APP_DEFAULTS[appId] || { downloads: 'Live', rating: '4.8' }

  const now = Date.now()
  const cached = cacheMap.get(appId)
  if (cached && now - cached.timestamp < 60 * 60 * 1000) {
    return NextResponse.json({
      success: true,
      appId,
      downloads: cached.downloads,
      rating: cached.rating,
      cached: true,
    })
  }

  try {
    const playUrl = `https://play.google.com/store/apps/details?id=${encodeURIComponent(appId)}&hl=en`
    const res = await fetch(playUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      throw new Error(`Google Play returned status ${res.status}`)
    }

    const html = await res.text()

    let downloads = defaults.downloads
    const dlMatch =
      html.match(/<div class="ClM7O">([^<]+)<\/div><div class="g1rdde">Downloads<\/div>/i) ||
      html.match(/(\d+[\.,]?\d*[KMBkmb]?\+?)\s*Downloads/i) ||
      html.match(/"(\d+[\+KMBkmb]?)\s*downloads"/i)

    if (dlMatch && dlMatch[1]) {
      downloads = dlMatch[1].trim()
    }

    let rating = defaults.rating
    const ratingMatch = html.match(/aria-label="Rated ([0-9\.]+) stars out of five/i)
    if (ratingMatch && ratingMatch[1]) {
      const parsed = parseFloat(ratingMatch[1])
      if (parsed >= 4.0 && parsed <= 5.0) {
        rating = ratingMatch[1].trim()
      }
    }

    const result = { downloads, rating, timestamp: now }
    cacheMap.set(appId, result)

    return NextResponse.json({
      success: true,
      appId,
      downloads,
      rating,
      cached: false,
    })
  } catch (err: any) {
    const fallback = cached || { ...defaults, timestamp: now }
    return NextResponse.json({
      success: true,
      appId,
      downloads: fallback.downloads,
      rating: fallback.rating,
      fallback: true,
    })
  }
}
