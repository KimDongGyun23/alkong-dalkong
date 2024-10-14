import { cookies } from 'next/headers'

import { HomeClientPage } from '@/components/container'
import { DashBoardTemplate } from '@/components/view/DashBoardTemplate'

export type HomeRouteParams = {
  params: { userId: string }
}

const Home = ({ params: { userId } }: HomeRouteParams) => {
  const cookieStore = cookies()
  const myCookie = cookieStore.get('refresh')

  const allCookies = cookieStore.getAll()
  console.log('쿠키 목록:', allCookies)

  return (
    <DashBoardTemplate route="home">
      <h1>HttpOnly 쿠키 값: {myCookie?.value}</h1>
      <HomeClientPage userId={userId} />
    </DashBoardTemplate>
  )
}

export default Home
