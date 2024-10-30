import { NextResponse } from 'next/server'

import { auth } from '@/app/auth'

export async function middleware() {
  const session = await auth()
  if (!session) {
    return NextResponse.redirect('http://localhost:3000/sign-in')
  }
}

export const config = {
  matcher: ['/home', '/clinic', '/health', '/medicine', '/mypage'],
}
