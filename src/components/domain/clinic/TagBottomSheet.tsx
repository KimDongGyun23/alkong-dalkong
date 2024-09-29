'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'

import { useTagToggle } from '@/business/hooks/useTagToggle'
import { ActionTag, BottomSheet, Label, SubHeader } from '@/components/view'
import type { ClinicBottomSheetType } from '@/types'
import { CLINIC_TAGS } from '@/utility/constants'

type ToggledTagListProps = {
  selectedTags: string[]
  onTagToggle: (tag: string) => void
}

const ToggledTagList = ({ selectedTags, onTagToggle }: ToggledTagListProps) => {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {CLINIC_TAGS.map((tag) => {
        const isSelected = selectedTags.includes(tag)
        const TagComponent = isSelected ? ActionTag.Minus : ActionTag.Plus

        return <TagComponent key={tag} label={tag} onClick={() => onTagToggle(tag)} />
      })}
    </div>
  )
}

export const TagBottomSheet = ({ section, isShowing, onClickScrim }: ClinicBottomSheetType) => {
  const { getValues, setValue } = useFormContext()
  const { selectedTags, handleTagToggle } = useTagToggle(getValues(section) || [])

  const handleClickComplete = () => {
    setValue(section, selectedTags)
    onClickScrim()
  }

  return (
    <BottomSheet isShowing={isShowing} onClickScrim={onClickScrim}>
      <div className="w-full pb-5">
        <SubHeader.Confirm
          title="진료 과목"
          onCancel={onClickScrim}
          onConfirm={handleClickComplete}
        />
      </div>

      <div className="mt-5">
        <Label icon="check-label">진료 과목을 선택해주세요.</Label>
        <ToggledTagList selectedTags={selectedTags} onTagToggle={handleTagToggle} />
      </div>
    </BottomSheet>
  )
}
