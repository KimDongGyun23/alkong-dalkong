import Tag from '@/components/view/tag/Tag'
import type {
  CurrentMedicineInfo,
  RecentMedicalInfoType,
  RecentWeightInfo,
  UpcomingMedicalInfoType,
} from '@/types'

import { formatInfoTime, formatKoDate, getDiffDay } from '../../../utility/utils/dates'

const InfoBox = ({ title, schedule }: { title: string; schedule: string }) => {
  return (
    <div className="flex items-center justify-between rounded-xl border border-mint-3 px-6 py-4">
      <span className="subtitle-B">{title}</span>
      <span className="headline-R text-gray-6">{schedule}</span>
    </div>
  )
}

export const HealthInfo = ({ weight, date }: RecentWeightInfo) => {
  return <InfoBox title={`${weight}kg`} schedule={`${getDiffDay(date)}일 전`} />
}

export const MedicineInfo = ({ info }: { info: CurrentMedicineInfo }) => {
  return (
    <>
      {info.map(({ medicineName, times, weekList }, idx) => {
        return <InfoBox key={idx} title={medicineName} schedule={formatInfoTime(times, weekList)} />
      })}
    </>
  )
}

export const UpcomingMedicalInfo = ({
  hospitalName,
  hospitalDate,
  medicalPart,
}: UpcomingMedicalInfoType) => {
  const diffDays = getDiffDay(hospitalDate)
  const upcoming = diffDays === 0 ? '오늘' : diffDays === 1 ? '내일' : `${diffDays}일 후`

  return (
    <div className="flex-column gap-10 rounded-xl border border-mint-4 px-5 py-4 text-black shadow-[0_0_12px_rgba(2,41,34,0.1)]">
      <div>
        <div className="subtitle-B mb-1">
          {upcoming}, {formatKoDate(hospitalDate)}
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

export const RecentMedicalInfo = ({ hospitalName, hospitalDate }: RecentMedicalInfoType) => {
  return (
    <div className="flex-column gap-10 rounded-xl border-gray-4 bg-gray-1 px-5 py-4 text-gray-6">
      <div>
        <div className="subtitle-B mb-1">{`${getDiffDay(hospitalDate)}일 전, ${formatKoDate(hospitalDate)}`}</div>
        <div className="headline-M">{hospitalName}</div>
      </div>
    </div>
  )
}
