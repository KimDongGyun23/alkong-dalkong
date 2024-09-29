'use client'

import type { PropsWithChildren } from 'react'

type ButtonProps = {
  onClick?: () => void
  size?: 'md' | 'sm'
  primary?: boolean
  disabled?: boolean
  type?: 'button' | 'submit'
}

export const Button = ({
  children,
  onClick,
  size = 'md',
  primary = true,
  disabled = false,
  type = 'button',
}: PropsWithChildren<ButtonProps>) => {
  const color = disabled
    ? 'bg-gray-5 text-white'
    : primary
      ? 'bg-mint-6 text-white'
      : 'bg-gray-3 text-gray-7'
  const buttonSize = size === 'md' ? 'subtitle-B h-[56px]' : 'headline-B h-[52px]'
  return (
    <button
      type={type}
      className={`flex-center rounded-[12px] ${color} w-full ${buttonSize}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
