'use client'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useStateMachine } from 'little-state-machine'

import { Button, InputGroup } from '@/components/view'
import { Label } from '@/components/view'
import { useCheckDuplicateId } from '@/store/queries/useAuth'
import { persistSignUpForm } from '@/utility/utils'

export const AccountStep = () => {
  const { watch, getValues, setError, clearErrors, trigger, reset } = useFormContext()
  const [isDisable, setDisable] = useState(true)

  useEffect(() => {
    const subscription = watch((value) => {
      const isNotEmpty = !!(value['id'] && value['password'] && value['confirm'])

      isNotEmpty ? setDisable(false) : setDisable(true)
    })

    return () => subscription.unsubscribe()
  }, [watch])

  const [currentId, setCurrentId] = useState({
    isValid: false,
    value: getValues('id'),
  })
  const { mutate: checkDuplicateId } = useCheckDuplicateId({
    onSuccess: () => {
      setCurrentId({
        isValid: true,
        value: getValues('id'),
      })
      clearErrors('id')
    },
    onError: (error) => {
      setError('id', { type: 'custom', message: '이미 존재하는 아이디입니다.' })
      console.log(error.message)
    },
  })

  const handleCheckDuplicateId = () => {
    checkDuplicateId({ id: getValues('id') })
  }

  const {
    state: { signUp },
    actions,
  } = useStateMachine({ persistSignUpForm })

  useEffect(() => {
    reset(signUp)
  }, [])

  const router = useRouter()
  const handleGoNext = async () => {
    const isValid = await trigger(['id', 'password', 'confirm'])
    if (!isValid) return
    if (!currentId.isValid || currentId.value !== getValues('id')) {
      setError('id', { type: 'custom', message: '중복확인하지 않은 아이디입니다.' })
      return
    }
    setCurrentId({
      isValid: true,
      value: getValues('id'),
    })
    actions.persistSignUpForm({ ...getValues() })
    router.push('/sign-up/user-info')
  }

  return (
    <div className="flex-column-between mx-[20px] min-h-screen gap-[32px] bg-white pb-[55px]">
      <div>
        <div className="flex-column-align mb-[40px] mt-[18px] gap-[12px]">
          <h1 className="subtitle-B">회원가입</h1>
          <div className="flex-center w-full gap-[4px] px-[8px]">
            <hr className="h-[6px] w-full border-none bg-green-4" />
            <hr className="h-[6px] w-full border-none bg-green-1" />
            <hr className="h-[6px] w-full border-none bg-green-1" />
          </div>
        </div>
        <h1 className="title-B mb-[24px] text-black">로그인 정보를 입력해 주세요!</h1>
        <div className="flex-column w-full gap-[16px]">
          <InputGroup>
            <Label>아이디</Label>
            <div className="flex-between-align gap-[7px]">
              <InputGroup.Input section="id" placeholder="6~12자/영문자, 숫자 사용" />
              <button
                type="button"
                className="flex-center body-B h-[56px] w-[100px] rounded-[12px] bg-mint-4 text-white"
                onClick={handleCheckDuplicateId}
              >
                중복확인
              </button>
            </div>
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
        </div>
      </div>
      <Button type="button" disabled={isDisable} onClick={handleGoNext}>
        다음으로
      </Button>
    </div>
  )
}
