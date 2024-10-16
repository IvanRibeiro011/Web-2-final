import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (request.nextUrl.pathname === "/login") {
    const response = NextResponse.next(); 
    response.cookies.delete('token'); 
    return response; 
  }

  if (!token && request.nextUrl.pathname !== "/login" && !request.nextUrl.pathname.startsWith('/register')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next(); 
}

export const config = {
  matcher: [
    '/',                    
    '/cadastrar-contato',   
    '/outra-rota',        
    '/login',         
  ],
};
