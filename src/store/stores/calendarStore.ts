import { create } from 'zustand'

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

type CalendarState = {
  selectedDate: ValuePiece
  actions: CalendarActions
}

type CalendarActions = {
  handleDateChange: (newDate: Value) => void
}

const initialDate = new Date()

export const useCalendarStore = create<CalendarState>((set) => ({
  selectedDate: initialDate,
  scheduledDates: [],
  actions: {
    handleDateChange: (newDate: Value) => {
      set({ selectedDate: Array.isArray(newDate) ? newDate[0] : newDate })
    },
  },
}))

export const useSelectedDate = () => useCalendarStore((state) => state.selectedDate)
export const useCalendarActions = () => useCalendarStore((state) => state.actions)
