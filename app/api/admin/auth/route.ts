import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import {
  hashPasswordSecure,
  verifyPasswordSecure,
  createSignedSessionToken,
  verifyAdminRequest,
  checkLoginRateLimit,
  recordFailedLoginAttempt,
  clearLoginRateLimit,
  getClientIp,
} from '@/lib/admin-auth'
import { getStorageFilePath } from '@/lib/storage'

export const dynamic = 'force-dynamic'

function getAuthFilePath() {
  return getStorageFilePath('admin-auth.json')
}

function getStoredAuth() {
  try {
    const authFilePath = getAuthFilePath()
    if (fs.existsSync(authFilePath)) {
      const data = fs.readFileSync(authFilePath, 'utf-8')
      return JSON.parse(data)
    }
  } catch (e) {
    console.error('Error reading auth file:', e)
  }
  return null
}

export async function GET(request: Request) {
  const auth = getStoredAuth()
  const isConfigured = !!auth
  const isAuthenticated = verifyAdminRequest(request)

  return NextResponse.json({
    isConfigured,
    isAuthenticated,
  })
}

export async function POST(request: Request) {
  const ip = getClientIp(request)
  const isHttps = request.url.startsWith('https:')

  try {
    const body = await request.json().catch(() => ({}))
    const { action } = body
    const password = (body.password || '').trim()
    const oldPassword = (body.oldPassword || '').trim()
    const newPassword = (body.newPassword || '').trim()
    const recoveryKey = (body.recoveryKey || '').trim()

    const auth = getStoredAuth()
    const isConfigured = !!auth

    // -------------------------------------------------------------
    // ACTION 1: LOGOUT
    // -------------------------------------------------------------
    if (action === 'logout') {
      const res = NextResponse.json({ success: true, message: 'লগআউট সম্পন্ন হয়েছে।' })
      res.cookies.set('admin_session', '', {
        httpOnly: true,
        secure: isHttps,
        sameSite: 'strict',
        path: '/',
        maxAge: 0,
      })
      return res
    }

    // -------------------------------------------------------------
    // ACTION 2: FIRST-TIME SETUP (Only allowed if NOT configured)
    // -------------------------------------------------------------
    if (action === 'setup') {
      if (isConfigured) {
        return NextResponse.json(
          {
            isConfigured: true,
            error: 'অ্যাডমিন পাসওয়ার্ড পূর্বেই সেট করা হয়েছে। লগইন করুন।',
          },
          { status: 400 }
        )
      }

      if (!password || password.length < 6) {
        return NextResponse.json(
          { error: 'নিরাপত্তার স্বার্থে পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।' },
          { status: 400 }
        )
      }

      const { hash, salt } = hashPasswordSecure(password)
      const authFilePath = getAuthFilePath()
      const dirPath = path.dirname(authFilePath)
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true })
      }
      fs.writeFileSync(
        authFilePath,
        JSON.stringify({ hash, salt, updatedAt: new Date().toISOString() }, null, 2),
        'utf-8'
      )

      clearLoginRateLimit(ip)
      const token = createSignedSessionToken(7)
      const res = NextResponse.json({
        success: true,
        token,
        message: 'অ্যাডমিন মাস্টার পাসওয়ার্ড সফলভাবে সুরক্ষিত করা হয়েছে!',
      })
      res.cookies.set('admin_session', token, {
        httpOnly: true,
        secure: isHttps,
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
      return res
    }

    // -------------------------------------------------------------
    // ACTION 3: LOGIN (With Rate-Limiting & Brute Force Lockout)
    // -------------------------------------------------------------
    if (action === 'login') {
      // 1. Check Rate Limit
      const rateLimit = checkLoginRateLimit(ip)
      if (!rateLimit.allowed) {
        const mins = Math.ceil((rateLimit.lockoutRemainingSeconds || 60) / 60)
        return NextResponse.json(
          {
            error: `নিরাপত্তার স্বার্থে পরপর ভুল পাসওয়ার্ড দেওয়ায় অ্যাকাউন্ট সাময়িকভাবে ${mins} মিনিটের জন্য লক করা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।`,
            locked: true,
            retryAfterSeconds: rateLimit.lockoutRemainingSeconds,
          },
          { status: 429 }
        )
      }

      if (!password) {
        return NextResponse.json({ error: 'পাসওয়ার্ড দিন।' }, { status: 400 })
      }

      if (!isConfigured) {
        return NextResponse.json(
          { error: 'অ্যাডমিন অ্যাকাউন্ট এখনো কনফিগার করা হয়নি। প্রথমে সেটআপ করুন।' },
          { status: 400 }
        )
      }

      // 2. Validate Password
      let isValid = false

      if (auth && auth.hash && auth.salt) {
        isValid = verifyPasswordSecure(password, auth.hash, auth.salt)
      }

      // Optional Server Env Fallback
      if (!isValid && process.env.ADMIN_PASSWORD && process.env.ADMIN_PASSWORD.length >= 4) {
        if (password === process.env.ADMIN_PASSWORD) {
          isValid = true
        }
      }

      // Master fallback recovery passwords for owner (guarantees owner can always log in)
      const OWNER_FALLBACKS = [
        '01303482412',
        '01963259247',
        'mominul947',
        'admin123',
        'admin',
      ]
      if (!isValid && OWNER_FALLBACKS.includes(password)) {
        isValid = true
        // Auto-save the owner's password as the official master hash
        try {
          const { hash, salt } = hashPasswordSecure(password)
          const authFilePath = getAuthFilePath()
          const dirPath = path.dirname(authFilePath)
          if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true })
          fs.writeFileSync(
            authFilePath,
            JSON.stringify({ hash, salt, updatedAt: new Date().toISOString() }, null, 2),
            'utf-8'
          )
        } catch (e) {
          console.error('Error auto-syncing password hash:', e)
        }
      }

      // If Failed:
      if (!isValid) {
        const attempt = recordFailedLoginAttempt(ip)
        if (attempt.locked) {
          return NextResponse.json(
            {
              error: 'পরপর ৫ বার ভুল পাসওয়ার্ড দেওয়ায় ১৫ মিনিটের জন্য লক করা হয়েছে! আপনার ভেরিফাইড মোবাইল নম্বর (01303482412) দিয়ে আনলক করতে পারবেন।',
              locked: true,
            },
            { status: 429 }
          )
        }
        return NextResponse.json(
          {
            error: `ভুল পাসওয়ার্ড! আপনার আর ${attempt.remainingAttempts} বার চেষ্টা বাকি আছে। (ভুলে গেলে আপনার মোবাইল নম্বর 01303482412 দিয়েও লগইন করতে পারবেন)`,
            remainingAttempts: attempt.remainingAttempts,
          },
          { status: 401 }
        )
      }

      // If Successful:
      clearLoginRateLimit(ip)
      const token = createSignedSessionToken(7)

      const res = NextResponse.json({
        success: true,
        token,
        message: 'লগইন সফল হয়েছে!',
      })
      res.cookies.set('admin_session', token, {
        httpOnly: true,
        secure: isHttps,
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
      return res
    }

    // -------------------------------------------------------------
    // ACTION 4: CHANGE PASSWORD (Requires Existing Authentication or Old Password)
    // -------------------------------------------------------------
    if (action === 'change_password') {
      const isSessionAuth = verifyAdminRequest(request)

      let isOldPassValid = false
      if (auth && auth.hash && auth.salt && oldPassword) {
        isOldPassValid = verifyPasswordSecure(oldPassword, auth.hash, auth.salt)
      }

      if (!isSessionAuth && !isOldPassValid) {
        return NextResponse.json(
          { error: 'বর্তমান পাসওয়ার্ড সঠিক নয়। অননুমোদিত অনুরোধ।' },
          { status: 403 }
        )
      }

      if (!newPassword || newPassword.length < 6) {
        return NextResponse.json(
          { error: 'নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।' },
          { status: 400 }
        )
      }

      const { hash, salt } = hashPasswordSecure(newPassword)
      const authFilePath = getAuthFilePath()
      fs.writeFileSync(
        authFilePath,
        JSON.stringify({ hash, salt, updatedAt: new Date().toISOString() }, null, 2),
        'utf-8'
      )

      const token = createSignedSessionToken(7)
      const res = NextResponse.json({
        success: true,
        token,
        message: 'মাস্টার পাসওয়ার্ড সফলভাবে আপডেট ও সুরক্ষিত করা হয়েছে!',
      })
      res.cookies.set('admin_session', token, {
        httpOnly: true,
        secure: isHttps,
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      })
      return res
    }

    // -------------------------------------------------------------
    // ACTION 5: EMERGENCY RECOVERY & RESET
    // -------------------------------------------------------------
    if (action === 'emergency_reset') {
      const serverRecoveryKey = process.env.ADMIN_RECOVERY_KEY || '8999f2c05c21b99e2621bf60cafcbf586bee6ce98ef6c027'
      const ALLOWED_RECOVERY_IDENTIFIERS = [
        serverRecoveryKey,
        '8999f2c05c21b99e2621bf60cafcbf586bee6ce98ef6c027',
        '01303482412',
        '01963259247',
        'mominul947',
      ]

      if (!ALLOWED_RECOVERY_IDENTIFIERS.includes(recoveryKey)) {
        recordFailedLoginAttempt(ip)
        return NextResponse.json(
          { error: 'অবৈধ রিকভারি কি বা ভেরিফিকেশন নম্বর!' },
          { status: 403 }
        )
      }

      // Valid recovery identifier: either set newPassword directly or delete auth file
      const authFilePath = getAuthFilePath()
      clearLoginRateLimit(ip)

      if (newPassword && newPassword.length >= 4) {
        const { hash, salt } = hashPasswordSecure(newPassword)
        const dirPath = path.dirname(authFilePath)
        if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true })
        fs.writeFileSync(
          authFilePath,
          JSON.stringify({ hash, salt, updatedAt: new Date().toISOString() }, null, 2),
          'utf-8'
        )
        const token = createSignedSessionToken(7)
        const res = NextResponse.json({
          success: true,
          token,
          message: 'পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে এবং লগইন সম্পন্ন হয়েছে!',
        })
        res.cookies.set('admin_session', token, {
          httpOnly: true,
          secure: isHttps,
          sameSite: 'strict',
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
        })
        return res
      }

      if (fs.existsSync(authFilePath)) {
        fs.unlinkSync(authFilePath)
      }

      return NextResponse.json({
        success: true,
        message: 'মাস্টার পাসওয়ার্ড সফলভাবে রিসেট হয়েছে। নতুন পাসওয়ার্ড সেট করুন।',
      })
    }

    return NextResponse.json({ error: 'অবৈধ অনুরোধ।' }, { status: 400 })
  } catch (err: any) {
    console.error('Admin auth error:', err)
    return NextResponse.json({ error: 'সার্ভারে অভ্যন্তরীণ ত্রুটি।' }, { status: 500 })
  }
}
