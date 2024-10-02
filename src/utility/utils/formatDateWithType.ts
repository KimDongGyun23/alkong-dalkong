import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

const DATE_FORMATS = {
  default: 'YYYY-MM-DD',
  time: 'HH:mm',
  fullTime: 'HH:mm:ss',
  dateTime: 'YYYY-MM-DD HH:mm:ss',
  fullDateTimeWithKorean: 'YYYY년 M월 D일 dddd A hh:mm',
}

type Type = (
  date: Date | string,
  toFormatType: keyof typeof DATE_FORMATS,
  fromFormatType?: keyof typeof DATE_FORMATS,
) => string

export const formatDateWithType: Type = (date, toFormatType = 'default', fromFormatType) => {
  const format = DATE_FORMATS[toFormatType] || DATE_FORMATS.default

  if (fromFormatType) {
    return dayjs(date, DATE_FORMATS[fromFormatType]).format(format)
  }
  return dayjs(date).format(format)
}

export const convertDayjsToDate = (date: string, fromFormatType: keyof typeof DATE_FORMATS) => {
  if (fromFormatType) {
    return dayjs(date, DATE_FORMATS[fromFormatType]).toDate()
  }
  return dayjs(date).toDate()
}
