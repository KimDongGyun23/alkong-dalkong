'use client'
import { useFormContext } from 'react-hook-form'

type ErrorMessageType = {
  section: string
}

export const ErrorMessage = ({ section }: ErrorMessageType) => {
  const {
    formState: { errors },
  } = useFormContext()

  return (
    <>
      {errors && errors[section] && errors[section].message && (
        <p className="caption-M mx-[8px] h-[18px] text-red">
          * {errors[section].message.toString()}
        </p>
      )}
    </>
  )
}
