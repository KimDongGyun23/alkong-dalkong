'use client'
import { useParams, useRouter } from 'next/navigation'

import { ActionTag, Label } from '@/components/view'
import { useClinicCalendar } from '@/store/queries'
import { useSelectedDate } from '@/store/stores'
import type { ScheduleType } from '@/types'
import { formatDateWithType } from '@/utility/utils'

import { ScheduleItem } from './ScheduleItem'

type ScheduleListProps = {
  todaySchedules: ScheduleType[]
}

const ScheduleList = ({ todaySchedules }: ScheduleListProps) => {
  if (!todaySchedules || !todaySchedules.length)
    return <p className="subtitle-M my-16 text-center text-gray-6">예정된 일정이 없어요!</p>

  return (
    <div className="flex-column gap-3">
      {todaySchedules.map((item) => (
        <ScheduleItem key={item.medicalId} item={item} />
      ))}
    </div>
  )
}

export const ScheduleListSection = () => {
  const router = useRouter()
  const { userId } = useParams<{ userId: string }>()

  const selectedDate = useSelectedDate()
  const localDate = formatDateWithType(selectedDate as Date, 'yearMonth')
  const { data: calendarData, isError, isLoading } = useClinicCalendar({ userId, localDate })

  if (isError || isLoading || !calendarData) return null

  const todaySchedules = calendarData.scheduleList.filter((item) =>
    item.hospitalDate.startsWith(formatDateWithType(selectedDate as Date, 'default')),
  )

  return (
    <>
      <div className="flex-between mb-3">
        <Label icon="clinic-label">병원 내원 일정</Label>
        <ActionTag.Plus
          label="추가"
          primary
          onClick={() => router.push(`/clinic/${userId}/create`)}
        />
      </div>

      <ScheduleList todaySchedules={todaySchedules} />
    </>
  )
}
