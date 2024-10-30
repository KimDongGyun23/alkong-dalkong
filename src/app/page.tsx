import Link from 'next/link'

export default function Home() {
  return (
    <div className="h-full p-5">
      <Link className="block h-full rounded bg-mint-3 p-5" href={'/sign-in'}>
        로그인 페이지 이동
      </Link>
    </div>
  )
}
