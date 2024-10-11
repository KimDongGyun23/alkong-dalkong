import type { HealthPageRequest, HealthPageResponse, TodayWeightRequest } from '@/types'

import { api } from '.'

export const healthPage = async ({ userId, period }: HealthPageRequest) => {
  return await api.get<HealthPageResponse>(`/physical/${userId}`, { params: { period } })
}

export const todayWeight = async (request: TodayWeightRequest) => {
  return await api.post('/physical', request)
}
