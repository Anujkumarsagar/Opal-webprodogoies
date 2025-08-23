import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Only protect specific routes
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/payment(.*)',
  '/api/payment',
]);

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl;
  
  // Skip middleware for auth routes completely
  if (pathname.startsWith('/auth')) {
    return;
  }
  
  // Skip middleware for static files and API routes
  if (pathname.startsWith('/_next') || pathname.startsWith('/api')) {
    return;
  }
  
  // Skip middleware for public routes
  if (pathname === '/' || pathname.startsWith('/public')) {
    return;
  }
  
  if (isProtectedRoute(req)) {
    try {
      await auth.protect();
    } catch (error) {
      // If protection fails, redirect to sign-in
      const signInUrl = new URL('/auth/sign-in', req.url);
      return Response.redirect(signInUrl);
    }
  }
});

export const config = {
  matcher: [
    // Only run middleware on specific routes
    '/dashboard/:path*',
    '/payment/:path*',
    '/api/payment',
  ],
};