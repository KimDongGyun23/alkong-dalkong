import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  clinicCalendar,
  clinicInfo,
  createClinicInfo,
  deleteClinicInfo,
  editClinicInfo,
} from '@/features'
import type { ClinicCalendarRequest } from '@/types'

export const queryKeys = {
  all: ['clinic'] as const,
  detail: (medicalId: number) => [...queryKeys.all, 'detail', medicalId] as const,
  calendar: (userId: string, localDate: string) =>
    [...queryKeys.all, 'calendar', userId, localDate] as const,
}

export const useClinicInfo = (medicalId: number) =>
  useQuery({
    queryKey: queryKeys.detail(medicalId),
    queryFn: () => clinicInfo(medicalId),
  })

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

export const useEditClinicInfo = (medicalId: number) => {
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
