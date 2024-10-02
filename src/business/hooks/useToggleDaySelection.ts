'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { convertDayStringToArray, DAYS } from '@/business/services'

export const useToggleDaySelection = (section: string) => {
  const { watch } = useFormContext()
  const [selectedDays, setSelectedDays] = useState<string[]>([])

  const watchSection = watch(section)
  const days = Object.keys(DAYS)

  useEffect(() => {
    if (!watchSection) setSelectedDays([])
    else {
      const convertedDaysArray = convertDayStringToArray(watchSection)
      setSelectedDays(convertedDaysArray)
    }
  }, [watchSection])

  const toggleDaySelection = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== day))
    } else {
      setSelectedDays([...selectedDays, day])
    }

    setSelectedDays((prev) => prev.sort((a, b) => days.indexOf(a) - days.indexOf(b)))
  }

  return { selectedDays, toggleDaySelection }
}
