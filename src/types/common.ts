export type CheckBoxSectionType = 'personal' | 'notification'

export type BottomSheetType = {
  section: string
  isShowing: boolean
  onClickScrim: VoidFunction
}

export type CalendarValuePiece = Date | null
export type CalendarValue = CalendarValuePiece | [CalendarValuePiece, CalendarValuePiece]
