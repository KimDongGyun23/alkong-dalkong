type HelperBoxProps = {
  title: string
}

export const HelperBox = ({ title }: HelperBoxProps) => {
  return (
    <div className="flex items-center justify-between rounded-xl border border-mint-3 px-6 py-4">
      <span className="subtitle-M text-gray-6">{title}</span>
    </div>
  )
}
