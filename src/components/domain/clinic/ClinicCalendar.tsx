'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import dayjs from 'dayjs'

import { CustomCalendar } from '@/components/view'
import { useClinicCalendar } from '@/store/queries'
import { useCalendarActions, useSelectedDate } from '@/store/stores'

export const ClinicCalendar = () => {
  const { userId } = useParams<{ userId: string }>()
  const [localDate, setLocalDate] = useState(dayjs().format('YYYY-MM'))

  const selectedDate = useSelectedDate()
  const { handleDateChange } = useCalendarActions()
  const {
    data: calendarData,
    isError,
    isLoading,
    refetch,
  } = useClinicCalendar({ userId, localDate })

  if (isError || isLoading || !calendarData) return null
  const { scheduledDates } = calendarData

  const isDateMarked = (date: Date) =>
    scheduledDates.some((scheduleDate: Date) => dayjs(scheduleDate).isSame(dayjs(date), 'day'))

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
      value={selectedDate}
      onChange={handleDateChange}
      tileClassName={tileClassName}
      onActiveStartDateChange={handleActiveStartDateChange}
    />
  )
}
