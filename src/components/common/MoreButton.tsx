'use client';
import { Divider } from '@mui/material';

export default function MoreButton(props: { onClick: any; }) {
  return (
    <div className='flex flex-col w-full cursor-pointer bg-[#FFF]' onClick={props.onClick}>
      <Divider />
      <div className='flex flex-row justify-center py-[10px] gap-[8px]'>
        <span className='text-[14px] text-gray3-text'>더보기</span><img src='/arrow_more.svg' />
      </div>
    </div>
  );
}