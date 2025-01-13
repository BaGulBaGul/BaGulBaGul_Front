"use client";
import { CommentMProps, CommentProps, LoadingCircle, MoreButton } from '@/components/common';
import { CommentBlock } from '@/components/pages/comment';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { handleMore, useListWithPage } from '@/hooks/useInCommon';
import { SkeletonReplies } from '@/components/common/loading/SkeletonComments';

interface RepliesProps {
  origin: 'event' | 'event/recruitment'; rKey: any[]; apiURL: string; setOpenD: Dispatch<SetStateAction<boolean>>;
  setTargetM: Dispatch<SetStateAction<CommentMProps | undefined>>; setRCnt: Dispatch<SetStateAction<number | undefined>>; handleMention: any;
}
export function Replies(props: RepliesProps) {
  const { data: replies, fetchNextPage, hasNextPage, status, isLoading, isFetchingNextPage } = useListWithPage(`${props.apiURL}/children?sort=createdAt,desc&size=10`, props.rKey)
  useEffect(() => {
    if (!!replies) { props.setRCnt(replies.pages[0].totalElements) }
  }, [replies])

  return (
    <>{isLoading ? <SkeletonReplies />
      : <>{!!replies && !replies.pages[0].empty
        ? <div className='flex flex-col w-full'>
          {replies.pages.map((reply) => (
            reply.content.map((item: CommentProps, idx: number) => (
              <div className={idx % 2 == 0 ? 'bg-p-white ps-[48px] pe-[16px] py-[12px]' : 'bg-gray1 ps-[48px] pe-[16px] py-[12px]'} key={`reply-${idx}`} id={`reply-${idx}`} >
                <CommentBlock opt="RPL" data={item} key={`cmt-${idx}`} setOpenD={props.setOpenD} setTargetM={props.setTargetM} handleMention={props.handleMention} origin={props.origin} />
              </div>
            ))
          ))}
          {hasNextPage ? <MoreButton onClick={() => handleMore(hasNextPage, fetchNextPage)} /> : <></>}
          {isFetchingNextPage ? <LoadingCircle /> : <></>}
        </div>
        : <></>
      }</>
    }</>
  )
}