'use client'
import { useMutation, useQuery } from '@tanstack/react-query'

import type { EditAccountInfoRequest, EditPasswordRequest } from '@/types'

import { useUserStore } from '../stores'

import {
  createFamilyGroup,
  editAccountInfo,
  editPassowrd,
  enterFamilyGroup,
  familySetting,
} from './apis'

export const mypageQueryKeys = {
  all: () => {
    const { user } = useUserStore.getState()
    return ['mypage', user.loginId] as const
  },
  familySetting: () => [...mypageQueryKeys.all(), 'familySetting'] as const,
}

export const useFamilySetting = () =>
  useQuery({
    queryKey: mypageQueryKeys.familySetting(),
    queryFn: familySetting,
  })

export const useEditAccountInfo = () => {
  return useMutation({
    mutationFn: (request: EditAccountInfoRequest) => editAccountInfo(request),
  })
}

export const useEditPassword = () => {
  return useMutation({
    mutationFn: (request: EditPasswordRequest) => editPassowrd(request),
  })
}

export const useCreateFamilyGroup = () => {
  return useMutation({
    mutationFn: createFamilyGroup,
  })
}

export const useEnterFamilyGroup = () => {
  return useMutation({
    mutationFn: enterFamilyGroup,
  })
}
