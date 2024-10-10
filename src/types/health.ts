export type HealthPageRequest = {
  userId: string
  period: string
}

export type WeightType = {
  weightId: number
  weight: number
}

export type WeightInfoType = {
  avgWeight: number
  avgDate: string
}

export type HealthReportType = {
  apiAvgWeight: number
  diffWeight: number
  laskweekWeight: number
}

export type HealthPageResponse = {
  code: number
  period: string
  data: {
    physicalId: number
    wegiht: WeightType
    weightInfo: WeightInfoType[]
    healthReport: HealthReportType
  }
}
