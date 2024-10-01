'use client'
import type { CalendarProps } from 'react-calendar'
import Calendar from 'react-calendar'
import dayjs from 'dayjs'

import { useCalendarActions, useSelectedDate } from '@/store/stores'

import { Icon } from '../icons'

import 'react-calendar/dist/Calendar.css'
import './CustomCalendar.css'

export const CustomCalendar = ({ ...options }: CalendarProps) => {
  const selectedDate = useSelectedDate()
  const { handleDateChange } = useCalendarActions()

  return (
    <Calendar
      value={selectedDate}
      onChange={handleDateChange}
      formatDay={(_, date) => dayjs(date).format('D')}
      next2Label={null}
      prev2Label={null}
      calendarType="gregory"
      nextLabel={<Icon name="arrow-right" size={28} />}
      prevLabel={<Icon name="arrow-left" size={28} />}
      showNeighboringMonth={false}
      maxDetail="month"
      minDetail="month"
      locale="ko-KR"
      {...options}
    />
  )
}
