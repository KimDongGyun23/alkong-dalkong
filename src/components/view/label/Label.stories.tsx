import type { Meta, StoryObj } from '@storybook/react'

import { iconMap } from '../icons'

import Label from './Label'

const meta: Meta<typeof Label> = {
  title: 'Label',
  component: Label,
  argTypes: {
    children: { control: 'text' },
    icon: {
      options: [...Object.keys(iconMap).filter((icon) => icon.includes('label'))],
      control: { type: 'radio' },
    },
  },
}

export default meta

type Story = StoryObj<typeof Label>

export const Default: Story = {
  args: {
    children: 'Default Label',
  },
}

export const WithIcon: Story = {
  args: {
    children: 'Label with Icon',
    icon: 'check-label',
  },
}
