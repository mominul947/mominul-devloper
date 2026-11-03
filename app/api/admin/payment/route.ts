import { NextResponse } from 'next/server'
import { paymentConfig } from '@/config/payment'
import { verifyAdminRequest } from '@/lib/admin-auth'
import { readJsonFileSafe, writeJsonFileSafe } from '@/lib/storage'

export const dynamic = 'force-dynamic'
export const revalidate = 0

declare global {
  var __portfolio_payment_settings__: any
}

function getSettings() {
  if (globalThis.__portfolio_payment_settings__) {
    return {
      ...paymentConfig,
      ...globalThis.__portfolio_payment_settings__,
    }
  }
  const data = readJsonFileSafe<any>('payment-settings.json', {})
  const merged = {
    ...paymentConfig,
    ...data,
  }
  globalThis.__portfolio_payment_settings__ = merged
  return merged
}

export async function GET() {
  const settings = getSettings()
  return NextResponse.json(settings, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
      'CDN-Cache-Control': 'no-store',
      'Vercel-CDN-Cache-Control': 'no-store',
    },
  })
}

export async function POST(request: Request) {
  if (!verifyAdminRequest(request)) {
    return NextResponse.json(
      { error: 'অননুমোদিত অ্যাক্সেস! পুনরায় লগইন করুন।' },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()
    const {
      bkashNumber,
      nagadNumber,
      bankName,
      bankBranch,
      bankRoutingNumber,
      bankAccountName,
      bankAccountNumber,
      cellfinBankName,
      cellfinBranch,
      cellfinRoutingNumber,
      cellfinAccountName,
      cellfinAccountNumber,
    } = body

    const current = getSettings()
    const updated = {
      ...current,
      bkashNumber: bkashNumber !== undefined ? bkashNumber.trim() : current.bkashNumber,
      nagadNumber: nagadNumber !== undefined ? nagadNumber.trim() : current.nagadNumber,
      bankName: bankName !== undefined ? bankName.trim() : current.bankName,
      bankBranch: bankBranch !== undefined ? bankBranch.trim() : current.bankBranch,
      bankRoutingNumber: bankRoutingNumber !== undefined ? bankRoutingNumber.trim() : current.bankRoutingNumber,
      bankAccountName: bankAccountName !== undefined ? bankAccountName.trim() : current.bankAccountName,
      bankAccountNumber: bankAccountNumber !== undefined ? bankAccountNumber.trim() : current.bankAccountNumber,
      cellfinBankName: cellfinBankName !== undefined ? cellfinBankName.trim() : current.cellfinBankName,
      cellfinBranch: cellfinBranch !== undefined ? cellfinBranch.trim() : current.cellfinBranch,
      cellfinRoutingNumber: cellfinRoutingNumber !== undefined ? cellfinRoutingNumber.trim() : current.cellfinRoutingNumber,
      cellfinAccountName: cellfinAccountName !== undefined ? cellfinAccountName.trim() : current.cellfinAccountName,
      cellfinAccountNumber: cellfinAccountNumber !== undefined ? cellfinAccountNumber.trim() : current.cellfinAccountNumber,
    }

    // Persist in-memory for serverless lifetime
    globalThis.__portfolio_payment_settings__ = updated

    // Persist on disk
    writeJsonFileSafe('payment-settings.json', updated)

    return NextResponse.json(
      {
        success: true,
        message: 'পেমেন্ট গেটওয়ে সেটিংস সফলভাবে ও নিরাপদে সেভ করা হয়েছে!',
        settings: updated,
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        },
      }
    )
  } catch (err) {
    console.error('Error saving payment settings:', err)
    return NextResponse.json(
      { error: 'সার্ভারে সমস্যা হয়েছে।' },
      { status: 500 }
    )
  }
}
