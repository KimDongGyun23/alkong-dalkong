import type { Meta, StoryFn } from '@storybook/react'

import Tag from './Tag'

export default {
  title: 'Tag',
  component: Tag,
  argTypes: {
    label: { control: 'text' },
  },
} as Meta

const Template: StoryFn<{ tags: { label: string }[] }> = ({ tags }) => (
  <div className="flex gap-3">
    {tags.map((tag, idx) => (
      <Tag key={idx} {...tag} />
    ))}
  </div>
)

export const Default = Template.bind({})
Default.args = {
  tags: [{ label: '건강검진' }, { label: '멍' }, { label: '속쓰림' }, { label: '기침' }],
}
