"use client";
import { MagnifyingIcn } from "@/components/common/styles/Icon";

export function SearchBox({ title, defaultText, value, handleClick }: { title: string; defaultText: string; value?: string; handleClick: () => void }) {
  return (
    <div className='flex flex-row justify-between items-center gap-[16px] px-[16px] py-[10px]'>
      <span className='min-w-[49px] text-14 font-semibold'>{title}</span>
      <div onClick={handleClick} className='flex flex-row items-center gap-[8px] cursor-pointer'>
        {!!value ? <span className='text-14'>{value}</span> : <span className='text-14 text-gray2'>{defaultText}</span>}
        <MagnifyingIcn size={24} />
      </div>
    </div>
  )
}