import { useQuery } from '@tanstack/react-query'

import type { HomeRequest } from '@/types'
import { homeData } from '@/utility/apis'

export const homeQueryKeys = {
  all: ['home'] as const,
}

export const useHome = (url: HomeRequest) => {
  return useQuery({
    queryKey: homeQueryKeys.all,
    queryFn: () => homeData(url),
    select: (data) => ({
      code: data.code,
      data: {
        upcomingInfo: data.data.upcomingMedicalInfo,
        recentInfo: data.data.recentMedicalInfo,
        weightInfo: data.data.recentWeightInfo,
        medicineInfo: data.data.currentMedicineInfo,
      },
    }),
  })
}
