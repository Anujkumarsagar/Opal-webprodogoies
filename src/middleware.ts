import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/payment(.*)',
  '/api/payment',
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/dashboard(.*)',
    '/payment(.*)',
    '/api/payment',
    '/auth/callback(.*)', // ADD THIS LINE
    // Optional: protect all API routes
    // '/api/(.*)',
  ],
};
