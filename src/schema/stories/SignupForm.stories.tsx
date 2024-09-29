import type { PropsWithChildren } from 'react'
import { FormProvider } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import type { Meta, StoryFn } from '@storybook/react'

import { Button } from '@/components/view/button/Button'
import { InputGroup } from '@/components/view/inputGroup'
import Label from '@/components/view/label/Label'
import type { SignupFormType } from '@/types'

import { useSignupForm } from '../useSignupForm'

const Container = ({ children }: PropsWithChildren) => {
  return <div className="max-w-[450px]">{children}</div>
}

export default {
  title: 'FormSchema',
  component: Container,
} as Meta

export const SignupForm: StoryFn = () => {
  const formMethod = useSignupForm()
  const { handleSubmit, control } = formMethod

  const handleSubmitSignupForm = (formData: SignupFormType) => {
    alert(JSON.stringify(formData, null, 2))
  }

  return (
    <Container>
      <FormProvider {...formMethod}>
        <form onSubmit={handleSubmit(handleSubmitSignupForm)} className="flex-column gap-4">
          <InputGroup>
            <Label>아이디</Label>
            <InputGroup.Input section="id" placeholder="6~12자/영문자, 숫자 사용" />
            <InputGroup.ErrorMessage section="id" />
          </InputGroup>

          <InputGroup>
            <Label>비밀번호</Label>
            <InputGroup.Input
              section="password"
              placeholder="8~16자/영문자, 숫자 모두 혼용"
              type="password"
            />
            <InputGroup.ErrorMessage section="password" />
          </InputGroup>

          <InputGroup>
            <Label>비밀번호 확인</Label>
            <InputGroup.Input
              section="confirm"
              placeholder="비밀번호를 다시 입력해주세요."
              type="password"
            />
            <InputGroup.ErrorMessage section="confirm" />
          </InputGroup>

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

          <InputGroup>
            <InputGroup.CheckBox section="personal" onClickArrow={() => {}}>
              개인정보 이용 동의 (필수)
            </InputGroup.CheckBox>
            <InputGroup.CheckBox section="notification" onClickArrow={() => {}}>
              알림 수신 동의 (선택)
            </InputGroup.CheckBox>
            <InputGroup.CheckBoxAll>전체 동의</InputGroup.CheckBoxAll>
            <InputGroup.ErrorMessage section="personal" />
          </InputGroup>

          <Button primary type="submit" onClick={() => {}}>
            회원가입
          </Button>
        </form>
      </FormProvider>
      <DevTool control={control}></DevTool>
    </Container>
  )
}
