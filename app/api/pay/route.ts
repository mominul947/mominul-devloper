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

    const senderNum = (senderBkash || clientPhone || '').toString().trim()
    const transactionId = (trxId || '').toString().trim().toUpperCase()
    const cleanAmount = String(amount || '').replace(/[^0-9.]/g, '')

    if (!senderNum || !transactionId || !cleanAmount) {
      return NextResponse.json(
        { error: 'প্রেরকের নম্বর, Transaction ID (TrxID) এবং টাকার পরিমাণ প্রদান করা আবশ্যক।' },
        { status: 400 }
      )
    }

    const finalClientName = (clientName && clientName.trim()) || 'Valued Client'
    const currentMethod = paymentMethod || 'bKash Personal'
    const methodPrefix = currentMethod.split(' ')[0].toUpperCase()
    const recipientEmail = process.env.NOTIFICATION_EMAIL || 'mominulwebwork@gmail.com'
    const receiptId = `${methodPrefix}-${Date.now().toString().slice(-6)}`

    // 1. Save payment record locally
    const newRecord = {
      id: receiptId,
      clientName: finalClientName,
      clientPhone: clientPhone || senderNum,
      clientEmail: clientEmail || '',
      senderNumber: senderNum,
      trxId: transactionId,
      amount: Number(cleanAmount) || 0,
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
    if (existingPayments.length > 500) {
      existingPayments.length = 500
    }
    saveStoredPayments(existingPayments)

    // 2. Dispatch Email notification to owner
    const originHeader = request.headers.get('origin')
    const hostHeader = request.headers.get('host')
    const safeOrigin = originHeader && !originHeader.includes('localhost')
      ? originHeader
      : hostHeader
      ? `https://${hostHeader}`
      : 'https://mominul-portfolio.vercel.app'

    try {
      const emailResponse = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Origin': safeOrigin,
          'Referer': `${safeOrigin}/pay`
        },
        body: JSON.stringify({
          'PAYMENT STATUS': 'VERIFICATION PENDING',
          'Receipt ID': receiptId,
          'Payment Gateway': currentMethod,
          'Transaction ID (TrxID)': transactionId,
          'Amount (BDT)': `৳${cleanAmount} BDT`,
          'Sender Number/Account': senderNum,
          'Client Name': finalClientName,
          'Client Phone/WhatsApp': clientPhone || senderNum,
          'Client Email': clientEmail || 'N/A',
          'Package / Service': selectedPackage || 'Custom Order',
          '_subject': `💰 ${currentMethod.toUpperCase()} PAYMENT: TrxID ${transactionId} (৳${cleanAmount} BDT)`,
          '_template': 'table',
          '_captcha': 'false',
          '_autoresponse': 'false'
        })
      })

      const emailResult = await emailResponse.json().catch(() => null)
      console.log('Payment email dispatch result:', emailResult)
    } catch (emailErr) {
      console.error('Payment email dispatch error:', emailErr)
    }

    // 3. WhatsApp Notification via CallMeBot (if configured)
    const ownerPhone = process.env.WHATSAPP_PHONE || '8801303482412'
    const apiKey = process.env.CALLMEBOT_API_KEY

    const alertMessage = 
`💰 *NEW ${currentMethod.toUpperCase()} PAYMENT ALERT!*
━━━━━━━━━━━━━━━━━━
🆔 *TrxID:* ${transactionId}
💵 *Amount:* ৳${cleanAmount} BDT
📱 *Sender:* ${senderNum}
👤 *Client:* ${finalClientName}
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

    // 4. Telegram Alert (if configured)
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN
    const telegramChatId = process.env.TELEGRAM_CHAT_ID
    if (telegramToken && telegramChatId) {
      try {
        await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: alertMessage,
            parse_mode: 'Markdown'
          })
        })
      } catch (tgErr) {
        console.error('Telegram payment alert error:', tgErr)
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
