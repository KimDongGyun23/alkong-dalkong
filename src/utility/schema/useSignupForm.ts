import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import type { SignupFormType } from '@/types'

const accountSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: '비밀번호는 8글자 이상입니다.' })
      .max(16, { message: '비밀번호는 16글자 이하입니다.' })
      .regex(/^(?=.*[a-zA-Z])(?=.*\d).+$/, {
        message: '영문자와 숫자를 모두 포함해야 합니다.',
      }),
    confirm: z.string(),
  })
  .refine((formData) => formData.password === formData.confirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirm'],
  })

const restSchema = z.object({
  id: z
    .string()
    .min(6, { message: '아이디는 6글자 이상입니다.' })
    .max(12, { message: '아이디는 12글자 이하입니다.' })
    .regex(/^[a-z0-9]+$/, {
      message: '영문 소문자와 숫자만 가능합니다.',
    }),

  name: z.string().min(2, { message: '두 글자 이상입력해주세요.' }),
  phoneNumber: z
    .string()
    .regex(/^01(0|1|[6-9])[0-9]{3,4}[0-9]{4}$/, { message: '핸드폰 번호 형식에 맞지 않습니다.' }),
  birth: z.string().regex(/^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/, {
    message: '생년월일 형식에 맞지 않습니다.',
  }),

  gender: z.enum(['MAN', 'WOMAN'], { message: '성별을 선택해주세요.' }),
  personal: z.literal(true, { errorMap: () => ({ message: '개인정보 동의는 필수입니다.' }) }),
  notification: z.boolean(),
})

export const schema = z.intersection(accountSchema, restSchema)

export const useSignupForm = () => {
  const formMethod = useForm<SignupFormType>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      personal: false,
      notification: false,
    },
  })
  return formMethod
}
