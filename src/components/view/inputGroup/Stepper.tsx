'use client'

import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { Icon } from '../icons'

type StepperProps = {
  section: string
  initialCount?: number
}

const Stepper = ({ section, initialCount = 0 }: StepperProps) => {
  const [count, setCount] = useState<number>(initialCount)
  const { register, setValue } = useFormContext()

  const handleDecreaseCount = () => {
    const newCountValue = count > 0 ? count - 1 : count
    setCount(newCountValue)
    setValue(section, newCountValue)
  }

  const handleIncreaseCount = () => {
    const newCountValue = count + 1
    setCount(newCountValue)
    setValue(section, newCountValue)
  }

  return (
    <div className="flex-align gap-4">
      <button
        type="button"
        className="flex-center size-7 rounded-full bg-mint-6"
        onClick={handleDecreaseCount}
      >
        <Icon name="minus" />
      </button>

      <input id={section} {...register(section)} className="hidden" />
      <label htmlFor={section} className="headline-M">
        {count}
      </label>

      <button
        type="button"
        className="flex-center size-7 rounded-full bg-mint-6"
        onClick={handleIncreaseCount}
      >
        <Icon name="plus" />
      </button>
    </div>
  )
}

export default Stepper
