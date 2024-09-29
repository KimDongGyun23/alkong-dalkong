import { memo, useCallback, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import { useDebounceCallback } from '@/hooks'

import 'swiper/css'

type SliderProps = {
  list: readonly string[]
  initialSlide: string
  onChange: (selected: number) => void
}

type MemoizedSwiperSlideProps = {
  content: string
}

const MemoizedSwiperSlide = memo(({ content }: MemoizedSwiperSlideProps) => {
  return <SwiperSlide className="leading-[30px]">{content}</SwiperSlide>
})

MemoizedSwiperSlide.displayName = 'MemoizedSwiperSlide'

export const Slider = ({ list, initialSlide, onChange }: SliderProps) => {
  const activeIndexRef = useRef(0)

  const debouncedSlideChange = useDebounceCallback(() => {
    onChange(activeIndexRef.current)
  }, 300)

  const handleSlideChange = useCallback(
    ({ realIndex }: { realIndex: number }) => {
      activeIndexRef.current = realIndex
      debouncedSlideChange()
    },
    [debouncedSlideChange, list.length],
  )

  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={5}
      centeredSlides={true}
      direction="vertical"
      loop={true}
      initialSlide={parseInt(initialSlide)}
      className="headline-M h-[150px] w-6 text-center"
      onSlideChange={handleSlideChange}
    >
      {list.map((item) => (
        <MemoizedSwiperSlide key={item} content={item} />
      ))}
    </Swiper>
  )
}
