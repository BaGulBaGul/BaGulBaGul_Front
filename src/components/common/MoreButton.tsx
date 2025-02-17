'use client';
import { Divider } from ".";

export default function MoreButton(props: { onClick: any; }) {
  return (
    <div className='flex flex-col w-full cursor-pointer bg-p-white' onClick={props.onClick}>
      <Divider />
      <div className='flex flex-row justify-center py-[10px] gap-[8px]'>
        <span className='text-16 text-gray3'>더보기</span><FilterArrowMore />
      </div>
    </div>
  );
}

const FilterArrowMore = () => (
  <svg width="16" height="23" viewBox="0 0 16 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M3.07273 7.96362L2 9.03635L8 15.0364L14 9.03635L12.9273 7.96362L8 12.8909L3.07273 7.96362V7.96362Z" fill="currentColor" />
  </svg>
)