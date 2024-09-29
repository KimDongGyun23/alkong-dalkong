import type { IconProps } from '.'

export const MinusIcon = (props: IconProps) => {
  const { color = '#FFFFFF', size = 16 } = props

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.75 9.5C2.75 9.08579 3.08579 8.75 3.5 8.75H13.5C13.9142 8.75 14.25 9.08579 14.25 9.5C14.25 9.91421 13.9142 10.25 13.5 10.25H3.5C3.08579 10.25 2.75 9.91421 2.75 9.5Z"
        fill={color}
      />
    </svg>
  )
}
