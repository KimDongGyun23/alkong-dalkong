'use client'

import type { MouseEventHandler } from 'react'
import Link from 'next/link'

import type { FamilyMemberType } from '@/types'
import { zIndex } from '@/utility/constants'
import { setUserDataToLocalStorage } from '@/utility/utils'

import { Profile } from './Profile'

type ProfileModalProps = {
  onClickProfileModal?: VoidFunction
  members: FamilyMemberType['members']
}

export const ProfileModal = ({ onClickProfileModal, members }: ProfileModalProps) => {
  const handleClickScrim: MouseEventHandler<HTMLDivElement> = () => {
    if (onClickProfileModal) onClickProfileModal()
  }

  return (
    <div
      onClick={handleClickScrim}
      className={`absolute inset-0 flex h-[calc(100svh-75px)] w-full items-end justify-center overflow-hidden bg-[rgba(15,23,42,0.5)] px-[52px] pb-[62px] ${zIndex.fab}`}
      aria-hidden="true"
    >
      <div className="grid grid-cols-3 gap-[40px]">
        {members?.map(({ name, userId }) => {
          const handleClickProfile = () => {
            setUserDataToLocalStorage({ currentId: userId, currentUsername: name })
            if (onClickProfileModal) onClickProfileModal()
          }

          return (
            <div className="headline-B flex-column-align gap-y-[6px] text-white" key={userId}>
              {name}
              <Link href={`/home/${userId}`}>
                <Profile name={name} size="lg" onClickProfile={handleClickProfile} />
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
