import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const { name, email, phone, projectType, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    const recipientEmail = process.env.NOTIFICATION_EMAIL || 'mominulwebwork@gmail.com'
    const gmailUser = process.env.GMAIL_USER || recipientEmail
    const gmailPass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, '')
    const resendApiKey = process.env.RESEND_API_KEY

    let emailDelivered = false
    let deliveryMethod = 'none'

    // 1. Primary: Direct Gmail SMTP via Nodemailer
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
          from: `"Portfolio Client: ${name}" <${gmailUser}>`,
          to: recipientEmail,
          replyTo: email,
          subject: `🚀 New Portfolio Inquiry: ${name} (${projectType})`,
          text: `Client Name: ${name}\nEmail: ${email}\nPhone / WhatsApp: ${phone || 'Not provided'}\nCategory: ${projectType}\n\nMessage Details:\n${message}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #f8fafc; border-radius: 16px; overflow: hidden; border: 1px solid #334155;">
              <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 24px; text-align: center;">
                <h1 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: bold; letter-spacing: 0.5px;">New Portfolio Client Inquiry</h1>
                <p style="margin: 6px 0 0 0; color: #e2e8f0; font-size: 13px;">Direct message submitted from your portfolio</p>
              </div>
              <div style="padding: 24px;">
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #94a3b8; font-size: 13px; width: 130px;">Client Name:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #f8fafc; font-weight: bold; font-size: 14px;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #94a3b8; font-size: 13px;">Client Email:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #38bdf8; font-size: 14px;"><a href="mailto:${email}" style="color: #38bdf8; text-decoration: none; font-weight: bold;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #94a3b8; font-size: 13px;">Phone / WhatsApp:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #10b981; font-weight: bold; font-size: 14px;">${phone || 'Not provided'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #94a3b8; font-size: 13px;">Project Category:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #334155; color: #f8fafc; font-size: 14px;">${projectType}</td>
                  </tr>
                </table>
                <div style="background: #1e293b; padding: 18px; border-radius: 12px; border: 1px solid #334155;">
                  <h3 style="margin: 0 0 10px 0; color: #10b981; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message Content:</h3>
                  <p style="margin: 0; color: #e2e8f0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                </div>
                <div style="margin-top: 24px; text-align: center;">
                  <a href="mailto:${email}?subject=Re:%20${encodeURIComponent(projectType)}" style="display: inline-block; background: #10b981; color: #022c22; font-weight: bold; padding: 12px 28px; border-radius: 9999px; text-decoration: none; font-size: 13px;">Reply to Client</a>
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

    // 2. Secondary: Resend API (if configured)
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
            reply_to: email,
            subject: `🚀 New Portfolio Inquiry: ${name} (${projectType})`,
            text: `Client Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nCategory: ${projectType}\n\nMessage:\n${message}`,
          }),
        })
        if (resendRes.ok) {
          emailDelivered = true
          deliveryMethod = 'resend'
        }
      } catch (resendErr) {
        console.error('Resend dispatch error:', resendErr)
      }
    }

    // 3. Telegram Bot Instant Alert (if configured)
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN
    const telegramChatId = process.env.TELEGRAM_CHAT_ID
    if (telegramToken && telegramChatId) {
      try {
        const tgText = `🚀 *New Inquiry from Portfolio Website*\n━━━━━━━━━━━━━━━━━━\n👤 *Client:* ${name}\n✉️ *Email:* ${email}\n📞 *Phone:* ${phone || 'N/A'}\n📁 *Category:* ${projectType}\n\n📝 *Message:*\n${message}`
        await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: tgText,
            parse_mode: 'Markdown',
          }),
        })
      } catch (tgErr) {
        console.error('Telegram dispatch error:', tgErr)
      }
    }

    return NextResponse.json({
      success: true,
      delivered: emailDelivered,
      method: deliveryMethod,
      message: 'Inquiry processed successfully',
    })
  } catch (error) {
    console.error('Contact API Error:', error)
    return NextResponse.json(
      { error: 'Failed to process inquiry' },
      { status: 500 }
    )
  }
}
