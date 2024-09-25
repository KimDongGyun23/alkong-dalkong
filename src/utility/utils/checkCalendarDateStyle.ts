import dayjs from 'dayjs'

const DateItemColors = {
  active: 'bg-mint-6 text-white rounded-full',
  today: 'bg-mint-0 text-mint-6 rounded-full',
  schedule: 'bg-mint-3 rounded-full',
  sunday: 'text-mint-6',
  saturday: 'text-gray-6',
  default: '',
}

type checkCalendarDateStyleType = (date: string, indexOfDate: number, schedules: string[]) => string

export const checkCalendarDateStyle: checkCalendarDateStyleType = (
  date,
  indexOfDate,
  schedules,
) => {
  const currentMonthYear = dayjs(date).format('YYYY-MM')
  const currentDate = dayjs(`${currentMonthYear}-${indexOfDate}`)

  if (dayjs(date).date() === indexOfDate) return DateItemColors['active']
  if (schedules.includes(currentDate.format('YYYY-MM-DD'))) return DateItemColors['schedule']
  if (currentDate.day() === 0) return DateItemColors['sunday']
  if (currentDate.day() === 6) return DateItemColors['saturday']

  return DateItemColors['default']
}
