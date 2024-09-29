'use client'

import { useRouter } from 'next/navigation'

import { Icon } from '../icons'

export type HeaderProps = {
  title: string
  onClose: VoidFunction
  onCancel: VoidFunction
  onConfirm: VoidFunction
  onDelete: VoidFunction
  onModify: VoidFunction
}

export const Back = ({ title }: Pick<HeaderProps, 'title'>) => {
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }

  return (
    <header className="flex-between-align relative">
      <button onClick={handleBack}>
        <Icon name="arrow-left" />
      </button>
      <h1 className="subtitle-B absolute left-1/2 -translate-x-1/2 text-black">{title}</h1>
    </header>
  )
}

export const Close = ({ title, onClose }: Pick<HeaderProps, 'title' | 'onClose'>) => {
  return (
    <header className="flex-align relative justify-end">
      <h1 className="subtitle-B absolute left-1/2 -translate-x-1/2 text-black">{title}</h1>
      <button onClick={onClose}>
        <Icon name="close" />
      </button>
    </header>
  )
}

export const Confirm = ({
  title,
  onCancel,
  onConfirm,
}: Pick<HeaderProps, 'title' | 'onCancel' | 'onConfirm'>) => {
  return (
    <header className="flex-between-align relative">
      <button className="body-B text-gray-6" onClick={onCancel}>
        취소
      </button>
      <h1 className="subtitle-B absolute left-1/2 -translate-x-1/2 text-black">{title}</h1>
      <button className="body-B text-black" onClick={onConfirm}>
        완료
      </button>
    </header>
  )
}

export const SubHeader = { Back, Confirm, Close }
