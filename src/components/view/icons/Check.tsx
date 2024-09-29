import type { IconProps } from '.'

export const CheckNoIcon = (props: IconProps) => {
  const { color = '#B4B5B8', size = 36 } = props

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
    >
      <circle cx="18" cy="18" r="13.5" stroke={color} strokeDasharray="2 2" />
    </svg>
  )
}

export const CheckYesIcon = (props: IconProps) => {
  const { color = '#13A076', size = 36 } = props

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
    >
      <circle cx="18" cy="18" r="14" fill={color} />
      <path
        d="M26 14L16.9565 25L10 18.4"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
