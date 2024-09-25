import dayjs from 'dayjs'

import type { HomeResponseType } from '@/types'

import { api } from '../../apis'

export const getHomePageData = async (userId: string) => {
  const currentTime = dayjs().format('YYYY-MM-DD HH:mm:ss')

  return await api.get<HomeResponseType>(`/main/${userId}/${currentTime}`)
}
