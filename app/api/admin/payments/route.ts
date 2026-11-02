import { NextResponse } from 'next/server'
import { verifyAdminRequest } from '@/lib/admin-auth'
import { readJsonFileSafe, writeJsonFileSafe } from '@/lib/storage'

export const dynamic = 'force-dynamic'

function getStoredPayments(): any[] {
  return readJsonFileSafe<any[]>('payments.json', [])
}

function saveStoredPayments(payments: any[]) {
  writeJsonFileSafe('payments.json', payments)
}

// GET: Fetch all payments with summary stats (Protected)
export async function GET(request: Request) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json(
      { error: 'অননুমোদিত অ্যাক্সেস! অনুগ্রহ করে প্রথমে লগইন করুন।' },
      { status: 401 }
    )
  }

  const payments = getStoredPayments()

  const stats = {
    totalCount: payments.length,
    pendingCount: payments.filter((p) => p.status === 'pending').length,
    verifiedCount: payments.filter((p) => p.status === 'verified').length,
    rejectedCount: payments.filter((p) => p.status === 'rejected').length,
    totalVolume: payments
      .filter((p) => p.status === 'verified')
      .reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0),
    pendingVolume: payments
      .filter((p) => p.status === 'pending')
      .reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0),
  }

  return NextResponse.json({
    stats,
    payments,
  })
}

// PATCH: Update status (pending, verified, rejected) or notes (Protected)
export async function PATCH(request: Request) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json(
      { error: 'অননুমোদিত অ্যাক্সেস! অনুগ্রহ করে প্রথমে লগইন করুন।' },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()
    const { id, status, notes } = body

    if (!id) {
      return NextResponse.json({ error: 'Payment ID is required' }, { status: 400 })
    }

    const payments = getStoredPayments()
    const index = payments.findIndex((p) => p.id === id)

    if (index === -1) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 })
    }

    if (status) {
      payments[index].status = status
    }
    if (notes !== undefined) {
      payments[index].notes = notes
    }
    payments[index].updatedAt = new Date().toISOString()

    saveStoredPayments(payments)

    return NextResponse.json({
      success: true,
      payment: payments[index],
      message: `পেমেন্ট স্ট্যাটাস আপডেট করা হয়েছে: ${status}`,
    })
  } catch (error) {
    console.error('Error updating payment:', error)
    return NextResponse.json({ error: 'Failed to update payment' }, { status: 500 })
  }
}

// DELETE: Delete a transaction (Protected)
export async function DELETE(request: Request) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json(
      { error: 'অননুমোদিত অ্যাক্সেস! অনুগ্রহ করে প্রথমে লগইন করুন।' },
      { status: 401 }
    )
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Payment ID is required' }, { status: 400 })
    }

    const payments = getStoredPayments()
    const filtered = payments.filter((p) => p.id !== id)

    if (filtered.length === payments.length) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 })
    }

    saveStoredPayments(filtered)

    return NextResponse.json({
      success: true,
      message: 'পেমেন্ট রেকর্ড সফলভাবে ডিলিট করা হয়েছে',
    })
  } catch (error) {
    console.error('Error deleting payment:', error)
    return NextResponse.json({ error: 'Failed to delete payment' }, { status: 500 })
  }
}
