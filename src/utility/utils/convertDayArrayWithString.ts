import dayjs from 'dayjs'

export const DAYS = {
  일: 'SUNDAY',
  월: 'MONDAY',
  화: 'TUESDAY',
  수: 'WEDNESDAY',
  목: 'THURSDAY',
  금: 'FRIDAY',
  토: 'SATURDAY',
}
type DayKey = keyof typeof DAYS

const EVERYDAY_KO = Object.keys(DAYS)
const WEEKDAYS_KO = EVERYDAY_KO.slice(1, 6)
const WEEKENDS_KO = [EVERYDAY_KO[0], EVERYDAY_KO[6]]

type convertDayArrayToStringType = (days: string[]) => string
export const convertDayArrayToString: convertDayArrayToStringType = (days) => {
  const isWeekdays =
    WEEKDAYS_KO.every((day) => days.includes(day)) && days.length === WEEKDAYS_KO.length
  const isWeekends =
    WEEKENDS_KO.every((day) => days.includes(day)) && days.length === WEEKENDS_KO.length
  const isEveryDay = EVERYDAY_KO.every((day) => days.includes(day)) && days.length === 7

  if (isEveryDay) {
    return '매일'
  } else if (isWeekdays) {
    return '평일'
  } else if (isWeekends) {
    return '주말'
  } else {
    return days.join(', ')
  }
}

type convertDayStringToArrayType = (fieldValue: string) => string[]
export const convertDayStringToArray: convertDayStringToArrayType = (fieldValue) => {
  if (fieldValue === '매일') {
    return [...WEEKDAYS_KO, ...WEEKENDS_KO]
  } else if (fieldValue === '평일') {
    return WEEKDAYS_KO
  } else if (fieldValue === '주말') {
    return WEEKENDS_KO
  } else {
    return fieldValue.split(', ').map((day) => day.trim())
  }
}

type convertDayArrayToEnglishType = (days: string[]) => string[]
export const convertDayArrayToEnglish: convertDayArrayToEnglishType = (days) => {
  return days.map((day) => DAYS[day as DayKey])
}

type convertEnglishDaysToKoreanType = (days: string[]) => string[]
export const convertDayArrayToKorean: convertEnglishDaysToKoreanType = (days) => {
  const ENGLISH_TO_KOREAN = Object.fromEntries(Object.entries(DAYS).map(([ko, en]) => [en, ko]))
  return days.map((day) => ENGLISH_TO_KOREAN[day])
}

type getDiffDayType = (date: string) => number
export const getDiffDay: getDiffDayType = (date) => {
  const now = dayjs().locale('ko').startOf('day')
  return Math.abs(now.diff(dayjs(date).locale('ko').startOf('day'), 'day'))
}

type formatInfoTimeType = (times: string[], weekList: string[]) => string
export const formatInfoTime: formatInfoTimeType = (times, weekList) => {
  let schedule = ''

  if (weekList.length === 7) {
    schedule = '매일'
  } else {
    const formatKo = weekList.map((week) => convertDayArrayToKorean([week])[0])
    schedule = formatKo.join(', ')
  }

  if (times.length === 1) {
    schedule += ` ${times[0].slice(0, -3)}`
  } else {
    schedule += ` ${times.length}회`
  }

  return schedule
}
