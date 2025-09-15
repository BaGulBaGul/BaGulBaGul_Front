import Link from 'next/link';
import { Dialog } from '@base-ui-components/react';
import { DialogPopup, DialogPopupBody } from '@/components/common';

export function CommentFooterLogin() {
  const Footer = () => (
    <Dialog.Trigger className='w-full flex justify-between text-gray2'>
      <span className='w-full px-[24px] py-[13px] text-14 text-left cursor-text'>로그인 후 이용이 가능합니다.</span>
      <button className='w-[70px] h-[48px] text-16'>등록</button>
    </Dialog.Trigger>
  )
  return (
    <DialogPopup headText="잠깐! 로그인이 필요해요" trigger={<Footer />}>
      <DialogPopupBody closeText='닫기'
        action={<Link className="rounded-[4px] grow basis-0 p-[4px] bg-primary-blue text-gray1 text-center" href={'/signin'}>로그인 하러가기</Link>}>
        <p>함께 소통하려면 로그인해 주세요.</p>
        <p>금방 끝나요!</p>
      </DialogPopupBody>
    </DialogPopup>
  )
}
