import { useQuery } from '@tanstack/react-query'

import type { HomeResponseType } from '@/types'

import { getHomePageData } from './home'

export const useHome = (userId: string) => {
  return useQuery<HomeResponseType>({
    queryKey: [userId],
    queryFn: () => getHomePageData(userId),
  })
}
