'use client'
import { useParams, useRouter } from 'next/navigation'

import { useCreateClinicInfo } from '@/store/queries'
import type { ClinicFormType } from '@/types'
import { CLINIC_ALARM_TIME } from '@/utility/constants'
import { formatDateWithType } from '@/utility/utils'

export const useSubmitCreateClinicForm = () => {
  const router = useRouter()
  const { userId } = useParams<{ userId: string }>()
  const { mutate: createMedicalInfoMutation } = useCreateClinicInfo()

  const submitFormattedForm = (formData: ClinicFormType) => {
    const { medicalAlarm, hospitalDate } = formData

    const sendingFormData = {
      ...formData,
      medicalAlarm: CLINIC_ALARM_TIME.indexOf(medicalAlarm),
      hospitalDate: formatDateWithType(hospitalDate, 'dateTime', 'fullDateTimeWithKorean'),
      userId: parseInt(userId),
    }

    createMedicalInfoMutation(sendingFormData, {
      onSuccess: ({ medicalId }) => {
        router.replace(`/clinic/${userId}/info/${medicalId}`)
      },
    })
  }

  return submitFormattedForm
}
