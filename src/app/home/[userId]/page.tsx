import { HomePage } from '@/components/domain/home/HomePage'

export type HomeRouteParams = {
  params: { userId: string }
}

const Home = ({ params: { userId } }: HomeRouteParams) => {
  return <HomePage userId={userId} />
}

export default Home
