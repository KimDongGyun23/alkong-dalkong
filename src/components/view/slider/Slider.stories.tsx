import type { PropsWithChildren } from 'react'
import type { Meta, StoryFn } from '@storybook/react'

import { TimeSlider } from './TimeSlider'
import { WeightSlider } from './WeightSlider'

const SliderWrapper = ({ children }: PropsWithChildren) => {
  return <div className="w-[450px]">{children}</div>
}

export default {
  title: 'Slider',
  component: SliderWrapper,
} as Meta

export const Time: StoryFn<typeof TimeSlider> = () => {
  return (
    <SliderWrapper>
      <TimeSlider />
    </SliderWrapper>
  )
}

export const Weight: StoryFn<typeof WeightSlider> = () => {
  return (
    <SliderWrapper>
      <WeightSlider />
    </SliderWrapper>
  )
}
