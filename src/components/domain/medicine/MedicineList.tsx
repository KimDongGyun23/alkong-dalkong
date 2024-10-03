'use client'

import { useMedicineListByHours } from '@/business/services'
import { Icon } from '@/components/view'
import { useToggleTakenInfo } from '@/store/queries'
import type { MedicineDateDtoType } from '@/types'
import { getMedicineUnitInKorean, isTakenMedicine } from '@/utility/utils'

type MedicineItemProps = {
  isTaken: boolean
  medicine: MedicineDateDtoType
  takenIndex: number
}

const MedicineItem = ({ medicine, isTaken, takenIndex }: MedicineItemProps) => {
  const { medicineRecordId, medicineName, medicineDosage, medicineTakenType } = medicine
  const { mutate: toggleTakenInfo } = useToggleTakenInfo()

  const handleClickItem = () => {
    toggleTakenInfo({
      recordId: medicineRecordId,
      request: { timeNum: takenIndex, takenNum: isTaken ? 0 : 1 },
    })
  }

  return (
    <li className="flex-column rounded-xl border border-mint-3 bg-white p-4 text-gray-8">
      <button className="flex-between-align text-left" onClick={handleClickItem}>
        <div className="flex-column gap-1">
          <p className="subtitle-B">{medicineName}</p>
          <p className="headline-R text-gray-6">
            {medicineDosage}
            {getMedicineUnitInKorean(medicineTakenType)}
          </p>
        </div>
        <Icon name={isTaken ? 'check-yes' : 'check-no'} />
      </button>
    </li>
  )
}

export const MedicineList = () => {
  const { medicineList, timeListByHours } = useMedicineListByHours()

  if (!Object.keys(medicineList).length)
    return (
      <p className="subtitle-M flex-center h-full text-center text-gray-6">
        복용 중인 약이 없어요!
      </p>
    )

  return (
    <main className="flex-column mt-8 w-full gap-6">
      {timeListByHours &&
        medicineList &&
        Object.keys(timeListByHours).map((time) => (
          <div key={time} className="flex-column">
            <p className="headline-R mb-3 text-gray-7">{time}</p>
            <ul className="flex-column gap-2">
              {timeListByHours[time].map((takenInfo) => (
                <MedicineItem
                  key={takenInfo.medicine_id}
                  medicine={medicineList[takenInfo.medicine_id]}
                  takenIndex={takenInfo.index}
                  isTaken={isTakenMedicine(takenInfo.taken)}
                />
              ))}
            </ul>
          </div>
        ))}
    </main>
  )
}
