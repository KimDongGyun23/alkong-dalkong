'use client'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import dayjs from 'dayjs'

import { BottomSheet, Label, SubHeader, TimeSlider } from '@/components'
import { CustomCalendar } from '@/components/view/customCalendar/CustomCalendar'
import type { CalendarValue, CalendarValuePiece, ClinicBottomSheetType } from '@/types'
import { convertDayjsToDate, formatDateWithType } from '@/utility/utils'

const DateBottomSheetHeader = ({
  section,
  onClickScrim,
  selectedDate,
}: Omit<ClinicBottomSheetType, 'isShowing'> & { selectedDate: CalendarValuePiece }) => {
  const { setValue } = useFormContext()
  const handleClickComplete = () => {
    setValue(section, formatDateWithType(selectedDate as Date, 'fullDateTimeWithKorean'))
    onClickScrim()
  }

  return (
    <div className="-mx-2 w-full pb-5">
      <SubHeader.Confirm
        title="방문 날짜"
        onCancel={onClickScrim}
        onConfirm={handleClickComplete}
      />
    </div>
  )
}

const DateOfVisit = ({ selectedDate }: { selectedDate: CalendarValuePiece }) => {
  return (
    <div className="flex-between-align mx-1 mt-[6px]">
      <p className="headline-B">방문 예정 날짜</p>
      <div className="body-M rounded-md bg-mint-2 px-3 py-[6px]">
        {dayjs(selectedDate).format('YYYY/MM/DD')}
      </div>
    </div>
  )
}

export const DateBottomSheet = ({ section, isShowing, onClickScrim }: ClinicBottomSheetType) => {
  const { getValues } = useFormContext()

  const [selectedDate, setSelectedDate] = useState<CalendarValuePiece>(new Date())
  const handleDateChange = (newDate: CalendarValue) => {
    setSelectedDate(Array.isArray(newDate) ? newDate[0] : newDate)
  }

  useEffect(() => {
    if (isShowing) {
      setSelectedDate(convertDayjsToDate(getValues(section), 'fullDateTimeWithKorean'))
    }
  }, [getValues, isShowing, section])

  return (
    <BottomSheet isShowing={isShowing} onClickScrim={onClickScrim}>
      <DateBottomSheetHeader
        section={section}
        onClickScrim={onClickScrim}
        selectedDate={selectedDate}
      />

      <div className="size-full overflow-y-scroll pb-12 pt-5 scrollbar-hide">
        <section>
          <Label icon="calendar-label">방문 날짜를 선택해 주세요.</Label>

          <div className="mx-2 mt-4">
            <CustomCalendar value={selectedDate} onChange={handleDateChange} />
            <DateOfVisit selectedDate={selectedDate} />
          </div>
        </section>

        <section className="mt-8">
          <Label icon="time-label">방문 시간을 선택해 주세요.</Label>
          <div className="mt-4">
            <TimeSlider />
          </div>
        </section>
      </div>
    </BottomSheet>
  )
}
