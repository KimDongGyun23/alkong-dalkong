'use client'
import { useState } from 'react'

import { ALARM_TIME } from '@/utility/constants'

export const useSelectAlarmTime = () => {
  const [selectedTime, setSelectedTime] = useState<string>(ALARM_TIME[5])

  const handleClickTime = (time: string) => {
    setSelectedTime(time)
  }

  return { selectedTime, handleClickTime }
}
