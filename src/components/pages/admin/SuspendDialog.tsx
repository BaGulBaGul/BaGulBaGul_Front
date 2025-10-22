"use client";
import { DialogFull, DialogHeader, Divider } from '@/components/common';
import { InputDateSelect } from '../write';


export function SuspendDialog({ open, toggleOpen }: { open: boolean; toggleOpen: (open: boolean) => void; }) {
  return (
    <DialogFull open={open} footerText='일시 정지 적용하기' handleFooter={() => { toggleOpen(false); }} handleDialogChange={() => { toggleOpen(false); }} fullStyle='bg-gray1'>
      <DialogHeader headerText='계정 일시 정지 사유' />
      <div className='flex flex-col mt-[60px]'>
        <textarea name='content' placeholder="정지 사유를 간단히 입력해주세요. (ex. 도배성 댓글 반복 작성)" className="w-full h-[240px] px-[16px] py-[20px] focus:outline-none text-14" />
        <Divider />
        <div className='px-[16px] py-[10px] bg-p-white'>
          <InputDateSelect title={'일시 정지 종료일시'} date={null} name='date' />
        </div>
      </div>
    </DialogFull>
  )
}