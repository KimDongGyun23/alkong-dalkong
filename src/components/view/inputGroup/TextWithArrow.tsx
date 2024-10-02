'use client'
import { useFormContext } from 'react-hook-form'

import { Icon } from '../icons'

type TextWithArrowProps = {
  section: string
}

export const TextWithArrow = ({ section }: TextWithArrowProps) => {
  const { register } = useFormContext()

  return (
    <div className="flex-align gap-1">
      <input
        className="headline-M cursor-pointer text-right text-gray-7 focus:outline-none disabled:bg-transparent"
        size={15}
        {...register(section)}
        readOnly
      />
      <Icon size={28} name="arrow-right" />
    </div>
  )
}
