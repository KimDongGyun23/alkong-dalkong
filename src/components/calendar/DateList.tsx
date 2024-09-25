'use client'
import dayjs from 'dayjs'

import { useCurrentDate } from '@/store/stores/calendarStore'

import { DateItem } from './DateItem'

export const DateList = () => {
  const date = useCurrentDate()

  const emptyDatesCount = dayjs(date).startOf('month').day()
  const totalDates = dayjs(date).daysInMonth()

  return (
    <div className="flex-column flex-1 gap-2">
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: emptyDatesCount }).map((_, idx) => (
          <div key={idx} />
        ))}

        {Array.from({ length: totalDates }).map((_, idx) => (
          <DateItem key={idx} indexOfDate={idx + 1} />
        ))}
      </div>
    </div>
  )
}
