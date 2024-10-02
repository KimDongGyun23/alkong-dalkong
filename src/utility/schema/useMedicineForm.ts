import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { z } from 'zod'

import {
  convertDayArrayToKorean,
  convertDayArrayToString,
  getMedicineUnitInKorean,
} from '@/business/services'
import type { MedicineFormType } from '@/types'

import { medicineEditInfo } from '../apis'
import { MEDICINE_ALARM_TIME } from '../constants'
import { formatDateWithType } from '../utils'

const schema = z.object({
  medicineName: z.string().min(1, { message: '약품명을 입력해주세요.' }),
  medicineWeek: z.array(z.string()).min(1, { message: '복용 요일을 선택해주세요.' }),
  medicineTimes: z.number().min(1, '복용 횟수는 1 이상이어야 합니다.'),
  medicineTakenTime: z.array(z.string()).min(1, { message: '복용 시간을 입력해주세요.' }),
  medicineEndDate: z.string().min(1, { message: '반복 종료 날짜를 선택해주세요.' }),
  medicineDosage: z.number().min(1, { message: '복용량은 1 이상이어야 합니다.' }),
  medicineTakenType: z.enum(['DOSE', 'TABLET']),
  medicineMemo: z.string(),
  medicineAlarm: z.string(),
})

const getDefaultValues = async (isEdit: boolean, userId?: string, medicineId?: string) => {
  if (isEdit && userId && medicineId) {
    const { data } = await medicineEditInfo(userId, medicineId)

    const convertDaysEnToKo = convertDayArrayToKorean(data.medicineWeek)
    const formattedWeek = convertDayArrayToString(convertDaysEnToKo)

    return {
      medicineName: data.medicineName,
      medicineWeek: formattedWeek,
      medicineTimes: data.medicineTimes,
      medicineTakenTimeList: data.medicineTakenTime.map((time) =>
        formatDateWithType(time, 'time', 'fullTime'),
      ),
      medicinePeriod:
        data.medicineEndDate === '9999-12-31'
          ? '꾸준히 섭취'
          : dayjs(data.medicineEndDate).format('M월 D일'),
      medicineDosage: `${data.medicineDosage}${getMedicineUnitInKorean(data.medicineTakenType)}`,
      medicineMemo: data.medicineMemo,
      medicineAlarm: MEDICINE_ALARM_TIME[data.medicineAlarm],
    }
  }

  return {
    medicineName: '',
    medicineWeek: '',
    medicineTimes: 1,
    medicineTakenTimeList: [],
    medicinePeriod: '',
    medicineDosage: 'DOSE' as 'DOSE' | 'TABLET',
    medicineMemo: '',
    medicineAlarm: '없음',
  }
}

export const useMedicineForm = (isEdit: boolean = false, userId?: string, medicineId?: string) => {
  const formMethod = useForm<MedicineFormType>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: async () => await getDefaultValues(isEdit, userId, medicineId),
  })

  return formMethod
}
