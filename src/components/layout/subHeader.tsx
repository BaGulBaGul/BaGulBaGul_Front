"use client";
import React from 'react'
import { useRouter } from 'next/navigation';
import { DeleteIcn, HeaderBackIcn } from '../common/styles/Icon';

const headerStyle = "left-0 right-0 flex flex-row justify-between place-items-center w-full h-[60px] px-[17px] py-[10px] bg-p-white z-30"
export default function SubHeader({ name }: any) {
  const router = useRouter();
  return (
    <div className={"fixed top-[44px] " + headerStyle}>
      <button onClick={() => router.back()}><HeaderBackIcn /></button>
      <div className='text-18'>{name}</div>
      <div className='w-[24px]'></div>
    </div>
  )
}

export function SubTopHeader(props: { name: any; child?: React.ReactNode }) {
  const router = useRouter();
  return (
    <header className={"fixed top-0 " + headerStyle}>
      <button onClick={() => router.back()}><HeaderBackIcn /></button>
      <div className='text-18'>{props.name}</div>
      {props.child ?? <div className='w-[24px]'></div>}
    </header>
  )
}

export function SubHeaderCnt({ name, cnt }: any) {
  const router = useRouter();
  return (
    <div className={"relative sticky top-0 " + headerStyle}>
      <button onClick={() => router.back()}><HeaderBackIcn /></button>
      <div className='flex flex-row text-18'>
        <div>{name}</div>
        <div className="text-gray3 ps-[8px]">{cnt}</div>
      </div>
      <div className='w-[24px]'></div>
    </div>
  )
}

export function SubXHeader() {
  const router = useRouter();
  return (
    <div className="flex flex-row justify-end px-[16px] py-[10px]">
      <button onClick={() => router.back()}><DeleteIcn size='40' /></button>
    </div>
  )
}