import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

  // If the user is logged in and trying to access signin or signup, redirect to home
  if (token && (request.nextUrl.pathname === '/signin' || request.nextUrl.pathname === '/signup')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // If the user is not logged in and trying to access protected routes, redirect to signin
  if (!token && (request.nextUrl.pathname.startsWith('/create') || request.nextUrl.pathname.match(/^\/post\/.*\/edit$/))) {
    const url = new URL('/signin', request.url)
    url.searchParams.set('callbackUrl', encodeURI(request.url))
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/signin', '/signup', '/create', '/post/:path*/edit'],
}

