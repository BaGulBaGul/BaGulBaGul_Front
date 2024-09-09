'use client';
import SubHeader from '@/components/layout/subHeader'
import { useState } from 'react';
import { CategoryButtons, Divider, RangeProps } from '@/components/common';
import dayjs from 'dayjs';
import { PostInfoInput } from '@/components/pages/write/PostInfoInput';
import { MagnifyingIcn } from '@/components/common/styles/Icon';
import { AddressDialog } from '@/components/pages/write/AddressDialog';

export default function Page({ searchParams }: { searchParams: { ['w']: 'p' | 'r' } }) {
  if (searchParams.w === 'p' || searchParams.w === 'r') {
    const text = `${searchParams.w === 'p' ? '파티글' : '모집글'} 작성하기`

    const [selectedCate, setSelectedCate] = useState<string[]>([]);
    const [headCount, setHeadCount] = useState<RangeProps>({ from: undefined, to: undefined });
    const [participants, setParticipants] = useState(0);
    const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null)
    const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null)
    const [forAdult, setForAdult] = useState(false);
    const [addr, setAddr] = useState<string>()
    const [content, setContent] = useState('');

    // textarea 높이 자동 조정 함수
    const autoResizeTextarea = (event: any) => {
      const textarea = event.target;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight + 10}px`;
      setContent(textarea.value);
    };

    const [openAddr, setOpenAddr] = useState(false);
    const handleOpenAddr = () => { setOpenAddr(true) }

    return (
      <>
        <SubHeader name={text} />
        <div className='w-full mt-[104px] mb-[77px]'>
          <div className='relative h-[280px] bg-gray1'>
            {/* 이미지 들어갈 곳 */}
            <button>
              <img src="/post_upload_image.svg" alt="사진 업로드 아이콘" width={40} height={40}
                className='absolute z-10 right-5 bottom-5' />
            </button>
          </div>
          <input className='w-full focus:outline-none text-18 px-[16px] py-[10px]' type='text' placeholder='제목' />
          <Divider color='gray2' />
          {
            searchParams.w === 'p'
              ? <>
                <div className='pt-[10px] pb-[6px]'>
                  <div className='flex-row flex items-center'>
                    <span className='min-w-[32px] px-[16px] text-[14px] font-semibold'>파티</span>
                    <span className='text-12 text-gray3'>카테고리는 최대 2개까지 선택가능합니다.</span>
                  </div>
                  <CategoryButtons selectedCate={selectedCate} setSelectedCate={setSelectedCate} />
                </div>
                <Divider color='gray2' />
                <PostInfoInput type={searchParams.w} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}
                  headCount={headCount} setHeadCount={setHeadCount} forAdult={forAdult} setForAdult={setForAdult} />
              </>
              : <PostInfoInput type={searchParams.w} participants={participants} setParticipants={setParticipants}
                forAdult={forAdult} setForAdult={setForAdult} />
          }
          <Divider color='gray2' />
          <div className='flex flex-row justify-between gap-[16px] px-[16px] py-[10px]'>
            <span className='min-w-[49px] text-14 font-semibold'>위치</span>
            <div onClick={handleOpenAddr} className='flex flex-row items-center gap-[8px] cursor-pointer'>
              {addr && addr.length > 0 ? <span className='text-14'>{addr}</span> : <span className='text-14 text-gray2'>위치 검색</span>}
              <MagnifyingIcn size={24} />
            </div>
          </div>
          <Divider color='gray2' />
          <div className='px-[16px] py-[20px]'>
            <textarea className="w-full min-h-[250px] focus:outline-none text-14"
              placeholder={`파티에 대해서 설명해주세요!\n본문에 #을 이용해 파티 태그를 입력해보세요(최대 7개)`}
              value={content} onChange={autoResizeTextarea} />
          </div>
          <AddressDialog open={openAddr} onClose={setOpenAddr} setAddr={setAddr} />
        </div>
        <button className="footer-btn">{text}</button>
      </>
    )
  }
}