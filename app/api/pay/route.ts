import { NextResponse } from 'next/server'
import { readJsonFileSafe, writeJsonFileSafe } from '@/lib/storage'

function getStoredPayments(): any[] {
  return readJsonFileSafe<any[]>('payments.json', [])
}

function saveStoredPayments(payments: any[]) {
  writeJsonFileSafe('payments.json', payments)
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { clientName, clientPhone, clientEmail, senderBkash, trxId, amount, selectedPackage, paymentMethod } = data

    if (!clientName || !senderBkash || !trxId || !amount) {
      return NextResponse.json(
        { error: 'Client name, sender number/account, TrxID, and amount are required' },
        { status: 400 }
      )
    }

    const currentMethod = paymentMethod || 'bKash Personal'
    const methodPrefix = currentMethod.split(' ')[0].toUpperCase()
    const recipientEmail = process.env.NOTIFICATION_EMAIL || 'mominulwebwork@gmail.com'
    const receiptId = `${methodPrefix}-${Date.now().toString().slice(-6)}`

    // 1. Save payment record locally to data/payments.json
    const newRecord = {
      id: receiptId,
      clientName: clientName.trim(),
      clientPhone: clientPhone || senderBkash,
      clientEmail: clientEmail || '',
      senderNumber: senderBkash.trim(),
      trxId: trxId.trim().toUpperCase(),
      amount: Number(amount) || 0,
      method: currentMethod,
      package: selectedPackage || 'Online Service Payment',
      status: 'pending', // 'pending' | 'verified' | 'rejected'
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: '',
    }

    const existingPayments = getStoredPayments()
    // Prepend newest first
    existingPayments.unshift(newRecord)
    // Keep max 500 recent transactions
    if (existingPayments.length > 500) {
      existingPayments.length = 500
    }
    saveStoredPayments(existingPayments)

    // 2. Dispatch Email notification to owner
    try {
      await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': request.headers.get('origin') || 'http://localhost:3000',
          'Referer': request.headers.get('referer') || 'http://localhost:3000/'
        },
        body: JSON.stringify({
          'PAYMENT STATUS': 'VERIFICATION PENDING',
          'Receipt ID': receiptId,
          'Payment Gateway': currentMethod,
          'Transaction ID (TrxID)': trxId,
          'Amount (BDT)': `৳${amount} BDT`,
          'Sender Number/Bank': senderBkash,
          'Client Name': clientName,
          'Client Phone/WhatsApp': clientPhone || 'N/A',
          'Client Email': clientEmail || 'N/A',
          'Package / Service': selectedPackage || 'Custom Order',
          '_subject': `💰 ${currentMethod.toUpperCase()} PAYMENT: TrxID ${trxId} (৳${amount} BDT)`,
          '_template': 'table'
        })
      })
    } catch (emailErr) {
      console.error('Payment email dispatch error:', emailErr)
    }

    // 3. WhatsApp Notification via CallMeBot (if configured)
    const ownerPhone = process.env.WHATSAPP_PHONE || '8801303482412'
    const apiKey = process.env.CALLMEBOT_API_KEY

    const alertMessage = 
`💰 *NEW ${currentMethod.toUpperCase()} PAYMENT ALERT!*
━━━━━━━━━━━━━━━━━━
🆔 *TrxID:* ${trxId}
💵 *Amount:* ৳${amount} BDT
📱 *Sender:* ${senderBkash}
👤 *Client:* ${clientName}
📞 *Phone:* ${clientPhone || 'N/A'}
📦 *Package:* ${selectedPackage || 'Custom'}
🧾 *Receipt ID:* ${receiptId}
━━━━━━━━━━━━━━━━━━
_Verify on your ${currentMethod} account and confirm with client._`

    if (apiKey) {
      try {
        const encoded = encodeURIComponent(alertMessage)
        await fetch(`https://api.callmebot.com/whatsapp.php?phone=${ownerPhone}&text=${encoded}&apikey=${apiKey}`)
      } catch (waErr) {
        console.error('WhatsApp payment alert error:', waErr)
      }
    }

    return NextResponse.json({
      success: true,
      receiptId,
      record: newRecord,
      message: 'Payment details submitted successfully for verification.'
    })
  } catch (error) {
    console.error('Payment API error:', error)
    return NextResponse.json(
      { error: 'Failed to record payment' },
      { status: 500 }
    )
  }
}
