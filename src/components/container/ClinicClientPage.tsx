'use client'

import { BottomNav, Calendar, Profile } from '@/components'
import { ScheduleList, useMonthlyScheduleList } from '@/features'
import { useUserStore } from '@/store/stores'

export const ClinicClientPage = () => {
  const { user } = useUserStore()
  const scheduleList = useMonthlyScheduleList()

  return (
    <>
      <main className="mx-4 mb-[130px] mt-[38px] overflow-y-scroll scrollbar-hide">
        <div className="absolute right-5 top-[22px]">
          <Profile name={user.name} size="sm" bgColor="#C5FDEC" />
        </div>

        <section>
          <Calendar />
        </section>

        <section className="mt-7">
          <ScheduleList scheduleList={scheduleList} />
        </section>
      </main>
      <BottomNav />
    </>
  )
}
