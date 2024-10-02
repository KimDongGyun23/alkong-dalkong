import dayjs from 'dayjs'

import { convertDayArrayToEnglish, convertDayStringToArray } from '@/business/services'
import type { MedicineFormType } from '@/types'
import { MEDICINE_ALARM_TIME } from '@/utility/constants'
import { formatDateWithType, parseDosage } from '@/utility/utils'

export const formattedMedicineForm = (formData: MedicineFormType) => {
  const { medicineWeek, medicineDosage, medicinePeriod, medicineAlarm, ...rest } = formData
  const { dosageAmount, dosageType } = parseDosage(medicineDosage)

  const isInfiniteDate = medicinePeriod === '꾸준히 섭취'
  const formattedEndDate = isInfiniteDate
    ? '9999-12-31'
    : formatDateWithType(medicinePeriod, 'default', 'monthDate')

  const formattedType = dosageType === '회분' ? 0 : 1

  const convertedWeek = convertDayStringToArray(medicineWeek)
  const formattedWeek = convertDayArrayToEnglish(convertedWeek)

  const sendingFormData = {
    ...formData,
    medicineStart: dayjs().format('YYYY-MM-DD'),
    medicineDosage: dosageAmount,
    medicineTakenType: formattedType,
    medicineWeek: formattedWeek,
    medicineEnd: formattedEndDate,
    medicineAlarm: MEDICINE_ALARM_TIME.indexOf(medicineAlarm),
    ...rest,
  }

  return sendingFormData
}
