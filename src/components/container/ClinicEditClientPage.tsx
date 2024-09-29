'use client'

import { FormProvider } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import { MainHeader } from '@/components'
import { ClinicForm, useInsertedClinicForm, useSubmitEditClinicForm } from '@/features'

export const ClinicEditClientPage = () => {
  const router = useRouter()
  const formMethod = useInsertedClinicForm()
  const { handleSubmit } = formMethod

  const handleClickConfirm = useSubmitEditClinicForm()
  const handleClickCancle = () => router.back()

  return (
    <div className="flex-column h-full overflow-hidden">
      <FormProvider {...formMethod}>
        <div>
          <MainHeader.Confirm
            title={`의사에게 전달할\n특이사항을 기입해주세요.`}
            onCancel={handleClickCancle}
            onConfirm={handleSubmit(handleClickConfirm)}
          />
        </div>

        <ClinicForm />
      </FormProvider>
    </div>
  )
}
