import { useMutation } from '@tanstack/react-query'

import type { EditAccountInfoRequest, EditPasswordRequest } from '@/types'

import { createFamilyGroup, editAccountInfo, editPassowrd, enterFamilyGroup } from './apis'

export const mypageQueryKeys = {
  all: ['mypage'] as const,
  accountInfo: ['mypage'] as const,
}

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
