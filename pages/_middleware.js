import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req, res) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET })

  const { pathname } = req.nextUrl

  if (pathname.includes('/api/auth') || token) return NextResponse.next()
  if (pathname !== '/login' && !token)
    return NextResponse.redirect('http://localhost:3000/login')
}
