import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
     const path = request.nextUrl.pathname

     const isPublicPath = path === '/login' 

const token = request.cookies.get("authToken")?.value || '';
if(isPublicPath && token){
    return NextResponse.redirect(new URL('/dashboard', request.url))
}

if(!isPublicPath && !token){
    return NextResponse.redirect(new URL('/login', request.url))
}

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/login',
    '/dashboard'
  ],
}