'use client';
import { IconArrowDown } from "../styles/Icon";
import { Divider } from "..";

export default function MoreButton(props: { onClick: any; }) {
  return (
    <div className='flex flex-col w-full cursor-pointer bg-p-white' onClick={props.onClick}>
      <Divider />
      <div className='flex flex-row justify-center pt-[20px] pb-[35px] gap-[4px]'>
        <span className='text-16 text-gray3'>더보기</span>
        <IconArrowDown />
      </div>
    </div>
  );
}