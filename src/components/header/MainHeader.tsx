'use client'

import { useRouter } from 'next/navigation'

import { useUserStore } from '@/store/stores'

import { Icon } from '../icons'
import { Profile } from '../profile/Profile'

import type { HeaderProps } from './SubHeader'

export const Setting = ({ title }: Pick<HeaderProps, 'title'>) => {
  const { user } = useUserStore()

  const router = useRouter()
  const handleGoSetting = () => {
    router.push(`/setting/${user.userId}`)
  }

  return (
    <header className="flex-column-between h-[182px] bg-mint-3 px-[20px] pb-[24px] pt-[20px]">
      <div className="flex-align w-full justify-end">
        <Profile name={user.name} size="sm" bgColor="#C5FDEC" onClickProfile={handleGoSetting} />
      </div>
      <h1 className="title-B whitespace-pre text-black">{`${user.name}${title}`}</h1>
    </header>
  )
}

export const Confirm = ({
  title,
  onCancel,
  onConfirm,
}: Pick<HeaderProps, 'title' | 'onCancel' | 'onConfirm'>) => {
  return (
    <header className="flex-column-between h-[182px] bg-mint-3 px-[20px] pb-[24px] pt-[20px]">
      <div className="flex-between-align w-full">
        <button className="body-B text-mint-7" onClick={onCancel}>
          취소
        </button>
        <button className="body-B text-mint-9" onClick={onConfirm}>
          완료
        </button>
      </div>
      <h1 className="title-B whitespace-pre text-black">{title}</h1>
    </header>
  )
}

export const Modify = ({
  title,
  onDelete,
  onModify,
}: Pick<HeaderProps, 'title' | 'onDelete' | 'onModify'>) => {
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }

  return (
    <header className="flex-column-between h-[182px] bg-mint-3 px-[20px] pb-[24px] pt-[20px]">
      <div className="flex-between-align w-full">
        <button className="body-B text-mint-7" onClick={handleBack}>
          <Icon name="arrow-left" />
        </button>
        <div className="flex-align gap-[16px]">
          <button type="button" onClick={onDelete} className="body-B text-mint-7">
            삭제
          </button>
          <button type="button" onClick={onModify} className="body-B text-mint-9">
            수정
          </button>
        </div>
      </div>
      <h1 className="title-B whitespace-pre text-black">{title}</h1>
    </header>
  )
}

export const MainHeader = { Setting, Confirm, Modify }
