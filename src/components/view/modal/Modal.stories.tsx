import type { Meta, StoryFn } from '@storybook/react'

import { useBoolean } from '@/hooks/useBoolean'

import { Button } from '../button/Button'

import Modal from './Modal'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default {
  title: 'Modal',
  component: Modal,
} as Meta

const MediumTemplate: StoryFn<Props> = () => {
  const [modal, handleOpenModal, handleCloseModal] = useBoolean(true)

  return (
    <>
      <button onClick={handleOpenModal}>모달 열기</button>
      <Modal isOpen={modal} onClose={handleCloseModal}>
        <div className="subtitle-B mb-[8px] text-black">삭제하시겠습니까?</div>
        <div className="headline-M">삭제하실 경우 복원이 불가능합니다.</div>
        <div className="mt-[24px] flex w-full gap-[15px] px-[16px]">
          <Button
            size="sm"
            onClick={() => {
              console.log('취소')
            }}
          >
            취소
          </Button>
          <Button
            primary
            size="sm"
            onClick={() => {
              console.log('삭제')
            }}
          >
            삭제
          </Button>
        </div>
      </Modal>
    </>
  )
}
export const Medium = MediumTemplate.bind({})

const LargeTemplate: StoryFn<Props> = () => {
  const [modal, handleOpenModal, handleCloseModal] = useBoolean(true)

  return (
    <>
      <button onClick={handleOpenModal}>모달 열기</button>
      <Modal isOpen={modal} onClose={handleCloseModal}>
        <div className="subtitle-B mb-[8px] text-black">우리 가족 그룹의 초대 코드?</div>
        <div className="headline-M">우리 가족으로 초대하고 싶은</div>
        <div className="headline-M">사람에게 가족 코드를 공유해 보세요!</div>
        <div className="w-full px-[20px]">
          <div className="flex-center mt-[24px] h-[48px] w-full rounded-[12px] bg-mint-1">
            1234 4321
          </div>
        </div>
        <div className="mt-[16px] flex justify-between gap-[6px]">
          <p className="body-M text-mint-7">코드 복사하기</p>
          <p className="body-M text-mint-7">|</p>
          <p className="body-M text-mint-7">코드 공유하기</p>
        </div>
      </Modal>
    </>
  )
}
export const Large = LargeTemplate.bind({})
