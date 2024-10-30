'use client'
import type { PropsWithChildren } from 'react'
import { SessionProvider } from 'next-auth/react'

export const AuthSessionProvider = ({ children }: PropsWithChildren) => {
  return <SessionProvider>{children}</SessionProvider>
}
