'use client'
import type { SubmitHandler } from 'react-hook-form'
import { FormProvider } from 'react-hook-form'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import Logo from '@/assets/logo.png'
import { Button, InputGroup } from '@/components/view'
import { useSignIn } from '@/store/queries/useAuth'
import { useUserStore } from '@/store/stores'
import type { LoginFormType } from '@/types'
import { useLoginForm } from '@/utility/schema'

export const SignInStep = () => {
  const formMethod = useLoginForm()
  const { handleSubmit } = formMethod

  const { user, setUser } = useUserStore()

  const { mutate: signIn } = useSignIn({
    onSuccess: (userInfo) => {
      setUser({ ...userInfo })
      router.replace(`/home/${user.userId}`)
    },
    onError: (error) => {
      console.log(error.message)
    },
  })

  const router = useRouter()
  const handleSignUp = () => {
    router.push('sign-up/account')
  }

  const signInHandler: SubmitHandler<LoginFormType> = (formData) => {
    signIn(formData)
  }

  return (
    <>
      <div className="flex-column-align title-B mb-[32px] mt-[118px] gap-[12px] text-white">
        <Image src={Logo} alt="logo" />
        알콩달콩
      </div>
      <FormProvider {...formMethod}>
        <form
          onSubmit={handleSubmit(signInHandler)}
          className="flex-column-align mb-[24px] w-full gap-[24px]"
        >
          <section className="flex-column-align w-full gap-[16px]">
            <InputGroup.Input section="id" placeholder="아이디" />
            <InputGroup.Input section="password" placeholder="비밀번호" type="password" />
          </section>
          <Button type="submit">로그인</Button>
        </form>
      </FormProvider>
      <button type="button" className="text-white" onClick={handleSignUp}>
        처음이신가요? 회원가입하기
      </button>
    </>
  )
}
