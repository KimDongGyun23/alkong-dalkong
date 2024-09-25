import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import type { SignInRequest, SignInResponse, SignUpRequest } from '@/types'

import { checkDuplicateId, signIn, signOut, signUp } from './auth'

const ACCESS_TOKEN = process.env.NEXT_PUBLIC_ACCESS_TOKEN
const REFRESH_TOKEN = process.env.NEXT_PUBLIC_REFRESH_TOKEN

export const useSignIn = (
  options?: UseMutationOptions<SignInResponse, AxiosError, SignInRequest>,
) =>
  useMutation({
    mutationFn: signIn,
    ...options,
    onSuccess: async (data, ...rest) => {
      localStorage.setItem(ACCESS_TOKEN, data.accessToken)
      localStorage.setItem(REFRESH_TOKEN, data.refreshToken)
      options?.onSuccess?.({ ...data }, ...rest)
    },
  })

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
