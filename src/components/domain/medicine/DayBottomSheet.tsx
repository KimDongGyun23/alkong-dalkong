'use client'

import { useFormContext } from 'react-hook-form'

import { useToggleDaySelection } from '@/business/hooks'
import { convertDayArrayToString, DAYS } from '@/business/services'
import { BottomSheet, Label, SubHeader } from '@/components/view'
import type { BottomSheetType } from '@/types'

export const DayBottomSheet = ({ section, isShowing, onClickScrim }: BottomSheetType) => {
  const { setValue } = useFormContext()
  const { selectedDays, toggleDaySelection } = useToggleDaySelection(section)

  const handleClickConfirm = () => {
    setValue(section, convertDayArrayToString(selectedDays))
    onClickScrim()
  }

  return (
    <BottomSheet isShowing={isShowing} onClickScrim={onClickScrim}>
      <div className="w-full pb-5">
        <SubHeader.Confirm
          title="복용 요일"
          onCancel={onClickScrim}
          onConfirm={handleClickConfirm}
        />
      </div>

      <div className="size-full overflow-y-scroll pb-12 pt-5 scrollbar-hide">
        <Label icon="time-label">복용 요일을 선택해주세요.</Label>
        <div className="flex-between mt-4">
          {Object.keys(DAYS).map((day) => {
            const buttonStyle = selectedDays.includes(day) ? 'bg-mint-6 text-white' : 'bg-gray-2'
            return (
              <button
                key={day}
                className={`rounded-full p-3 ${buttonStyle}`}
                onClick={() => toggleDaySelection(day)}
              >
                {day}
              </button>
            )
          })}
        </div>
      </div>
    </BottomSheet>
  )
}
