'use client'

import { Icon } from '@/components/view'
import { useToggle } from '@/hooks'
import { useHealthPeriodActions, useHealthPeriodKorean } from '@/store/stores'
import { HEALTH_DROPDOWN } from '@/utility/constants'

export const PeriodDropDown = () => {
  const period = useHealthPeriodKorean()
  const { changePeriod } = useHealthPeriodActions()
  const [isOpen, toggleIsOpen] = useToggle(false)

  const handleSelect = (index: number) => {
    changePeriod(index)
    toggleIsOpen()
  }

  const topRoundedStyle = isOpen ? `rounded-t-xl` : `rounded-full`
  const bototmRoundedStyle = isOpen ? `rounded-b-xl` : `rounded-full`

  return (
    <div className="relative">
      <button
        className={`flex-align cursor-pointer gap-2 ${topRoundedStyle} bg-gray-2 px-3 py-1`}
        onClick={toggleIsOpen}
      >
        <p className="body-M text-gray-7">{period}</p>
        <div className="translate-y-px">
          {isOpen ? <Icon name="arrow-up" /> : <Icon name="arrow-down" />}
        </div>
      </button>

      {isOpen && (
        <div className={`${bototmRoundedStyle} absolute w-full bg-gray-2`}>
          {HEALTH_DROPDOWN.map((item, index) =>
            item !== period ? (
              <button
                key={item}
                className="w-full border-t border-gray-4 px-3 py-1 text-left"
                onClick={() => handleSelect(index)}
              >
                <p className="body-M text-gray-7">{item}</p>
              </button>
            ) : null,
          )}
        </div>
      )}
    </div>
  )
}
