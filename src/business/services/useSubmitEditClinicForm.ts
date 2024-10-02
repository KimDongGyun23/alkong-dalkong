'use client'
import { useParams, useRouter } from 'next/navigation'
import dayjs from 'dayjs'

import { useEditClinicInfo } from '@/store/queries'
import { useCalendarActions } from '@/store/stores'
import type { ClinicFormType } from '@/types'
import { CLINIC_ALARM_TIME } from '@/utility/constants'

export const useSubmitEditClinicForm = () => {
  const router = useRouter()
  const { medicalId } = useParams<{ userId: string; medicalId: string }>()
  const { mutate: editClinicInfo } = useEditClinicInfo(parseInt(medicalId))
  const { setCreatedScheduleDate } = useCalendarActions()

  const submitFormattedForm = (formData: ClinicFormType) => {
    const { medicalAlarm, hospitalDate } = formData

    const formattedDate = dayjs(hospitalDate, 'YYYY년 M월 D일 dddd A hh:mm').format(
      'YYYY-MM-DD HH:mm:ss',
    )

    const sendingFormData = {
      ...formData,
      medicalAlarm: CLINIC_ALARM_TIME.indexOf(medicalAlarm),
      hospitalDate: formattedDate,
    }

    editClinicInfo(
      { medicalId, request: sendingFormData },
      {
        onSuccess: () => {
          setCreatedScheduleDate(formattedDate)
          router.back()
        },
      },
    )
  }

  return submitFormattedForm
}
