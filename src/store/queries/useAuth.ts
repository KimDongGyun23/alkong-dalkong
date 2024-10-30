'use client'
import { redirect } from 'next/navigation'
import type { UseMutationOptions } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { checkDuplicateId, deleteMembership, signOut, signUp } from '@/store/queries/apis'
import type { SignUpRequest } from '@/types'

export const useCheckDuplicateId = () =>
  useMutation({
    mutationFn: checkDuplicateId,
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
