'use client'
import { useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import SignUpComplete from '/public/sign-up-complete.png'

export const CompleteStep = () => {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/sign-in')
    }, 1500)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex-center min-h-screen w-full bg-mint-4">
      <div className="flex-column-align title-B gap-[12px] whitespace-pre text-center text-white">
        <Image src={SignUpComplete} alt="sign-up-complete" />
        {`회원가입 성공!\n로그인 창으로 넘어갈게요.`}
      </div>
    </div>
  )
}
