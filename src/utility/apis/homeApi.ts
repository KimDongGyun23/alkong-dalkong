import type { HomeRequest, HomeResponse } from '@/types'
import { api } from '@/utility/apis'

export const homeData = async ({ userId, currentTime }: HomeRequest) => {
  return await api.get<HomeResponse>(`/main/${userId}/${currentTime}`)
}
