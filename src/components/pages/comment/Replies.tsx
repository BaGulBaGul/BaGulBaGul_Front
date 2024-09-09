"use client";
import { useRef, useState } from 'react';
import { setPageInfo, useEffectRefreshComment } from '@/service/Functions';
import { CommentProps, MoreButton } from '@/components/common';
import { CommentBlock } from './CommentBlock';

interface RepliesProps {
  setCount: any; setOpenD: any; setTargetM: any; handleMention: any; commentId: any; isLoadingR: boolean; setLoadingR: any
  tmp: any[]; setTmp: any; setTmpP: any; tmpP?: number; origin: 'event' | 'event/recruitment'
}
export function Replies(props: RepliesProps) {
  const [children, setChildren] = useState<CommentProps[]>([]);

  const [page, setPage] = useState({ current: 0, total: 0, });
  const handleMore = () => {
    props.setLoadingR(true)
    setPageInfo(page, setPage, page.current + 1)
  }

  const initialSet = useRef(false);
  useEffectRefreshComment('RPL', `/api/${props.origin}/comment/${props.commentId}/children?sort=createdAt,desc&size=10`, initialSet, page, setPage,
    props.setCount, props.isLoadingR, props.setLoadingR, setChildren, props.tmp, props.setTmp, props.setTmpP, props.tmpP)

  // if (props.isLoadingR) { return <LoadingSkeleton type='RPL' /> }
  // else {
  return (
    <div className='flex flex-col w-full'>
      {children.map((comment: CommentProps, idx: number) => (
        <div className={idx % 2 == 0 ? 'bg-p-white ps-[48px] pe-[16px] py-[12px]' : 'bg-gray1 ps-[48px] pe-[16px] py-[12px]'} key={`reply-${idx}`} >
          <CommentBlock opt="RPL" data={comment} key={`cmt-${idx}`} setOpenD={props.setOpenD} setTargetM={props.setTargetM} handleMention={props.handleMention} origin={props.origin} />
        </div>
      ))
      }
      {page.total > 1 && page.current + 1 < page.total
        ? <MoreButton onClick={handleMore} />
        : <></>
      }
    </div>
  )
}
// }