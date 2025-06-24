import { MutableRefObject } from "react";
import { TextareaAutosize } from '@mui/material';

export function BannerTitleInput({ titleRef, prev }: { titleRef: MutableRefObject<any>; prev: string | undefined }) {
  const limitLines = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    let lines = ((titleRef.current.value || '').match(/\n/g) || []).length + 1;
    if (e.key === "Enter" && lines === 2) { e.preventDefault(); }
  }
  return (
    <div className="px-[16px] py-[10px]">
      <TextareaAutosize ref={titleRef} onKeyDown={limitLines} placeholder="제목" defaultValue={prev}
        className='w-full focus:outline-none text-18 resize-none' />
    </div>
  )
}