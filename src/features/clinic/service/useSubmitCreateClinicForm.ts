'use client'
import { useParams, useRouter } from 'next/navigation'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import { ALARM_TIME } from '@/constants'
import { useCreateClinicInfo } from '@/features'
import { useCalendarActions } from '@/store/stores'
import type { ClinicFormType } from '@/types'

dayjs.extend(customParseFormat)

/**
 * @description
 * 진료 정보를 추가하는 로직으로, 사용자가 폼을 작성하고 "확인" 또는 "취소" 버튼을 클릭할 때 호출된다.
 *
 * 1. "취소" 버튼 클릭 시 이전 페이지로 돌아간다.
 * 2. "확인" 버튼 클릭 시 폼 데이터를 서버로 전송하여 진료 정보를 생성한다.
 *    - 진료 알람(`medicalAlarm`)은 인덱스로 변환되고,
 *      날짜(`hospitalDate`)는 'YYYY-MM-DD HH:mm:ss' 형식으로 포맷한다.
 * 3. 생성이 성공하면 새로운 진료 정보 페이지로 리다이렉트된다.
 *
 * @returns {object}
 * - `handleClickCancle`: 취소 버튼 클릭 핸들러
 * - `handleClickConfirm`: 확인 버튼 클릭 핸들러
 */

export const useSubmitCreateClinicForm = () => {
  const router = useRouter()
  const { userId } = useParams<{ userId: string }>()
  const { mutate: createMedicalInfoMutation } = useCreateClinicInfo()
  const { setCreatedScheduleDate } = useCalendarActions()

  const submitFormattedForm = (formData: ClinicFormType) => {
    const { medicalAlarm, hospitalDate } = formData
    const formattedDate = dayjs(hospitalDate, 'YYYY년 M월 D일 dddd A hh:mm').format(
      'YYYY-MM-DD HH:mm:ss',
    )

    const sendingFormData = {
      ...formData,
      medicalAlarm: ALARM_TIME.indexOf(medicalAlarm),
      hospitalDate: formattedDate,
      userId: parseInt(userId),
    }

    createMedicalInfoMutation(sendingFormData, {
      onSuccess: ({ medicalId }) => {
        setCreatedScheduleDate(formattedDate)
        router.replace(`/clinic/${userId}/info/${medicalId}`)
      },
    })
  }

  return submitFormattedForm
}
