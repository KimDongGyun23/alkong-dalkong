import type { AccountInfoResponse, EditAccountInfoRequest, EditPasswordRequest } from '@/types'

import { api } from '.'

export const accountInfo = async () => {
  return await api.get<AccountInfoResponse>(`/mypage/edit-info`)
}

export const editAccountInfo = async (request: EditAccountInfoRequest) => {
  return await api.put(`/mypage/edit-info`, request)
}

export const editPassowrd = async (request: EditPasswordRequest) => {
  return await api.post(`/mypage/edit-password`, request)
}
