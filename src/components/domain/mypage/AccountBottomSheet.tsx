'use client'

import { FormProvider } from 'react-hook-form'

import { useAccountEditForm } from '@/business/hooks'
import { BottomSheet, Icon, InputGroup, Label, Profile, SubHeader } from '@/components/view'
import { useToggle } from '@/hooks'
import { useEditAccountInfo } from '@/store/queries'
import { useUserStore } from '@/store/stores'
import type { BottomSheetType, EditAccountInfoRequest } from '@/types'
import { formatDateWithType } from '@/utility/utils'

type HeaderProps = {
  isEdit: boolean
  handleIsEdit: VoidFunction
  onClickScrim: VoidFunction
  onConfirm: VoidFunction
}

const Header = ({ isEdit, handleIsEdit, onClickScrim, onConfirm }: HeaderProps) => {
  if (isEdit)
    return (
      <div className=" pb-5">
        <SubHeader.Confirm title="나의 정보 수정" onCancel={handleIsEdit} onConfirm={onConfirm} />
      </div>
    )
  else
    return (
      <div className="w-full pb-5">
        <header className="flex-between-align relative justify-end">
          <button className="body-B text-gray-6" onClick={handleIsEdit}>
            수정
          </button>
          <h1 className="subtitle-B absolute left-1/2 -translate-x-1/2 text-black">나의 정보</h1>
          <button onClick={onClickScrim}>
            <Icon name="close" />
          </button>
        </header>
      </div>
    )
}

export const AccountBottomSheet = ({
  isShowing,
  onClickScrim,
}: Omit<BottomSheetType, 'section'>) => {
  const [isEdit, handleIsEdit] = useToggle(false)

  const formMethod = useAccountEditForm()
  const { handleSubmit } = formMethod

  const { changeName } = useUserStore()
  const { mutate: editMutation } = useEditAccountInfo()

  const submitAccountEditForm = (formData: EditAccountInfoRequest) => {
    const sendingFormData = { ...formData, birth: formatDateWithType(formData.birth, 'default') }
    editMutation(sendingFormData, { onSuccess: onClickScrim })
    changeName(formData.name)
  }

  return (
    <BottomSheet isShowing={isShowing} onClickScrim={onClickScrim}>
      <Header
        isEdit={isEdit}
        handleIsEdit={handleIsEdit}
        onClickScrim={onClickScrim}
        onConfirm={handleSubmit(submitAccountEditForm)}
      />

      <div className="flex-column mb-5 overflow-y-scroll scrollbar-hide">
        <div className="mb-4 mt-[27px] self-center">
          <Profile size="2xl" bgColor="#C5FDEC" />
        </div>

        <FormProvider {...formMethod}>
          <form className="flex-column gap-4">
            <InputGroup>
              <Label>이름</Label>
              <InputGroup.Input section="name" readOnly={!isEdit} />
              <InputGroup.ErrorMessage section="name" />
            </InputGroup>

            <InputGroup>
              <Label>휴대전화번호</Label>
              <InputGroup.Input section="phoneNumber" readOnly={!isEdit} />
              <InputGroup.ErrorMessage section="phoneNumber" />
            </InputGroup>

            <InputGroup>
              <Label>생년월일</Label>
              <InputGroup.Input section="birth" readOnly={!isEdit} />
              <InputGroup.ErrorMessage section="birth" />
            </InputGroup>

            <InputGroup>
              <Label>성별</Label>
              <InputGroup.Gender disabled={!isEdit} />
              <InputGroup.ErrorMessage section="gender" />
            </InputGroup>
          </form>
        </FormProvider>
      </div>
    </BottomSheet>
  )
}
