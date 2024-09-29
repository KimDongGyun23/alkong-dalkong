type Props = {
  label: string
}

const Tag = ({ label }: Props) => {
  return (
    <span className="body-M rounded-[99px] bg-mint-3 px-[11px] py-[5px] text-black">{label}</span>
  )
}

export default Tag
