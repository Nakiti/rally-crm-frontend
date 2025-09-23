import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * The main middleware function. It inspects the request's hostname
 * to route traffic to the correct application "context": either the internal
 * CRM, the main marketing site, or a public-facing tenant site.
 */
export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // 1. --- Define the Root Domain ---
  // This is the main domain of your SaaS application. We extract it from
  // an environment variable for flexibility between local dev and production.
  // Example: `app.causeconnect.com` in production, `app.localhost` for local.
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'app.localhost';

  // 2. --- Handle the Root Domain ---
  // If the user is visiting your main domain, we don't need to do any rewriting.
  // The request will be handled by the files directly in your /app directory,
  // like `/app/page.tsx` for the marketing site or `/app/admin/dashboard` for the CRM.
  if (hostname.startsWith(rootDomain)) {
    return NextResponse.next();
  }

  // 3. --- Handle Subdomains (The Multi-Tenant Logic) ---
  // If the hostname is not the root domain, we assume it's a tenant's subdomain.
  const subdomain = hostname.split('.')[0];
  
  // We internally rewrite the URL to point to our dynamic `/[subdomain]` route.
  // This tells Next.js to render the page from `/app/s/[subdomain]/...`
  // while keeping the clean `subdomain.domain.com` URL in the user's browser.
  const rewriteUrl = new URL(`/s/${subdomain}${url.pathname}`, request.url);
  return NextResponse.rewrite(rewriteUrl);
}

/**
 * The matcher configures which paths the middleware will run on.
 * This is a critical performance optimization to avoid running the middleware
 * on static assets, images, or API routes.
 */
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

