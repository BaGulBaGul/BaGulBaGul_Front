"use client";
import React from 'react'
import { useRouter } from 'next/navigation';

const headerStyle = "left-0 right-0 flex-row flex w-full h-[60px] justify-between px-[24px] py-[10px] place-items-center bg-[#FFFFFF] z-30"
export default function SubHeader({ name }: any) {
    const router = useRouter();
    return (
        <div className={"fixed top-[44px] " + headerStyle}>
            <button onClick={() => router.back()}><img src='/arrow_prev.svg' /></button>
            <div className='text-[18px]'>{name}</div>
            <div className='w-[24px]'></div>
        </div>
    )
}

export function SubTopHeader({ name }: any) {
    const router = useRouter();
    return (
        <div className={"fixed top-0 " + headerStyle}>
            <button onClick={() => router.back()}><img src='/arrow_prev.svg' /></button>
            <div className='text-[18px]'>{name}</div>
            <div className='w-[24px]'></div>
        </div>
    )
}

export function SubHeaderCnt({ name, cnt }: any) {
    const router = useRouter();
    return (
        <div className={"relative sticky top-0 " + headerStyle}>
            <button onClick={() => router.back()}><img src='/arrow_prev.svg' /></button>
            <div className='flex flex-row text-[18px]'>
                <div>{name}</div>
                <div className="text-gray3 ps-[8px]">{cnt}</div>
            </div>
            <div className='w-[24px]'></div>
        </div>
    )
}