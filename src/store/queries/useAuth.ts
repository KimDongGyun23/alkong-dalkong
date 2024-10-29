'use client'
import { redirect, useRouter } from 'next/navigation'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import {
  api,
  checkDuplicateId,
  deleteMembership,
  signIn,
  signOut,
  signUp,
} from '@/store/queries/apis'
import type { SignUpRequest } from '@/types'
import { setUserDataToLocalStorage } from '@/utility/utils'

export const useSignIn = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: signIn,
    onSuccess: async ({ accessToken, userId, familyCode, name }) => {
      api.setAccessToken(accessToken)
      setUserDataToLocalStorage({
        currentId: userId,
        familyCode: familyCode,
        currentUsername: name,
        loginUsername: name,
      })
      router.push(`/home/${userId}`)
    },
    onError: (error) => {
      console.log(error.message)
    },
  })
}

export const useCheckDuplicateId = (
  options?: UseMutationOptions<unknown, AxiosError, { id: string }>,
) =>
  useMutation({
    mutationFn: checkDuplicateId,
    ...options,
  })

export const useSignUp = (options?: UseMutationOptions<unknown, AxiosError, SignUpRequest>) =>
  useMutation({
    mutationFn: signUp,
    ...options,
    onSuccess: async (data, ...rest) => {
      sessionStorage.clear()
      options?.onSuccess?.(data, ...rest)
    },
  })

export const useSignOut = () =>
  useMutation({
    mutationFn: signOut,
  })

export const useDeleteMembership = () => {
  return useMutation({
    mutationFn: () => deleteMembership(),
    onSuccess: () => redirect('/sign-in'),
  })
}
