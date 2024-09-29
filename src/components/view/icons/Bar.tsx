import type { IconProps } from '.'

export const HandleBar = (props: IconProps) => {
  const { color = '#B4B5B8' } = props

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="84" height="13" viewBox="0 0 84 13" fill="none">
      <rect x="24" y="4" width="36" height="5" rx="2.5" fill={color} />
    </svg>
  )
}
