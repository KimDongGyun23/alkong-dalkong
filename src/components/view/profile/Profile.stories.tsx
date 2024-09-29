import type { Meta, StoryObj } from '@storybook/react'

import { Profile } from './Profile'

const meta: Meta<typeof Profile> = {
  title: 'Profile',
  component: Profile,
}

export default meta

type Story = StoryObj<typeof Profile>

export const Small: Story = {
  args: {
    size: 'sm',
    name: '테스트',
  },
}

export const Medium: Story = {
  args: {
    size: 'md',
    name: '테스트',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    name: '테스트',
  },
}

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    name: '테스트',
  },
}

export const DoubleExtraLarge: Story = {
  args: {
    size: '2xl',
    name: '테스트',
  },
}
