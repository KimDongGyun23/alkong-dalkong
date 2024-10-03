import { z } from 'zod'

export const accountEditSchema = z.object({
  name: z.string().min(2, { message: '두 글자 이상입력해주세요.' }),
  phoneNumber: z
    .string()
    .regex(/^01(0|1|[6-9])[0-9]{3,4}[0-9]{4}$/, { message: '핸드폰 번호 형식에 맞지 않습니다.' }),
  birth: z.string().regex(/^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/, {
    message: '생년월일 형식에 맞지 않습니다.',
  }),

  gender: z.enum(['MAN', 'WOMAN'], { message: '성별을 선택해주세요.' }),
})

export const clinicSchema = z.object({
  hospitalName: z.string().min(1, { message: '병원 이름을 입력해 주세요.' }),
  hospitalDate: z.string().min(1, { message: '날짜를 선택해 주세요.' }),
  medicalPart: z.array(z.string()).min(1, { message: '진료 과목을 1개 이상 선택해 주세요.' }),
  medicalMemo: z.string(),
  medicalAlarm: z.string(),
})

export const loginSchema = z.object({
  id: z.string().min(1, { message: '아이디를 입력해주세요.' }),
  password: z.string().min(1, { message: '비밀번호를 입력해주세요.' }),
})

export const medicineSchema = z.object({
  medicineName: z.string().min(1, { message: '약품명을 입력해주세요.' }),
  medicineWeek: z.string().min(1, { message: '복용 요일을 선택해주세요.' }),
  medicineTimes: z.number(),
  medicineTakenTimeList: z.array(z.string()),
  medicinePeriod: z.string(),
  medicineDosage: z.string(),
  medicineMemo: z.string(),
  medicineAlarm: z.string(),
})

export const passwordEditSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: '비밀번호는 8글자 이상입니다.' })
      .max(16, { message: '비밀번호는 16글자 이하입니다.' })
      .regex(/^(?=.*[a-zA-Z])(?=.*\d).+$/, {
        message: '영문자와 숫자를 모두 포함해야 합니다.',
      }),
    confirm: z.string(),
    password: z.string().min(1, { message: '현재 비밀번호를 입력해주세요.' }),
  })
  .partial()
  .refine((formData) => formData.newPassword === formData.confirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirm'],
  })

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

export const signUpSchema = z.intersection(accountSchema, restSchema)
