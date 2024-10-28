import { BottomSheet, Button, Profile, SubHeader } from '@/components/view'
import { useFamilySetting } from '@/store/queries'
import type { BottomSheetType } from '@/types'

export const FamilySettingBottomSheet = ({
  isShowing,
  onClickScrim,
}: Omit<BottomSheetType, 'section'>) => {
  const { data: familySettingData } = useFamilySetting()

  return (
    <BottomSheet isShowing={isShowing} onClickScrim={onClickScrim}>
      <div className="pb-5">
        <SubHeader.Close title="가족 설정하기" onClose={onClickScrim} />
      </div>

      <div className="flex-column mb-5 gap-5 overflow-y-scroll scrollbar-hide">
        {familySettingData?.families.map((family) => (
          <div key={family.familyCode} className="flex-column gap-8 rounded-xl bg-mint-0 p-5">
            <div className="flex-between-align border-b border-mint-5 pb-4">
              <p className="subtitle-B">{family.familyName}</p>
              <div className="body-M flex gap-[18px] text-gray-6">
                <button>탈퇴</button>
                <span>|</span>
                <button>삭제</button>
              </div>
            </div>

            {family.members.map(({ name, userId }) => (
              <div key={userId} className="flex flex-wrap justify-center gap-8">
                <div className="flex-column-align gap-[6px]">
                  <Profile
                    bgColor="#949698"
                    textColor="text-gray-1"
                    size="lg"
                    name={name}
                    onClickProfile={() => {}}
                  />
                  <span className="headline-M">{name}</span>
                </div>
              </div>
            ))}

            <Button size="md">인원 추가하기</Button>
          </div>
        ))}
      </div>
    </BottomSheet>
  )
}
