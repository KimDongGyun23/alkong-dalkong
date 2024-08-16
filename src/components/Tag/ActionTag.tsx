interface ITagProps {
  children?: string
  color?: 'primary' | 'mint' | 'gray'
  onClick?: () => void
}

const TagColors = {
  primary: 'bg-mint-3 text-black',
  mint: 'bg-mint-6 text-white',
  gray: 'bg-gray-2 text-gray-7',
}

export default function Tag({ children = '', color = 'primary', onClick }: ITagProps) {
  return (
    <button onClick={onClick} className={`${TagColors[color]} rounded-[99px] px-[11px] py-[5px]`}>
      {children}
    </button>
  )
}
