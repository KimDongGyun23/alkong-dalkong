import { useQuery } from '@tanstack/react-query'

import type { HomeRequest } from '@/types'
import { homeData } from '@/utility'

export const queryKeys = {
  all: ['home'] as const,
}

export const useHome = (url: HomeRequest) => {
  return useQuery({
    queryKey: queryKeys.all,
    queryFn: () => homeData(url),
  })
}
