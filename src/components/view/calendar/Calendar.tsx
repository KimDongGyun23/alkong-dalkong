'use client'
import { DateList } from './DateList'
import { Navigator } from './Navigator'

const week = ['일', '월', '화', '수', '목', '금', '토']

export const Calendar = () => {
  return (
    <div className="flex-column flex w-full justify-between gap-3">
      <Navigator />

      <div className="flex shrink justify-around gap-2">
        {week.map((day, idx) => (
          <div key={idx} className="flex-1 text-center text-body font-regular text-gray-6">
            {day}
          </div>
        ))}
      </div>

      <DateList />
    </div>
  )
}
