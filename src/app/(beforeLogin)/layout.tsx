import type { PropsWithChildren } from 'react'
import { redirect } from 'next/navigation'

import { auth } from '../auth'

export default async function Layout({ children }: PropsWithChildren) {
  const session = await auth()
  if (session?.user) {
    redirect(`/home/${session?.user.userId}`)
    return null
  }

  return <>{children}</>
}
