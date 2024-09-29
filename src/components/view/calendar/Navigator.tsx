'use client'
import dayjs from 'dayjs'

import { useCalendarActions, useCurrentDate } from '@/store/stores/calendarStore'

import { Icon } from '../icons'

export const Navigator = () => {
  const date = useCurrentDate()
  const { goToPreviousMonth, goToNextMonth } = useCalendarActions()

  const year = dayjs(date).year()
  const month = dayjs(date).month() + 1

  return (
    <div className="flex-between ml-1 w-[174px] gap-[6px]">
      <button onClick={goToPreviousMonth}>
        <Icon name="arrow-left" size={28} />
      </button>

      <div className="subtitle-B">
        {year}년 {month}월
      </div>

      <button onClick={goToNextMonth}>
        <Icon name="arrow-right" size={28} />
      </button>
    </div>
  )
}
