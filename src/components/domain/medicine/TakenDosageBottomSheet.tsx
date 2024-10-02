'use client'

import type { Dispatch, SetStateAction } from 'react'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { useDosageInput } from '@/business/hooks'
import { BottomSheet, Icon, Label, SubHeader } from '@/components/view'
import { useToggle } from '@/hooks'
import type { BottomSheetType } from '@/types'
import { parseDosage } from '@/utility/utils'

type TakenDosageDropdownProps = {
  isPillType: boolean
  setIsPillType: Dispatch<SetStateAction<boolean>>
}

const TakenDosageDropdown = ({ isPillType, setIsPillType }: TakenDosageDropdownProps) => {
  const [isOpenDropdown, toggleDropdown] = useToggle()

  const upBorderStyle = isOpenDropdown ? 'rounded-md rounded-t-none' : 'rounded-md'
  const bottomBorderStyle = isOpenDropdown
    ? 'rounded-md rounded-b-none border-b border-b-mint-3'
    : 'rounded-md'

  const handleClickButton = () => {
    setIsPillType((prev) => !prev)
    toggleDropdown()
  }

  return (
    <div className="relative">
      <button
        type="button"
        className={`flex-align gap-2 ${bottomBorderStyle} bg-mint-0 px-3 py-[6px]`}
        onClick={toggleDropdown}
      >
        <span>{isPillType ? '정' : '회분'}</span>
        <Icon name={isOpenDropdown ? 'arrow-up' : 'arrow-down'} color="#0E8763" />
      </button>

      {isOpenDropdown && (
        <button
          type="button"
          className={`absolute w-full rounded-md bg-mint-0 px-3 py-[6px] text-left ${upBorderStyle}`}
          onClick={handleClickButton}
        >
          <span>{isPillType ? '회분' : '정'}</span>
        </button>
      )}
    </div>
  )
}

export const TakenDosageBottomSheet = ({ section, isShowing, onClickScrim }: BottomSheetType) => {
  const { setValue, watch } = useFormContext()
  const watchSection = watch(section)
  const { dosageAmount, dosageType } = parseDosage(watchSection)

  const { inputValue, handleChangeInput } = useDosageInput(dosageAmount.toString())
  const [isPillType, setIsPillType] = useState<boolean>(false)

  useEffect(() => {
    setIsPillType(dosageType === '정')
  }, [dosageType, watchSection])

  const handleClickConfirm = () => {
    setValue(section, `${inputValue}${isPillType ? '정' : '회분'}`)
    onClickScrim()
  }

  return (
    <BottomSheet isShowing={isShowing} onClickScrim={onClickScrim}>
      <div className="w-full pb-5">
        <SubHeader.Confirm title="복용량" onCancel={onClickScrim} onConfirm={handleClickConfirm} />
      </div>

      <div className="size-full overflow-y-scroll pb-12 pt-5 scrollbar-hide">
        <Label icon="time-label">복용량을 선택해주세요.</Label>
        <div className="flex-center mt-3 gap-4">
          <input
            className="w-[34px] rounded-md bg-mint-0 px-3 py-[6px] focus:outline-none"
            value={inputValue}
            onChange={handleChangeInput}
          />
          <TakenDosageDropdown isPillType={isPillType} setIsPillType={setIsPillType} />
          <p>씩 복용해요!</p>
        </div>
      </div>
    </BottomSheet>
  )
}
