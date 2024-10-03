import { ClinicCalendar, ScheduleListSection } from '@/components/domain'
import { DashBoardTemplate, Profile } from '@/components/view'

const Clinic = () => {
  return (
    <DashBoardTemplate route="clinic">
      <main className="overflow-y-scroll scrollbar-hide">
        <div className="absolute right-5 top-[22px]">
          <Profile size="sm" bgColor="#C5FDEC" />
        </div>

        <section>
          <ClinicCalendar />
        </section>

        <section className="mt-7">
          <ScheduleListSection />
        </section>
      </main>
    </DashBoardTemplate>
  )
}

export default Clinic
