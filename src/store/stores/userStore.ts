import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { User } from '@/types'

type UserState = {
  user: User
}

type UserActions = {
  setUser: (user: User) => void
  changeName: (newName: string) => void
}

// mockData. 로그인 개발 이후 수정 필요
const defaultState = {
  userId: '1',
  name: '가나다라',
  loginId: '1',
  familyCode: 'testFamily',
  family: [
    { userId: '1', name: '가나다라', loginId: '1', familyCode: 'testFamily' },
    { userId: '2', name: '마바사', loginId: '1', familyCode: 'testFamily' },
    { userId: '3', name: '아자차카', loginId: '1', familyCode: 'testFamily' },
    { userId: '4', name: '타파하', loginId: '1', familyCode: 'testFamily' },
  ],
}

export const useUserStore = create(
  persist<UserState & UserActions>(
    (set) => ({
      user: defaultState,
      setUser: (user: User) => {
        set({ user })
      },
      changeName: (newName) => set((state) => ({ user: { ...state.user, name: newName } })),
    }),
    {
      name: 'userStore',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
