import { HealthReport, WedightOfToday } from '@/components/domain'
import { PeriodDropDown } from '@/components/domain'
import { DashBoardTemplate, Label } from '@/components/view'

export type HealthRouteParams = {
  params: { userId: string }
}

const Health = ({ params: { userId } }: HealthRouteParams) => {
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
        <WedightOfToday />
      </section>

      <section className="flex-column mt-8 gap-2">
        <Label icon="health-label">건강 분석 리포트</Label>
        <HealthReport />
      </section>
    </DashBoardTemplate>
  )
}

export default Health
