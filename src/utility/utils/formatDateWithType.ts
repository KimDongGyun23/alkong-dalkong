import dayjs from 'dayjs'

const DATE_FORMATS = {
  default: 'YYYY-MM-DD',
  time: 'HH:mm',
  fullTime: 'HH:mm:ss',
  dateTime: 'YYYY-MM-DD HH:mm:ss',
  fullDateWithTimeKorean: 'YYYY년 M월 D일 dddd A hh:mm',
}

type Type = (date: Date | string, formatType: keyof typeof DATE_FORMATS) => string

export const formatDateWithType: Type = (date, formatType = 'default') => {
  const format = DATE_FORMATS[formatType] || DATE_FORMATS.default
  return dayjs(date).format(format)
}
