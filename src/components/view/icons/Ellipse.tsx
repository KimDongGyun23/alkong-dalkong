import type { IconProps } from '.'

export const EllipseIcon = (props: IconProps) => {
  const { color = '#F5F6F8', size = 53 } = props

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 53 53"
      fill="none"
    >
      <circle cx="26.5" cy="26.5" r="26.5" fill={color} />
    </svg>
  )
}
