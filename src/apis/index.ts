import { HttpClient } from './HttpClient'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const api = new HttpClient({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
