'use client'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useStateMachine } from 'little-state-machine'

import { Button, InputGroup } from '@/components'
import Label from '@/components/view/Label'
import { persistSignUpForm } from '@/utility/utils'

export const UserInfoStep = () => {
  const { watch, trigger, getValues, reset } = useFormContext()
  const [isDisable, setDisable] = useState(true)

  useEffect(() => {
    const subscription = watch((value) => {
      const isNotEmpty =
        !!(value['name'] && value['phoneNumber'] && value['birth']) && value['gender']

      isNotEmpty ? setDisable(false) : setDisable(true)
    })

    return () => subscription.unsubscribe()
  }, [watch])

  const {
    state: { signUp },
    actions,
  } = useStateMachine({ persistSignUpForm })

  useEffect(() => {
    reset(signUp)
  }, [])

  const router = useRouter()
  const handleGoNext = async () => {
    const isValid = await trigger(['name', 'phoneNumber', 'birth', 'gender'])
    if (isValid) {
      actions.persistSignUpForm({ ...getValues() })
      router.push('/sign-up/tos')
    }
  }

  return (
    <div className="flex-column-between mx-[20px] min-h-screen gap-[32px] bg-white pb-[55px]">
      <div>
        <div className="flex-column-align mb-[40px] mt-[18px] gap-[12px]">
          <h1 className="subtitle-B">회원가입</h1>
          <div className="flex-center w-full gap-[4px] px-[8px]">
            <hr className="h-[6px] w-full border-none bg-green-4" />
            <hr className="h-[6px] w-full border-none bg-green-4" />
            <hr className="h-[6px] w-full border-none bg-green-1" />
          </div>
        </div>
        <h1 className="title-B mb-[24px] text-black">회원 정보를 입력해 주세요!</h1>
        <div className="flex-column w-full gap-[16px]">
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
        </div>
      </div>
      <Button type="button" disabled={isDisable} onClick={handleGoNext}>
        다음으로
      </Button>
    </div>
  )
}
