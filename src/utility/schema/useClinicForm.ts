import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import type { ClinicFormType } from '@/types/clinic'

import { clinicInfo } from '../apis/clinicApi'
import { CLINIC_ALARM_TIME } from '../constants'
import { formatDateWithType } from '../utils'

const schema = z.object({
  hospitalName: z.string().min(1, { message: '병원 이름을 입력해 주세요.' }),
  hospitalDate: z.string().min(1, { message: '날짜를 선택해 주세요.' }),
  medicalPart: z.array(z.string()).min(1, { message: '진료 과목을 1개 이상 선택해 주세요.' }),
  medicalMemo: z.string(),
  medicalAlarm: z.string(),
})

const getDefaultValues = async (isEdit: boolean, medicalId?: string) => {
  if (isEdit && medicalId) {
    const { data } = await clinicInfo(medicalId)
    return {
      hospitalName: data.hospitalName || '',
      hospitalDate: formatDateWithType(data.hospitalDate, 'fullDateWithTimeKorean') || '',
      medicalPart: data.medicalPart || [],
      medicalMemo: data.medicalMemo || '',
      medicalAlarm: CLINIC_ALARM_TIME[data.medicalAlarm] || '없음',
    }
  }

  return {
    hospitalName: '',
    hospitalDate: '',
    medicalPart: [],
    medicalMemo: '',
    medicalAlarm: '없음',
  }
}

export const useClinicForm = (isEdit: boolean = false, medicalId?: string) => {
  const formMethod = useForm<ClinicFormType>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: async () => await getDefaultValues(isEdit, medicalId),
  })

  return formMethod
}
