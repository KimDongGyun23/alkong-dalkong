import type { PropsWithChildren } from 'react'
import { FormProvider } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import type { Meta, StoryFn } from '@storybook/react'
import { domMax, LazyMotion } from 'framer-motion'

import { BottomSheet } from '@/components/view/bottomSheet/BottomSheet'
import { Button } from '@/components/view/button/Button'
import { InputGroup } from '@/components/view/inputGroup'
import Label from '@/components/view/label/Label'
import { useToggle } from '@/hooks'
import type { ClinicFormType } from '@/types'

import { useClinicForm } from '../useClinicForm'

const Container = ({ children }: PropsWithChildren) => {
  return <div className="max-w-[450px]">{children}</div>
}

type TestBottomSheetType = {
  isShowing: boolean
  onClickScrim: () => void
  onClickButton: () => void
}

const TestBottomSheet = ({ onClickScrim, isShowing, onClickButton }: TestBottomSheetType) => {
  const handleClickButton = () => {
    onClickScrim()
    onClickButton()
  }
  return (
    <BottomSheet onClickScrim={onClickScrim} isShowing={isShowing}>
      <Button type="button" onClick={handleClickButton}>
        입력 완료
      </Button>
    </BottomSheet>
  )
}

export default {
  title: 'FormSchema',
  component: Container,
} as Meta

export const ClinicForm: StoryFn = () => {
  const formMethod = useClinicForm()
  const { handleSubmit, setValue, control } = formMethod
  const [dateBottomSheet, toggleDateBottomSheet] = useToggle(false)
  const [alarmBottomSheet, toggleAlarmBottomSheet] = useToggle(false)

  const handleSubmitClinicForm = (formData: ClinicFormType) => {
    alert(JSON.stringify(formData, null, 2))
  }

  return (
    <LazyMotion features={domMax}>
      <Container>
        <FormProvider {...formMethod}>
          <form onSubmit={handleSubmit(handleSubmitClinicForm)} className="flex-column gap-8">
            <InputGroup>
              <Label>진료 과목</Label>
              {/* tag 컴포넌트 */}
              <Button onClick={() => setValue('medicalPart', ['건강검진'])}>태그 추가</Button>
              <InputGroup.ErrorMessage section="medicalPart" />
            </InputGroup>

            <InputGroup>
              <Label>방문 날짜</Label>
              <button type="button" onClick={toggleDateBottomSheet}>
                <InputGroup.Input
                  section="hospitalDate"
                  readOnly
                  placeholder="클릭하여 방문 날짜를 선택해주세요."
                />
              </button>
              <InputGroup.ErrorMessage section="hospitalDate" />
              <TestBottomSheet
                isShowing={dateBottomSheet}
                onClickScrim={toggleDateBottomSheet}
                onClickButton={() => setValue('hospitalDate', '2024년 7월 1일 월요일 오후 03:00')}
              />
            </InputGroup>

            <InputGroup>
              <Label>방문 병원</Label>
              <InputGroup.Input section="hospitalName" placeholder="병원을 입력해주세요." />
              <InputGroup.ErrorMessage section="hospitalName" />
            </InputGroup>

            <InputGroup>
              <Label>증상 및 특이사항</Label>
              <InputGroup.TextArea section="medicalMemo" placeholder="증상을 입력해주세요." />
            </InputGroup>

            <InputGroup>
              <Label>알람</Label>
              <div className="flex-between-align w-full rounded-xl border border-mint-3 px-6 py-4">
                <Label>알람</Label>
                <InputGroup.TextWithArrow section="medicalAlarm" onClick={toggleAlarmBottomSheet} />
              </div>
              <InputGroup.ErrorMessage section="medicalAlarm" />
              <TestBottomSheet
                isShowing={alarmBottomSheet}
                onClickScrim={toggleAlarmBottomSheet}
                onClickButton={() => setValue('medicalAlarm', '1시간 전')}
              />
            </InputGroup>

            <Button primary type="submit" onClick={() => {}}>
              완료
            </Button>
          </form>
        </FormProvider>
        <DevTool control={control}></DevTool>
      </Container>
    </LazyMotion>
  )
}
