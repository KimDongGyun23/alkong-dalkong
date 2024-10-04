'use client'
import { useState } from 'react'

import type { CalendarValue, CalendarValuePiece } from '@/types'

export const useCustomCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<CalendarValuePiece>(new Date())
  const handleDateChange = (newDate: CalendarValue) => {
    setSelectedDate(Array.isArray(newDate) ? newDate[0] : newDate)
  }

  return { selectedDate, handleDateChange }
}
