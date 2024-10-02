'use client'
import { useFormContext } from 'react-hook-form'
import dayjs from 'dayjs'

import { useSelectedTime } from '@/store/stores'

export const useFormattedVisitDate = (section: string, onClickScrim: VoidFunction) => {
  const { setValue } = useFormContext()
  const selectedDate = useCurrentDate()
  const selectedTime = useSelectedTime()

  const handleClickComplete = () => {
    const date = `${selectedDate} ${selectedTime}`
    const formattedDate = dayjs(date).format('YYYY년 M월 D일 dddd A HH:mm')
    setValue(section, formattedDate)
    onClickScrim()
  }

  return handleClickComplete
}
