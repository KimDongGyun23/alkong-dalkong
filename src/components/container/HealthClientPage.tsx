'use client'

import dayjs from 'dayjs'

import { useHealthPage, useTodayWeight } from '@/store/queries'
import { useHealthPeriodEnglish, useSelectedWeight, useUserStore } from '@/store/stores'
import { formatDateWithType } from '@/utility/utils'

import { HealthReport, PeriodDropDown } from '../domain'
import { Button, DashBoardTemplate, Label } from '../view'

export const HealthClientPage = () => {
  const { user } = useUserStore()
  const period = useHealthPeriodEnglish()
  const weight = useSelectedWeight()

  const {
    data: healthData,
    isError,
    isPending,
  } = useHealthPage({ userId: user.userId, period: period })
  const { mutate: todayWeightMutation } = useTodayWeight()

  if (isError || isPending) return null

  const handleClickWeightEdit = () => {
    todayWeightMutation({
      physicalId: healthData?.data.physicalId,
      weight: parseFloat(weight),
      createdAt: formatDateWithType(dayjs().toString(), 'default'),
    })
  }

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
          <Button width="w-[100px]" primary onClick={handleClickWeightEdit}>
            수정
          </Button>
        </div>
      </section>

      <section className="flex-column mt-8 gap-2">
        <Label icon="health-label">건강 분석 리포트</Label>
        <HealthReport report={healthData.data.healthReport} />
      </section>
    </DashBoardTemplate>
  )
}
