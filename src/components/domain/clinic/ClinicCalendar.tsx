'use client'
import dayjs from 'dayjs'

import { useMonthlySchedule } from '@/business/services/useMonthlySchedule'
import { CustomCalendar } from '@/components/view/customCalendar/CustomCalendar'

export const ClinicCalendar = () => {
  const { monthlyScheduleDates } = useMonthlySchedule()

  const isDateMarked = (date: Date) =>
    monthlyScheduleDates.some((scheduleDate: Date) =>
      dayjs(scheduleDate).isSame(dayjs(date), 'day'),
    )

  const tileClassName = ({ date }: { date: Date }) => (isDateMarked(date) ? 'marked' : '')

  return <CustomCalendar tileClassName={tileClassName} />
}
