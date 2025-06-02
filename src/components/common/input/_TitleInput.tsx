import { MutableRefObject } from "react";

export function TitleInput({ titleRef, prev }: { titleRef: MutableRefObject<any>; prev: string | undefined }) {
  return (
    <input ref={titleRef} className='w-full focus:outline-none text-18 px-[16px] py-[10px]' type='text' placeholder='제목' defaultValue={prev} />
  )
}