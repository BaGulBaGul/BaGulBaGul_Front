import { CategoryButtons } from '@/components/common/CategoryButton'
import { TextField } from '@mui/material'
import React from 'react'

export default function index() {
    return (
        <div className='mt-[88px]'>
            <div className='w-full h-[240px] bg-[#D9D9D9]'>
            </div>
            <input className='w-full h-[40px] border-b-[1px] border-[#D9D9D9]
                focus:border-b-[1px] focus:border-[#D9D9D9] p-4 bg-[#FFFFFF]'
                type='text' placeholder='제목' />
            <div className='w-full h-[76px] border-b-[1px] border-[#D9D9D9] bg-[#FFFFFF] pt-2'>
                <div className='flex-row flex items-center'>
                    <text className='pl-4 pr-2'>파티</text>
                    <text className='text-xs text-[#6C6C6C]'>카테고리는 최대 2개까지 선택가능합니다.</text>
                </div>
                <CategoryButtons />
            </div>
            <div>index</div>
            <div>index</div>
            <div>index</div>
            <div>index</div>
            <div>index</div>
            <div>index</div>
            <div>index</div>
            <div>index</div>
        </div>
    )
}
