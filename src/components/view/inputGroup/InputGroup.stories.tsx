import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Meta } from '@storybook/react'
import { z } from 'zod'

import Label from '../label/Label'

import { InputGroup } from '.'

const meta: Meta<typeof InputGroup> = {
  title: 'InputGroup',
  component: InputGroup,
  argTypes: {
    direction: { control: 'text' },
  },
}

export default meta

const schema = z.object({
  input: z
    .string()
    .min(6, { message: '6글자 이상입니다.' })
    .max(12, { message: '12글자 이하입니다.' })
    .regex(/^[a-z0-9]+$/, {
      message: '영문 소문자와 숫자만 가능합니다.',
    }),
  gender: z.enum(['MAN', 'WOMAN'], { message: '성별을 선택해주세요.' }),
  textarea: z.string(),
  personal: z.boolean(),
  notification: z.boolean(),
  stepper: z.number(),
  textWithArrow: z.string(),
})

type FormType = {
  input: string
  gender: string
  textarea: string
  personal: boolean
  notification: boolean
  stepper: number
  textWithArrow: string
}

export const Form = () => {
  const formMethod = useForm<FormType>({
    defaultValues: {
      input: '',
      gender: '',
      textarea: '',
      personal: false,
      notification: false,
      stepper: 0,
      textWithArrow: 'default',
    },
    resolver: zodResolver(schema),
  })

  const {
    handleSubmit,
    formState: { errors },
  } = formMethod
  const handleSubmitForm: (formData: FormType) => void = (formData) =>
    alert(JSON.stringify(formData, null, 2))

  return (
    <div className="max-w-[450px]">
      <FormProvider {...formMethod}>
        <form onSubmit={handleSubmit(handleSubmitForm)} className="flex-column gap-8">
          <InputGroup>
            <Label>Input</Label>
            <InputGroup.Input section="input" placeholder="input" />
            <InputGroup.ErrorMessage section="input" />
          </InputGroup>

          <InputGroup>
            <Label>Gender</Label>
            <InputGroup.Gender />
            <InputGroup.ErrorMessage section="gender" />
          </InputGroup>

          <InputGroup>
            <Label>TextArea</Label>
            <InputGroup.TextArea section="textarea" placeholder="textarea" />
            <InputGroup.ErrorMessage section="textarea" />
          </InputGroup>

          <InputGroup>
            <Label>CheckBox</Label>
            <InputGroup.CheckBox section="personal" onClickArrow={() => alert('BottomSheet')}>
              개인정보
            </InputGroup.CheckBox>
            <InputGroup.CheckBox section="notification" onClickArrow={() => alert('BottomSheet')}>
              알람
            </InputGroup.CheckBox>
            <InputGroup.CheckBoxAll>전체 동의</InputGroup.CheckBoxAll>
          </InputGroup>

          <InputGroup direction="row">
            <Label>Stepper</Label>
            <InputGroup.Stepper section="stepper" />
          </InputGroup>

          <InputGroup direction="row">
            <Label>TextWithArrow</Label>
            <InputGroup.TextWithArrow
              section="textWithArrow"
              onClick={() => alert('Bottom Sheet')}
            />
          </InputGroup>

          <button type="submit" onClick={() => console.log(errors)}>
            제출
          </button>
        </form>
      </FormProvider>
    </div>
  )
}
