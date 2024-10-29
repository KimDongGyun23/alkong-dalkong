'use client'
import { Fragment } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Profile, ProfileModal } from '@/components/view'
import { useToggle } from '@/hooks'
import { useFamilyMember } from '@/store/queries'
import { zIndex } from '@/utility/constants'
import {
  getCurrentIdToStorage,
  getFamilyCodeToStorage,
  getUsernameToStorage,
} from '@/utility/utils'

import type { iconMap } from './icons'
import { Icon } from './icons'

type NavItem = {
  text: string
  icon: keyof typeof iconMap
  path: string
}[]

export const BottomNav = () => {
  const pathname = usePathname()
  const currentId = getCurrentIdToStorage()
  const username = getUsernameToStorage()

  const familyCode = getFamilyCodeToStorage()
  const { data: familyMemberData, refetch } = useFamilyMember(familyCode)

  const navItems: NavItem = [
    { text: '홈', icon: 'home', path: `/home/${currentId}` },
    { text: '진료', icon: 'clinic', path: `/clinic/${currentId}` },
    { text: '건강', icon: 'health', path: `/health/${currentId}` },
    { text: '약', icon: 'medicine', path: `/medicine/${currentId}` },
  ]

  const [isShowing, toggleShowing] = useToggle(false)

  const profileTextStyle = isShowing ? 'caption-M text-mint-9' : 'caption-R text-gray-7'

  const handleProfileClick = () => {
    toggleShowing()
    if (!isShowing) refetch()
  }

  return (
    <>
      {isShowing && (
        <ProfileModal
          onClickProfileModal={toggleShowing}
          members={familyMemberData?.members || []}
        />
      )}
      <nav className={`bottom-0 w-full ${zIndex.bottomNav}`}>
        <div className="flex-between items-end bg-white px-[26px] pb-[11px] pt-[4px] shadow-topShadow">
          {navItems.map(({ text, icon, path }, index) => {
            const selected = path === pathname && !isShowing

            const textStyle = selected ? 'caption-M text-mint-9' : 'caption-R text-gray-7'
            const bgColorStyle = selected ? '#13A076' : '#676A6B'

            return (
              <Fragment key={index}>
                <Link href={path} className={`flex-column-align gap-y-[6px] ${textStyle} bg-white`}>
                  <Icon name={icon} color={bgColorStyle} />
                  {text}
                </Link>
                {index === MIDDLE_INDEX && (
                  <div className={`relative w-[69px] ${zIndex.fab}`}>
                    <div
                      className={`${profileTextStyle} flex-column-align absolute bottom-0 gap-y-[6px]`}
                    >
                      <div className={`flex rounded-t-[50%] bg-white p-[8px] pb-0 ${zIndex.fab}`}>
                        <Profile
                          name={username}
                          onClickProfile={handleProfileClick}
                          bgColor={isShowing ? '#949698' : '#F5F6F8'}
                          textColor={isShowing ? 'text-gray-1' : 'text-gray-6'}
                        />
                      </div>
                      {username}
                    </div>
                  </div>
                )}
              </Fragment>
            )
          })}
        </div>
        <div className="absolute bottom-[27px] left-1/2 z-[-1] size-[69px] -translate-x-1/2 rounded-[50%] bg-white shadow-topShadow"></div>
      </nav>
    </>
  )
}

const MIDDLE_INDEX = 1
