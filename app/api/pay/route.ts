import { NextResponse } from 'next/server'
import { readJsonFileSafe, writeJsonFileSafe } from '@/lib/storage'
import nodemailer from 'nodemailer'
import { escapeHtml, isValidEmail, isValidPhone, isValidTrxId, sanitizeText } from '@/lib/security'
import { savePaymentToFirestore, updatePaymentInFirestore } from '@/lib/firebase'

export const dynamic = 'force-dynamic'

function getStoredPayments(): any[] {
  return readJsonFileSafe<any[]>('payments.json', [])
}

function saveStoredPayments(payments: any[]) {
  writeJsonFileSafe('payments.json', payments)
}

export async function POST(request: Request) {
  try {
    const data = await request.json().catch(() => null)
    if (!data || typeof data !== 'object') {
      return NextResponse.json({ error: 'Invalid payload.' }, { status: 400 })
    }

    const { clientName, clientPhone, clientEmail, senderBkash, trxId, amount, selectedPackage, paymentMethod } = data

    const rawSender = (senderBkash || clientPhone || '').toString().trim()
    const rawTrxId = (trxId || '').toString().trim().toUpperCase()
    const cleanAmount = String(amount || '').replace(/[^0-9.]/g, '')

    // 1. Strict Validation
    if (!rawSender || !rawTrxId || !cleanAmount) {
      return NextResponse.json(
        { error: 'Sender number, Transaction ID (TrxID), and Amount are required.' },
        { status: 400 }
      )
    }

    if (!isValidTrxId(rawTrxId)) {
      return NextResponse.json(
        { error: 'Invalid Transaction ID. Please provide a valid TrxID.' },
        { status: 400 }
      )
    }

    if (!isValidPhone(rawSender)) {
      return NextResponse.json(
        { error: 'Invalid phone or account number. Please check and try again.' },
        { status: 400 }
      )
    }

    const parsedAmount = Number(cleanAmount)
    if (isNaN(parsedAmount) || parsedAmount < 10 || parsedAmount > 500000) {
      return NextResponse.json(
        { error: 'Amount must be between ৳10 and ৳500,000 BDT.' },
        { status: 400 }
      )
    }

    // 2. Sanitize & Protect against Injection
    const safeClientName = sanitizeText(clientName || 'Valued Client', 60)
    const safePhone = sanitizeText(clientPhone || rawSender, 25)
    const safeEmail = clientEmail && isValidEmail(clientEmail) ? sanitizeText(clientEmail, 100) : ''
    const safeSender = sanitizeText(rawSender, 25)
    const safeTrxId = sanitizeText(rawTrxId, 30)
    const safePackage = sanitizeText(selectedPackage || 'Online Service Payment', 60)
    const safeMethod = sanitizeText(paymentMethod || 'bKash Personal', 40)

    const methodPrefix = safeMethod.split(' ')[0].toUpperCase()
    const receiptId = `${methodPrefix}-${Date.now().toString().slice(-6)}`

    // 3. Save payment record locally
    const newRecord = {
      id: receiptId,
      clientName: safeClientName,
      clientPhone: safePhone,
      clientEmail: safeEmail,
      senderNumber: safeSender,
      trxId: safeTrxId,
      amount: parsedAmount,
      method: safeMethod,
      package: safePackage,
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

    // Auto-sync to Firebase Firestore Cloud Database
    await savePaymentToFirestore(newRecord)

    // 4. Send Instant Admin Notification via Secure Gmail SMTP
    const recipientEmail = process.env.NOTIFICATION_EMAIL || 'mominulwebwork@gmail.com'
    const gmailUser = process.env.GMAIL_USER || 'mominulwebwork@gmail.com'
    const gmailPass = (process.env.GMAIL_APP_PASSWORD || 'jqopjchfoyoqmror').replace(/\s+/g, '')

    if (gmailPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: gmailUser,
            pass: gmailPass,
          },
        })

        const htmlClientName = escapeHtml(safeClientName)
        const htmlPhone = escapeHtml(safePhone)
        const htmlEmail = escapeHtml(safeEmail)
        const htmlSender = escapeHtml(safeSender)
        const htmlTrxId = escapeHtml(safeTrxId)
        const htmlMethod = escapeHtml(safeMethod)
        const htmlPackage = escapeHtml(safePackage)

        await transporter.sendMail({
          from: `"Payment Verification" <${gmailUser}>`,
          to: recipientEmail,
          subject: `New Payment Received: ৳${parsedAmount} via ${safeMethod} (TrxID: ${safeTrxId})`,
          text: `Payment Receipt: ${receiptId}\nAmount: ৳${parsedAmount}\nMethod: ${safeMethod}\nTrxID: ${safeTrxId}\nSender: ${safeSender}\nClient: ${safeClientName}\nPhone: ${safePhone}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #f8fafc; border-radius: 16px; overflow: hidden; border: 1px solid #334155;">
              <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 24px; text-align: center;">
                <h1 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: bold;">New Payment Received</h1>
                <p style="margin: 6px 0 0 0; color: #e2e8f0; font-size: 13px;">Receipt: ${receiptId}</p>
              </div>
              <div style="padding: 24px;">
                <div style="background: #1e293b; padding: 20px; border-radius: 12px; border: 1px solid #334155; text-align: center; margin-bottom: 20px;">
                  <span style="font-size: 12px; color: #94a3b8; text-transform: uppercase;">Amount Paid</span>
                  <div style="font-size: 32px; font-weight: bold; color: #10b981; margin: 6px 0;">৳${parsedAmount.toLocaleString('en-US')}</div>
                  <span style="display: inline-block; background: #064e3b; color: #6ee7b7; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: bold;">${htmlMethod}</span>
                </div>
                <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #94a3b8;">TrxID:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #f8fafc; font-weight: bold; font-family: monospace; font-size: 14px;">${htmlTrxId}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #94a3b8;">Sender Number:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #f8fafc; font-weight: bold;">${htmlSender}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #94a3b8;">Client Name:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #f8fafc;">${htmlClientName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #94a3b8;">Client Phone:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #f8fafc;">${htmlPhone}</td>
                  </tr>
                  ${htmlEmail ? `
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #94a3b8;">Client Email:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #38bdf8;">${htmlEmail}</td>
                  </tr>
                  ` : ''}
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #94a3b8;">Package:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #f8fafc;">${htmlPackage}</td>
                  </tr>
                </table>
              </div>
            </div>
          `,
        })

        // Also send confirmation email copy to client if they provided their email
        if (safeEmail && isValidEmail(safeEmail)) {
          try {
            await transporter.sendMail({
              from: `"Md. Mominul Islam" <${gmailUser}>`,
              to: safeEmail,
              subject: `Payment Verification Request Received (Receipt: ${receiptId})`,
              text: `Hello ${safeClientName},\n\nWe have received your payment verification request.\nReceipt ID: ${receiptId}\nAmount: ৳${parsedAmount}\nMethod: ${safeMethod}\nTrxID: ${safeTrxId}\n\nWe are currently reviewing the transaction and will confirm shortly.\n\nBest regards,\nMd. Mominul Islam`,
              html: `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #f8fafc; border-radius: 16px; overflow: hidden; border: 1px solid #334155;">
                  <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 24px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: bold;">Payment Verification Received</h1>
                    <p style="margin: 6px 0 0 0; color: #e2e8f0; font-size: 13px;">Receipt: ${receiptId}</p>
                  </div>
                  <div style="padding: 24px;">
                    <p style="color: #cbd5e1; font-size: 14px; margin-top: 0;">Hello <strong>${htmlClientName}</strong>,</p>
                    <p style="color: #94a3b8; font-size: 13px; line-height: 1.6;">Thank you for submitting your payment verification. Your payment details have been logged and are currently under verification.</p>
                    <div style="background: #1e293b; padding: 18px; border-radius: 12px; border: 1px solid #334155; margin: 20px 0;">
                      <table style="width: 100%; font-size: 13px;">
                        <tr><td style="color: #94a3b8; padding: 6px 0;">Amount:</td><td style="color: #10b981; font-weight: bold; font-size: 16px;">৳${parsedAmount.toLocaleString('en-US')} BDT</td></tr>
                        <tr><td style="color: #94a3b8; padding: 6px 0;">Method:</td><td style="color: #f8fafc; font-weight: bold;">${htmlMethod}</td></tr>
                        <tr><td style="color: #94a3b8; padding: 6px 0;">TrxID:</td><td style="color: #38bdf8; font-family: monospace; font-weight: bold;">${htmlTrxId}</td></tr>
                        <tr><td style="color: #94a3b8; padding: 6px 0;">Package:</td><td style="color: #f8fafc;">${htmlPackage}</td></tr>
                        <tr><td style="color: #94a3b8; padding: 6px 0;">Status:</td><td style="color: #fbbf24; font-weight: bold;">Under Review / ভেরিফিকেশন চলছে</td></tr>
                      </table>
                    </div>
                    <p style="color: #94a3b8; font-size: 12px; margin-bottom: 0;">If you have any urgent queries, contact via WhatsApp: <a href="https://wa.me/8801303482412" style="color: #10b981; text-decoration: underline;">+880 1303 482412</a></p>
                  </div>
                </div>
              `,
            })
          } catch (clientErr) {
            console.error('Client receipt email error:', clientErr)
          }
        }
      } catch (emailErr) {
        console.error('Payment email dispatch error:', emailErr)
      }
    }

    return NextResponse.json({
      success: true,
      receiptId,
      status: 'pending',
      message: 'পেমেন্ট ভেরিফিকেশন রিকোয়েস্ট সফলভাবে গ্রহণ করা হয়েছে।',
    })
  } catch (error: any) {
    console.error('Payment error:', error)
    return NextResponse.json({ error: 'পেমেন্ট প্রক্রিয়াকরণে সমস্যা হয়েছে।' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const payments = getStoredPayments()
    return NextResponse.json({ success: true, payments })
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to fetch payments' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const data = await request.json().catch(() => null)
    if (!data || !data.id || !data.status) {
      return NextResponse.json({ error: 'Order id and status are required' }, { status: 400 })
    }

    const payments = getStoredPayments()
    const target = payments.find(p => p.id === data.id)
    if (!target) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    target.status = data.status
    target.updatedAt = new Date().toISOString()
    saveStoredPayments(payments)

    // Sync status change to Firebase Firestore
    await updatePaymentInFirestore(data.id, data.status)

    return NextResponse.json({ success: true, payment: target })
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to update payment' }, { status: 500 })
  }
}
