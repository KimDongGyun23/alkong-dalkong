import type { PropsWithChildren } from 'react'

import type { iconMap } from '../icons'
import { Icon } from '../icons'

type LabelProps = {
  icon?: keyof typeof iconMap
}

const Label = ({ children, icon }: PropsWithChildren<LabelProps>) => {
  return (
    <div className="flex-align subtitle-B">
      {icon && <Icon name={icon} />}
      <p className="subtitle-B ml-2">{children}</p>
    </div>
  )
}

export default Label
