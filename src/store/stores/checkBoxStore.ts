import { create } from 'zustand'

import type { CheckBoxSectionType } from '@/types/common'

type Actions = {
  handleCheckBoxClick: (section: CheckBoxSectionType) => void
  handleAllCheckClick: () => void
}

type CheckBoxListStore = {
  checkBoxList: { personal: boolean; notification: boolean }
  isAllChecked: boolean
  actions: Actions
}

const initialCheckBoxList = { personal: false, notification: false }

export const useCheckBoxListStore = create<CheckBoxListStore>((set, get) => ({
  checkBoxList: initialCheckBoxList,
  isAllChecked: false,

  actions: {
    handleCheckBoxClick: (section: CheckBoxSectionType) => {
      const { checkBoxList } = get()
      const newCheckBoxList = { ...checkBoxList, [section]: !checkBoxList[section] }
      const allChecked = Object.values(newCheckBoxList).every((value) => value === true)

      set(() => ({ checkBoxList: newCheckBoxList, isAllChecked: allChecked }))
    },

    handleAllCheckClick: () => {
      const { isAllChecked } = get()
      const allChecked = { personal: true, notification: true }

      if (isAllChecked) set({ checkBoxList: initialCheckBoxList, isAllChecked: false })
      else set({ checkBoxList: allChecked, isAllChecked: true })
    },
  },
}))

export const useCheckBoxList = () => useCheckBoxListStore((state) => state.checkBoxList)
export const useAllChecked = () => useCheckBoxListStore((state) => state.isAllChecked)
export const useCheckListActions = () => useCheckBoxListStore((state) => state.actions)
