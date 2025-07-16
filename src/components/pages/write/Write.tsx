'use client';
import { PropsWithChildren } from 'react';
import { FooterButton } from '@/components/common/button/FooterButton';

// * ====== 250602 alert dialog 추가 적용 필요
interface Props extends PropsWithChildren { handleSubmit: () => void; wrapStyle?: string }
export function Write({ handleSubmit, wrapStyle, children }: Props) {
  return (
    <>
      <div className={'w-full mb-[77px] ' + (wrapStyle ?? 'mt-[104px]')}>
        {children}
      </div>
      <FooterButton text="작성하기" handleClick={handleSubmit} />
      {/* {openDialog !== undefined && !!handleConfirm
        ? <AlertDialog open={props.open} setOpen={props.setOpen} headerText='연령 제한 파티' buttonText1='작성 취소하기' buttonText2='동의하기' buttonAction={props.handleConfirm}>
          <p>이 파티는 연령 제한 파티로</p>
          <p>청소년 보호법에 따라 19세 미만의</p>
          <p>청소년이 참여할 수 없습니다.</p>
        </AlertDialog>
        : <></>} */}
    </>
  )
}