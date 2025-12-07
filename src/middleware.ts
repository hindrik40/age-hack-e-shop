import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes that require authentication
const protectedRoutes = [
  '/profile',
  '/dashboard',
  '/orders',
  '/wishlist',
  '/checkout',
  '/account'
];

// Define auth routes that should redirect to dashboard if user is authenticated
const authRoutes = [
  '/auth/login',
  '/auth/register',
  '/auth/reset-password'
];

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || ''
  if (host === 'www.age-hack.se') {
    const url = new URL(request.url)
    url.host = 'age-hack.se'
    url.protocol = 'https:'
    return NextResponse.redirect(url, 308)
  }
  if (host === 'www.beta.age-hack.se') {
    const url = new URL(request.url)
    url.host = 'beta.age-hack.se'
    url.protocol = 'https:'
    return NextResponse.redirect(url, 308)
  }
  const { pathname } = request.nextUrl;
  
  // Get the authentication token from cookies
  const token = request.cookies.get('sb-token');
  const isAuthenticated = !!token;

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );

  // Check if the current route is an auth route
  const isAuthRoute = authRoutes.some(route => 
    pathname.startsWith(route)
  );

  // If accessing a protected route without authentication, redirect to login
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If accessing an auth route while authenticated, redirect to dashboard
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};