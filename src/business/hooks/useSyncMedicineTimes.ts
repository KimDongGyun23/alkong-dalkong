'use client'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

export const useSyncMedicineTimes = () => {
  const { watch, setValue } = useFormContext()

  const takenCount = watch('medicineTimes')
  const takenTimeArr = watch('medicineTakenTimeList') as string[]

  useEffect(() => {
    if (takenCount > takenTimeArr.length) {
      const updatedTimes = [...takenTimeArr, '23:59']
      setValue('medicineTakenTimeList', updatedTimes)
    } else if (takenCount < takenTimeArr.length) {
      const updatedTimes = takenTimeArr.slice(0, takenCount)
      setValue('medicineTakenTimeList', updatedTimes)
    }
  }, [takenCount, takenTimeArr, setValue])

  return takenTimeArr
}
