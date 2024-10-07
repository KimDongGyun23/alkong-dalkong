'use client'

import { Modal } from './Modal'

type ButtonModalProps = {
  header: string
  codeNumber: string
  modalState: boolean
  closeModal: VoidFunction
}

export const CodeModal = ({ header, codeNumber, modalState, closeModal }: ButtonModalProps) => {
  return (
    <Modal isOpen={modalState} onClose={closeModal}>
      <h4 className="subtitle-B">{header}</h4>
      <p className="headline-M mb-6 mt-2 text-center">
        우리 가족으로 초대하고 싶은
        <br />
        사람에게 가족 코드를 공유해 보세요!
      </p>

      <div className="headline-M mx-5 mb-4 self-stretch rounded-xl bg-mint-1 pb-4 pt-[10px] text-center align-middle text-mint-9">
        {codeNumber}
      </div>

      <div className="flex-align body-M gap-[18px] text-mint-7">
        <button>코드 복사하기</button>
        <span>|</span>
        <button>코드 공유하기</button>
      </div>
    </Modal>
  )
}
