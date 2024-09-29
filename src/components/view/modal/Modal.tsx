'use client'

import { type PropsWithChildren, useRef, useState } from 'react'

import { useScrollLock } from '@/hooks/useScrollLock'

import { Icon } from '../icons'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
}

const Modal = ({ children, isOpen, onClose }: PropsWithChildren<ModalProps>) => {
  const { lockScroll } = useScrollLock()
  const modalBackground = useRef<HTMLDivElement | null>(null)
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalBackground.current) {
      onClose()
    }
  }

  useState(() => {
    if (isOpen) {
      lockScroll()
    }
  })

  return (
    isOpen && (
      <div
        className="fixed inset-0 flex items-center justify-center bg-gray-6 mix-blend-multiply"
        ref={modalBackground}
        onClick={handleBackgroundClick}
        aria-hidden="true"
      >
        <div className="flex-column relative w-[87.2%]  max-w-[390px] rounded-[12px] bg-white pb-[24px] pt-[52px]">
          <button onClick={onClose} type="button" className="absolute right-[16px] top-[20px]">
            <Icon name="close" />
          </button>
          <div className="flex size-full flex-col items-center">{children}</div>
        </div>
      </div>
    )
  )
}

export default Modal
