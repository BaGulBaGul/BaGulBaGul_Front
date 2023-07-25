'use client';
import { CategoryButtons } from '@/components/common/CategoryButton'
import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'

export default function index() {
    // textarea 높이 자동 조정 함수
    const [content, setContent] = useState('');

    const autoResizeTextarea = (event: any) => {
        const textarea = event.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight + 10}px`;
        setContent(textarea.value);
    };

    return (
        <div className='mt-[88px]'>
            <div className='relative w-full h-[240px] bg-[#D9D9D9]'>
                {/* 이미지 들어갈 곳 */}
                <button>
                    <img src="/post_upload_image.svg" alt="사진 업로드 아이콘" width={40} height={40}
                        className='absolute z-10 right-5 bottom-5' />
                </button>
            </div>
            <input className='w-full border-b-[1px] border-[#D9D9D9] focus:outline-none text-[18px]
                focus:border-b-[1px] focus:border-[#D9D9D9] px-4 py-2 bg-[#FFFFFF]'
                type='text' placeholder='제목' />
            <div className='w-full border-b-[1px] border-[#D9D9D9] bg-[#FFFFFF] pt-2'>
                <div className='flex-row flex items-center'>
                    <text className='pl-4 pr-2 text-[18px]'>파티</text>
                    <text className='text-xs text-[#6C6C6C]'>카테고리는 최대 2개까지 선택가능합니다.</text>
                </div>
                <CategoryButtons />
            </div>
            <div className='w-full border-b-[1px] border-[#D9D9D9] bg-[#FFFFFF] px-4 py-2.5'>
                <div className='flex flex-row justify-between items-center py-2.5'>
                    <text className='text-[18px]'>시작일</text>
                    <div className='flex gap-2 items-center'>
                        <text className='text-[#6C6C6C] text-[14px]'>2023년 7월 10일 오전00:00</text>
                        <img src="/post_calendar.svg" alt="달력 아이콘" width={24} height={24} />
                    </div>
                </div>
                <div className='flex flex-row justify-between items-center py-2.5'>
                    <text className='text-[18px]'>종료일</text>
                    <div className='flex gap-2 items-center'>
                        <text className='text-[#6C6C6C] text-[14px]'>2023년 7월 10일 오전00:00</text>
                        <img src="/post_calendar.svg" alt="달력 아이콘" width={24} height={24} />
                    </div>
                </div>
                <div className='flex flex-row justify-between items-center py-2.5'>
                    <text className='text-[18px]'>인원(명)</text>
                    <div className='flex gap-2 items-center'>
                        <button>
                            <img src="/post_remove_button.svg" alt="인원 추가 아이콘" width={24} height={24} />
                        </button>
                        <text className='text-[14px]'>미정</text>
                        <button>
                            <img src="/post_add_button.svg" alt="인원 추가 아이콘" width={24} height={24} />
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <textarea
                    className="w-full h-32 border-b-[1px] border-[#ffffff] px-4 pt-5 mb-[46px]
                        focus:outline-none text-[14px]"
                    placeholder={`파티에 대해서 설명해주세요!\n본문에 #을 이용해 파티 태그를 입력해보세요(최대 7개)`}
                    value={content}
                    onChange={autoResizeTextarea}
                />
            </div>
            <Button className='fixed left-0 right-0 bottom-0 w-full h-[46px]
                bg-primary-blue text-white-text hover:bg-[#3757E7]'>
                파티글 작성하기
            </Button>
        </div>
    )
}
