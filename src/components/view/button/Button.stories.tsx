import type { Meta, StoryFn } from '@storybook/react'

import { Button } from './Button'

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    height: {
      control: 'text',
      description: 'Button height',
      defaultValue: 'h-[56px]',
    },
    fontSize: {
      control: 'select',
      options: ['md', 'sm'],
      description: 'Font size',
      defaultValue: 'md',
    },
    primary: {
      control: 'boolean',
      description: 'Primary color scheme',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
      defaultValue: false,
    },
    submit: {
      control: 'boolean',
      description: 'Set button type as submit',
      defaultValue: false,
    },
    onClick: { action: 'clicked' },
  },
} as Meta

const Template: StoryFn<typeof Button> = (args) => <Button {...args}>다음으로</Button>

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
}

export const Secondary = Template.bind({})
Secondary.args = {
  primary: false,
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
}

const ShortTemplate: StoryFn<typeof Button> = (args) => {
  return (
    <div className="flex-center w-[300px] gap-3">
      <Button {...args}>취소</Button>
      <Button primary {...args}>
        삭제
      </Button>
    </div>
  )
}
export const Short = ShortTemplate.bind({})
Short.args = {
  size: 'sm',
}
