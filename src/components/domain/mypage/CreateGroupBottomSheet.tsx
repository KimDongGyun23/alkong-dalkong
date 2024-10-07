'use client'
import { useState } from 'react'

import { BottomSheet, Button, CodeModal, SubHeader } from '@/components/view'
import { useBoolean } from '@/hooks'
import { useCreateFamilyGroup, useEnterFamilyGroup } from '@/store/queries'
import type { BottomSheetType } from '@/types'

export const CreateGroupBottomSheet = ({
  isShowing,
  onClickScrim,
}: Omit<BottomSheetType, 'section'>) => {
  const [createModalState, openCreateModal, closeCreateModal] = useBoolean(false)
  const [additionModalState, openAdditionModal, closeAdditionModal] = useBoolean(false)
  const [inputCode, setInputCode] = useState<string>('')
  const [createGroupCode, setCreateGroupCode] = useState<string>('')

  const { mutate: createFamilyGroupMutation } = useCreateFamilyGroup()
  const { mutate: enterFamilyGroupMutation } = useEnterFamilyGroup()

  const handleCreateFamilyGroup = () => {
    createFamilyGroupMutation(undefined, {
      onSuccess: ({ familyCode }) => {
        setCreateGroupCode(familyCode)
        openCreateModal()
      },
    })
  }

  const handleSubmitFamilyCode = () => {
    enterFamilyGroupMutation({ familyCode: inputCode })
  }

  return (
    <>
      <BottomSheet isShowing={isShowing} onClickScrim={onClickScrim}>
        <div className="pb-5">
          <SubHeader.Close title="가족 그룹 추가" onClose={onClickScrim} />
        </div>

        <section className="mb-8 mt-5">
          <p className="subtitle-B mb-4">
            가족을 초대하고
            <br />
            우리 가족 그룹을 만들어 보세요!
          </p>

          <Button onClick={handleCreateFamilyGroup}>새로운 그룹 만들기</Button>
        </section>

        <div className="flex-align mb-8  gap-3">
          <div className="h-px grow bg-mint-5" />
          <span className="body-M">혹은</span>
          <div className="h-px grow bg-mint-5" />
        </div>

        <section className="flex-column mb-8 gap-4">
          <p className="subtitle-B">
            가족 초대를 받으셨나요?
            <br />이 곳에 가족 코드를 입력해 주세요!
          </p>

          <input
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="가족 코드를 입력해주세요."
            className="subtitle-M placeholder:subtitle-R w-full rounded-xl border border-mint-3 px-6 py-4 placeholder:text-gray-7 focus:outline-none"
          />
          <Button onClick={handleSubmitFamilyCode}>가족 코드 인증</Button>
        </section>
      </BottomSheet>
      <CodeModal
        header="새로운 가족 그룹 생성 완료!"
        codeNumber={createGroupCode}
        modalState={createModalState}
        closeModal={closeCreateModal}
      />
      <CodeModal
        header="새로운 가족 그룹 생성 완료!"
        codeNumber="1234 4567"
        modalState={additionModalState}
        closeModal={closeAdditionModal}
      />
    </>
  )
}
