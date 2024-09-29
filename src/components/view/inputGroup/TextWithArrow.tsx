import { useFormContext } from 'react-hook-form'

import { Icon } from '../icons'

type TextWithArrowProps = {
  isLong?: boolean
  section: string
  onClick: () => void
}

export const TextWithArrow = ({ isLong = false, section, onClick }: TextWithArrowProps) => {
  const { getValues, register } = useFormContext()
  const layoutStyle = isLong ? 'flex-between-align' : 'flex-align gap-1'
  const fontStyle = isLong ? 'body-M text-gray-6' : 'text-right headline-M text-gray-7'

  return (
    <button type="button" className={`${layoutStyle} cursor-pointer`} onClick={onClick}>
      <input
        className={`${fontStyle} cursor-pointer focus:outline-none disabled:bg-transparent`}
        size={getValues(section).length}
        {...register(section)}
        readOnly
      />
      <Icon size={28} name="arrow-right" />
    </button>
  )
}
