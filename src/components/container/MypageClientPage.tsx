'use client'
import type { PropsWithChildren } from 'react'

import {
  AccountBottomSheet,
  CreateGroupBottomSheet,
  PassowrdBottomSheet,
} from '@/components/domain'
import { Profile, SubHeader } from '@/components/view'
import { useToggle } from '@/hooks'
import { useDeleteMembership } from '@/store/queries'
import { useUserStore } from '@/store/stores'

const ButtonGroup = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex-column subtitle-M divide-y divide-mint-5 rounded-xl bg-mint-0 px-4 [&_>_button]:py-4 [&_>_button]:text-left">
      {children}
    </div>
  )
}

export const MypageClientPage = () => {
  const { user } = useUserStore()

  const [accountSheet, toggleAccountSheet] = useToggle()
  const [passwordSheet, togglePasswordSheet] = useToggle()
  const [createGroupSheet, toggleCreateGroupSheet] = useToggle()

  const { mutate: deleteMembershipMutation } = useDeleteMembership()

  const handleDeleteMembership = () => {
    deleteMembershipMutation()
  }

  return (
    <div className="flex-column h-full overflow-y-scroll px-5 pt-5 scrollbar-hide">
      <SubHeader.Back title="마이페이지" />

      <div className="flex-column h-full overflow-y-scroll scrollbar-hide">
        <section className="mt-[30px]">
          <div className="flex-between">
            <p className="title-B">
              안녕하세요,
              <br />
              {user?.name}님!
            </p>
            <Profile size="xl" bgColor="#C5FDEC" />
          </div>
        </section>

        <section className="flex-column mt-14 gap-6">
          <ButtonGroup>
            <button onClick={toggleAccountSheet}>내 정보 수정하기</button>
            <button onClick={togglePasswordSheet}>비밀번호 변경</button>
          </ButtonGroup>
          <AccountBottomSheet isShowing={accountSheet} onClickScrim={toggleAccountSheet} />
          <PassowrdBottomSheet isShowing={passwordSheet} onClickScrim={togglePasswordSheet} />

          <ButtonGroup>
            <button onClick={toggleCreateGroupSheet}>가족 그룹 추가</button>
            <button>가족 설정하기</button>
          </ButtonGroup>
          <CreateGroupBottomSheet
            isShowing={createGroupSheet}
            onClickScrim={toggleCreateGroupSheet}
          />

          <ButtonGroup>
            <button>푸시 알람 설정</button>
            <button>자주 묻는 질문</button>
          </ButtonGroup>
        </section>

        <div className="body-M mb-[65px] mt-[34px] flex justify-end gap-[18px] text-gray-6">
          <button onClick={handleDeleteMembership}>회원 탈퇴</button>
          <span>|</span>
          <button>로그아웃</button>
        </div>
      </div>
    </div>
  )
}
