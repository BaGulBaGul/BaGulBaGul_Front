"use client";
import { ReactNode } from "react";
import { Dialog } from "@base-ui-components/react";
import { IconSearch } from "@/components/common/styles/Icon";

export function SearchBox({ title, children }: {title: string; children: ReactNode}) {
  return (
    <div className='flex flex-row justify-between items-center gap-[16px] px-[16px] py-[10px]'>
      <span className='min-w-[49px] text-14 font-semibold'>{title}</span>
      {children}
    </div>
  )
}

export function SearchBoxTrigger({ defaultText, value }: { defaultText: string; value?: string; }) {
  return (
    <Dialog.Trigger className="flex flex-row items-center gap-[8px]">
      {!!value ? <span className='text-14'>{value}</span> : <span className='text-14 text-gray2'>{defaultText}</span>}
      <IconSearch />
    </Dialog.Trigger>
  )
}