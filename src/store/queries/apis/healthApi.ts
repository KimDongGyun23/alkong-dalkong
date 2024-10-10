import type { HealthPageRequest, HealthPageResponse } from '@/types'

import { api } from '.'

export const healthPage = async ({ userId, period }: HealthPageRequest) => {
  return await api.get<HealthPageResponse>(`/physical/${userId}`, { params: { period } })
}
