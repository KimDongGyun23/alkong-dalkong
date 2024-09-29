import dayjs from 'dayjs'

import 'dayjs/locale/ko'

const weekEn2Ko: { [key: string]: string } = {
  MONDAY: '월',
  TUESDAY: '화',
  WEDNESDAY: '수',
  THURSDAY: '목',
  FRIDAY: '금',
  SATURDAY: '토',
  SUNDAY: '일',
}

export const getDiffDay = (date: string) => {
  const now = dayjs().locale('ko').startOf('day')

  return now.diff(dayjs(date).locale('ko').startOf('day'), 'day')
}

export const formatInfoTime = (times: string[], weekList: string[]) => {
  let schedule = ''
  if (weekList.length === 7) {
    schedule = '매일'
  } else {
    const formatKo = weekList.map((week) => weekEn2Ko[week])
    schedule = formatKo.join(', ')
  }

  if (times.length === 1) {
    schedule += ` ${times[0]}`
  } else {
    schedule += ` ${times.length}회`
  }

  return schedule
}

export const formatKoDate = (date: string) => {
  return dayjs(date).locale('ko').format('M/D(ddd) HH:mm')
}
