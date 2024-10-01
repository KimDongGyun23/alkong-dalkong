import { create } from 'zustand'

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

type CalendarState = {
  selectedDate: ValuePiece
  // createdScheduleDate: string
  scheduledDates: Date[]
  actions: CalendarActions
}

type CalendarActions = {
  handleDateChange: (newDate: Value) => void
  updateScheduledDates: (dates: Date[]) => void
}

const initialDate = new Date()

export const useCalendarStore = create<CalendarState>((set, get) => ({
  selectedDate: initialDate,
  scheduledDates: [],
  actions: {
    handleDateChange: (newDate: Value) => {
      set({ selectedDate: Array.isArray(newDate) ? newDate[0] : newDate })
    },
    updateScheduledDates: (newDates: Date[]) => {
      set({ scheduledDates: newDates })
    },
  },
}))

export const useSelectedDate = () => useCalendarStore((state) => state.selectedDate)
export const useScheduledDates = () => useCalendarStore((state) => state.scheduledDates)
export const useCalendarActions = () => useCalendarStore((state) => state.actions)
