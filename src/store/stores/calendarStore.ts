import dayjs from 'dayjs'
import { create } from 'zustand'

type CalendarState = {
  selectedDate: string
  createdScheduleDate: string
  scheduledDays: string[]
  actions: CalendarActions
}

type CalendarActions = {
  goToPreviousMonth: VoidFunction
  goToNextMonth: VoidFunction
  setSelectedDate: (date: string) => void
  updateScheduledDates: (dates: string[]) => void
  resetCalendar: VoidFunction
  setCreatedScheduleDate: (newDate: string) => void
  swapSelectedDateToCreatedDate: VoidFunction
}

const initialDate = dayjs().format('YYYY-MM-DD')

export const useCalendarStore = create<CalendarState>((set, get) => ({
  selectedDate: initialDate,
  createdScheduleDate: initialDate,
  scheduledDays: [],
  actions: {
    goToPreviousMonth: () => {
      const { selectedDate } = get()
      const previousMonthDate = dayjs(selectedDate).subtract(1, 'month').format('YYYY-MM-DD')
      set({ selectedDate: previousMonthDate, scheduledDays: [] })
    },
    goToNextMonth: () => {
      const { selectedDate } = get()
      const nextMonthDate = dayjs(selectedDate).add(1, 'month').format('YYYY-MM-DD')
      set({ selectedDate: nextMonthDate, scheduledDays: [] })
    },
    updateScheduledDates: (dates: string[]) => {
      const uniqueDays = Array.from(new Set(dates.map((date) => dayjs(date).format('YYYY-MM-DD'))))
      set({ scheduledDays: uniqueDays })
    },
    resetCalendar: () => {
      set({ selectedDate: initialDate, scheduledDays: [] })
    },
    setCreatedScheduleDate: (newDate: string) => {
      const formattedDate = dayjs(newDate).format('YYYY-MM-DD')
      set({ createdScheduleDate: formattedDate })
    },
    setSelectedDate: (newDate: string) => {
      const formattedDate = dayjs(newDate).format('YYYY-MM-DD')
      set({ selectedDate: formattedDate })
    },
    swapSelectedDateToCreatedDate: () => {
      const { createdScheduleDate } = get()
      set({ selectedDate: createdScheduleDate })
    },
  },
}))

export const useCurrentDate = () => useCalendarStore((state) => state.selectedDate)
export const useScheduledDays = () => useCalendarStore((state) => state.scheduledDays)
export const useCalendarActions = () => useCalendarStore((state) => state.actions)
