'use client'
import { useFormContext } from 'react-hook-form'

type InputProps = {
  type?: string
  section: string
  readOnly?: boolean
  placeholder?: string
}

type InputWithoutRegisterProps = Pick<InputProps, 'type' | 'placeholder'>
type TextAreaProps = Omit<InputProps, 'type'>

export const Input = ({ type = 'text', section, readOnly = false, placeholder }: InputProps) => {
  const { register } = useFormContext()

  return (
    <input
      type={type}
      {...register(section)}
      readOnly={readOnly}
      className="subtitle-M placeholder:subtitle-R w-full rounded-xl border border-mint-3 px-6 py-4 placeholder:text-gray-7 focus:outline-none"
      placeholder={placeholder}
    />
  )
}

export const InputWithoutRegister = ({ type = 'text', placeholder }: InputWithoutRegisterProps) => {
  return (
    <input
      type={type}
      className="subtitle-M placeholder:subtitle-R w-full rounded-xl border border-mint-3 px-6 py-4 placeholder:text-gray-7 focus:outline-none"
      placeholder={placeholder}
    />
  )
}

export const TextArea = ({ section, readOnly = false, placeholder }: TextAreaProps) => {
  const { register } = useFormContext()
  return (
    <textarea
      {...register(section)}
      readOnly={readOnly}
      className="subtitle-M placeholder:subtitle-R h-[116px] resize-none rounded-xl border border-mint-3 px-6  py-4 placeholder:text-gray-7 focus:outline-none"
      placeholder={placeholder}
    />
  )
}
