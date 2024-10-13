'use client'

import { useEffect } from 'react'

import { useToggle } from '@/hooks'
import { useHealthPage } from '@/store/queries'
import { useHealthPeriodEnglish, useSelectedWeightActions, useUserStore } from '@/store/stores'

import { HealthChart, HealthReport, PeriodDropDown, WeightBottomSheet } from '../domain'
import { Button, DashBoardTemplate, Label } from '../view'

export const HealthClientPage = () => {
  const period = useHealthPeriodEnglish()
  const [weightSheet, toggleWeightSheet] = useToggle(false)

  const { user } = useUserStore()
  const { setInitialWeight } = useSelectedWeightActions()

  const {
    data: healthData,
    isError,
    isPending,
  } = useHealthPage({ userId: user.userId, period: period })

  useEffect(() => {
    if (healthData?.data) {
      const serverWeight = healthData.data.weight.weight.toString()
      console.log(serverWeight)
      setInitialWeight(serverWeight)
    }
  }, [healthData, setInitialWeight])

  if (isError || isPending) return null

  console.log(healthData)

  return (
    <DashBoardTemplate route="health">
      <section>
        <div className="flex-align gap-[19px]">
          <Label icon="check-label">체중 그래프</Label>
          <PeriodDropDown />
        </div>
        <HealthChart />
      </section>

      <section className="flex-column mt-10 gap-2">
        <Label icon="emergency-label">오늘의 체중</Label>
        <div className="flex-align w-full gap-[7px]">
          <input
            readOnly
            className="subtitle-M grow rounded-xl bg-mint-0 px-6 py-[14px] focus:outline-none"
            size={5}
            value={`${healthData.data.weight.weight}kg`}
            placeholder="아직 기록이 없어요."
          />
          <Button width="w-[100px]" primary onClick={toggleWeightSheet}>
            수정
          </Button>
        </div>
        <WeightBottomSheet
          physicalId={healthData.data.physicalId}
          isShowing={weightSheet}
          onClickScrim={toggleWeightSheet}
        />
      </section>

      <section className="flex-column mt-8 gap-2">
        <Label icon="health-label">건강 분석 리포트</Label>
        <HealthReport report={healthData.data.healthReport} />
      </section>
    </DashBoardTemplate>
  )
}
