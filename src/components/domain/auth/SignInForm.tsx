'use client'
import { useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { getSession, signIn } from 'next-auth/react'

import { useLoginForm } from '@/business/hooks'
import { Button, InputGroup } from '@/components/view'
import { api } from '@/store/queries/apis'
import type { LoginFormType } from '@/types'
import { setUserDataToLocalStorage } from '@/utility/utils'

export const SignInForm = () => {
  const formMethod = useLoginForm()
  const { handleSubmit } = formMethod
  const router = useRouter()
  const [message, setMessage] = useState('')
  // const { data: session } = useSession()

  const handleSignInFormSubmit = async (formData: LoginFormType) => {
    try {
      const response = await signIn('credentials', {
        username: formData.id,
        password: formData.password,
        redirect: false,
      })

      if (response?.error) {
        setMessage('* 아이디와 비밀번호가 일치하지 않습니다.')
      } else {
        const session = await getSession()
        if (session) {
          console.log('ssssss', session?.user.userId)
          setUserDataToLocalStorage({
            currentId: session?.user.userId,
            familyCode: session?.user.familyCode,
            currentUsername: session?.user.name,
            loginUsername: session?.user.name,
          })

          api.setAccessToken(session?.user.accessToken)
          router.replace(`/home/${session?.user.userId}`)
        }
      }
    } catch (err) {
      console.error('error', err)
      setMessage('* 아이디와 비밀번호가 일치하지 않습니다.')
    }
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

        {message && <p className="caption-M mx-[8px] h-[18px] self-start text-red">{message}</p>}
        <Button type="submit">로그인</Button>
      </form>
    </FormProvider>
  )
}
