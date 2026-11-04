/**
 * Enterprise Web Application Security & Sanitization Utilities
 */

// Escape all dangerous HTML entities to prevent Stored & Reflected XSS
export function escapeHtml(str: string = ''): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

// Strict email RFC-5322 validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false
  if (email.length > 120) return false
  return EMAIL_REGEX.test(email.trim())
}

// Phone number validation (BD and international formats: 8 to 20 digits, spaces, plus, hyphens)
export function isValidPhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') return false
  const cleaned = phone.replace(/[\s\-\(\)]/g, '')
  return /^\+?[0-9]{8,18}$/.test(cleaned)
}

// Transaction ID validation (bKash, Nagad, Rocket, Bank transfer TrxIDs are uppercase alphanumeric: 6-25 chars)
export function isValidTrxId(trxId: string): boolean {
  if (!trxId || typeof trxId !== 'string') return false
  const cleaned = trxId.trim()
  return /^[a-zA-Z0-9]{6,25}$/.test(cleaned)
}

// Sanitize string with hard length limit and removal of control characters
export function sanitizeText(str: string = '', maxLength = 1000): string {
  if (typeof str !== 'string') return ''
  // Strip null bytes and non-printable control characters (except newline, tab, carriage return)
  const stripped = str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
  return stripped.trim().slice(0, maxLength)
}

// Android package name validation (prevent SSRF and query injection in Play Store lookup)
export function isValidPackageName(pkg: string): boolean {
  if (!pkg || typeof pkg !== 'string' || pkg.length > 100) return false
  return /^[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)+$/.test(pkg.trim())
}

