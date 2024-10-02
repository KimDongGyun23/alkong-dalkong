'use client'

import { FormProvider } from 'react-hook-form'

import { useSubmitCreateClinicForm } from '@/business/services'
import { DateBottomSheet, TagBottomSheet } from '@/components/domain'
import { ActionTag, AlarmBottomSheet, InputGroup, Label, MainHeader, Tag } from '@/components/view'
import { useToggle } from '@/hooks'
import { CLINIC_ALARM_TIME } from '@/utility/constants'
import { useClinicForm } from '@/utility/schema'

export const ClinicCreateClientPage = () => {
  const formMethod = useClinicForm()
  const { getValues, handleSubmit } = formMethod

  const [tagSheet, toggleTagSheet] = useToggle(false)
  const [dateSheet, toggleDateSheet] = useToggle(false)
  const [alarmSheet, toggleAlarmSheet] = useToggle(false)

  const submitFormattedForm = useSubmitCreateClinicForm()

  return (
    <div className="flex-column h-full overflow-hidden">
      <div>
        <MainHeader.Confirm
          title={`의사에게 전달할\n특이사항을 기입해주세요.`}
          onConfirm={handleSubmit(submitFormattedForm)}
        />
      </div>

      <FormProvider {...formMethod}>
        <form className="flex-column gap-8 overflow-scroll px-5 py-8 scrollbar-hide">
          <InputGroup>
            <Label icon="check-label">진료 과목</Label>
            <div className="flex flex-wrap gap-2">
              {getValues('medicalPart')?.map((part: string) => <Tag key={part} label={part} />)}
              <ActionTag.Plus label="추가" onClick={toggleTagSheet} />
            </div>
            <InputGroup.ErrorMessage section="medicalPart" />
            <TagBottomSheet
              section="medicalPart"
              isShowing={tagSheet}
              onClickScrim={toggleTagSheet}
            />
          </InputGroup>

          <InputGroup>
            <Label icon="calendar-label">방문 날짜</Label>
            <button type="button" onClick={toggleDateSheet}>
              <InputGroup.Input
                section="hospitalDate"
                readOnly
                placeholder="방문 날짜를 선택해주세요."
              />
            </button>
            <InputGroup.ErrorMessage section="hospitalDate" />
            <DateBottomSheet
              section="hospitalDate"
              isShowing={dateSheet}
              onClickScrim={toggleDateSheet}
            />
          </InputGroup>

          <InputGroup>
            <Label icon="clinic-label">방문 병원</Label>
            <InputGroup.Input section="hospitalName" placeholder="병원을 입력해주세요." />
            <InputGroup.ErrorMessage section="hospitalName" />
          </InputGroup>

          <InputGroup>
            <Label icon="emergency-label">증상 및 특이사항</Label>
            <InputGroup.TextArea section="medicalMemo" placeholder="증상을 입력해주세요." />
          </InputGroup>

          <InputGroup>
            <Label icon="time-label">알람</Label>
            <div className="flex-between-align w-full rounded-xl border border-mint-3 py-4 pl-5 pr-4">
              <Label>알람</Label>
              <InputGroup.TextWithArrow section="medicalAlarm" onClick={toggleAlarmSheet} />
            </div>

            <InputGroup.ErrorMessage section="medicalAlarm" />
            <AlarmBottomSheet
              timeList={CLINIC_ALARM_TIME}
              section="medicalAlarm"
              isShowing={alarmSheet}
              onClickScrim={toggleAlarmSheet}
            />
          </InputGroup>
        </form>
      </FormProvider>
    </div>
  )
}
