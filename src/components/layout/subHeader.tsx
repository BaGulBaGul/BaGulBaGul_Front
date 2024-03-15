import React from 'react'

export default function SubHeader({ name, url }: any) {
    return (
        <div className="fixed top-[44px] left-0 right-0 flex-row flex w-full h-[60px] justify-between px-[24px] py-[10px] place-items-center bg-[#FFFFFF] z-30">
            <a href={url}><img src='/arrow_prev.svg' /></a>
            <div className='text-[18px]'>
                {name}
            </div>
            <div className='w-[24px]'></div>
        </div>
    )
}

export function SubTopHeader({ name, url }: any) {
    return (
        <div className="fixed top-0 left-0 right-0 flex-row flex w-full h-[60px] justify-between px-[24px] py-[10px] place-items-center bg-[#FFFFFF]">
            <a href={url}><img src='/arrow_prev.svg' /></a>
            <div className='text-[18px]'>
                {name}
            </div>
            <div className='w-[24px]'></div>
        </div>
    )
}

export function SubHeaderCnt({ name, url, cnt }: any) {
    return (
        <div className="relative sticky top-0 left-0 right-0 z-10 flex-row flex w-full h-[60px] justify-between px-[24px] py-[10px] place-items-center bg-[#FFFFFF]">
            <a href={url}><img src='/arrow_prev.svg' /></a>
            <div className='flex flex-row text-[18px]'>
                <div>{name}</div>
                <div className="text-gray3 ps-[8px]">{cnt}</div>
            </div>
            <div className='w-[24px]'></div>
        </div>
    )
}