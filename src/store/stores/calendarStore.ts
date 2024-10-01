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
  // setSelectedDate: (date: string) => void
  updateScheduledDates: (dates: Date[]) => void
  // resetCalendar: VoidFunction
  // setCreatedScheduleDate: (newDate: string) => void
  // swapSelectedDateToCreatedDate: VoidFunction
}

const initialDate = new Date()

export const useCalendarStore = create<CalendarState>((set, get) => ({
  selectedDate: initialDate,
  // createdScheduleDate: initialDate,
  scheduledDates: [],
  actions: {
    handleDateChange: (newDate: Value) => {
      set({ selectedDate: Array.isArray(newDate) ? newDate[0] : newDate })
    },
    updateScheduledDates: (newDates: Date[]) => {
      set({ scheduledDates: newDates })
    },
    // resetCalendar: () => {
    //   set({ selectedDate: initialDate, scheduledDays: [] })
    // },
    // setCreatedScheduleDate: (newDate: string) => {
    //   const formattedDate = dayjs(newDate).format('YYYY-MM-DD')
    //   set({ createdScheduleDate: formattedDate })
    // },
    // setSelectedDate: (newDate: string) => {
    //   const formattedDate = dayjs(newDate).format('YYYY-MM-DD')
    //   set({ selectedDate: formattedDate })
    // },
    // swapSelectedDateToCreatedDate: () => {
    //   const { createdScheduleDate } = get()
    //   set({ selectedDate: createdScheduleDate })
    // },
  },
}))

export const useSelectedDate = () => useCalendarStore((state) => state.selectedDate)
export const useScheduledDates = () => useCalendarStore((state) => state.scheduledDates)
export const useCalendarActions = () => useCalendarStore((state) => state.actions)
