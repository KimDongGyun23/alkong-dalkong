'use client'

import { useRouter } from 'next/navigation'

import { Icon, Profile } from '@/components/view'
import { useUserStore } from '@/store/stores'

import type { HeaderProps } from './SubHeader'

const Setting = ({ title }: Pick<HeaderProps, 'title'>) => {
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

type ConfirmProps = Pick<HeaderProps, 'title' | 'onConfirm'> & { onCancel?: VoidFunction }

const Confirm = ({ title, onCancel, onConfirm }: ConfirmProps) => {
  const router = useRouter()

  const handleCancle = () => {
    if (onCancel) onCancel()
    else router.back()
  }

  return (
    <header className="flex-column-between h-[182px] bg-mint-3 px-[20px] pb-[24px] pt-[20px]">
      <div className="flex-between-align w-full">
        <button className="body-B text-mint-7" onClick={handleCancle}>
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

const Modify = ({
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
