import type {
  ClinicCalendarRequest,
  ClinicCalendarResponse,
  ClinicInfoResponse,
  CreateClinicInfoRequest,
  CreateClinicInfoResponse,
  EditClinicInfoRequest,
  EditClinicInfoResponse,
} from '@/types'
import { api } from '@/utility/apis'

export const clinicInfo = async (medicalId: string) => {
  return await api.get<ClinicInfoResponse>(`/medical/${medicalId}`)
}

export const clinicCalendar = async ({ userId, localDate }: ClinicCalendarRequest) => {
  return await api.get<ClinicCalendarResponse>(`/medical/calendar/${userId}/${localDate}`)
}

export const createClinicInfo = async (request: CreateClinicInfoRequest) => {
  return await api.post<CreateClinicInfoResponse>(`/medical`, request)
}

export const editClinicInfo = async ({
  medicalId,
  request,
}: {
  medicalId: string
  request: EditClinicInfoRequest
}) => {
  return await api.put<EditClinicInfoResponse>(`/medical/${medicalId}`, request)
}

export const deleteClinicInfo = async (medicalId: string) => {
  return await api.delete(`/medical/${medicalId}`)
}
