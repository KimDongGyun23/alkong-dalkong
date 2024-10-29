'use client'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { BottomSheet, Button, Icon, InputGroup, SignUpHeader } from '@/components/view'
import { useBoolean, useToggle } from '@/hooks'
import { tos } from '@/utility/constants'

export const TosStep = () => {
  const { watch } = useFormContext()
  const [isDisable, setDisable] = useState(true)

  useEffect(() => {
    const subscription = watch((value) => {
      const isNotEmpty = !!value['personal']

      isNotEmpty ? setDisable(false) : setDisable(true)
    })

    return () => subscription.unsubscribe()
  }, [watch])

  const [isShowing, toggleShowing] = useToggle(false)
  const [isPersonal, setPersonal, setNotification] = useBoolean(true)

  const handleClickPersonal = () => {
    toggleShowing()
    setPersonal()
  }
  const handleClickNotification = () => {
    toggleShowing()
    setNotification()
  }

  const tosTitle = isPersonal ? '개인정보이용 동의' : '알림 수신 동의'
  const tosContent = isPersonal ? tos.personal : tos.notification

  return (
    <div className="flex-column-between mx-5 min-h-screen gap-8 bg-white pb-[55px]">
      <div>
        <SignUpHeader step={2} />
        <h1 className="title-B mb-8 whitespace-pre text-black">{`정말 마지막이에요,\n이용약관에 동의해 주세요!`}</h1>
        <div className="flex-column w-full gap-3">
          <InputGroup.CheckBoxAll>전체 동의</InputGroup.CheckBoxAll>
          <InputGroup.CheckBox section="personal" onClickArrow={handleClickPersonal}>
            개인정보 이용 동의 (필수)
          </InputGroup.CheckBox>
          <InputGroup.CheckBox section="notification" onClickArrow={handleClickNotification}>
            알림 수신 동의 (선택)
          </InputGroup.CheckBox>
          <InputGroup.ErrorMessage section="personal" />
        </div>
      </div>

      <Button type="submit" disabled={isDisable}>
        시작하기
      </Button>

      <BottomSheet onClickScrim={toggleShowing} isShowing={isShowing} bgStyle="bg-gray-2">
        <button className="absolute right-5 top-4 z-[1005]" onClick={toggleShowing}>
          <Icon name="close" />
        </button>
        <div className="flex-column w-full gap-6 overflow-y-scroll pt-[18px] scrollbar-hide">
          <h1 className="headline-B text-gray-8">{tosTitle}</h1>
          <article className="body-M whitespace-pre text-gray-8">{tosContent}</article>
        </div>
      </BottomSheet>
    </div>
  )
}
