import { HomePage } from '@/components/domain/home/HomePage'
import { DashBoardTemplate } from '@/components/view/DashBoardTemplate'

export type HomeRouteParams = {
  params: { userId: string }
}

const Home = ({ params: { userId } }: HomeRouteParams) => {
  return (
    <DashBoardTemplate route="home">
      <HomePage userId={userId} />
    </DashBoardTemplate>
  )
}

export default Home
