'use client'

import { useRouter } from 'next/navigation'

import { Icon } from './icons'

export type HeaderProps = {
  title: string
  onClose: VoidFunction
  onCancel: VoidFunction
  onConfirm: VoidFunction
  onDelete: VoidFunction
  onModify: VoidFunction
}

const Back = ({ title }: Pick<HeaderProps, 'title'>) => {
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

const Close = ({ title, onClose }: Pick<HeaderProps, 'title' | 'onClose'>) => {
  return (
    <header className="flex-align relative justify-end">
      <h1 className="subtitle-B absolute left-1/2 -translate-x-1/2 text-black">{title}</h1>
      <button onClick={onClose}>
        <Icon name="close" />
      </button>
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
    <header className="flex-between-align relative">
      <button className="body-B text-gray-6" onClick={handleCancle}>
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
