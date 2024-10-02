'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

import { useClinicCalendar } from '@/store/queries'
import { useCalendarActions } from '@/store/stores'
import type { ScheduleType } from '@/types'

export const useMonthlySchedule = (localDate: string) => {
  const { userId } = useParams<{ userId: string }>()
  const { updateScheduledDates } = useCalendarActions()

  const [monthlyScheduleDates, setMonthlyScheduleDates] = useState<Date[]>([])
  const [monthlyScheduleList, setMonthlyScheduleList] = useState<ScheduleType[]>([])

  const { data: medicalData, refetch } = useClinicCalendar({ userId, localDate })

  useEffect(() => {
    if (medicalData) {
      const scheduleData = medicalData.data || []
      const newScheduledDates =
        scheduleData.map((clinicInfo) => new Date(clinicInfo.hospitalDate)) || []

      setMonthlyScheduleList(scheduleData)
      setMonthlyScheduleDates(newScheduledDates)
    }
  }, [medicalData, updateScheduledDates])

  return { monthlyScheduleDates, monthlyScheduleList, refetch }
}
