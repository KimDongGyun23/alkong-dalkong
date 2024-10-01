'use client'
import { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import { useParams } from 'next/navigation'
import dayjs from 'dayjs'

import { useClinicCalendar } from '@/store/queries/useClinicApi'

import { Icon } from '../icons'

import 'react-calendar/dist/Calendar.css'
import './CustomCalendar.css'

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

export const CustomCalendar = () => {
  const { userId } = useParams<{ userId: string }>()
  const localDate = dayjs().format('YYYY-MM')
  const [date, setDate] = useState<ValuePiece>(new Date())
  const [markedDates, setMarkedDates] = useState<Date[]>([])

  const handleDateChange = (newDate: Value) => {
    setDate(Array.isArray(newDate) ? newDate[0] : newDate)
  }

  const { data: medicalData, isPending, isError } = useClinicCalendar({ userId, localDate })

  useEffect(() => {
    if (medicalData) {
      const dateObjects = medicalData.data.map((clinicInfo) => new Date(clinicInfo.hospitalDate))
      setMarkedDates(dateObjects)
    }
  }, [medicalData])

  const tileClassName = ({ date }: { date: Date }) => {
    if (markedDates.find((markedDate) => dayjs(markedDate).isSame(dayjs(date), 'day'))) {
      return 'marked'
    }
    return ''
  }

  if (isPending || isError) return

  return (
    <Calendar
      value={date}
      onChange={handleDateChange}
      formatDay={(_, date) => dayjs(date).format('D')}
      next2Label={null}
      prev2Label={null}
      calendarType="gregory"
      nextLabel={<Icon name="arrow-right" size={28} />}
      prevLabel={<Icon name="arrow-left" size={28} />}
      showNeighboringMonth={false}
      maxDetail="month"
      minDetail="month"
      locale="ko-KR"
      tileClassName={tileClassName}
    />
  )
}
