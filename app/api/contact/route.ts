import { NextResponse } from 'next/server'

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

    // 1. Send Email Notification via FormSubmit
    try {
      const emailRes = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': request.headers.get('origin') || 'http://localhost:3000',
          'Referer': request.headers.get('referer') || 'http://localhost:3000/'
        },
        body: JSON.stringify({
          'Client Name': name,
          'Client Email': email,
          'Phone / WhatsApp': phone || 'Not provided',
          'Project Category': projectType,
          'Message Details': message,
          '_subject': `🚀 New Portfolio Inquiry: ${name} (${projectType})`,
          '_template': 'table'
        })
      })

      const emailResult = await emailRes.json().catch(() => null)
      console.log('Email delivery status:', emailResult)
    } catch (emailErr) {
      console.error('Email dispatch error:', emailErr)
    }

    // 2. WhatsApp Notification via CallMeBot (if API key provided)
    const ownerPhone = process.env.WHATSAPP_PHONE || '8801303482412'
    const apiKey = process.env.CALLMEBOT_API_KEY

    const notificationText = 
`🚀 *New Inquiry from Portfolio Website*
━━━━━━━━━━━━━━━━━━
👤 *Client Name:* ${name}
✉️ *Email:* ${email}
📞 *Phone/WhatsApp:* ${phone || 'N/A'}
📁 *Category:* ${projectType}

📝 *Details:*
${message}
━━━━━━━━━━━━━━━━━━`

    if (apiKey) {
      try {
        const encoded = encodeURIComponent(notificationText)
        const callMeBotUrl = `https://api.callmebot.com/whatsapp.php?phone=${ownerPhone}&text=${encoded}&apikey=${apiKey}`
        await fetch(callMeBotUrl, { method: 'GET' })
      } catch (err) {
        console.error('CallMeBot notification error:', err)
      }
    }

    // 3. Optional Telegram Notification
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN
    const telegramChatId = process.env.TELEGRAM_CHAT_ID
    if (telegramToken && telegramChatId) {
      try {
        const tgUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`
        await fetch(tgUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: notificationText,
            parse_mode: 'Markdown'
          })
        })
      } catch (tgErr) {
        console.error('Telegram notification error:', tgErr)
      }
    }

    return NextResponse.json({ success: true, message: 'Inquiry received successfully' })
  } catch (error) {
    console.error('Contact API Error:', error)
    return NextResponse.json(
      { error: 'Failed to process inquiry' },
      { status: 500 }
    )
  }
}
