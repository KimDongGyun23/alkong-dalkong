'use client'
import { useState } from 'react'
import dayjs from 'dayjs'

import { useMonthlySchedule } from '@/business/services/useMonthlySchedule'
import { CustomCalendar } from '@/components/view/customCalendar/CustomCalendar'

export const ClinicCalendar = () => {
  const [localDate, setLocalDate] = useState(dayjs().format('YYYY-MM'))
  const { monthlyScheduleDates, refetch } = useMonthlySchedule(localDate)

  const isDateMarked = (date: Date) =>
    monthlyScheduleDates.some((scheduleDate: Date) =>
      dayjs(scheduleDate).isSame(dayjs(date), 'day'),
    )

  const tileClassName = ({ date }: { date: Date }) => (isDateMarked(date) ? 'marked' : '')

  const handleActiveStartDateChange = ({ activeStartDate }: { activeStartDate: Date | null }) => {
    if (activeStartDate) {
      const newMonth = dayjs(activeStartDate).format('YYYY-MM')
      setLocalDate(newMonth)
      refetch()
    }
  }

  return (
    <CustomCalendar
      tileClassName={tileClassName}
      onActiveStartDateChange={handleActiveStartDateChange}
    />
  )
}
