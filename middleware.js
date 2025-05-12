// import { NextResponse } from 'next/server'
 

// export function middleware(request) {
//      const path = request.nextUrl.pathname

//      const isPublicPath = path === '/login' 

// const token = request.cookies.get("token")?.value || '';
// if(isPublicPath && token){
//     return NextResponse.redirect(new URL('/dashboard', request.url))
// }

// if(!isPublicPath && !token){
//     return NextResponse.redirect(new URL('/login', request.url))
// }

// }
 

// export const config = {
//   matcher: [
//     '/login',
//     '/dashboard'
//   ],
// }