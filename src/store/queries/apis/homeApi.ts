import { api } from '@/store/queries/apis'
import type { HomeRequest, HomeResponse } from '@/types'

export const homeData = async ({ userId, currentTime }: HomeRequest) => {
  return await api.get<HomeResponse>(`/main/${userId}/${currentTime}`)
}
