'use client'
import type { PropsWithChildren } from 'react'
import { useFormContext } from 'react-hook-form'

import { useAllChecked, useCheckBoxList, useCheckListActions } from '@/store/stores'
import type { CheckBoxSectionType } from '@/types/common'

import { Icon } from '../icons'

type CheckBoxProps = {
  section: CheckBoxSectionType
  onClickArrow: () => void
}

type CheckBoxViewProps = {
  section: CheckBoxSectionType | 'all'
  isChecked: boolean
  onChange: () => void
  onClickArrow?: () => void
}

const CheckBoxView = ({
  section,
  isChecked,
  onChange,
  onClickArrow,
  children,
}: PropsWithChildren<CheckBoxViewProps>) => {
  return (
    <div>
      <input
        type="checkbox"
        id={section}
        checked={isChecked}
        onChange={onChange}
        className="peer hidden"
      />
      <label
        htmlFor={section}
        className="block cursor-pointer rounded-xl border border-gray-3 bg-white px-5 py-[14px] peer-checked:bg-mint-1"
      >
        <div className="flex-align gap-2">
          {isChecked ? <Icon name="check-yes" /> : <Icon name="check-no" />}
          <p className="headline-B mr-auto text-gray-8">{children}</p>
          {section !== 'all' && (
            <button type="button" onClick={onClickArrow}>
              <Icon name="arrow-right" />
            </button>
          )}
        </div>
      </label>
    </div>
  )
}

export const CheckBox = ({ children, section, onClickArrow }: PropsWithChildren<CheckBoxProps>) => {
  const checkList = useCheckBoxList()
  const isChecked = checkList[section]
  const { setValue } = useFormContext()
  const { handleCheckBoxClick } = useCheckListActions()

  const handleCheck = () => {
    setValue(section, !checkList[section])
    handleCheckBoxClick(section)
  }

  return (
    <CheckBoxView
      section={section}
      isChecked={isChecked}
      onChange={handleCheck}
      onClickArrow={onClickArrow}
    >
      {children}
    </CheckBoxView>
  )
}

export const CheckBoxAll = ({ children }: PropsWithChildren) => {
  const checkList = useCheckBoxList()
  const isAllChecked = useAllChecked()
  const { setValue } = useFormContext()
  const { handleAllCheckClick } = useCheckListActions()

  const handleCheck = () => {
    const sections = Object.keys(checkList)
    sections.forEach((sec) => setValue(sec, !isAllChecked))
    handleAllCheckClick()
  }

  return (
    <CheckBoxView section="all" isChecked={isAllChecked} onChange={handleCheck}>
      {children}
    </CheckBoxView>
  )
}
