'use client'

import { type PropsWithChildren, useRef, useState } from 'react'

import { useScrollLock } from '@/hooks'
import { zIndex } from '@/utility/constants'

import { Icon } from './icons'

type ModalProps = {
  isOpen: boolean
  onClose: VoidFunction
}

export const Modal = ({ children, isOpen, onClose }: PropsWithChildren<ModalProps>) => {
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
      <div className="flex-center fixed inset-0 h-svh w-full">
        <div
          className={`fixed inset-0 bg-gray-6 opacity-40 ${zIndex.backdrop}`}
          ref={modalBackground}
          onClick={handleBackgroundClick}
          aria-hidden="true"
        />
        <div
          className={`flex-column absolute w-[87.2%] max-w-[390px] rounded-xl bg-white pb-6 pt-[52px] ${zIndex.modal}`}
        >
          <button onClick={onClose} type="button" className="absolute right-4 top-5">
            <Icon name="close" />
          </button>
          <div className="flex-column size-full items-center">{children}</div>
        </div>
      </div>
    )
  )
}
