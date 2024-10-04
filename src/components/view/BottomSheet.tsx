'use client'
import { type ComponentProps, type MouseEventHandler, useEffect } from 'react'
import { m, type Variants } from 'framer-motion'

import { AnimatePortal, Icon } from '@/components/view'
import { useScrollLock } from '@/hooks'
import { zIndex } from '@/utility/constants'

type BottomSheetProps = ComponentProps<typeof AnimatePortal> & {
  onClickScrim?: VoidFunction
  isShort?: boolean
  bgStyle?: string
}

export const BottomSheet = ({
  onClickScrim,
  isShort = false,
  bgStyle = 'bg-white',
  isShowing,
  children,
  mode,
}: BottomSheetProps) => {
  const { lockScroll, unlockScroll } = useScrollLock()

  const handleClickScrim: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target !== e.currentTarget) return
    if (onClickScrim) onClickScrim()
  }

  useEffect(() => {
    if (isShowing) {
      lockScroll()
    } else {
      unlockScroll()
    }
  }, [isShowing, lockScroll, unlockScroll])

  const heightStyle = isShort ? 'h-[calc(100vh-252px)]' : 'h-[calc(100vh-55px)]'

  return (
    <AnimatePortal isShowing={isShowing} mode={mode}>
      <m.div
        className={`absolute inset-0 ${zIndex.bottomNav} size-full overflow-hidden bg-[rgba(15,23,42,0.5)]`}
        onClick={handleClickScrim}
        variants={bottomSheetFadeInVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <m.div
          className={`flex-column ${heightStyle} absolute inset-x-0 top-full ${zIndex.modal} w-full rounded-t-3xl ${bgStyle} px-[20px]`}
          variants={bottomSheetVariants}
        >
          <div className="self-center pb-[17px] pt-[8px]">
            <Icon name="handle-bar" />
          </div>
          {children}
        </m.div>
      </m.div>
    </AnimatePortal>
  )
}

const easing = [0.6, -0.05, 0.01, 0.99]

const bottomSheetFadeInVariants: Variants = {
  initial: {
    opacity: 0,
    transition: { duration: 0.3, ease: easing },
    willChange: 'opacity',
  },
  animate: {
    opacity: 1,
    transition: { duration: 0.3, ease: easing },
    willChange: 'opacity',
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: easing },
    willChange: 'opacity',
  },
}

const bottomSheetVariants: Variants = {
  initial: {
    y: 0,
    transition: { duration: 0.3, ease: easing },
    willChange: 'transform',
  },
  animate: {
    y: '-100%',
    transition: { duration: 0.3, ease: easing },
    willChange: 'transform',
  },
  exit: {
    y: 0,
    transition: { duration: 0.3, ease: easing },
    willChange: 'transform',
  },
}
