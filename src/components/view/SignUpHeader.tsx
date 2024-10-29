type SignUpHeaderProps = {
  step: number
}

export const SignUpHeader = ({ step }: SignUpHeaderProps) => {
  return (
    <div className="flex-column-align mb-[40px] mt-[18px] gap-[12px]">
      <h1 className="subtitle-B">회원가입</h1>
      <div className="flex-center w-full gap-[4px] px-[8px]">
        {[...Array(3)].map((_, index) => (
          <hr
            key={index}
            className={`h-[6px] w-full border-none ${index <= step ? 'bg-green-1' : 'bg-green-4'}`}
          />
        ))}
      </div>
    </div>
  )
}
