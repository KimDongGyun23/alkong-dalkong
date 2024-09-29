import type { IconProps } from '.'

export const PlusIcon = (props: IconProps) => {
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
        d="M9.25 4.5C9.25 4.08579 8.91421 3.75 8.5 3.75C8.08579 3.75 7.75 4.08579 7.75 4.5V8.75H3.5C3.08579 8.75 2.75 9.08579 2.75 9.5C2.75 9.91421 3.08579 10.25 3.5 10.25H7.75V14.5C7.75 14.9142 8.08579 15.25 8.5 15.25C8.91421 15.25 9.25 14.9142 9.25 14.5V10.25H13.5C13.9142 10.25 14.25 9.91421 14.25 9.5C14.25 9.08579 13.9142 8.75 13.5 8.75H9.25V4.5Z"
        fill={color}
      />
    </svg>
  )
}
