import { NextResponse } from 'next/server'
import { readJsonFileSafe, writeJsonFileSafe } from '@/lib/storage'
import nodemailer from 'nodemailer'

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
    const gmailUser = process.env.GMAIL_USER || recipientEmail
    const gmailPass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, '')
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
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: '',
    }

    const existingPayments = getStoredPayments()
    existingPayments.unshift(newRecord)
    if (existingPayments.length > 500) {
      existingPayments.length = 500
    }
    saveStoredPayments(existingPayments)

    // 2. Dispatch Email notification via Gmail SMTP
    if (gmailPass) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: gmailUser,
            pass: gmailPass,
          },
        })

        await transporter.sendMail({
          from: `"Payment Verification" <${gmailUser}>`,
          to: recipientEmail,
          replyTo: clientEmail || recipientEmail,
          subject: `💰 ${currentMethod.toUpperCase()} PAYMENT: TrxID ${transactionId} (৳${cleanAmount} BDT)`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #f8fafc; border-radius: 16px; overflow: hidden; border: 1px solid #334155;">
              <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 24px; text-align: center;">
                <h1 style="margin: 0; color: #ffffff; font-size: 20px;">New Payment Received</h1>
                <p style="margin: 4px 0 0 0; color: #e2e8f0; font-size: 13px;">Receipt: ${receiptId}</p>
              </div>
              <div style="padding: 24px;">
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #94a3b8; font-size: 13px;">Method:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #f8fafc; font-weight: bold; font-size: 14px;">${currentMethod}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #94a3b8; font-size: 13px;">Transaction ID (TrxID):</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #38bdf8; font-family: monospace; font-size: 16px; font-weight: bold;">${transactionId}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #94a3b8; font-size: 13px;">Amount:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #10b981; font-size: 18px; font-weight: bold;">৳${cleanAmount} BDT</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #94a3b8; font-size: 13px;">Sender Number:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #f8fafc; font-size: 14px;">${senderNum}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #94a3b8; font-size: 13px;">Client Name:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #f8fafc; font-size: 14px;">${finalClientName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #94a3b8; font-size: 13px;">Package:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #f8fafc; font-size: 14px;">${selectedPackage || 'Custom Order'}</td>
                  </tr>
                </table>
              </div>
            </div>
          `,
        })
      } catch (smtpErr) {
        console.error('Payment SMTP dispatch error:', smtpErr)
      }
    }

    // 3. Optional Telegram Notification
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN
    const telegramChatId = process.env.TELEGRAM_CHAT_ID
    if (telegramToken && telegramChatId) {
      try {
        const tgAlert = `💰 *NEW ${currentMethod.toUpperCase()} PAYMENT!*\n━━━━━━━━━━━━━━━━━━\n🆔 *TrxID:* ${transactionId}\n💵 *Amount:* ৳${cleanAmount} BDT\n📱 *Sender:* ${senderNum}\n👤 *Client:* ${finalClientName}\n📦 *Package:* ${selectedPackage || 'Custom'}\n🧾 *Receipt:* ${receiptId}`
        await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: tgAlert,
            parse_mode: 'Markdown',
          }),
        })
      } catch (tgErr) {
        console.error('Telegram notification error:', tgErr)
      }
    }

    return NextResponse.json({
      success: true,
      receiptId,
      message: 'Payment recorded successfully',
    })
  } catch (error) {
    console.error('Payment API error:', error)
    return NextResponse.json(
      { error: 'Failed to process payment' },
      { status: 500 }
    )
  }
}
