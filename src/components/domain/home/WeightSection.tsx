import { Label } from '@/components/view'
import type { RecentWeightInfoType } from '@/types'
import { getDiffDay } from '@/utility/utils'

type WeightSectionProps = {
  weightInfo: RecentWeightInfoType
}

export const WeightSection = ({ weightInfo }: WeightSectionProps) => {
  return (
    <section className="mb-8 w-full">
      <Label icon="health-label">체중 기록</Label>
      <div className="flex-column mt-2 gap-3">
        {weightInfo ? (
          <div className="flex items-center justify-between rounded-xl border border-mint-3 px-6 py-4">
            <span className="subtitle-B">{`${weightInfo.weight}kg`}</span>
            <span className="headline-R text-gray-6">{`${getDiffDay(weightInfo.date)}일 전`}</span>
          </div>
        ) : (
          <div className="flex items-center justify-between rounded-xl border border-mint-3 px-6 py-4">
            <span className="subtitle-M text-gray-6">건강에서 내 체중을 추가해 보세요!</span>
          </div>
        )}
      </div>
    </section>
  )
}
