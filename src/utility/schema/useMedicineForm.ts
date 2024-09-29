import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import type { MedicineFormType } from '@/types'

const schema = z.object({
  medicineName: z.string().min(1, { message: '약품명을 입력해주세요.' }),
  medicineWeek: z.array(z.string()).min(1, { message: '복용 요일을 선택해주세요.' }),
  medicineTimes: z.number().min(1, '복용 횟수는 1 이상이어야 합니다.'),
  medicineTakenTime: z.array(z.string()).min(1, { message: '복용 시간을 입력해주세요.' }),
  medicineEndDate: z.string().min(1, { message: '반복 종료 날짜를 선택해주세요.' }),
  medicineDosage: z.number().min(1, { message: '복용량은 1 이상이어야 합니다.' }),
  medicineTakenType: z.enum(['DOSE', 'TABLET'], { message: '복용 유형을 선택해주세요.' }),
  medicineMemo: z.string(),
  medicineAlarm: z.string(),
})

export const useMedicineForm = (initialValues?: MedicineFormType) => {
  const defaultValue = {
    medicineName: '',
    medicineWeek: [],
    medicineTimes: 0,
    medicineTakenTime: [],
    medicineEndDate: '',
    medicineDosage: 0,
    medicineTakenType: 'DOSE' as 'DOSE' | 'TABLET',
    medicineMemo: '',
    medicineAlarm: '',
  }

  const defaultValues = initialValues ? initialValues : defaultValue

  const formMethod = useForm<MedicineFormType>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues,
  })

  return formMethod
}
