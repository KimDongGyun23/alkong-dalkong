'use client'

import { FormProvider } from 'react-hook-form'
import { useParams, useRouter } from 'next/navigation'

import { InputGroup, Label, MainHeader, Tag } from '@/components'
import { ClinicInfoModal, useInsertedClinicForm } from '@/features'
import { useBoolean } from '@/hooks'

export const ClinicInfoClientPage = () => {
  const router = useRouter()
  const formMethod = useInsertedClinicForm()
  const { getValues } = formMethod

  const [modalState, openModal, closeModal] = useBoolean(false)
  const { userId, medicalId } = useParams<{ userId: string; medicalId: string }>()

  const handleClickModify = () => router.push(`/clinic/${userId}/edit/${medicalId}`)

  return (
    <div className="flex-column h-full overflow-hidden">
      <div>
        <MainHeader.Modify
          title={`의사에게 전달할\n특이사항을 기입해주세요.`}
          onDelete={openModal}
          onModify={handleClickModify}
        />
      </div>

      <FormProvider {...formMethod}>
        <form className="flex-column gap-8 overflow-scroll px-5 py-8 scrollbar-hide">
          <InputGroup>
            <Label icon="check-label">진료 과목</Label>
            <div className="flex flex-wrap gap-2">
              {getValues('medicalPart')?.map((part: string) => <Tag key={part} label={part} />)}
            </div>
          </InputGroup>

          <InputGroup>
            <Label icon="calendar-label">방문 날짜</Label>
            <InputGroup.Input
              section="hospitalDate"
              readOnly
              placeholder="방문 날짜를 선택해주세요."
            />
          </InputGroup>

          <InputGroup>
            <Label icon="clinic-label">방문 병원</Label>
            <InputGroup.Input section="hospitalName" readOnly />
          </InputGroup>

          <InputGroup>
            <Label icon="emergency-label">증상 및 특이사항</Label>
            <InputGroup.TextArea
              section="medicalMemo"
              placeholder="특이사항이 없습니다."
              readOnly
            />
          </InputGroup>

          <InputGroup>
            <Label icon="time-label">알람</Label>
            <div className="flex-between-align w-full rounded-xl border border-mint-3 py-4 pl-3 pr-4">
              <Label>알람</Label>
              <p className="headline-M text-gray-7">{getValues('medicalAlarm')}</p>
            </div>
          </InputGroup>
        </form>
      </FormProvider>

      <ClinicInfoModal modalState={modalState} closeModal={closeModal} />
    </div>
  )
}
