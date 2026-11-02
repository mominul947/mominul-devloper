import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''

  // If request is made to pay subdomain (e.g. pay.mominul.dev or pay.localhost)
  if (hostname.startsWith('pay.')) {
    const url = request.nextUrl.clone()
    if (url.pathname === '/') {
      url.pathname = '/pay'
      return NextResponse.rewrite(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],
}

