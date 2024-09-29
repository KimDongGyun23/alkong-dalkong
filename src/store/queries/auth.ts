import axios from 'axios'
import Cookies from 'js-cookie'

import type { SignInRequest, SignInRequest, SignUpRequest } from '@/types'

import { api } from '../../utility/apis'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const signInConfig = {
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  withCredentials: true,
}

export const signIn = async (request: SignInRequest) => {
  const res = await axios.post(`/user/login`, request, signInConfig)

  const refreshToken = Cookies.get('refresh')
  const accessToken: string = res.headers['authorization']

  return { ...res.data, accessToken, refreshToken }
}

export const checkDuplicateId = async (request: { id: string }) => {
  return await axios.post(`${BASE_URL}/user/validate-id`, request)
}

export const signUp = async (request: SignUpRequest) => {
  return await axios.post(`${BASE_URL}/user/signup`, request)
}

export const signOut = async () => {
  return await api.post('/user/logout')
}
