const MEDICINE_STATUS = ['TAKEN', 'NOT_TAKEN'] as const
const MEDICINE_UNIT = {
  DOSE: '회분',
  TABLET: '정',
} as const

type TakenType = keyof typeof MEDICINE_UNIT

export const isTakenMedicine = (type: string) => {
  return type === MEDICINE_STATUS[0]
}

export const getMedicineUnitInKorean = (takenType: string) => {
  return MEDICINE_UNIT[takenType as TakenType]
}
