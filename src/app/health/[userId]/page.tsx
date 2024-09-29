import { BottomNav } from '@/components'

export type HealthRouteParams = {
  params: { userId: string }
}

const Health = ({ params: { userId } }: HealthRouteParams) => {
  return (
    <div>
      <h2>{userId}</h2>
      <BottomNav />
    </div>
  )
}

export default Health
