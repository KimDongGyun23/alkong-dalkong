import { create } from 'zustand'

type Actions = {
  handleTensWeightChange: (newTens: number) => void
  handleOnesWeightChange: (newOnes: number) => void
  handleDecimalWeightChange: (newDecimal: number) => void
  setInitialWeight: (newWeight: string) => void
  resetWeight: VoidFunction
}

type SelectedWeightStore = {
  weight: string
  actions: Actions
}

const initialSelectedWeight = '50.0'

export const useSelectedWeightStore = create<SelectedWeightStore>((set) => ({
  weight: initialSelectedWeight,
  actions: {
    handleTensWeightChange: (newTens) =>
      set((state) => {
        const [integerPart, decimalPart] = state.weight.split('.')
        const ones = integerPart.slice(1)
        const newWeight = `${newTens}${ones}.${decimalPart}`
        return { weight: newWeight }
      }),
    handleOnesWeightChange: (newOnes) =>
      set((state) => {
        const [integerPart, decimalPart] = state.weight.split('.')
        const tens = integerPart.slice(0, 1)
        const newWeight = `${tens}${newOnes}.${decimalPart}`
        return { weight: newWeight }
      }),
    handleDecimalWeightChange: (newDecimal) =>
      set((state) => {
        const [integerPart] = state.weight.split('.')
        const newWeight = `${integerPart}.${newDecimal}`
        return { weight: newWeight }
      }),
    setInitialWeight: (newWeight) => set(() => ({ weight: newWeight })),
    resetWeight: () => set(() => ({ weight: initialSelectedWeight })),
  },
}))

export const useSelectedWeight = () => useSelectedWeightStore((state) => state.weight)
export const useSelectedWeightActions = () => useSelectedWeightStore((state) => state.actions)
