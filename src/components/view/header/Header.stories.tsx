import type { Meta, StoryObj } from '@storybook/react'

import { MainHeader } from './MainHeader'
import { SubHeader } from './SubHeader'

const meta: Meta<typeof SubHeader.Back> = {
  title: 'Header',
  component: SubHeader.Back,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof SubHeader.Back>

export const Default: Story = {
  args: {
    title: '헤더 텍스트',
  },
}

export const All = () => {
  return (
    <div className="flex-column gap-[20px]">
      <MainHeader.Setting title={`메인 헤더\n프로필 아이콘`} />
      <MainHeader.Confirm
        title={`메인 헤더\n취소 + 완료`}
        onCancel={() => alert('취소')}
        onConfirm={() => alert('완료')}
      />
      <MainHeader.Modify
        title={`메인 헤더\n뒤로가기 아이콘 + 수정 + 삭제`}
        onDelete={() => alert('삭제')}
        onModify={() => alert('수정')}
      />
      <SubHeader.Back title="뒤로가기 아이콘 헤더" />
      <SubHeader.Close title="닫기 아이콘 헤더" onClose={() => alert('닫기')} />
      <SubHeader.Confirm
        title="취소 + 완료 헤더"
        onCancel={() => alert('취소')}
        onConfirm={() => alert('완료')}
      />
    </div>
  )
}
