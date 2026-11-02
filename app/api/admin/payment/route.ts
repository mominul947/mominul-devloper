import { NextResponse } from 'next/server'
import { paymentConfig } from '@/config/payment'
import { verifyAdminRequest } from '@/lib/admin-auth'
import { readJsonFileSafe, writeJsonFileSafe } from '@/lib/storage'

function getSettings() {
  const data = readJsonFileSafe<any>('payment-settings.json', {})
  return {
    ...paymentConfig,
    ...data,
  }
}

export async function GET() {
  const settings = getSettings()
  return NextResponse.json(settings)
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
      bkashNumber: bkashNumber?.trim() || current.bkashNumber,
      nagadNumber: nagadNumber?.trim() || current.nagadNumber,
      bankName: bankName?.trim() || current.bankName,
      bankBranch: bankBranch?.trim() || current.bankBranch,
      bankRoutingNumber: bankRoutingNumber?.trim() || current.bankRoutingNumber,
      bankAccountName: bankAccountName?.trim() || current.bankAccountName,
      bankAccountNumber: bankAccountNumber?.trim() || current.bankAccountNumber,
      cellfinBankName: cellfinBankName?.trim() || current.cellfinBankName,
      cellfinBranch: cellfinBranch?.trim() || current.cellfinBranch,
      cellfinRoutingNumber: cellfinRoutingNumber?.trim() || current.cellfinRoutingNumber,
      cellfinAccountName: cellfinAccountName?.trim() || current.cellfinAccountName,
      cellfinAccountNumber: cellfinAccountNumber?.trim() || current.cellfinAccountNumber,
    }

    writeJsonFileSafe('payment-settings.json', updated)

    return NextResponse.json({
      success: true,
      message: 'পেমেন্ট গেটওয়ে সেটিংস সফলভাবে ও নিরাপদে সেভ করা হয়েছে!',
      settings: updated,
    })
  } catch (err) {
    console.error('Error saving payment settings:', err)
    return NextResponse.json(
      { error: 'সার্ভারে সমস্যা হয়েছে।' },
      { status: 500 }
    )
  }
}
