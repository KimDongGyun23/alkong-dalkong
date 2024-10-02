'use client'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

export const useStepper = (section: string) => {
  const { setValue, watch } = useFormContext()
  const watchSection = watch(section)
  const [count, setCount] = useState<number>(watchSection)

  useEffect(() => {
    if (watchSection) setCount(watchSection)
    else setCount(1)
  }, [watchSection])

  const decreaseCount = () => {
    const newCountValue = count > 1 ? count - 1 : count
    setCount(newCountValue)
    setValue(section, newCountValue)
  }

  const increaseCount = () => {
    const newCountValue = count < 5 ? count + 1 : count
    setCount(newCountValue)
    setValue(section, newCountValue)
  }

  return { count, decreaseCount, increaseCount }
}
