'use client'

import type { ChangeEvent } from 'react'
import { useState } from 'react'

import { MEDICINE_DOSAGE_MAX_VALUE } from '@/utility/constants'

export const useDosageInput = (initialState: string) => {
  const [inputValue, setInputValue] = useState<string>(initialState)

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (value === '' || !isNaN(Number(value))) {
      const newValue = parseInt(value, 10)
      if (newValue > MEDICINE_DOSAGE_MAX_VALUE) {
        setInputValue('9')
      } else {
        setInputValue(value)
      }
    }
  }

  return { inputValue, handleChangeInput }
}
