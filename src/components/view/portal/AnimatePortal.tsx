'use client'
import { type ComponentProps } from 'react'
import { AnimatePresence } from 'framer-motion'

import { Portal } from './Portal'

type AnimatePortalProps = ComponentProps<typeof Portal> & {
  isShowing: boolean
  mode?: ComponentProps<typeof AnimatePresence>['mode']
}

export const AnimatePortal = ({ children, isShowing, mode = 'wait' }: AnimatePortalProps) => {
  return (
    <Portal>
      <AnimatePresence mode={mode}>{isShowing && children}</AnimatePresence>
    </Portal>
  )
}
