'use client'
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { useSyncMedicineTimes } from '@/business/hooks'
import { BottomSheet, Icon, InputGroup, Label, SubHeader, TimeSlider } from '@/components/view'
import { useToggle } from '@/hooks'
import { useSelectedTime, useSelectedTimeActions } from '@/store/stores'
import type { BottomSheetType } from '@/types'
import { formatDateWithType } from '@/utility/utils'

type TakenTimeBottomSheetProps = BottomSheetType & { index: number }

const TakenTimeBottomSheet = ({
  index,
  section,
  isShowing,
  onClickScrim,
}: TakenTimeBottomSheetProps) => {
  const { getValues, setValue } = useFormContext()
  const selectedTime = useSelectedTime()

  const handleClickComplete = () => {
    const takenTimeArr = getValues(section)
    takenTimeArr[index] = formatDateWithType(selectedTime, 'time', 'fullTime')
    const sorttedArr = [...takenTimeArr].sort((a, b) => a.localeCompare(b))

    setValue(section, sorttedArr)
    onClickScrim()
  }

  return (
    <BottomSheet isShowing={isShowing} onClickScrim={onClickScrim}>
      <div className="w-full pb-5">
        <SubHeader.Confirm
          title="복용 시간"
          onCancel={onClickScrim}
          onConfirm={handleClickComplete}
        />
      </div>

      <div className="size-full overflow-y-scroll pb-12 pt-5 scrollbar-hide">
        <Label icon="time-label">복용 시간을 선택해주세요.</Label>
        <TimeSlider />
      </div>
    </BottomSheet>
  )
}

export const TakenTimeFormField = () => {
  const takenTimeArr = useSyncMedicineTimes()
  const [index, setIndex] = useState(0)
  const [takenTimeSheet, toggleTakenTimeSheet] = useToggle(false)
  const { setInitialSelectedTime } = useSelectedTimeActions()

  const handleClickButton = (index: number) => {
    setIndex(index)
    setInitialSelectedTime(takenTimeArr[index])
    toggleTakenTimeSheet()
  }

  return (
    <InputGroup>
      <Label>복용 시간</Label>
      <div className="flex-column gap-2 pl-2">
        {takenTimeArr?.map((time, index) => (
          <React.Fragment key={index}>
            <button
              type="button"
              className="flex-between-align body-M cursor-pointer text-gray-6"
              onClick={() => handleClickButton(index)}
            >
              <p>{time}</p>
              <Icon size={28} name="arrow-right" />
            </button>
          </React.Fragment>
        ))}
        <TakenTimeBottomSheet
          section="medicineTakenTimeList"
          index={index}
          isShowing={takenTimeSheet}
          onClickScrim={toggleTakenTimeSheet}
        />
      </div>
    </InputGroup>
  )
}
