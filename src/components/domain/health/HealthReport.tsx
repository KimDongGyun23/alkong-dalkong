'use client'
import { useUserStore } from '@/store/stores'

export const HealthReport = () => {
  const { user } = useUserStore()

  return (
    <>
      <p className="subtitle-M grow rounded-xl bg-mint-0 py-[14px] pl-6">
        {user.name}님과 같은 성별, 나이의 평균
        <br />
        몸무게인 weight보다 weight 낮아요.
      </p>
      <p className="subtitle-M grow rounded-xl bg-mint-0 py-[14px] pl-6">
        {user.name}님의 평균 체중이
        <br />
        지난주보다 weight 감소했어요.
      </p>
    </>
  )
}
