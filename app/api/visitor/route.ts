import { NextResponse } from 'next/server'
import { readJsonFileSafe, writeJsonFileSafe } from '@/lib/storage'

interface VisitorData {
  count: number
}

const defaultData: VisitorData = {
  count: 1,
}

export async function GET() {
  try {
    const data = readJsonFileSafe<VisitorData>('visitor.json', defaultData)
    return NextResponse.json({
      success: true,
      count: Math.max(1, data.count || 1),
    })
  } catch (e) {
    return NextResponse.json({ success: true, count: 1 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const { isNew = false } = body

    const data = readJsonFileSafe<VisitorData>('visitor.json', defaultData)

    if (isNew) {
      data.count = (data.count || 0) + 1
      writeJsonFileSafe('visitor.json', data)
    }

    return NextResponse.json({
      success: true,
      count: Math.max(1, data.count || 1),
    })
  } catch (e) {
    return NextResponse.json({ success: true, count: 1 })
  }
}

