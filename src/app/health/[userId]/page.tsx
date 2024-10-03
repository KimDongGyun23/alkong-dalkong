import { DashBoardTemplate } from '@/components/view'

export type HealthRouteParams = {
  params: { userId: string }
}

const Health = ({ params: { userId } }: HealthRouteParams) => {
  return (
    <DashBoardTemplate route="health">
      <h2>{userId}</h2>
    </DashBoardTemplate>
  )
}

export default Health
