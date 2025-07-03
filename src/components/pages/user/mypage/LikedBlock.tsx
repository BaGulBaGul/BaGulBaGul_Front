"use client";
import { useState } from 'react';
import { applyLike } from '@/service/Functions';
import { LikeIcn } from '@/components/common/styles/Icon';
import { LikeProps, LikeRProps } from '@/components/common';
import { UserProfile, BlockWrapper, BlockBodyAD, BlockBodyN } from '@/components/common/block';

export function LikedBlockE({ data }: { data: LikeProps }) {
  const [liked, setLiked] = useState(true);
  const handleLike = (e: any) => {
    e.preventDefault();
    applyLike(true, liked, `/api/event/${data.eventId}/like`, setLiked)
  }
  return (
    <BlockWrapper url={`/event/${data.eventId}`} wrapStyle='gap-[8px] p-[16px]'
      blockAction={<button className="h-[24px] w-[24px]" onClick={handleLike}><LikeIcn val={liked} /></button>}
      blockThumb={<img className='rounded-[4px] w-[92px] h-[116px] object-cover' src={data.eventWriterProfileImageUrl ?? '/default_list_thumb3x.png'} />}>
      <BlockBodyAD title={data.title} startDate={data.startDate} endDate={data.endDate} address={data.abstractLocation}
        head={undefined} writer={undefined}
      // head={data.type === 'PARTY' ? <HeadCount currentHeadCount={data.currentHeadCount} maxHeadCount={data.maxHeadCount} state={data.state} /> : <></>}
      />
    </BlockWrapper>
  )
}

export function LikedBlockR({ data }: { data: LikeRProps }) {
  const [liked, setLiked] = useState(true);
  const handleLike = (e: any) => {
    e.preventDefault();
    applyLike(true, liked, `/api/event/recruitment/${data.recruitmentId}/like`, setLiked)
  }
  return (
    <BlockWrapper url={`/recruitment/${data.recruitmentId}`} wrapStyle='gap-[8px] px-[16px] py-[18px]'
      blockAction={<button className="h-[24px] w-[24px]" onClick={handleLike}><LikeIcn val={liked} /></button>}>
      <BlockBodyN title={data.title} startDate={data.startDate} endDate={data.endDate} name={'tmp name for event'} />
    </BlockWrapper>
  )
}