'use client'
import type { Dispatch, SetStateAction } from 'react'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useStateMachine } from 'little-state-machine'

import { Button, InputGroup, Label, SignUpHeader } from '@/components/view'
import { useBoolean } from '@/hooks'
import { useCheckDuplicateId } from '@/store/queries'
import { persistSignUpForm } from '@/utility/utils'

type IdFieldProps = { setCurrentId: Dispatch<SetStateAction<{ isValid: boolean; value: string }>> }

const IdField = ({ setCurrentId }: IdFieldProps) => {
  const [isDuplicated, setIsDuplicatedTrue, setIsDuplicatedFalse] = useBoolean(false)
  const [isClickedButton, setIsClickedButton] = useState(false)
  const {
    getValues,
    trigger,
    formState: { errors },
  } = useFormContext()
  const { mutate: duplicateIdMutation } = useCheckDuplicateId()

  const handleCheckDuplicateId = async () => {
    const isValid = await trigger('id')
    setIsClickedButton(true)
    if (isValid) {
      duplicateIdMutation(
        { id: getValues('id') },
        {
          onSuccess: () => {
            setIsDuplicatedFalse()
            setCurrentId({ isValid: true, value: getValues('id') })
          },
          onError: setIsDuplicatedTrue,
        },
      )
    }
  }

  return (
    <InputGroup>
      <Label>아이디</Label>
      <div className="flex-between-align gap-[7px]">
        <InputGroup.Input section="id" placeholder="6~12자/영문자, 숫자 사용" />
        <button
          type="button"
          className="flex-center body-B h-14 w-[100px] rounded-xl bg-mint-4 text-white"
          onClick={handleCheckDuplicateId}
        >
          중복확인
        </button>
      </div>
      {isDuplicated && (
        <p className="caption-M mx-[8px] h-[18px] text-red">* 이미 사용중인 아이디입니다.</p>
      )}
      {isClickedButton && !isDuplicated && !errors['id'] && (
        <p className="caption-M mx-[8px] h-[18px] text-mint-5">* 사용 가능한 아이디입니다.</p>
      )}
      <InputGroup.ErrorMessage section="id" />
    </InputGroup>
  )
}

export const AccountStep = () => {
  const router = useRouter()
  const [isDisable, setDisable] = useState(true)

  const { watch, getValues, setError, trigger, reset } = useFormContext()
  const [currentId, setCurrentId] = useState({ isValid: false, value: getValues('id') })

  const {
    state: { signUp },
    actions,
  } = useStateMachine({ persistSignUpForm })

  useEffect(() => {
    const subscription = watch((value) => {
      const isNotEmpty = !!(value['id'] && value['password'] && value['confirm'])

      isNotEmpty ? setDisable(false) : setDisable(true)
    })

    return () => subscription.unsubscribe()
  }, [watch])

  useEffect(() => {
    reset(signUp)
  }, [reset, signUp])

  const handleGoNext = async () => {
    const isValid = await trigger(['id', 'password', 'confirm'])
    if (!isValid) return
    if (!currentId.isValid || currentId.value !== getValues('id')) {
      setError('id', { type: 'custom', message: '중복을 확인하지 않은 아이디입니다.' })
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
        <SignUpHeader step={0} />
        <h1 className="title-B mb-[24px] text-black">로그인 정보를 입력해 주세요!</h1>

        <div className="flex-column w-full gap-[16px]">
          <IdField setCurrentId={setCurrentId} />

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
