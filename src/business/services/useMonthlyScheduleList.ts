'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import dayjs from 'dayjs'

import { useClinicCalendar } from '@/store/queries/useClinicApi'
import { useCalendarActions } from '@/store/stores'
import type { ScheduleType } from '@/types'

/**
 * @description
 * 진료 페이지에서 사용할 일정 데이터를 받아서 store에 저장한다.
 *
 * 1. 사용자의 userId와 현재 월(`localDate`)을 기준으로 데이터를 받아온다.
 * 2. store의 `resetCalendar`로 캘린더를 초기화하고,
 *    `updateScheduledDates`로 데이터의 날짜 목록을 store에 업데이트한다.
 * 3. 진료 스케줄 목록은 `scheduleList` 상태에 저장하여, 이 상태값을 반환한다.
 *
 * @returns {ScheduleType[]} 이번달의 스케줄 목록을 반환한다.
 */

export const useMonthlyScheduleList = () => {
  const localDate = dayjs().format('YYYY-MM')

  const { userId } = useParams<{ userId: string }>()
  const [monthlyScheduleList, setMonthlyScheduleList] = useState<ScheduleType[]>([])

  const { data: medicalData, refetch } = useClinicCalendar({ userId, localDate })
  const { updateScheduledDates, swapSelectedDateToCreatedDate } = useCalendarActions()

  useEffect(() => {
    swapSelectedDateToCreatedDate()

    if (medicalData) {
      const scheduleData = medicalData.data || []
      const dateList = scheduleData.map((schedule) => schedule.hospitalDate)

      setMonthlyScheduleList(scheduleData)
      updateScheduledDates(dateList)
    }
  }, [medicalData, updateScheduledDates, swapSelectedDateToCreatedDate])

  useEffect(() => {
    refetch()
  }, [refetch])

  return monthlyScheduleList
}
