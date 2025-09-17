import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const CRM_HOST = process.env.NEXT_PUBLIC_CRM_HOST || 'app.localhost:3000';

/**
 * The main middleware function. It acts as a router before Next.js routing.
 */
export function middleware(request: NextRequest) {
  // Get the URL and the hostname from the incoming request.
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';

  // Get the path from the URL (e.g., '/campaigns/123').
  const path = url.pathname;

  // --- The Core Logic ---
  // If the hostname matches our main CRM host, we don't need to do anything.
  if (hostname === CRM_HOST) {
    return NextResponse.next();
  }

  // --- Multi-Tenant Logic ---
  url.pathname = `/public${path}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};