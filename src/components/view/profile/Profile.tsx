'use client'
import type { MouseEventHandler } from 'react'

import { Icon } from '../icons'

type ProfileProps = ProfileVariantProps & {
  onClickProfile?: VoidFunction
  name: string
}

type ProfileVariantProps = {
  bgColor?: string
  textColor?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

export const Profile = ({ onClickProfile, name, ...styleProps }: ProfileProps) => {
  const { bgColor, textColor = 'text-gray-6', size = 'md' } = styleProps

  const displayName = name.slice(-2)

  const handleClickProfile: MouseEventHandler<HTMLButtonElement> = () => {
    if (onClickProfile) onClickProfile()
  }

  return (
    <button
      type="button"
      className={`relative rounded-[50%] ${profileVariant[size]?.shadow}`}
      onClick={handleClickProfile}
    >
      <Icon name="ellipse" color={bgColor} size={profileVariant[size].size} />
      <span
        className={`absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 ${textColor} ${profileVariant[size].typo}`}
      >
        {displayName}
      </span>
    </button>
  )
}

type ProfileVariant = {
  typo: string
  size: number
  shadow?: string
}

const profileVariant: Record<string, ProfileVariant> = {
  sm: {
    typo: 'caption-R',
    size: 32,
  },
  md: {
    typo: 'body-R',
    size: 53,
  },
  lg: { typo: 'body-M', size: 64, shadow: 'shadow-underShadow' },
  xl: { typo: 'title-M', size: 80 },
  '2xl': { typo: 'title-B', size: 96, shadow: 'shadow-underShadow' },
}
