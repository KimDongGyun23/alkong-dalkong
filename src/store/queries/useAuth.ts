import { useRouter } from 'next/navigation'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import type { SignUpRequest } from '@/types'
import { api, checkDuplicateId, signIn, signOut, signUp } from '@/utility/apis'

import { useUserStore } from '../stores'

export const useSignIn = () => {
  const router = useRouter()
  const { setUser } = useUserStore()

  return useMutation({
    mutationFn: signIn,
    onSuccess: async ({ accessToken, ...rest }) => {
      api.setAccessToken(accessToken)
      setUser({ ...rest })
      router.push(`/home/${rest.userId}`)
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

export const useSignOut = (options?: UseMutationOptions) =>
  useMutation({
    mutationFn: signOut,
    ...options,
    onSuccess: async (data, ...rest) => {
      localStorage.clear()
      options?.onSuccess?.(data, ...rest)
    },
  })
