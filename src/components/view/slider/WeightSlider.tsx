'use client'
import { useSelectedWeight, useSelectedWeightActions } from '@/store/stores'
import { WEIGHT_SLIDER_NUMBERS } from '@/utility/constants'

import { Slider } from './Slider'

export const WeightSlider = () => {
  const { handleDecimalWeightChange, handleOnesWeightChange, handleTensWeightChange } =
    useSelectedWeightActions()
  const weight = useSelectedWeight()

  const tensOfWeight = weight.slice(0, 1)
  const onesOfWeight = weight.slice(1, 2)
  const decimalOfWeight = weight.slice(3, 4)

  console.log(weight, tensOfWeight, onesOfWeight, decimalOfWeight)

  return (
    <div className="flex-center relative w-full select-none rounded-xl bg-mint-0 py-[17px]">
      <div className="headline-M absolute top-1/2 h-[30px] w-[158px] -translate-x-6 -translate-y-1/2 rounded-lg bg-mint-2" />
      <div className="flex gap-[14px]">
        <Slider
          list={WEIGHT_SLIDER_NUMBERS}
          initialSlide={tensOfWeight}
          onChange={handleTensWeightChange}
        />
        <Slider
          list={WEIGHT_SLIDER_NUMBERS}
          initialSlide={onesOfWeight}
          onChange={handleOnesWeightChange}
        />
        <p className="h-[30px] translate-y-[65px]">.</p>
        <Slider
          list={WEIGHT_SLIDER_NUMBERS}
          initialSlide={decimalOfWeight}
          onChange={handleDecimalWeightChange}
        />
        <p className="ml-3 h-[30px] translate-y-[64px]">Kg</p>
      </div>
    </div>
  )
}
