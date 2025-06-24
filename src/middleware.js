import { NextResponse } from 'next/server'
import { isTokenExpired } from './lib/auth';
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
     const path = request.nextUrl.pathname

     const isPublicPath = path === '/login' 

const token = request.cookies.get("authToken")?.value || '';
const hasValidToken = token && !isTokenExpired(token)

if(isPublicPath && hasValidToken){
    return NextResponse.redirect(new URL('/dashboard', request.url))
}

if(!isPublicPath && !hasValidToken){
     const response = NextResponse.redirect(new URL("/login", request.url))

     if (token) {
      response.cookies.set("authToken", "", {
        expires: new Date(0),
        path: "/",
      })
    }


     return response
}

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/login',
    '/dashboard'
  ],
}