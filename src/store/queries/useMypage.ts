import { useMutation } from '@tanstack/react-query'

import type { EditAccountInfoRequest } from '@/types'

import { editAccountInfo } from './apis'

export const mypageQueryKeys = {
  all: ['mypage'] as const,
  accountInfo: ['mypage'] as const,
}

export const useEditAccountInfo = () => {
  return useMutation({
    mutationFn: (request: EditAccountInfoRequest) => editAccountInfo(request),
  })
}
