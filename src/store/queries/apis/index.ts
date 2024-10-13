import { HttpClient } from './HttpClient'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const api = new HttpClient({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

export * from './authApi'
export * from './clinicApi'
export * from './healthApi'
export * from './homeApi'
export * from './HttpClient'
export * from './medicineApi'
export * from './mypageApi'
