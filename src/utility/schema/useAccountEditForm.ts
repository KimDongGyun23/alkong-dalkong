import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import type { AccountEditFormType } from '@/types/mypage'

const schema = z.object({
  name: z.string().min(2, { message: '두 글자 이상입력해주세요.' }),
  phoneNumber: z
    .string()
    .regex(/^01(0|1|[6-9])[0-9]{3,4}[0-9]{4}$/, { message: '핸드폰 번호 형식에 맞지 않습니다.' }),
  birth: z.string().regex(/^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/, {
    message: '생년월일 형식에 맞지 않습니다.',
  }),

  gender: z.enum(['MAN', 'WOMAN'], { message: '성별을 선택해주세요.' }),
})

export const useAccountEditForm = () => {
  const formMethod = useForm<AccountEditFormType>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(schema),
  })

  return formMethod
}
