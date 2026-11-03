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

// POST: Manually create a payment record from Admin Panel (Protected)
export async function POST(request: Request) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json(
      { error: 'অননুমোদিত অ্যাক্সেস! অনুগ্রহ করে প্রথমে লগইন করুন।' },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()
    const { clientName, clientPhone, clientEmail, senderNumber, trxId, amount, method, package: pkg, status, notes } = body

    const senderNum = (senderNumber || clientPhone || '').toString().trim()
    const transactionId = (trxId || '').toString().trim().toUpperCase()
    const cleanAmount = String(amount || '').replace(/[^0-9.]/g, '')

    if (!senderNum || !transactionId || !cleanAmount) {
      return NextResponse.json(
        { error: 'প্রেরকের নম্বর, Transaction ID (TrxID) এবং টাকার পরিমাণ প্রদান করা আবশ্যক।' },
        { status: 400 }
      )
    }

    const currentMethod = method || 'BKASH PERSONAL'
    const methodPrefix = currentMethod.split(' ')[0].toUpperCase()
    const receiptId = `${methodPrefix}-${Date.now().toString().slice(-6)}`

    const newRecord = {
      id: receiptId,
      clientName: (clientName || 'Valued Client').trim(),
      clientPhone: clientPhone || senderNum,
      clientEmail: clientEmail || '',
      senderNumber: senderNum,
      trxId: transactionId,
      amount: Number(cleanAmount) || 0,
      method: currentMethod,
      package: pkg || 'Online Service Payment',
      status: status || 'verified',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: notes || 'অ্যাডমিন প্যানেল থেকে ম্যানুয়ালি রেকর্ডকৃত',
    }

    const payments = getStoredPayments()
    payments.unshift(newRecord)
    if (payments.length > 500) payments.length = 500
    saveStoredPayments(payments)

    return NextResponse.json({
      success: true,
      payment: newRecord,
      message: 'পেমেন্ট সফলভাবে রেকর্ড করা হয়েছে',
    })
  } catch (error) {
    console.error('Error creating manual payment:', error)
    return NextResponse.json({ error: 'Failed to record payment' }, { status: 500 })
  }
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
