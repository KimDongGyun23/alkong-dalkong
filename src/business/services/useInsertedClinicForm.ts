'use client'
import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import dayjs from 'dayjs'

import { useClinicInfo } from '@/store/queries/useClinicApi'
import { CLINIC_ALARM_TIME } from '@/utility/constants'
import { useClinicForm } from '@/utility/schema'

/**
 * @description
 * 진료 상세 정보를 가져와 폼에 삽입한다.
 *
 * 1. `medicalId`를 사용해 진료 상세 정보를 서버에서 가져온다.
 * 2. 진료 알람(`medicalAlarm`)과 날짜(`hospitalDate`) 데이터를 포맷한다.
 * 3. `formMethod.reset`을 호출해 가져온 데이터를 폼에 초기화한다.
 *
 * @returns {object} 진료 폼을 관리하는 `formMethod`를 반환한다.
 */

export const useInsertedClinicForm = () => {
  const formMethod = useClinicForm()
  const { medicalId } = useParams<{ medicalId: string }>()
  const { data: detailInfoData } = useClinicInfo(parseInt(medicalId))

  useEffect(() => {
    if (detailInfoData) {
      const parsedDetailInfoData = detailInfoData.data
      const { medicalAlarm, hospitalDate } = parsedDetailInfoData

      const formattedDate = dayjs(hospitalDate, 'YYYY-MM-DD HH:mm:ss').format(
        'YYYY년 M월 D일 dddd A hh:mm',
      )

      const insertingFormData = {
        ...parsedDetailInfoData,
        medicalAlarm: CLINIC_ALARM_TIME[medicalAlarm],
        hospitalDate: formattedDate,
      }

      formMethod.reset(insertingFormData)
    }
  }, [detailInfoData, formMethod])

  return formMethod
}
