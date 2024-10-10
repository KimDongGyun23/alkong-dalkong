'use client'
import { useUserStore } from '@/store/stores'
import type { HealthReportType } from '@/types'

type HealthReportProps = {
  report: HealthReportType
}

export const HealthReport = ({ report }: HealthReportProps) => {
  const { user } = useUserStore()
  const { apiAvgWeight, diffWeight, laskweekWeight } = report

  return (
    <>
      <p className="subtitle-M grow rounded-xl bg-mint-0 py-[14px] pl-6">
        {user.name}님과 같은 성별, 나이의 평균
        <br />
        몸무게인 {apiAvgWeight}kg보다 {diffWeight}kg 낮아요.
      </p>

      {laskweekWeight && (
        <p className="subtitle-M grow rounded-xl bg-mint-0 py-[14px] pl-6">
          {user.name}님의 평균 체중이
          <br />
          지난주보다 {laskweekWeight} 감소했어요.
        </p>
      )}
    </>
  )
}
