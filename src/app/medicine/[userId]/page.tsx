import Link from 'next/link'

import { MedicineList } from '@/components/domain'
import { DashBoardTemplate, Label } from '@/components/view'

type MedicineRouteParams = {
  params: { userId: string }
}

const Medicine = ({ params: { userId } }: MedicineRouteParams) => {
  return (
    <DashBoardTemplate route="medicine">
      <div className="flex-between-align w-full">
        <Label icon="medicine-label">오늘 드셔야 할 약</Label>
        <div className="flex-align gap-3 text-gray-7">
          <Link href={`/medicine/${userId}/create`}>추가</Link>
          <div className="h-3 w-px bg-gray-7" />
          <Link href={`/medicine/${userId}/detail`}>수정</Link>
        </div>
      </div>

      <MedicineList />
    </DashBoardTemplate>
  )
}

export default Medicine
