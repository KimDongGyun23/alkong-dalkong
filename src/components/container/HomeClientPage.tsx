'use client'
import dayjs from 'dayjs'

import { useHome } from '@/store/queries/useHome'

import { ClinicSection } from '../domain/home/ClinicSection'
import { MedicineSection } from '../domain/home/MedicineSection'
import { WeightSection } from '../domain/home/WeightSection'

export const HomeClientPage = ({ userId }: { userId: string }) => {
  const currentTime = dayjs().format('YYYY-MM-DD')
  const { data: homePageData, status } = useHome({ userId, currentTime })

  if (status === 'pending') return <div>로딩 중...</div>
  if (status === 'error') return <div>오류가 발생했습니다.</div>

  if (!homePageData || !homePageData.data) {
    return <div>데이터를 불러오지 못했습니다.</div>
  }

  const { upcomingInfo, recentInfo, weightInfo, medicineInfo } = homePageData.data

  return (
    <>
      <ClinicSection upcomingInfo={upcomingInfo} recentInfo={recentInfo} />
      <WeightSection weightInfo={weightInfo} />
      <MedicineSection medicineInfo={medicineInfo} />
    </>
  )
}
