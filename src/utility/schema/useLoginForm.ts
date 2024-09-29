import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import type { LoginFormType } from '@/types'

const schema = z.object({
  id: z.string().min(1, { message: '아이디를 입력해주세요.' }),
  password: z.string().min(1, { message: '비밀번호를 입력해주세요.' }),
})

export const useLoginForm = () => {
  const formMethod = useForm<LoginFormType>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(schema),
  })

  return formMethod
}
