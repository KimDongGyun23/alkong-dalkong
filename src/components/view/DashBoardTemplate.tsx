'use client'
import type { PropsWithChildren } from 'react'
import { useRouter } from 'next/navigation'

import { BottomNav, MainHeader, Profile } from '@/components/view'

type DashBoardTemplateProps = {
  route: 'health' | 'home' | 'medicine' | 'clinic'
}

const HeaderTitle = {
  health: '님의\n최근체중 변화',
  home: '님의\n최근 건강 정보를 모아봤어요',
  medicine: '님\n 오늘의 약 챙겨드셨나요?',
}

export const DashBoardTemplate = ({
  children,
  route,
}: PropsWithChildren<DashBoardTemplateProps>) => {
  const isClinicPage = route !== 'clinic'
  const router = useRouter()

  return (
    <div className="flex-column h-full">
      {isClinicPage && <MainHeader.Setting title={HeaderTitle[route]} />}
      <main className="flex-1 overflow-y-scroll px-5 py-8 scrollbar-hide">
        {isClinicPage && (
          <div className="absolute right-5 top-[22px]">
            <Profile size="sm" bgColor="#C5FDEC" onClickProfile={() => router.push('mypage')} />
          </div>
        )}
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
