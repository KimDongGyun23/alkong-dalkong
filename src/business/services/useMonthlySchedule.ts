'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import dayjs from 'dayjs'

import { useClinicCalendar } from '@/store/queries/useClinicApi'
import { useCalendarActions } from '@/store/stores'
import type { ScheduleType } from '@/types'

export const useMonthlySchedule = () => {
  const localDate = dayjs().format('YYYY-MM')
  const { userId } = useParams<{ userId: string }>()
  const { updateScheduledDates } = useCalendarActions()

  const [monthlyScheduleDates, setMonthlyScheduleDates] = useState<Date[]>([])
  const [monthlyScheduleList, setMonthlyScheduleList] = useState<ScheduleType[]>([])

  const { data: medicalData } = useClinicCalendar({ userId, localDate })

  useEffect(() => {
    if (medicalData) {
      const scheduleData = medicalData.data || []
      const newScheduledDates =
        scheduleData.map((clinicInfo) => new Date(clinicInfo.hospitalDate)) || []

      setMonthlyScheduleList(scheduleData)
      setMonthlyScheduleDates(newScheduledDates)
    }
  }, [medicalData, updateScheduledDates])

  return { monthlyScheduleDates, monthlyScheduleList }
}
