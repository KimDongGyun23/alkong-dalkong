import Image from 'next/image'
import Link from 'next/link'

import { SignInForm } from '@/components/domain'

import Logo from '/public/logo.png'

const SignIn = () => {
  return (
    <main className="flex-column-align h-full bg-mint-4 px-[20px]">
      <div className="flex-column-align title-B mb-[32px] mt-[118px] gap-[12px] text-white">
        <Image src={Logo} alt="logo" />
        알콩달콩
      </div>

      <SignInForm />

      <Link href={'sign-up/account'} className="text-white">
        처음이신가요? 회원가입하기
      </Link>
    </main>
  )
}

export default SignIn
