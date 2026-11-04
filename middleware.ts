import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Known automated vulnerability scanners & exploit bots
const MALICIOUS_USER_AGENTS = [
  'sqlmap',
  'nikto',
  'wpscan',
  'dirbuster',
  'nmap',
  'masscan',
  'havij',
  'acunetix',
  'nessus',
  'openvas',
  'zgrab',
  'censys',
  'shodan',
]

// Common hacker probe, backdoor, and file traversal patterns
const HACKER_PROBE_PATTERNS = [
  /\.env($|\/)/i,
  /\.git($|\/)/i,
  /\.aws($|\/)/i,
  /\.ssh($|\/)/i,
  /wp-(admin|login|config|includes|content)/i,
  /xmlrpc\.php/i,
  /phpmyadmin/i,
  /eval-stdin\.php/i,
  /shell\.php/i,
  /cgi-bin/i,
  /\.bak$/i,
  /\.sql$/i,
  /\.tar(\.gz)?$/i,
  /\.zip$/i,
  /\.vscode/i,
  /\.idea/i,
  /\.\./, // Directory traversal
  /%2e%2e/i, // URL-encoded traversal
  /%252e%252e/i,
]

// Sliding-window in-memory rate limiter
interface RateLimitBucket {
  count: number
  resetAt: number
}

const rateLimitMap = new Map<string, RateLimitBucket>()

// Periodic cleanup every 5 minutes to prevent memory leak
setInterval(() => {
  const now = Date.now()
  rateLimitMap.forEach((bucket, key) => {
    if (now > bucket.resetAt) {
      rateLimitMap.delete(key)
    }
  })
}, 5 * 60 * 1000)

function isRateLimited(ip: string, route: string, maxRequests: number, windowMs: number): boolean {
  const key = `${ip}:${route}`
  const now = Date.now()
  const bucket = rateLimitMap.get(key)

  if (!bucket || now > bucket.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs })
    return false
  }

  bucket.count++
  return bucket.count > maxRequests
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  const realIp = request.headers.get('x-real-ip')
  if (realIp) {
    return realIp.trim()
  }
  return '127.0.0.1'
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const userAgent = (request.headers.get('user-agent') || '').toLowerCase()
  const clientIp = getClientIp(request)

  // 1. WAF Check: Block Known Vulnerability Scanner Tools
  for (const agent of MALICIOUS_USER_AGENTS) {
    if (userAgent.includes(agent)) {
      return new NextResponse(
        JSON.stringify({
          error: 'Access Denied: Malicious user agent signature detected.',
          status: 403,
        }),
        {
          status: 403,
          headers: {
            'Content-Type': 'application/json',
            'X-WAF-Block': 'Automated-Scanner-Detected',
          },
        }
      )
    }
  }

  // 2. WAF Check: Block Exploit Probes & Directory Traversal Attempts
  for (const pattern of HACKER_PROBE_PATTERNS) {
    if (pattern.test(pathname)) {
      return new NextResponse(
        JSON.stringify({
          error: 'Access Denied: Security policy violation.',
          status: 403,
        }),
        {
          status: 403,
          headers: {
            'Content-Type': 'application/json',
            'X-WAF-Block': 'Hacker-Probe-Blocked',
          },
        }
      )
    }
  }

  // 3. API Rate Limiting (Prevent Brute Force, DoS, and Message Flooding)
  if (pathname.startsWith('/api/')) {
    // Contact Form: Max 5 submissions per minute per IP
    if (pathname === '/api/contact' && request.method === 'POST') {
      if (isRateLimited(clientIp, 'api_contact', 5, 60 * 1000)) {
        return new NextResponse(
          JSON.stringify({
            error: 'Too many requests. Please wait a moment before sending another message.',
          }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': '60',
            },
          }
        )
      }
    }

    // Payment Notification: Max 5 attempts per minute per IP
    if (pathname === '/api/pay' && request.method === 'POST') {
      if (isRateLimited(clientIp, 'api_pay', 5, 60 * 1000)) {
        return new NextResponse(
          JSON.stringify({
            error: 'Too many payment verification attempts. Please wait 60 seconds.',
          }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': '60',
            },
          }
        )
      }
    }

    // Play Store Query: Max 20 requests per minute per IP
    if (pathname === '/api/playstore') {
      if (isRateLimited(clientIp, 'api_playstore', 20, 60 * 1000)) {
        return new NextResponse(
          JSON.stringify({ error: 'Rate limit exceeded.' }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': '30',
            },
          }
        )
      }
    }

    // General API rate limit: Max 60 requests per minute per IP
    if (isRateLimited(clientIp, 'api_general', 60, 60 * 1000)) {
      return new NextResponse(
        JSON.stringify({ error: 'High traffic detected. Please slow down.' }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': '30',
          },
        }
      )
    }
  }

  // 4. Handle Subdomain Routing (e.g. pay.mominul.dev)
  const hostname = request.headers.get('host') || ''
  if (hostname.startsWith('pay.')) {
    const url = request.nextUrl.clone()
    if (url.pathname === '/') {
      url.pathname = '/pay'
      const response = NextResponse.rewrite(url)
      applySecurityHeaders(response)
      return response
    }
  }

  const response = NextResponse.next()
  applySecurityHeaders(response)
  return response
}

function applySecurityHeaders(res: NextResponse) {
  // Hardened Anti-Clickjacking, MIME Sniffing & Privacy Headers
  res.headers.set('X-Frame-Options', 'DENY')
  res.headers.set('X-Content-Type-Options', 'nosniff')
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.headers.set('X-XSS-Protection', '1; mode=block')
  res.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), browsing-topics=()')
  res.headers.set('X-Permitted-Cross-Domain-Policies', 'none')
}

export const config = {
  // Match all request paths except static files & images
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images).*)'],
}
