import { useEffect } from 'react'
import type { Meta, StoryFn } from '@storybook/react'

import { useCalendarActions } from '@/store/stores'

import { Calendar } from './Calendar'

export default {
  title: 'Calendar',
  component: Calendar,
} as Meta

export const Default: StoryFn = () => {
  const { resetCalendar } = useCalendarActions()

  useEffect(() => {
    resetCalendar()
  }, [])

  return (
    <div className="mx-auto h-[368px] w-[343px]">
      <Calendar />
    </div>
  )
}

const schedules = ['2024-08-27 12:00:00', '2024-09-18 13:00:00', '2024-09-29 14:00:00']

export const WithSchedules: StoryFn = () => {
  const { resetCalendar, updateScheduledDates } = useCalendarActions()

  useEffect(() => {
    resetCalendar()
    updateScheduledDates(schedules)
  }, [resetCalendar, updateScheduledDates])
  return (
    <div className="mx-auto h-[368px] w-[343px]">
      <Calendar />
    </div>
  )
}
