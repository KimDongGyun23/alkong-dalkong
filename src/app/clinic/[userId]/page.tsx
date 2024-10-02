import { ClinicCalendar, ScheduleListSection } from '@/components/domain'
import { BottomNav, Profile } from '@/components/view'

const Clinic = () => {
  return (
    <>
      <main className="mx-4 mb-[130px] mt-[38px] overflow-y-scroll scrollbar-hide">
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
      <BottomNav />
    </>
  )
}

export default Clinic
