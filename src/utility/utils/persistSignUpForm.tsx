import type { GlobalState } from 'little-state-machine'

import type { SignupFormType } from '@/types'

export const persistSignUpForm = (state: GlobalState, payload: Partial<SignupFormType>) => {
  return {
    ...state,
    signUp: {
      ...state.signUp,
      ...payload,
    },
  }
}
