import { BottomSheet, Button, InputGroup, SubHeader } from '@/components/view'
import type { BottomSheetType } from '@/types'

export const CreateGroupBottomSheet = ({
  isShowing,
  onClickScrim,
}: Omit<BottomSheetType, 'section'>) => {
  return (
    <BottomSheet isShowing={isShowing} onClickScrim={onClickScrim}>
      <div className="pb-5">
        <SubHeader.Close title="가족 그룹 추가" onClose={onClickScrim} />
      </div>

      <section className="mb-8 mt-5">
        <p className="subtitle-B mb-4">
          가족을 초대하고
          <br />
          우리 가족 그룹을 만들어 보세요!
        </p>

        <Button>새로운 그룹 만들기</Button>
      </section>

      <div className="flex-align mb-8  gap-3">
        <div className="h-px grow bg-mint-5" />
        <span className="body-M">혹은</span>
        <div className="h-px grow bg-mint-5" />
      </div>

      <section className="flex-column mb-8 gap-4">
        <p className="subtitle-B">
          가족 초대를 받으셨나요?
          <br />이 곳에 가족 코드를 입력해 주세요!
        </p>

        <InputGroup>
          <InputGroup.InputWithoutRegister placeholder="숫자만 입력해주세요." />
        </InputGroup>
        <Button>가족 코드 인증</Button>
      </section>
    </BottomSheet>
  )
}
