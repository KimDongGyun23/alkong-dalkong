'use client'

import { Icon } from '../icons'

export type Props = {
  label: string
  onClick: () => void
  primary?: boolean
  icon?: 'plus' | 'minus'
}

type ActionTagType = React.FC<Props> & {
  Plus: React.FC<Props>
  Minus: React.FC<Props>
}

const ActionTag: ActionTagType = ({ label, onClick, primary = false, icon = 'plus' }: Props) => {
  const color = primary ? 'bg-mint-6 text-white' : 'bg-gray-2 text-gray-7'

  return (
    <button
      className={`${color} body-M flex-center gap-[4px] rounded-[99px] pb-[6px] pl-[10px] pr-[12px] pt-[4px]`}
      onClick={onClick}
      type="button"
    >
      <Icon name={icon} color={`${primary ? '#FFFFFF' : '#676A6B'}`} size={16} />
      <span>{label}</span>
    </button>
  )
}

const Plus = (props: Props) => {
  return <ActionTag {...props} icon="plus" />
}

const Minus = (props: Props) => {
  return <ActionTag {...props} primary icon="minus" />
}

ActionTag.Plus = Plus
ActionTag.Minus = Minus

export default ActionTag
