import dayjs from 'dayjs'

type dayjsFormattingType = (data: string, toFormat: string, fromFormat?: string) => string

export const dayjsFormatting: dayjsFormattingType = (date, toFormat, fromFormat) => {
  if (fromFormat) return dayjs(date, fromFormat).format(toFormat)
  else return dayjs(date).format(toFormat)
}
