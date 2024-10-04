import { FormProvider } from 'react-hook-form'

import { usePasswordEditForm } from '@/business/hooks'
import { BottomSheet, Button, InputGroup, Label, SubHeader } from '@/components/view'
import { useEditPassword } from '@/store/queries'
import type { BottomSheetType, EditPasswordRequest } from '@/types'

export const PassowrdBottomSheet = ({
  isShowing,
  onClickScrim,
}: Omit<BottomSheetType, 'section'>) => {
  const formMethod = usePasswordEditForm()
  const { handleSubmit, reset } = formMethod

  const { mutate: editPasswordMutation } = useEditPassword()

  const handleSubmitPassword = (formData: EditPasswordRequest) => {
    editPasswordMutation(
      { password: formData.password, newPassword: formData.newPassword },
      {
        onSuccess: () => {
          onClickScrim()
          reset()
        },
      },
    )
  }

  return (
    <BottomSheet isShowing={isShowing} onClickScrim={onClickScrim}>
      <div className=" pb-5">
        <SubHeader.Close title="비밀번호 변경" onClose={onClickScrim} />
      </div>

      <FormProvider {...formMethod}>
        <form
          onSubmit={handleSubmit(handleSubmitPassword)}
          className="flex-column mb-5 h-full gap-4 overflow-y-scroll scrollbar-hide"
        >
          <InputGroup>
            <Label>새 비밀번호</Label>
            <InputGroup.Input
              type="password"
              section="newPassword"
              placeholder="6~12자/영문 소문자, 숫자 사용 가능"
            />
            <InputGroup.ErrorMessage section="newPassword" />
          </InputGroup>

          <InputGroup>
            <Label>새 비밀번호 확인</Label>
            <InputGroup.Input
              type="password"
              section="confirm"
              placeholder="비밀번호를 다시 입력해주세요."
            />
            <InputGroup.ErrorMessage section="confirm" />
          </InputGroup>

          <InputGroup>
            <Label>현재 비밀번호</Label>
            <InputGroup.Input
              type="password"
              section="password"
              placeholder="기존의 비밀번호를 입력해주세요."
            />
            <InputGroup.ErrorMessage section="password" />
          </InputGroup>

          <div className="mt-auto">
            <Button type="submit" size="md">
              변경하기
            </Button>
          </div>
        </form>
      </FormProvider>
    </BottomSheet>
  )
}
