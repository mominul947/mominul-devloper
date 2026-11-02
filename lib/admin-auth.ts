import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import { getStorageFilePath } from '@/lib/storage'

// 1. Server Secret Management
function getServerSecret(): string {
  if (process.env.ADMIN_SECRET_KEY && process.env.ADMIN_SECRET_KEY.length >= 32) {
    return process.env.ADMIN_SECRET_KEY
  }

  const secretFilePath = getStorageFilePath('.server-secret')

  try {
    if (fs.existsSync(secretFilePath)) {
      const secret = fs.readFileSync(secretFilePath, 'utf-8').trim()
      if (secret.length >= 32) return secret
    }
  } catch (e) {
    // continue to create
  }

  const newSecret = crypto.randomBytes(48).toString('hex')
  try {
    const dir = path.dirname(secretFilePath)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(secretFilePath, newSecret, { encoding: 'utf-8', mode: 0o600 })
  } catch (e) {
    console.error('Error saving server secret:', e)
  }
  return newSecret
}

// 2. PBKDF2 Password Hashing (Industry Standard for Authentication)
export function hashPasswordSecure(password: string, salt?: string): { hash: string; salt: string } {
  const actualSalt = salt || crypto.randomBytes(32).toString('hex')
  const iterations = 100000
  const keylen = 64
  const digest = 'sha512'

  const hashBuffer = crypto.pbkdf2Sync(password, actualSalt, iterations, keylen, digest)
  return {
    hash: hashBuffer.toString('hex'),
    salt: actualSalt,
  }
}

export function verifyPasswordSecure(password: string, storedHash: string, salt: string): boolean {
  try {
    // 1. Try PBKDF2 (new secure standard)
    const iterations = 100000
    const keylen = 64
    const digest = 'sha512'
    const computedBuffer = crypto.pbkdf2Sync(password, salt, iterations, keylen, digest)
    const storedBuffer = Buffer.from(storedHash, 'hex')

    if (computedBuffer.length === storedBuffer.length && crypto.timingSafeEqual(computedBuffer, storedBuffer)) {
      return true
    }

    // 2. Backward compatibility for legacy sha256 hash (upgrade path)
    const legacyHash = crypto.createHash('sha256').update(password + salt).digest('hex')
    const legacyComputedBuffer = Buffer.from(legacyHash, 'hex')
    if (legacyComputedBuffer.length === storedBuffer.length && crypto.timingSafeEqual(legacyComputedBuffer, storedBuffer)) {
      return true
    }
  } catch (e) {
    console.error('Password verification error:', e)
  }
  return false
}

// 3. Cryptographically Signed Session Tokens (HMAC-SHA256)
interface SessionPayload {
  role: 'admin'
  iat: number
  exp: number
  nonce: string
}

export function createSignedSessionToken(daysValid = 7): string {
  const secret = getServerSecret()
  const now = Math.floor(Date.now() / 1000)
  const exp = now + daysValid * 24 * 60 * 60

  const payload: SessionPayload = {
    role: 'admin',
    iat: now,
    exp,
    nonce: crypto.randomBytes(16).toString('hex'),
  }

  const payloadStr = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const signature = crypto.createHmac('sha256', secret).update(payloadStr).digest('base64url')

  return `${payloadStr}.${signature}`
}

export function verifySignedSessionToken(token: string): boolean {
  if (!token || typeof token !== 'string') return false
  const parts = token.split('.')
  if (parts.length !== 2) return false

  const [payloadStr, signature] = parts
  const secret = getServerSecret()

  try {
    const expectedSig = crypto.createHmac('sha256', secret).update(payloadStr).digest('base64url')
    const sigBuffer = Buffer.from(signature)
    const expectedBuffer = Buffer.from(expectedSig)

    if (sigBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(sigBuffer, expectedBuffer)) {
      return false
    }

    const json = Buffer.from(payloadStr, 'base64url').toString('utf-8')
    const payload: SessionPayload = JSON.parse(json)

    if (payload.role !== 'admin') return false

    const now = Math.floor(Date.now() / 1000)
    if (now > payload.exp) {
      return false // expired
    }

    return true
  } catch (e) {
    return false
  }
}

// 4. Extract and Validate Admin Request
export function verifyAdminRequest(request: Request): boolean {
  // Check Authorization Bearer header
  const authHeader = request.headers.get('authorization')
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7).trim()
    if (verifySignedSessionToken(token)) return true
  }

  // Check Cookies for admin_session
  const cookieHeader = request.headers.get('cookie') || ''
  const cookies = parseCookies(cookieHeader)
  const sessionToken = cookies['admin_session']
  if (sessionToken && verifySignedSessionToken(sessionToken)) {
    return true
  }

  return false
}

function parseCookies(cookieHeader: string): Record<string, string> {
  const map: Record<string, string> = {}
  if (!cookieHeader) return map
  const pairs = cookieHeader.split(';')
  for (const pair of pairs) {
    const idx = pair.indexOf('=')
    if (idx > 0) {
      const key = pair.slice(0, idx).trim()
      const val = pair.slice(idx + 1).trim()
      map[key] = decodeURIComponent(val)
    }
  }
  return map
}

// 5. Rate Limiter & Brute-Force Lockout Protection
interface RateLimitRecord {
  attempts: number
  firstAttempt: number
  lockedUntil: number
}

const rateLimitStore = new Map<string, RateLimitRecord>()

export function checkLoginRateLimit(ip: string): {
  allowed: boolean
  remainingAttempts: number
  lockoutRemainingSeconds?: number
} {
  const now = Date.now()
  const record = rateLimitStore.get(ip)

  if (!record) {
    return { allowed: true, remainingAttempts: 5 }
  }

  // Check if actively locked
  if (record.lockedUntil > now) {
    const lockoutRemainingSeconds = Math.ceil((record.lockedUntil - now) / 1000)
    return {
      allowed: false,
      remainingAttempts: 0,
      lockoutRemainingSeconds,
    }
  }

  // If lockout or window has expired (15 minutes), reset
  if (now - record.firstAttempt > 15 * 60 * 1000) {
    rateLimitStore.delete(ip)
    return { allowed: true, remainingAttempts: 5 }
  }

  return {
    allowed: record.attempts < 5,
    remainingAttempts: Math.max(0, 5 - record.attempts),
  }
}

export function recordFailedLoginAttempt(ip: string): {
  locked: boolean
  remainingAttempts: number
  lockoutSeconds?: number
} {
  const now = Date.now()
  const record = rateLimitStore.get(ip) || {
    attempts: 0,
    firstAttempt: now,
    lockedUntil: 0,
  }

  record.attempts += 1

  if (record.attempts >= 5) {
    // Lock out for 15 minutes
    record.lockedUntil = now + 15 * 60 * 1000
    rateLimitStore.set(ip, record)
    return {
      locked: true,
      remainingAttempts: 0,
      lockoutSeconds: 15 * 60,
    }
  }

  rateLimitStore.set(ip, record)
  return {
    locked: false,
    remainingAttempts: 5 - record.attempts,
  }
}

export function clearLoginRateLimit(ip: string) {
  rateLimitStore.delete(ip)
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  const realIp = request.headers.get('x-real-ip')
  if (realIp) return realIp.trim()
  return '127.0.0.1'
}

