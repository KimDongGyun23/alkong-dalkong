'use client'
import { useParams, useRouter } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'

import type { CreateMedicineRequest, ToggleTakenInfoRequest } from '@/types'
import {
  createMedicineInfo,
  deleteMedicine,
  editMedicine,
  medicineDetail,
  medicineEditInfo,
  medicineInfo,
  toggleTakenInfo,
} from '@/utility/apis'

export const medicineQueryKeys = {
  all: ['medicine'] as const,
  info: (userId: string) => [...medicineQueryKeys.all, 'info', userId] as const,
  detail: (userId: string) => [...medicineQueryKeys.all, 'detail', userId] as const,
  edit: (userId: string, medicineId: string) =>
    [...medicineQueryKeys.all, 'edit', userId, medicineId] as const,
}

export const useMedicineInfo = () => {
  const { userId } = useParams<{ userId: string }>()
  const today = dayjs().format('YYYY-MM-DD')

  return useQuery({
    queryKey: medicineQueryKeys.info(userId),
    queryFn: () => medicineInfo(userId, today),
  })
}

export const useMedicineDetail = () => {
  const { userId } = useParams<{ userId: string }>()

  return useQuery({
    queryKey: medicineQueryKeys.detail(userId),
    queryFn: () => medicineDetail(userId),
  })
}

export const useEditMedicineInfo = () => {
  const { userId, medicineId } = useParams<{ userId: string; medicineId: string }>()

  return useQuery({
    queryKey: medicineQueryKeys.edit(userId, medicineId),
    queryFn: () => medicineEditInfo(userId, medicineId),
  })
}

export const useCreateMedicineInfo = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { userId } = useParams<{ userId: string }>()

  return useMutation({
    mutationFn: (request: CreateMedicineRequest) => createMedicineInfo(userId, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: medicineQueryKeys.all })
      router.replace(`/medicine/${userId}/detail`)
    },
  })
}

export const useToggleTakenInfo = () => {
  const { userId } = useParams<{ userId: string }>()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ recordId, request }: { recordId: number; request: ToggleTakenInfoRequest }) =>
      toggleTakenInfo(recordId, request),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: medicineQueryKeys.info(userId) }),
  })
}

export const useDeleteMedicine = () => {
  const { userId } = useParams<{ userId: string }>()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (medicineId: number) => deleteMedicine(userId, medicineId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: medicineQueryKeys.all }),
  })
}

export const useEditMedicine = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { userId, medicineId } = useParams<{ userId: string; medicineId: string }>()

  return useMutation({
    mutationFn: (request: CreateMedicineRequest) => editMedicine(userId, medicineId, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: medicineQueryKeys.all })
      router.replace(`/medicine/${userId}/detail`)
    },
  })
}
