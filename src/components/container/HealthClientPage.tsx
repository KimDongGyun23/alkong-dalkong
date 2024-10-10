'use client'

import { useHealthPage } from '@/store/queries/useHealthApi'
import { useHealthPeriodEnglish, useUserStore } from '@/store/stores'

import { HealthReport, PeriodDropDown } from '../domain'
import { DashBoardTemplate, Label } from '../view'

export const HealthClientPage = () => {
  const { user } = useUserStore()
  const period = useHealthPeriodEnglish()
  const {
    data: healthData,
    isError,
    isPending,
  } = useHealthPage({ userId: user.userId, period: period })

  if (isError || isPending) return null

  console.log(healthData)

  return (
    <DashBoardTemplate route="health">
      <section>
        <div className="flex-align gap-[19px]">
          <Label icon="check-label">체중 그래프</Label>
          <PeriodDropDown />
        </div>
        <div>그래프</div>
      </section>

      <section className="flex-column mt-8 gap-2">
        <Label icon="health-label">건강 분석 리포트</Label>
        <HealthReport report={healthData.data.healthReport} />
      </section>
    </DashBoardTemplate>
  )
}
