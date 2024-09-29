'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { BottomSheet, Label, SubHeader } from '@/components'
import type { BottomSheetType } from '@/types'

type AlarmBottomSheetProps = BottomSheetType & { timeList: string[] }

export const AlarmBottomSheet = ({
  timeList,
  section,
  isShowing,
  onClickScrim,
}: AlarmBottomSheetProps) => {
  const { getValues, setValue } = useFormContext()
  const [selectedTime, setSelectedTime] = useState<string>(timeList[timeList.length - 1])

  const handleClickComplete = () => {
    setValue(section, selectedTime)
    onClickScrim()
  }

  const handleClickButton = (time: string) => {
    setSelectedTime(time)
    setValue(section, time)
    onClickScrim()
  }

  useEffect(() => {
    setSelectedTime(getValues(section))
  }, [getValues, section])

  return (
    <BottomSheet isShowing={isShowing} onClickScrim={onClickScrim}>
      <div className="w-full pb-5">
        <SubHeader.Confirm title="알람" onCancel={onClickScrim} onConfirm={handleClickComplete} />
      </div>

      <div className="size-full overflow-y-scroll pb-12 pt-5 scrollbar-hide">
        <Label icon="time-label">알람 주기를 선택해주세요.</Label>

        <div className="flex-column mt-3 w-full rounded-xl bg-gray-2 px-6 py-[2px]">
          {timeList.map((time) => (
            <button
              key={time}
              className="headline-M border border-b-gray-4 py-[14px] text-left last:border-none"
              onClick={() => handleClickButton(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
    </BottomSheet>
  )
}
