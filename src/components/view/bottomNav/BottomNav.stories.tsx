import { type Meta } from '@storybook/react'

import { BottomNav } from './BottomNav'

const meta: Meta<typeof BottomNav> = {
  title: 'BottomNav',
  component: BottomNav,
}

export default meta

export const Default = () => {
  return (
    <div>
      <BottomNav />
    </div>
  )
}
