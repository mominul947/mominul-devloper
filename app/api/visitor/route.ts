import { NextResponse } from 'next/server'
import { readJsonFileSafe, writeJsonFileSafe } from '@/lib/storage'

export const dynamic = 'force-dynamic'

interface VisitorData {
  count: number
}

const defaultData: VisitorData = {
  count: 1,
}

const ABACUS_BASE = 'https://abacus.jasoncameron.dev'
const COUNTAPI_BASE = 'https://countapi.mileshilliard.com/api/v1'
const KEY_NAME = 'mominul.dev/visitors'
const COUNTAPI_KEY = 'mominul_live_visitors'

async function fetchWithTimeout(url: string, timeoutMs = 2500): Promise<Response> {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, { signal: controller.signal, cache: 'no-store' })
    clearTimeout(id)
    return res
  } catch (err) {
    clearTimeout(id)
    throw err
  }
}

async function getCloudCount(increment: boolean): Promise<number | null> {
  // 1. Try Abacus primary cloud counter
  try {
    const endpoint = increment
      ? `${ABACUS_BASE}/hit/${KEY_NAME}`
      : `${ABACUS_BASE}/get/${KEY_NAME}`
    const res = await fetchWithTimeout(endpoint, 2500)
    if (res.ok) {
      const data = await res.json()
      if (typeof data?.value === 'number') {
        // Also keep secondary CountAPI in sync in the background
        if (increment) {
          fetchWithTimeout(`${COUNTAPI_BASE}/hit/${COUNTAPI_KEY}`, 2000).catch(() => {})
        }
        return data.value
      }
    }
  } catch {
    // Abacus failed, attempt fallback
  }

  // 2. Try CountAPI fallback cloud counter
  try {
    const endpoint = increment
      ? `${COUNTAPI_BASE}/hit/${COUNTAPI_KEY}`
      : `${COUNTAPI_BASE}/get/${COUNTAPI_KEY}`
    const res = await fetchWithTimeout(endpoint, 2500)
    if (res.ok) {
      const data = await res.json()
      const val = Number(data?.value)
      if (!isNaN(val) && val > 0) {
        return val
      }
    }
  } catch {
    // Both cloud services unreachable
  }

  return null
}

export async function GET() {
  try {
    const local = readJsonFileSafe<VisitorData>('visitor.json', defaultData)
    const cloud = await getCloudCount(false)
    const count = Math.max(local.count || 1, cloud || 1)
    if (count > (local.count || 1)) {
      writeJsonFileSafe('visitor.json', { count })
    }
    return NextResponse.json({ success: true, count })
  } catch {
    return NextResponse.json({ success: true, count: 1 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const { isNew = false } = body
    const local = readJsonFileSafe<VisitorData>('visitor.json', defaultData)

    let cloud: number | null = null
    if (isNew) {
      cloud = await getCloudCount(true)
    } else {
      cloud = await getCloudCount(false)
    }

    let finalCount = Math.max(local.count || 1, cloud || 1)
    if (isNew && !cloud) {
      finalCount = (local.count || 1) + 1
    }

    if (finalCount > (local.count || 1)) {
      writeJsonFileSafe('visitor.json', { count: finalCount })
    }

    return NextResponse.json({ success: true, count: finalCount })
  } catch {
    return NextResponse.json({ success: true, count: 1 })
  }
}
