'use client'
import { useFormContext } from 'react-hook-form'

export const Gender = () => {
  const { register } = useFormContext()
  const genders = [
    { id: 'MAN', label: '남성' },
    { id: 'WOMAN', label: '여성' },
  ]

  return (
    <div className="flex gap-[15px]">
      {genders.map(({ id, label }) => (
        <div className="flex-1 " key={id}>
          <input type="radio" id={id} value={id} {...register('gender')} className="peer hidden" />
          <label
            htmlFor={id}
            className="headline-M peer-checked:headline-B block w-full cursor-pointer rounded-xl border border-mint-5 py-3 text-center text-mint-4 peer-checked:border-none peer-checked:bg-mint-4 peer-checked:text-white"
          >
            {label}
          </label>
        </div>
      ))}
    </div>
  )
}
