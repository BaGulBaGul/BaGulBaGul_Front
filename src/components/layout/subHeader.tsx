"use client";
import React from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { IconArrowBack, IconDelete } from '../common/styles/Icon';

export default function SubHeader({ name }: any) {
  const router = useRouter();
  return (
    <div className={"header-nav fixed top-[44px]"}>
      <button onClick={() => router.back()}><IconArrowBack /></button>
      <div className='text-18'>{name}</div>
      <div className='w-[24px]'/>
    </div>
  )
}

export function SubTopHeader(props: { name: any; child?: React.ReactNode }) {
  const router = useRouter();
  return (
    <header className={"header-nav fixed top-0"}>
      <button onClick={() => router.back()}><IconArrowBack /></button>
      <div className='text-18'>{props.name}</div>
      {props.child ?? <div className='w-[24px]'/>}
    </header>
  )
}

export function SubHeaderCnt({ name, cnt, url }: any) {
  const router = useRouter();
  return (
    <div className={"header-nav relative sticky top-0"}>
      <button className='me-[29px]' onClick={() => router.back()}><IconArrowBack /></button>
      <div className='flex flex-row text-18'>
        <div>{name}</div>
        <div className="text-gray3 ps-[8px]">{cnt}</div>
      </div>
      <Link className='px-[8px] py-[4px] border-[0.5px] border-gray2 rounded-[4px] text-14 text-gray3' href={url}>글보기</Link>
    </div>
  )
}

export function SubXHeader() {
  const router = useRouter();
  return (
    <div className="flex flex-row justify-end px-[16px] py-[10px]">
      <button onClick={() => router.back()} className='h-[40px] w-[40px] place-items-center'><IconDelete /></button>
    </div>
  )
}