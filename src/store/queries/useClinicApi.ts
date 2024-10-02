import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type { ClinicCalendarRequest } from '@/types'
import {
  clinicCalendar,
  createClinicInfo,
  deleteClinicInfo,
  editClinicInfo,
} from '@/utility/apis/clinicApi'

export const queryKeys = {
  all: ['clinic'] as const,
  detail: (medicalId: string) => [...queryKeys.all, 'detail', medicalId] as const,
  calendar: (userId: string, localDate: string) =>
    [...queryKeys.all, 'calendar', userId, localDate] as const,
}

export const useClinicCalendar = ({ userId, localDate }: ClinicCalendarRequest) =>
  useQuery({
    queryKey: queryKeys.calendar(userId, localDate),
    queryFn: () => clinicCalendar({ userId, localDate }),
  })

export const useCreateClinicInfo = () => {
  return useMutation({
    mutationFn: createClinicInfo,
  })
}

export const useEditClinicInfo = (medicalId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: editClinicInfo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.detail(medicalId) }),
  })
}

export const useDeleteClinicInfo = () => {
  return useMutation({
    mutationFn: deleteClinicInfo,
  })
}
