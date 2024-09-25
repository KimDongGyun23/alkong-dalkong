import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { User } from '@/types'

type UserState = {
  user: User
}

type UserActions = {
  setUser: (user: User) => void
}

// mockData. 로그인 개발 이후 수정 필요
const defaultState = {
  userId: '1',
  name: '가나다라',
  familyCode: 'testFamily',
  family: [
    { userId: '1', name: '가나다라', familyCode: 'testFamily' },
    { userId: '2', name: '마바사', familyCode: 'testFamily' },
    { userId: '3', name: '아자차카', familyCode: 'testFamily' },
    { userId: '4', name: '타파하', familyCode: 'testFamily' },
  ],
}

export const useUserStore = create(
  persist<UserState & UserActions>(
    (set) => ({
      user: defaultState,
      setUser: (user: User) => {
        set({ user })
      },
    }),
    {
      name: 'userStore',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
