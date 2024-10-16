'use client'
import { FormProvider } from 'react-hook-form'

import { useLoginForm } from '@/business/hooks'
import { Button, InputGroup } from '@/components/view'
import { useSignIn } from '@/store/queries'
import type { LoginFormType } from '@/types'

export const SignInForm = () => {
  const formMethod = useLoginForm()
  const { handleSubmit } = formMethod

  const { mutate: signIn } = useSignIn()

  const handleSignInFormSubmit = (formData: LoginFormType) => {
    signIn(formData)
  }

  return (
    <FormProvider {...formMethod}>
      <form
        onSubmit={handleSubmit(handleSignInFormSubmit)}
        className="flex-column-align mb-[24px] w-full gap-[24px]"
      >
        <section className="flex-column-align w-full gap-[16px]">
          <InputGroup.Input section="id" placeholder="아이디" />
          <InputGroup.Input section="password" placeholder="비밀번호" type="password" />
        </section>

        <Button type="submit">로그인</Button>
      </form>
    </FormProvider>
  )
}
