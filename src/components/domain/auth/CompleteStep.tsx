'use client'
import Image from 'next/image'
import Link from 'next/link'

import SignUpComplete from '@/assets/sign-up-complete.png'

export const CompleteStep = () => {
  return (
    <Link href="/sign-in" replace className="flex-center min-h-screen w-full bg-mint-4">
      <div className="flex-column-align title-B gap-[12px] whitespace-pre text-center text-white">
        <Image src={SignUpComplete} alt="sign-up-complete" />
        {`회원가입 성공!\n로그인 창으로 넘어갈게요.`}
      </div>
    </Link>
  )
}
