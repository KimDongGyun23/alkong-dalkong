import { create } from 'zustand'

type HealthPeriodState = {
  periodKo: string
  periodEn: string
  actions: HealthPeriodActions
}

type HealthPeriodActions = {
  changePeriod: (index: number) => void
}

const PERIOD_KO = ['주간', '월간']
const PERIOD_EN = ['weekly', 'monthly']

export const useHealthPeriodStore = create<HealthPeriodState>((set) => ({
  periodKo: PERIOD_KO[0],
  periodEn: PERIOD_EN[0],
  actions: {
    changePeriod: (index) => {
      set({ periodKo: PERIOD_KO[index], periodEn: PERIOD_EN[index] })
    },
  },
}))

export const useHealthPeriodKorean = () => useHealthPeriodStore((state) => state.periodKo)
export const useHealthPeriodEnglish = () => useHealthPeriodStore((state) => state.periodEn)
export const useHealthPeriodActions = () => useHealthPeriodStore((state) => state.actions)
