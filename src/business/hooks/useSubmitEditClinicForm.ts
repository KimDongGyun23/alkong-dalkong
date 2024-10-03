'use client'
import { useRouter } from 'next/navigation'

import { useEditClinicInfo } from '@/store/queries'
import type { ClinicFormType } from '@/types'
import { CLINIC_ALARM_TIME } from '@/utility/constants'
import { formatDateWithType } from '@/utility/utils'

export const useSubmitEditClinicForm = (medicalId: string) => {
  const router = useRouter()
  const { mutate: editClinicInfo } = useEditClinicInfo(medicalId)

  const submitFormattedForm = (formData: ClinicFormType) => {
    const { medicalAlarm, hospitalDate } = formData

    const sendingFormData = {
      ...formData,
      medicalAlarm: CLINIC_ALARM_TIME.indexOf(medicalAlarm),
      hospitalDate: formatDateWithType(hospitalDate, 'dateTime', 'fullDateTimeWithKorean'),
    }

    editClinicInfo({ medicalId, request: sendingFormData }, { onSuccess: () => router.back() })
  }

  return submitFormattedForm
}
