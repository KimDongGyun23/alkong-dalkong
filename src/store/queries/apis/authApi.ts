import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'

import type { SignInRequest, SignUpRequest } from '@/types'

import { api } from '.'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const signInConfig = {
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  withCredentials: true,
}

export const login = async (request: SignInRequest) => {
  return await axios.post(`/user/login`, request, signInConfig)
}

export const reIssue = async (config: AxiosRequestConfig) => {
  console.log(config)
  return await axios.post(`${BASE_URL}/user/reissue`, {}, config)
}

export const checkDuplicateId = async (request: { id: string }) => {
  return await axios.post(`${BASE_URL}/user/validate-id`, request)
}

export const signUp = async (request: SignUpRequest) => {
  return await axios.post(`${BASE_URL}/user/signup`, request)
}

export const logOut = async () => {
  return await api.post('/user/logout')
}

export const deleteMembership = async () => {
  return await api.delete('/user/exit')
}
