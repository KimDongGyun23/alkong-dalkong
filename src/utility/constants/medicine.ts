export const EVERYDAY = ['일', '월', '화', '수', '목', '금', '토']
export const WEEKDAYS = EVERYDAY.slice(1, 6)
export const WEEKENDS = EVERYDAY.slice(0, 1).concat(EVERYDAY.slice(6))

export const EN_DAYS = [
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
]

export const MEDICINE_ALARM_TIME = ['1시간 전', '30분 전', '10분전', '없음']
export const MEDICINE_DOSAGE_MAX_VALUE = 9
