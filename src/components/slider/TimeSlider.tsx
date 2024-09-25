'use client'
import { HOURS, MINUTES } from '@/constants'
import { useSelectedTime, useSelectedTimeActions } from '@/store/stores/timeStore'

import { Slider } from './Slider'

export const TimeSlider = () => {
  const time = useSelectedTime()
  const { handleHourChange, handleMinuteChange } = useSelectedTimeActions()

  const hour = time.slice(0, 2)
  const minute = time.slice(3, 5)

  return (
    <div className="flex-center relative w-full select-none rounded-xl bg-mint-0 py-[17px]">
      <div className="absolute top-1/2 h-[30px] w-[192px] -translate-y-1/2 rounded-lg bg-mint-2" />
      <div className="flex gap-8">
        <Slider list={HOURS} initialSlide={hour} onChange={handleHourChange} />
        <p className="h-[30px] translate-y-[60px] leading-[30px]">:</p>
        <Slider list={MINUTES} initialSlide={minute} onChange={handleMinuteChange} />
      </div>
    </div>
  )
}
