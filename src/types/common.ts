export type CheckBoxSectionType = 'personal' | 'notification'

export type BottomSheetType = {
  section: string
  isShowing: boolean
  onClickScrim: VoidFunction
}
