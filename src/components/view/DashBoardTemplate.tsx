'use client'
import type { PropsWithChildren } from 'react'

import { BottomNav, MainHeader } from '@/components/view'

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
  return (
    <div className="flex-column h-full">
      {route !== 'clinic' && <MainHeader.Setting title={HeaderTitle[route]} />}
      <main className="flex-1 overflow-y-scroll px-5 py-8 scrollbar-hide">{children}</main>
      <BottomNav />
    </div>
  )
}
