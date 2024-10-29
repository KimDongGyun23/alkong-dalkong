import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type { EditAccountInfoRequest, EditPasswordRequest } from '@/types'
import { getCurrentIdToStorage } from '@/utility/utils'

import {
  createFamilyGroup,
  editAccountInfo,
  editPassowrd,
  enterFamilyGroup,
  familySetting,
} from './apis'

export const mypageQueryKeys = {
  all: () => {
    const currentId = getCurrentIdToStorage()
    return ['mypage', currentId] as const
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
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createFamilyGroup,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: mypageQueryKeys.familySetting() }),
  })
}

export const useEnterFamilyGroup = () => {
  return useMutation({
    mutationFn: enterFamilyGroup,
  })
}
