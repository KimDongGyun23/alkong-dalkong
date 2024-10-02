import { Label } from '@/components/view'
import type { CurrentMedicineInfoType } from '@/types'
import { formatInfoTime } from '@/utility/utils'

type MedicineSectionProps = {
  medicineInfo: CurrentMedicineInfoType
}

export const MedicineSection = ({ medicineInfo }: MedicineSectionProps) => {
  return (
    <section className="mb-8 w-full">
      <Label icon="medicine-label">약 기록</Label>
      <div className="flex-column mt-2 gap-3">
        {medicineInfo.length === 0 ? (
          <div className="flex items-center justify-between rounded-xl border border-mint-3 px-6 py-4">
            <span className="subtitle-M text-gray-6">약에서 복용 중인 약을 추가해 보세요!</span>
          </div>
        ) : (
          <>
            {medicineInfo.map(({ medicineName, times, weekList }, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl border border-mint-3 px-6 py-4"
              >
                <span className="subtitle-B">{medicineName}</span>
                <span className="headline-R text-gray-6">{formatInfoTime(times, weekList)}</span>
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  )
}
