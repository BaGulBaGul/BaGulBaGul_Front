"use client";
import { useState } from 'react';
import { FormatDateRange, applyLike } from '@/service/Functions';
import { LikeProps, LikeRProps, NoUser } from '@/components/common';
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
    <Link href={`/event/${props.data.eventId}`} className='flex flex-row px-[16px] py-[18px] gap-[60px]'>
      <div className='flex flex-col w-full justify-between'>
        <div className='flex flex-col w-full gap-[4px]'>
          <span className='text-16 text-[#333333] font-semibold'>{props.data.title}</span>
          <span className='text-14 text-gray3'>{props.data.abstractLocation}</span>
          <span className='text-14 text-gray3'>{FormatDateRange(props.data.startDate, props.data.endDate)}</span>
        </div>
        <div className='flex flex-row items-center gap-[4px] text-14'>
          {!props.data.userId ? <NoUser />
            : <Link href={`/user/${props.data.userId}`} className='flex flex-row items-center gap-[4px]'>
              {/* <img className='rounded-full w-[24px] h-[24px]' src={props.data.post.writer.userProfileImageUrl ?? '/profile_main.svg'} /> */}
              <img className='rounded-full w-[24px] h-[24px]' src="/profile_main.svg" />
              <p className="text-black">{props.data.userName}</p>
            </Link>
          }
          {/* {props.data.type !== 'PARTY' ? <></>
          : <>
            <DividerDot />
            <p className='text-gray3'>{`${props.data.event.currentHeadCount}/${props.data.event.maxHeadCount}(명)`}</p>
            {props.data.event.currentHeadCount !== props.data.event.maxHeadCount ? <></>
              : <p className="done-chip">모집완료</p>
            }
          </>
        } */}
        </div>
      </div>
      <div className='relative'>
        <img className='rounded-[4px] h-[116px] w-[92px] min-w-[92px] object-cover' src={props.data.headImageUrl ?? '/default_list_thumb3x.png'} />
        <button className="absolute top-[6px] right-[6px] z-10 h-[22px] w-[24px]" onClick={handleLike}>
          <LikeIcn val={liked} />
        </button>
      </div>
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
    <Link href={`/recruitment/${props.data.recruitmentId}`} className='flex flex-col px-[16px] py-[18px] gap-[4px]'>
      <div className='flex flex-row justify-between items-start'>
        <div className='flex flex-col gap-[4px]'>
          <span className='text-14 text-gray3'>{dayjs(props.data.startDate).format('YY.MM.DD')}</span>
          <span className='text-16 font-semibold'>{props.data.title}</span>
          <span className='text-14 text-gray3'>{props.data.eventTitle ?? '-'}</span>
        </div>
        <button className="h-[22px] w-[24px]" onClick={handleLike}>
          <LikeIcn val={liked} />
        </button>
      </div>
    </Link>
  )
}