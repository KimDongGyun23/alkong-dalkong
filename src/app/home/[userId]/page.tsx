import { HomeClientPage } from '@/components/container'
import { DashBoardTemplate } from '@/components/view/DashBoardTemplate'

export type HomeRouteParams = {
  params: { userId: string }
}

const Home = ({ params: { userId } }: HomeRouteParams) => {
  return (
    <DashBoardTemplate route="home">
      <HomeClientPage userId={userId} />
    </DashBoardTemplate>
  )
}

export default Home
