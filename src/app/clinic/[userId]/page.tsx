import { ScheduleListSection } from '@/components/domain/clinic/ScheduleListSection'
import { BottomNav, Calendar, Profile } from '@/components/view'

const Clinic = () => {
  return (
    <>
      <main className="mx-4 mb-[130px] mt-[38px] overflow-y-scroll scrollbar-hide">
        <div className="absolute right-5 top-[22px]">
          <Profile size="sm" bgColor="#C5FDEC" />
        </div>

        <section>
          <Calendar />
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
