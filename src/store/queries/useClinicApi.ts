import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  clinicCalendar,
  createClinicInfo,
  deleteClinicInfo,
  editClinicInfo,
} from '@/store/queries/apis/clinicApi'
import type { ClinicCalendarRequest, ScheduleType } from '@/types'

export const clinicQueryKeys = {
  all: ['clinic'] as const,
  detail: (medicalId: string) => [...clinicQueryKeys.all, 'detail', medicalId] as const,
  calendar: (userId: string, localDate: string) =>
    [...clinicQueryKeys.all, 'calendar', userId, localDate] as const,
}

export const useClinicCalendar = ({ userId, localDate }: ClinicCalendarRequest) =>
  useQuery({
    queryKey: clinicQueryKeys.calendar(userId, localDate),
    queryFn: () => clinicCalendar({ userId, localDate }),
    select: (data) => {
      const scheduleData = data.data || []
      const newScheduledDates = scheduleData.map(
        (clinicInfo: ScheduleType) => new Date(clinicInfo.hospitalDate),
      )

      return {
        scheduleList: scheduleData || [],
        scheduledDates: newScheduledDates || [],
      }
    },
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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: clinicQueryKeys.detail(medicalId) }),
  })
}

export const useDeleteClinicInfo = () => {
  return useMutation({
    mutationFn: deleteClinicInfo,
  })
}
