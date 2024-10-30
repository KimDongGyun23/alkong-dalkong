import { NextResponse } from 'next/server'

import { auth } from '@/app/auth'

export async function middleware() {
  const rediretUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/sign-in'
      : 'alkong-dalkong-mwi8tqy6g-kimdonggyuns-projects.vercel.app'

  const session = await auth()
  if (!session) {
    return NextResponse.redirect(rediretUrl)
  }
}

export const config = {
  matcher: ['/home/:path*', '/clinic/:path*', '/health/:path*', '/medicine/:path*', '/mypage'],
}
