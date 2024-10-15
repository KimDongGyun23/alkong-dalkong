import { ClinicCalendar, ScheduleListSection } from '@/components/domain'
import { DashBoardTemplate } from '@/components/view'

const Clinic = () => {
  return (
    <DashBoardTemplate route="clinic">
      <section>
        <ClinicCalendar />
      </section>

      <section className="mt-7">
        <ScheduleListSection />
      </section>
    </DashBoardTemplate>
  )
}

export default Clinic
