import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/api/payment',
  '/payment(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl;

  // If user hits auth pages and is already signed in, send them to callback, preserving redirect_url
  if (pathname === "/auth/sign-in" || pathname === "/auth/sign-up") {
    const session = await auth();
    if (session?.userId) {
      const callbackUrl = new URL("/auth/callback", req.url);
      // preserve redirect_url if present
      const current = new URL(req.url);
      const redirectParam = current.searchParams.get("redirect_url");
      if (redirectParam) {
        callbackUrl.searchParams.set("redirect_url", redirectParam);
      }
      return NextResponse.redirect(callbackUrl);
    }
  }
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
})



export const config = {
  matcher:[
    '/dashboard/:path*',
    '/payment/:path*',
    '/api/payment',
    '/auth/:path*',
    '/(api|trpc)(.*)'
  ]
}