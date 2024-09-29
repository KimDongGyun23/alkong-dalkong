export type HomeType = {
  upcomingMedicalInfo: UpcomingMedicalInfoType
  recentMedicalInfo: RecentMedicalInfoType
  recentWeightInfo: RecentWeightInfoType
  currentMedicineInfo: CurrentMedicineInfoType
}

export type HomeRequest = {
  userId: string
  currentTime: string
}

export type HomeResponse = {
  code: number
  data: HomeType
}

export type UpcomingMedicalInfoType = {
  hospitalName: string
  hospitalDate: string
  medicalPart: string[]
}

export type RecentMedicalInfoType = {
  hospitalName: string
  hospitalDate: string
}

export type RecentWeightInfoType = {
  weight: number
  date: string
}

export type CurrentMedicineInfoType = {
  medicineName: string
  times: string[]
  weekList: string[]
}[]
