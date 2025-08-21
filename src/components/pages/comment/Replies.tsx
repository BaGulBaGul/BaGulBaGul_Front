"use client";
import { useEffect } from 'react';
import { useListWithPage } from '@/hooks/useInCommon';
import { CommentProps, ListWrapper, SkeletonReplies } from '@/components/common';
import { CommentLikeButton, ReplyBlock } from '.';

interface Props {
  origin: 'event' | 'event/recruitment'; rKey: any[]; apiURL: string; 
  updateRCnt: (cnt: number) => void; handleMention: any; handleToggle: any;
}
export function Replies({origin, rKey, apiURL, updateRCnt, handleMention, handleToggle}: Props) {
  const replies = useListWithPage(`${apiURL}/children?sort=createdAt,desc&size=10`, rKey)
  useEffect(() => {
    if (!!replies) { updateRCnt(replies.data?.pages[0].totalElements) }
  }, [replies])

  return (
    <ListWrapper res={replies} skeleton={<SkeletonReplies />} nodata={<></>}>
      {replies.data?.pages.map((reply) => (
        reply.content.map((item: CommentProps, idx: number) => (
          <div className={idx % 2 == 0 ? 'bg-p-white ps-[48px] pe-[16px] py-[12px]' : 'bg-gray1 ps-[48px] pe-[16px] py-[12px]'} key={`reply-${idx}`} id={`reply-${idx}`} >
            <ReplyBlock data={item} handleMention={handleMention} handleToggle={(e) => handleToggle(e, item, 'RPL')}
              likeBtn={<CommentLikeButton data={item} apiURL={`/api/${origin}/comment/children/${item.commentChildId}/like`} />} />
          </div>
        ))
      ))}
    </ListWrapper>
  )
}