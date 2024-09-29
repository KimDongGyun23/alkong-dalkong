import { BottomNav } from '@/components/view'

export type MedicineRouteParams = {
  params: { userId: string }
}

const Medicine = ({ params: { userId } }: MedicineRouteParams) => {
  return (
    <div>
      <h2>{userId}</h2>
      <BottomNav />
    </div>
  )
}

export default Medicine
