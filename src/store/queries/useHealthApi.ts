import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type { HealthPageRequest } from '@/types'
import { getUserDataToLocalStorage } from '@/utility/utils'

import { healthPage, todayWeight } from './apis'

export const healthQueryKeys = {
  all: () => {
    const { currentId } = getUserDataToLocalStorage()
    return ['health', currentId] as const
  },
  home: (userId: string, period: string) => [...healthQueryKeys.all(), userId, period] as const,
}

export const useHealthPage = ({ userId, period }: HealthPageRequest) =>
  useQuery({
    queryKey: healthQueryKeys.home(userId, period),
    queryFn: () => healthPage({ userId, period }),
  })

export const useTodayWeight = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: todayWeight,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: healthQueryKeys.all() }),
  })
}
