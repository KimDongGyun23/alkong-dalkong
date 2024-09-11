'use client'

import { FormProvider } from 'react-hook-form'

import { MainHeader } from '@/components/header/MainHeader'
import { useClinicForm } from '@/schema'

import { useClinicWriteForm } from '../service/useClinicWirteForm'

import { ClinicForm } from './ClinicForm'

export const ClinicWriteClientPage = () => {
  const formMethod = useClinicForm()
  const { handleSubmit } = formMethod
  const { handleClickCancle, handleClickConfirm } = useClinicWriteForm()

  return (
    <div className="flex-column h-full overflow-hidden">
      <div>
        <MainHeader.Confirm
          title={`의사에게 전달할\n특이사항을 기입해주세요.`}
          onCancel={handleClickCancle}
          onConfirm={handleSubmit(handleClickConfirm)}
        />
      </div>

      <FormProvider {...formMethod}>
        <ClinicForm />
      </FormProvider>
    </div>
  )
}
