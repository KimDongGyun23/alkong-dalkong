'use client'

import { useEffect, useState } from 'react'

import {
  convertDayArrayToKorean,
  convertDayArrayToString,
  getMedicineUnitInKorean,
} from '@/business/services'
import { useMedicineDetail } from '@/store/queries'
import type { MedicineDetailType } from '@/types'
import { formatDateWithType } from '@/utility/utils'

type MedicineDetailDataType = Omit<MedicineDetailType, 'medicineWeek'> & { medicineWeek: string }

export const useMedicineDetailData = () => {
  const { data, isPending, isError } = useMedicineDetail()
  const [detailData, setDetailData] = useState<MedicineDetailDataType[]>([])

  useEffect(() => {
    if (data) {
      const transformedData = data.data.map((medicine) => {
        const takenWeek = convertDayArrayToKorean(medicine.medicineWeek)
        const formattedWeek = convertDayArrayToString(takenWeek)

        const takenTime = medicine.medicineTakenTime.map((time) =>
          formatDateWithType(time, 'time', 'fullTime'),
        )

        return {
          ...medicine,
          medicineWeek: formattedWeek,
          medicineTakenTime: takenTime,
          medicineTakenType: getMedicineUnitInKorean(medicine.medicineTakenType),
        }
      })

      setDetailData(transformedData)
    }
  }, [data])

  return {
    detailData,
    isPending,
    isError,
  }
}
