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
  medicineWeek: z.string().min(1, { message: '복용 요일을 선택해주세요.' }),
  medicineTimes: z.number(),
  medicineTakenTimeList: z.array(z.string()),
  medicinePeriod: z.string(),
  medicineDosage: z.string(),
  medicineMemo: z.string(),
  medicineAlarm: z.string(),
})

const initialValues = {
  medicineName: '',
  medicineWeek: dayjs().locale('ko').format('ddd'),
  medicineTimes: 1,
  medicineTakenTimeList: ['23:59'],
  medicinePeriod: dayjs().format('M월 D일'),
  medicineDosage: '1회분',
  medicineMemo: '',
  medicineAlarm: '없음',
}

const getDefaultValues = async (userId?: string, medicineId?: string) => {
  if (userId && medicineId) {
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
          : formatDateWithType(data.medicineEndDate, 'monthDate'),
      medicineDosage: `${data.medicineDosage}${getMedicineUnitInKorean(data.medicineTakenType)}`,
      medicineMemo: data.medicineMemo,
      medicineAlarm: MEDICINE_ALARM_TIME[data.medicineAlarm],
    }
  } else return initialValues
}

export const useMedicineForm = (isEdit: boolean = false, userId?: string, medicineId?: string) => {
  const formMethod = useForm<MedicineFormType>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: isEdit ? async () => await getDefaultValues(userId, medicineId) : initialValues,
  })

  return formMethod
}
