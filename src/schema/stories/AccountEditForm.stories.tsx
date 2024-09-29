import type { PropsWithChildren } from 'react'
import { FormProvider } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import type { Meta, StoryFn } from '@storybook/react'

import { Button } from '@/components/view/button/Button'
import { InputGroup } from '@/components/view/inputGroup'
import Label from '@/components/view/label/Label'
import type { AccountEditFormType } from '@/types'

import { useAccountEditForm } from '../useAccountEditForm'

const Container = ({ children }: PropsWithChildren) => {
  return <div className="max-w-[450px]">{children}</div>
}
export default {
  title: 'FormSchema',
  component: Container,
} as Meta

export const AccountEditForm: StoryFn = () => {
  const formMethod = useAccountEditForm()
  const { handleSubmit, control } = formMethod

  const handleSubmitAccountEditForm = (formData: AccountEditFormType) => {
    alert(JSON.stringify(formData, null, 2))
  }

  return (
    <Container>
      <FormProvider {...formMethod}>
        <form onSubmit={handleSubmit(handleSubmitAccountEditForm)} className="flex-column gap-4">
          <InputGroup>
            <Label>이름</Label>
            <InputGroup.Input section="name" placeholder="성명을 입력해주세요." />
            <InputGroup.ErrorMessage section="name" />
          </InputGroup>

          <InputGroup>
            <Label>휴대전화번호</Label>
            <InputGroup.Input section="phoneNumber" placeholder="숫자만 입력해주세요." />
            <InputGroup.ErrorMessage section="phoneNumber" />
          </InputGroup>

          <InputGroup>
            <Label>생년월일</Label>
            <InputGroup.Input section="birth" placeholder="생년월일 8자리를 입력해주세요." />
            <InputGroup.ErrorMessage section="birth" />
          </InputGroup>

          <InputGroup>
            <Label>성별</Label>
            <InputGroup.Gender />
            <InputGroup.ErrorMessage section="gender" />
          </InputGroup>

          <Button primary type="submit" onClick={() => {}}>
            완료
          </Button>
        </form>
      </FormProvider>
      <DevTool control={control}></DevTool>
    </Container>
  )
}
