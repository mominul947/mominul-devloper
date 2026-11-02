import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// Cache in memory for 1 hour to prevent hitting Google Play excessively
let cachedData: {
  downloads: string
  rating: string
  timestamp: number
} | null = null

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const appId = searchParams.get('id') || 'com.appuser.carbook'

  const now = Date.now()
  if (cachedData && now - cachedData.timestamp < 60 * 60 * 1000) {
    return NextResponse.json({
      success: true,
      appId,
      downloads: cachedData.downloads,
      rating: cachedData.rating,
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

    // 1. Extract Downloads (e.g. <div class="ClM7O">5K+</div><div class="g1rdde">Downloads</div>)
    let downloads = '5K+'
    const dlMatch =
      html.match(/<div class="ClM7O">([^<]+)<\/div><div class="g1rdde">Downloads<\/div>/i) ||
      html.match(/(\d+[\.,]?\d*[KMBkmb]?\+?)\s*Downloads/i) ||
      html.match(/"(\d+[\+KMBkmb]?)\s*downloads"/i)

    if (dlMatch && dlMatch[1]) {
      downloads = dlMatch[1].trim()
    }

    // 2. Extract Rating (e.g. aria-label="Rated 4.7 stars out of five stars" or 4.7 star)
    let rating = '4.7'
    const ratingMatch =
      html.match(/aria-label="Rated ([0-9\.]+) stars out of five/i) ||
      html.match(/<div class="TT92bc">([0-9]\.[0-9])<\/div>/i) ||
      html.match(/([0-9]\.[0-9])\s*star/i)

    if (ratingMatch && ratingMatch[1]) {
      rating = ratingMatch[1].trim()
    }

    cachedData = {
      downloads,
      rating,
      timestamp: now,
    }

    return NextResponse.json({
      success: true,
      appId,
      downloads,
      rating,
      cached: false,
    })
  } catch (err: any) {
    console.error('Play Store fetch error:', err)
    // Fallback gracefully to verified stats
    return NextResponse.json({
      success: true,
      appId,
      downloads: cachedData ? cachedData.downloads : '5K+',
      rating: cachedData ? cachedData.rating : '4.7',
      fallback: true,
    })
  }
}

