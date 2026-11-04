import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { escapeHtml, isValidEmail, sanitizeText } from '@/lib/security'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid payload.' }, { status: 400 })
    }

    const { name, email, phone, projectType, message, honeypot, website } = body

    // 1. Anti-Bot Honeypot Trap: If a bot fills hidden honeypot fields, drop silently
    if (honeypot || website) {
      return NextResponse.json({ success: true, message: 'Message sent successfully.' })
    }

    // 2. Strict Input Validation & Length Limits
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 })
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 })
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Message content is required.' }, { status: 400 })
    }

    // 3. Sanitize and bound all inputs to prevent memory exhaustion, SQLi, and Stored XSS
    const safeName = sanitizeText(name, 80)
    const safeEmail = sanitizeText(email, 120)
    const safePhone = sanitizeText(phone || '', 30)
    const safeProjectType = sanitizeText(projectType || 'General Inquiry', 60)
    const safeMessage = sanitizeText(message, 3000)

    // HTML-Escaped variants for secure email rendering
    const htmlName = escapeHtml(safeName)
    const htmlEmail = escapeHtml(safeEmail)
    const htmlPhone = escapeHtml(safePhone)
    const htmlProjectType = escapeHtml(safeProjectType)
    const htmlMessage = escapeHtml(safeMessage)

    const recipientEmail = process.env.NOTIFICATION_EMAIL || 'mominulwebwork@gmail.com'
    const gmailUser = process.env.GMAIL_USER || 'mominulwebwork@gmail.com'
    const gmailPass = (process.env.GMAIL_APP_PASSWORD || 'jqopjchfoyoqmror').replace(/\s+/g, '')
    const resendApiKey = process.env.RESEND_API_KEY

    let emailDelivered = false
    let deliveryMethod = 'none'

    // 4. Primary: Direct Secure Gmail SMTP via SSL Port 465
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

        await transporter.sendMail({
          from: `"Client Inquiry" <${gmailUser}>`,
          to: recipientEmail,
          replyTo: safeEmail,
          subject: `🚀 Portfolio Message: ${safeName} (${safeProjectType})`,
          text: `Client Name: ${safeName}\nEmail: ${safeEmail}\nPhone / WhatsApp: ${safePhone || 'Not provided'}\nCategory: ${safeProjectType}\n\nMessage Details:\n${safeMessage}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #f8fafc; border-radius: 16px; overflow: hidden; border: 1px solid #334155;">
              <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 24px; text-align: center;">
                <h1 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: bold; letter-spacing: 0.5px;">New Portfolio Client Inquiry</h1>
                <p style="margin: 6px 0 0 0; color: #e2e8f0; font-size: 13px;">Secure sanitized message from your portfolio</p>
              </div>
              <div style="padding: 24px;">
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #94a3b8; font-size: 13px; width: 130px;">Client Name:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #f8fafc; font-weight: bold; font-size: 14px;">${htmlName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #94a3b8; font-size: 13px;">Client Email:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #38bdf8; font-size: 14px;"><a href="mailto:${encodeURI(safeEmail)}" style="color: #38bdf8; text-decoration: none; font-weight: bold;">${htmlEmail}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #94a3b8; font-size: 13px;">Phone / WhatsApp:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #10b981; font-weight: bold; font-size: 14px;">${htmlPhone || 'Not provided'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #94a3b8; font-size: 13px;">Project Category:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #f8fafc; font-size: 14px;">${htmlProjectType}</td>
                  </tr>
                </table>
                <div style="background: #1e293b; padding: 18px; border-radius: 12px; border: 1px solid #334155;">
                  <h3 style="margin: 0 0 10px 0; color: #10b981; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message Content:</h3>
                  <p style="margin: 0; color: #e2e8f0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${htmlMessage}</p>
                </div>
                <div style="margin-top: 24px; text-align: center;">
                  <a href="mailto:${encodeURI(safeEmail)}?subject=Re:%20${encodeURIComponent(safeProjectType)}" style="display: inline-block; background: #10b981; color: #022c22; font-weight: bold; padding: 12px 28px; border-radius: 9999px; text-decoration: none; font-size: 13px;">Reply to Client</a>
                </div>
              </div>
            </div>
          `,
        })
        emailDelivered = true
        deliveryMethod = 'gmail_smtp'
      } catch (smtpErr) {
        console.error('Gmail SMTP dispatch error:', smtpErr)
      }
    }

    // 5. Secondary: Resend API (if configured)
    if (!emailDelivered && resendApiKey) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Portfolio <onboarding@resend.dev>',
            to: [recipientEmail],
            reply_to: safeEmail,
            subject: `🚀 Portfolio Message: ${safeName} (${safeProjectType})`,
            text: `Client Name: ${safeName}\nEmail: ${safeEmail}\nPhone: ${safePhone || 'N/A'}\nCategory: ${safeProjectType}\n\nMessage:\n${safeMessage}`,
          }),
        })
        if (resendRes.ok) {
          emailDelivered = true
          deliveryMethod = 'resend_api'
        }
      } catch (resendErr) {
        console.error('Resend dispatch error:', resendErr)
      }
    }

    return NextResponse.json({
      success: true,
      delivered: emailDelivered,
      method: deliveryMethod,
      message: 'Inquiry received securely.',
    })
  } catch (error: any) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your request.' },
      { status: 500 }
    )
  }
}
