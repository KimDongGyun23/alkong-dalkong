'use client'
import { useState } from 'react'
import Calendar from 'react-calendar'
import dayjs from 'dayjs'

import { Icon } from '../icons'

import 'react-calendar/dist/Calendar.css'
import './CustomCalendar.css'

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

export const CustomCalendar = () => {
  const [date, setDate] = useState<ValuePiece>(new Date())

  const handleDateChange = (newDate: Value) => {
    setDate(Array.isArray(newDate) ? newDate[0] : newDate)
  }

  return (
    <Calendar
      value={date}
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
    />
  )
}
