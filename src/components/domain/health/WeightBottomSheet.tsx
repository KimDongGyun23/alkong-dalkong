'use client'

import dayjs from 'dayjs'

import { BottomSheet, Label, SubHeader, WeightSlider } from '@/components/view'
import { useTodayWeight } from '@/store/queries'
import { useSelectedWeight } from '@/store/stores'
import { formatDateWithType } from '@/utility/utils'

type WeightBottomSheetProps = {
  physicalId: number
  isShowing: boolean
  onClickScrim: VoidFunction
}

export const WeightBottomSheet = ({
  physicalId,
  isShowing,
  onClickScrim,
}: WeightBottomSheetProps) => {
  const weight = useSelectedWeight()
  const date = formatDateWithType(dayjs().toString(), 'monthDateDay')

  const { mutate: todayWeightMutation } = useTodayWeight()

  const handleClickWeightEdit = () => {
    todayWeightMutation({
      physicalId,
      weight: parseFloat(weight),
      createdAt: formatDateWithType(dayjs().toString(), 'default'),
    })
  }

  return (
    <BottomSheet isShowing={isShowing} onClickScrim={onClickScrim}>
      <div className="w-full pb-5">
        <SubHeader.Confirm
          title="체중 입력"
          onCancel={onClickScrim}
          onConfirm={handleClickWeightEdit}
        />
      </div>

      <div className="size-full overflow-y-scroll pb-12 pt-5 scrollbar-hide">
        <Label icon="calendar-label">
          체중을 입력해주세요.
          <br />
          오늘은 {date}이에요.
        </Label>

        <WeightSlider />
      </div>
    </BottomSheet>
  )
}
