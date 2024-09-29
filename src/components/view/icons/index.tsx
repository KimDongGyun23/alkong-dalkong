import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon } from './Arrow'
import { HandleBar } from './Bar'
import { CheckNoIcon, CheckYesIcon } from './Check'
import { CloseIcon } from './Close'
import { EllipseIcon } from './Ellipse'
import {
  CalendarLabelIcon,
  CheckLabelIcon,
  ClinicLabelIcon,
  EmergencyLabelIcon,
  HealthLabelIcon,
  MedicineLabelIcon,
  TimeLabelIcon,
} from './Label'
import { MinusIcon } from './Minus'
import { ClinicIcon, HealthIcon, HomeIcon, MedicineIcon } from './Navi'
import { PlusIcon } from './Plus'

export type IconProps = {
  color?: string
  size?: number
}

export const iconMap = {
  'arrow-down': ArrowDownIcon,
  'arrow-up': ArrowUpIcon,
  'arrow-left': ArrowLeftIcon,
  'arrow-right': ArrowRightIcon,
  'check-no': CheckNoIcon,
  'check-yes': CheckYesIcon,
  close: CloseIcon,
  plus: PlusIcon,
  minus: MinusIcon,
  'health-label': HealthLabelIcon,
  'medicine-label': MedicineLabelIcon,
  'clinic-label': ClinicLabelIcon,
  'check-label': CheckLabelIcon,
  'time-label': TimeLabelIcon,
  'emergency-label': EmergencyLabelIcon,
  'calendar-label': CalendarLabelIcon,
  home: HomeIcon,
  medicine: MedicineIcon,
  clinic: ClinicIcon,
  health: HealthIcon,
  'handle-bar': HandleBar,
  ellipse: EllipseIcon,
}

export type IconComponentProps = IconProps & {
  name: keyof typeof iconMap
}

export const Icon = ({ name, ...props }: IconComponentProps) => {
  const IconComponent = iconMap[name]

  return <IconComponent {...props} />
}
