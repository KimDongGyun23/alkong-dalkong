import type { IconProps } from '.'

export const ArrowLeftIcon = (props: IconProps) => {
  const { color = '#676A6B', size = 36 } = props

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
    >
      <path
        d="M20 8L10 18L20 28"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const ArrowRightIcon = (props: IconProps) => {
  const { color = '#676A6B', size = 36 } = props

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
    >
      <path
        d="M16 8L26 18L16 28"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const ArrowUpIcon = (props: IconProps) => {
  const { color = '#676A6B' } = props

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="none">
      <path
        d="M6.8 1.06667L11.04 6.72C11.4355 7.24739 11.0592 8 10.4 8L1.6 8C0.940765 8 0.564458 7.24739 0.96 6.72L5.2 1.06667C5.6 0.533333 6.4 0.533333 6.8 1.06667Z"
        fill={color}
      />
    </svg>
  )
}

export const ArrowDownIcon = (props: IconProps) => {
  const { color = '#676A6B' } = props

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" fill="none">
      <path
        d="M6.8 6.93333L11.04 1.28C11.4355 0.752611 11.0592 -1.12185e-08 10.4 -1.90798e-08L1.6 -1.24019e-07C0.940765 -1.3188e-07 0.564458 0.752611 0.96 1.28L5.2 6.93333C5.6 7.46667 6.4 7.46667 6.8 6.93333Z"
        fill={color}
      />
    </svg>
  )
}
