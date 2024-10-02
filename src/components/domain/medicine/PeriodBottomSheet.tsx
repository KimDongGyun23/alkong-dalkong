'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import dayjs from 'dayjs'

import { useCustomCalendar } from '@/business/hooks'
import { BottomSheet, CustomCalendar, Label, SubHeader } from '@/components/view'
import type { BottomSheetType } from '@/types'

export const PeriodBottomSheet = ({ section, isShowing, onClickScrim }: BottomSheetType) => {
  const { setValue, watch } = useFormContext()
  const watchSection = watch(section)
  const [isToggleActive, setIsToggleActive] = useState(false)
  const { selectedDate, handleDateChange } = useCustomCalendar()

  const handleToggleAction = () => {
    setIsToggleActive((prevToggleState) => !prevToggleState)
  }

  useEffect(() => {
    setIsToggleActive(watchSection === '꾸준히 섭취')
  }, [watchSection])

  const handleClickConfirm = () => {
    if (isToggleActive) setValue(section, '꾸준히 섭취')
    else setValue(section, dayjs(selectedDate).format('M월 D일'))
    onClickScrim()
  }

  return (
    <BottomSheet isShowing={isShowing} onClickScrim={onClickScrim}>
      <div className="w-full pb-5">
        <SubHeader.Confirm
          title="복용 기간"
          onCancel={onClickScrim}
          onConfirm={handleClickConfirm}
        />
      </div>

      <div className="size-full overflow-y-scroll pb-12 pt-5 scrollbar-hide">
        <Label icon="time-label">복용 기간을 선택해주세요.</Label>

        <div className="flex-column mt-3 gap-[6px]">
          <CustomCalendar value={selectedDate} onChange={handleDateChange} />

          {!isToggleActive && (
            <div className="flex-between-align mx-1 mt-[6px]">
              <p className="headline-B">반복 종료 날짜</p>
              <div className="body-M rounded-md bg-mint-2 px-3 py-[6px]">
                {dayjs(selectedDate).format('YYYY/MM/DD')}
              </div>
            </div>
          )}
        </div>

        <div className="flex-between-align mx-1 mt-8">
          <p className="headline-B">계속 먹을게요</p>
          <div className="inline-block">
            <input
              type="checkbox"
              id="toggle"
              checked={isToggleActive}
              onChange={handleToggleAction}
              className="hidden"
            />
            <label
              htmlFor="toggle"
              className={`flex-align h-[34px] w-[66px] shrink-0 cursor-pointer rounded-full p-[5px] transition-all focus-visible:outline-none ${isToggleActive ? 'bg-mint-6' : 'bg-gray-2'}`}
            >
              <div
                className={`size-6 rounded-full transition-all ${isToggleActive ? 'translate-x-8 bg-white' : 'translate-x-0 bg-mint-6'}`}
              >
                {''}
              </div>
            </label>
          </div>
        </div>
      </div>
    </BottomSheet>
  )
}
