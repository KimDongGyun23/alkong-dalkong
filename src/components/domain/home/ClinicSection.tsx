import { Label, Tag } from '@/components'
import type { RecentMedicalInfoType, UpcomingMedicalInfoType } from '@/types'
import { formatDateWithType } from '@/utility/utils'
import { getDiffDay } from '@/utility/utils/dates'

type ClinicSectionProps = {
  upcomingInfo: UpcomingMedicalInfoType
  recentInfo: RecentMedicalInfoType
}

export const UpcomingMedicalInfo = ({ upcomingInfo }: Pick<ClinicSectionProps, 'upcomingInfo'>) => {
  const { hospitalDate, hospitalName, medicalPart } = upcomingInfo
  const diffDays = getDiffDay(hospitalDate)
  const upcoming = diffDays === 0 ? '오늘' : diffDays === 1 ? '내일' : `${diffDays}일 후`

  return (
    <div className="flex-column gap-10 rounded-xl border border-mint-4 px-5 py-4 text-black shadow-[0_0_12px_rgba(2,41,34,0.1)]">
      <div>
        <div className="subtitle-B mb-1">
          {upcoming}, {formatDateWithType(hospitalDate, 'timeWithSlashDate')}
        </div>
        <div className="headline-M">{hospitalName}</div>
      </div>

      <div className="flex items-center gap-2">
        <Tag label={(medicalPart && medicalPart[0]) ?? ''} />
        <span className="headline-M text-black">때문에 방문할 예정이에요.</span>
      </div>
    </div>
  )
}

const RecentMedicalInfo = ({ recentInfo }: Pick<ClinicSectionProps, 'recentInfo'>) => {
  const { hospitalName, hospitalDate } = recentInfo

  return (
    <div className="flex-column gap-10 rounded-xl border-gray-4 bg-gray-1 px-5 py-4 text-gray-6">
      <div>
        <div className="subtitle-B mb-1">
          {`${getDiffDay(hospitalDate)}일 전, ${formatDateWithType(hospitalDate, 'timeWithSlashDate')}`}
        </div>
        <div className="headline-M">{hospitalName}</div>
      </div>
    </div>
  )
}

export const ClinicSection = ({ upcomingInfo, recentInfo }: ClinicSectionProps) => {
  return (
    <section className="mb-8 w-full">
      <Label icon="clinic-label">병원 내원 일정</Label>
      <div className="flex-column mt-2 gap-3">
        {!upcomingInfo && !recentInfo && (
          <div className="flex items-center justify-between rounded-xl border border-mint-3 px-6 py-4">
            <span className="subtitle-M text-gray-6">진료에서 내원 일정을 추가해 보세요!</span>
          </div>
        )}

        {upcomingInfo && <UpcomingMedicalInfo upcomingInfo={upcomingInfo} />}
        {recentInfo && <RecentMedicalInfo recentInfo={recentInfo} />}
      </div>
    </section>
  )
}
