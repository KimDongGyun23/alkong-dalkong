'use client'

import { Button, Modal } from '@/components'

type DeleteModalProps = {
  modalState: boolean
  closeModal: VoidFunction
  onClickDelete: VoidFunction
}

export const DeleteModal = ({ modalState, closeModal, onClickDelete }: DeleteModalProps) => {
  return (
    <Modal isOpen={modalState} onClose={closeModal}>
      <h4 className="subtitle-B">삭제하시겠습니까?</h4>
      <p className="headline-M mt-2">삭제하실 경우 복원이 불가능합니다.</p>

      <div className="mt-6 flex w-full gap-[15px] px-4">
        <Button primary={false} onClick={closeModal}>
          취소
        </Button>
        <Button onClick={onClickDelete}>삭제</Button>
      </div>
    </Modal>
  )
}
