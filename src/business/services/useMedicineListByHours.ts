'use client'

import { useEffect, useState } from 'react'

import { useMedicineInfo } from '@/store/queries/useMedicineApi'
import type { MedicineDateDtoType, MedicineTakenInfoType } from '@/types'

export const useMedicineListByHours = () => {
  const { data: medicineInfoData } = useMedicineInfo()
  const [medicineList, setMedicineList] = useState<Record<number, MedicineDateDtoType>>({})
  const [timeListByHours, setTimeListByHours] = useState<MedicineTakenInfoType | undefined>()

  useEffect(() => {
    if (medicineInfoData) {
      const transformedMedicineList = medicineInfoData.data.medicineDateDtoList.reduce(
        (acc, medicine) => {
          acc[medicine.medicineId] = medicine
          return acc
        },
        {} as Record<number, MedicineDateDtoType>,
      )

      setMedicineList(transformedMedicineList)
      setTimeListByHours(medicineInfoData.data.medicineTakenInfo)
    }
  }, [medicineInfoData])

  return { medicineList, timeListByHours }
}
