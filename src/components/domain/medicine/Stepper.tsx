'use client'

import { useFormContext } from 'react-hook-form'

import { useStepper } from '@/business/hooks'
import { Icon } from '@/components/view'

type StepperProps = {
  section: string
}

export const Stepper = ({ section }: StepperProps) => {
  const { register } = useFormContext()
  const { count, decreaseCount, increaseCount } = useStepper(section)

  return (
    <div className="flex-align gap-4">
      <button
        type="button"
        className="flex-center size-7 rounded-full bg-mint-6"
        onClick={decreaseCount}
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
        onClick={increaseCount}
      >
        <Icon name="plus" />
      </button>
    </div>
  )
}
