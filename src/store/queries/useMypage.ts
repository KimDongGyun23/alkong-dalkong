import { useMutation } from '@tanstack/react-query'

import type { EditAccountInfoRequest, EditPasswordRequest } from '@/types'

import { editAccountInfo, editPassowrd } from './apis'

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
