'use client'

import { Button } from '../Button'

import { Modal } from './Modal'

type ButtonModalProps = {
  header: string
  content: string
  cancleText: string
  confirmText: string
  modalState: boolean
  closeModal: VoidFunction
  onClickConfirm: VoidFunction
}

export const ButtonModal = ({
  header,
  content,
  cancleText,
  confirmText,
  modalState,
  closeModal,
  onClickConfirm,
}: ButtonModalProps) => {
  return (
    <Modal isOpen={modalState} onClose={closeModal}>
      <h4 className="subtitle-B">{header}</h4>
      <p className="headline-M mt-2">{content}</p>

      <div className="mt-6 flex w-full gap-[15px] px-4">
        <Button primary={false} onClick={closeModal}>
          {cancleText}
        </Button>
        <Button onClick={onClickConfirm}>{confirmText}</Button>
      </div>
    </Modal>
  )
}
