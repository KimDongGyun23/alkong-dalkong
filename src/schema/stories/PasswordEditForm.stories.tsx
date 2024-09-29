import type { PropsWithChildren } from 'react'
import { FormProvider } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import type { Meta, StoryFn } from '@storybook/react'

import { Button } from '@/components/view/button/Button'
import { InputGroup } from '@/components/view/inputGroup'
import Label from '@/components/view/label/Label'
import type { PasswordEditFormType } from '@/types'

import { usePasswordEditForm } from '../usePasswordEditForm'

const Container = ({ children }: PropsWithChildren) => {
  return <div className="max-w-[450px]">{children}</div>
}
export default {
  title: 'FormSchema',
  component: Container,
} as Meta

export const PasswordEditForm: StoryFn = () => {
  const formMethod = usePasswordEditForm()
  const { handleSubmit, control } = formMethod

  const handleSubmitPasswordEditForm = (formData: PasswordEditFormType) => {
    alert(JSON.stringify(formData, null, 2))
  }

  return (
    <Container>
      <FormProvider {...formMethod}>
        <form onSubmit={handleSubmit(handleSubmitPasswordEditForm)} className="flex-column gap-4">
          <InputGroup>
            <Label>새 비밀번호</Label>
            <InputGroup.Input
              section="newPassword"
              placeholder="8~16자/영문자, 숫자 모두 혼용"
              type="password"
            />
            <InputGroup.ErrorMessage section="newPassword" />
          </InputGroup>

          <InputGroup>
            <Label>새 비밀번호 확인</Label>
            <InputGroup.Input
              section="confirm"
              placeholder="비밀번호를 다시 입력해주세요."
              type="password"
            />
            <InputGroup.ErrorMessage section="confirm" />
          </InputGroup>

          <InputGroup>
            <Label>현재 비밀번호</Label>
            <InputGroup.Input
              section="password"
              placeholder="기존의 비밀번호를 입력해주세요."
              type="password"
            />
            <InputGroup.ErrorMessage section="password" />
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
