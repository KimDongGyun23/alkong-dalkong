'use client'
import { type PropsWithChildren } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { FormProvider } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { createStore, StateMachineProvider } from 'little-state-machine'

import { DevTool } from '@/components'
import { useSignupForm } from '@/schema'
import { useSignUp } from '@/store/queries/useAuth'
import type { SignupFormType } from '@/types'

export const SignUpFormProvider = ({ children }: PropsWithChildren) => {
  const formMethod = useSignupForm()
  const { handleSubmit, control } = formMethod

  const router = useRouter()

  const { mutate: signUp } = useSignUp({
    onSuccess: () => {
      router.replace(`/sign-up/complete`)
    },
    onError: (error) => {
      console.log(error.message)
    },
  })

  const signUpHandler: SubmitHandler<SignupFormType> = (formData) => {
    const signUpData = {
      ...formData,
      birth: formData.birth.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3'),
      agree: formData.personal, // 추후 API 명세 변경 시 수정 필요
    }
    signUp({ ...signUpData })
  }

  createStore({
    signUp: {},
  })

  return (
    <StateMachineProvider>
      <FormProvider {...formMethod}>
        <form onSubmit={handleSubmit(signUpHandler)}>{children}</form>
      </FormProvider>
      <DevTool control={control} />
    </StateMachineProvider>
  )
}
