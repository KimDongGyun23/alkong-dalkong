export type MedicineFormType = {
  medicineName: string
  medicineWeek: string
  medicineTimes: number
  medicineTakenTimeList: string[]
  medicinePeriod: string
  medicineDosage: string
  medicineMemo: string
  medicineAlarm: string
}

export type CreateMedicineRequest = {
  medicineName: string
  medicineWeek: string[]
  medicineTimes: number
  medicineTakenTimeList: string[]
  medicineStart: string
  medicineEnd: string
  medicineDosage: number
  medicineTakenType: number
  medicineMemo: string
  medicineAlarm: number
}

export type MedicineDateDtoType = {
  medicineId: number
  medicineRecordId: number
  medicineName: string
  medicineDosage: number
  medicineTakenType: string
}

export type MedicineTakenInfoType = {
  [key: string]: {
    medicine_id: number
    taken: string
    index: number
  }[]
}

export type MedicineInfoResponse = {
  code: number
  data: {
    medicineDateDtoList: MedicineDateDtoType[]
    medicineTakenInfo: MedicineTakenInfoType
  }
}

export type ToggleTakenInfoRequest = {
  timeNum: number
  takenNum: number
}

export type MedicineDetailType = {
  medicineId: number
  medicineName: string
  medicineWeek: string[]
  medicineTakenTime: string[]
  medicineDosage: number
  medicineTakenType: string
  medicineMemo: string
}

export type MedicineDetailResponse = {
  code: number
  data: MedicineDetailType[]
}

export type MedicineEditResponse = {
  code: number
  data: Omit<CreateMedicineRequest, 'medicineStart' | 'medicineEnd' | 'medicineTakenTimeList'> & {
    medicineEndDate: string
    medicineTakenType: string
    medicineTakenTime: string[]
  }
}
