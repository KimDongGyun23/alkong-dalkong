import type { IconProps } from '.'

export const CloseIcon = (props: IconProps) => {
  const { color = '#676A6B', size = 28 } = props

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
    >
      <path
        d="M22 6L14 14M6 22L14 14M14 14L22 22L6 6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
