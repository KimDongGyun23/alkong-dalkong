import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'

import { clinicInfo, medicineEditInfo } from '@/store/queries/apis'
import type {
  AccountEditFormType,
  ClinicFormType,
  LoginFormType,
  MedicineFormType,
  PasswordEditFormType,
  SignupFormType,
} from '@/types'
import { CLINIC_ALARM_TIME, MEDICINE_ALARM_TIME } from '@/utility/constants'
import {
  accountEditSchema,
  clinicSchema,
  convertDayArrayToKorean,
  convertDayArrayToString,
  formatDateWithType,
  getMedicineUnitInKorean,
  loginSchema,
  medicineSchema,
  passwordEditSchema,
  signUpSchema,
} from '@/utility/utils'

export const useAccountEditForm = () => {
  const formMethod = useForm<AccountEditFormType>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(accountEditSchema),
  })

  return formMethod
}

export const useLoginForm = () => {
  const formMethod = useForm<LoginFormType>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(loginSchema),
  })

  return formMethod
}

export const usePasswordEditForm = () => {
  const formMethod = useForm<PasswordEditFormType>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(passwordEditSchema),
  })

  return formMethod
}

export const useSignupForm = () => {
  const formMethod = useForm<SignupFormType>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      personal: false,
      notification: false,
    },
  })
  return formMethod
}

export const useMedicineForm = (isEdit: boolean = false, userId?: string, medicineId?: string) => {
  const initialValues = {
    medicineName: '',
    medicineWeek: dayjs().locale('ko').format('ddd'),
    medicineTimes: 1,
    medicineTakenTimeList: ['23:59'],
    medicinePeriod: dayjs().format('M월 D일'),
    medicineDosage: '1회분',
    medicineMemo: '',
    medicineAlarm: '없음',
  }

  const getDefaultValues = async () => {
    if (userId && medicineId) {
      const { data } = await medicineEditInfo(userId, medicineId)
      const convertDaysEnToKo = convertDayArrayToKorean(data.medicineWeek)
      const formattedWeek = convertDayArrayToString(convertDaysEnToKo)

      return {
        medicineName: data.medicineName,
        medicineWeek: formattedWeek,
        medicineTimes: data.medicineTimes,
        medicineTakenTimeList: data.medicineTakenTime.map((time) =>
          formatDateWithType(time, 'time', 'fullTime'),
        ),
        medicinePeriod:
          data.medicineEndDate === '9999-12-31'
            ? '꾸준히 섭취'
            : formatDateWithType(data.medicineEndDate, 'monthDate'),
        medicineDosage: `${data.medicineDosage}${getMedicineUnitInKorean(data.medicineTakenType)}`,
        medicineMemo: data.medicineMemo,
        medicineAlarm: MEDICINE_ALARM_TIME[data.medicineAlarm],
      }
    } else {
      return initialValues
    }
  }

  const formMethod = useForm<MedicineFormType>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(medicineSchema),
    defaultValues: isEdit ? getDefaultValues : initialValues,
  })

  return formMethod
}

export const useClinicForm = (isEdit: boolean = false, medicalId?: string) => {
  const initialValues = {
    hospitalName: '',
    hospitalDate: '',
    medicalPart: [],
    medicalMemo: '',
    medicalAlarm: '없음',
  }

  const getDefaultValues = async () => {
    if (medicalId) {
      const { data } = await clinicInfo(medicalId)
      return {
        hospitalName: data.hospitalName || '',
        hospitalDate:
          formatDateWithType(data.hospitalDate, 'fullDateTimeWithKorean', 'dateTime') || '',
        medicalPart: data.medicalPart || [],
        medicalMemo: data.medicalMemo || '',
        medicalAlarm: CLINIC_ALARM_TIME[data.medicalAlarm] || '없음',
      }
    } else return initialValues
  }

  const formMethod = useForm<ClinicFormType>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(clinicSchema),
    defaultValues: isEdit ? getDefaultValues : initialValues,
  })

  return formMethod
}
