import type { PropsWithChildren } from 'react'

import Label from '@/components/view/label/Label'

type SectionWrapper = {
  label: React.ReactNode
}

const SectionWrapper = ({ children, label }: PropsWithChildren<SectionWrapper>) => {
  return (
    <section className="mb-8 w-full">
      {label}
      <div className="flex-column mt-2 gap-3">{children}</div>
    </section>
  )
}

const ClinicSection = ({ children }: PropsWithChildren) => {
  return (
    <SectionWrapper label={<Label icon="clinic-label">병원 내원 일정</Label>}>
      {children}
    </SectionWrapper>
  )
}

const HealthSection = ({ children }: PropsWithChildren) => {
  return (
    <SectionWrapper label={<Label icon="health-label">체중 기록</Label>}>{children}</SectionWrapper>
  )
}

const MedicineSection = ({ children }: PropsWithChildren) => {
  return (
    <SectionWrapper label={<Label icon="medicine-label">약 기록</Label>}>{children}</SectionWrapper>
  )
}

export { ClinicSection, HealthSection, MedicineSection }
