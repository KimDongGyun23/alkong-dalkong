import type { PropsWithChildren } from 'react'

import { SignUpFormProvider } from '@/components/domain/auth/SignUpFormProvider'

const SignUpLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="flex-column min-h-screen">
      <SignUpFormProvider>{children}</SignUpFormProvider>
    </main>
  )
}

export default SignUpLayout
