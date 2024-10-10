import { useQuery } from '@tanstack/react-query'

import type { HealthPageRequest } from '@/types'

import { healthPage } from './apis'

export const healthQueryKeys = {
  all: ['health'] as const,
  home: (userId: string, period: string) => [...healthQueryKeys.all, userId, period] as const,
}

export const useHealthPage = ({ userId, period }: HealthPageRequest) =>
  useQuery({
    queryKey: healthQueryKeys.home(userId, period),
    queryFn: () => healthPage({ userId, period }),
  })
