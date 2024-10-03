import type {
  CreateMedicineRequest,
  MedicineDetailResponse,
  MedicineEditResponse,
  MedicineInfoResponse,
  ToggleTakenInfoRequest,
} from '@/types'

import { api } from '.'

export const createMedicineInfo = async (userId: string, request: CreateMedicineRequest) => {
  return await api.post(`/medicine/${userId}/add`, request)
}

export const medicineInfo = async (userId: string, date: string) => {
  return await api.get<MedicineInfoResponse>(`/medicine/${userId}/${date}/taken_info`)
}

export const medicineDetail = async (userId: string) => {
  return await api.get<MedicineDetailResponse>(`/medicine/${userId}/total_medicine_info`)
}

export const medicineEditInfo = async (userId: string, medicineId: string) => {
  return await api.get<MedicineEditResponse>(`/medicine/${userId}/${medicineId}/medicine_info`)
}

export const toggleTakenInfo = async (recordId: number, request: ToggleTakenInfoRequest) => {
  return await api.patch(`/medicine/${recordId}/taken`, request)
}

export const editMedicine = async (
  userId: string,
  medicineId: string,
  request: CreateMedicineRequest,
) => {
  return await api.put(`/medicine/${userId}/${medicineId}/medicine_info/edit`, request)
}

export const deleteMedicine = async (userId: string, medicineId: number) => {
  return await api.delete(`/medicine/${userId}/${medicineId}/delete`)
}
