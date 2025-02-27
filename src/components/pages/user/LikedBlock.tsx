"use client";
import { useState } from 'react';
import { FormatDateRange, applyLike } from '@/service/Functions';
import { BlockInfo, BlockInfoDT, LikeProps, LikeRProps, UserProfile } from '@/components/common';
import { LikeIcn } from '@/components/common/styles/Icon';
import dayjs from 'dayjs';
import Link from 'next/link';

export function LikedPostBlock(props: { data: LikeProps }) {
  const [liked, setLiked] = useState(true);
  const handleLike = (e: any) => {
    e.preventDefault();
    applyLike(true, liked, `/api/event/${props.data.eventId}/like`, setLiked)
  }
  return (
    <Link href={`/event/${props.data.eventId}`} className='flex flex-row justify-between px-[16px] py-[18px]'>
      <div className='flex flex-row gap-[8px]'>
        <button className="h-[24px] w-[24px]" onClick={handleLike}><LikeIcn val={liked} /></button>
        <div className='flex flex-col w-full justify-between'>
          <BlockInfo title={props.data.title} date={FormatDateRange(props.data.startDate, props.data.endDate)} address={props.data.abstractLocation} />
          <div className='flex flex-row items-center gap-[4px] text-14'>
            <UserProfile userId={props.data.eventWriterId} userName={props.data.userName} />
            {/* {props.data.type === 'PARTY' ? <HeadCount currentHeadCount={props.data.currentHeadCount} maxHeadCount={props.data.maxHeadCount} state={props.data.state} /> : <></>} */}
          </div>
        </div>
      </div>
      <img className='rounded-[4px] h-[116px] w-[92px] min-w-[92px] object-cover' src={props.data.eventWriterProfileImageUrl ?? '/default_list_thumb3x.png'} />
    </Link>
  )
}

export function LikedAccompanyBlock(props: { data: LikeRProps }) {
  const [liked, setLiked] = useState(true);
  const handleLike = (e: any) => {
    e.preventDefault();
    applyLike(true, liked, `/api/event/recruitment/${props.data.recruitmentId}/like`, setLiked)
  }
  return (
    <Link href={`/recruitment/${props.data.recruitmentId}`} className='flex flex-row px-[16px] py-[18px] gap-[8px]'>
      <button className="h-[24px] w-[24px]" onClick={handleLike}><LikeIcn val={liked} /></button>
      <div className='flex flex-col gap-[4px]'>
        <BlockInfoDT title={props.data.title} date={FormatDateRange(props.data.startDate, undefined)} />
        <span className='text-14 text-gray3'>{props.data.eventTitle ?? '-'}</span>
      </div>
    </Link>
  )
}