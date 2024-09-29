import type { Meta, StoryObj } from '@storybook/react'

import Toggle from './Toggle'

const meta: Meta<typeof Toggle> = {
  title: 'Toggle',
  component: Toggle,
  argTypes: {
    initialState: {
      control: 'boolean',
      description: '초기 상태 (기본값: false)',
    },
    onClick: {
      action: 'clicked',
      description: 'Toggle 버튼 클릭 시, 호출',
    },
  },
}

export default meta

type Story = StoryObj<typeof Toggle>

export const Default: Story = {
  args: {
    initialState: false,
    onClick: (prev) => alert(`이전 상태값: ${prev}`),
  },
}
