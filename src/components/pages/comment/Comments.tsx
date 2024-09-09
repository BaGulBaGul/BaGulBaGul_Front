"use client";
import { useRef, useState } from 'react';
import { setPageInfo, useEffectRefreshComment } from '@/service/Functions';
import { CommentProps, LoadingSkeleton, MoreButton } from '@/components/common';
import { CommentBlock } from './CommentBlock';

interface CommentsProps {
  origin: 'event' | 'event/recruitment'; originId: any; setCount: any; setOpenD: any; setTargetM: any; 
  isLoading: boolean; setLoading: any; tmp: any[]; setTmp: any; setTmpP: any; tmpP?: number;
}
export function Comments(props: CommentsProps) {
  const [comments, setComments] = useState<CommentProps[]>([]);

  const [page, setPage] = useState({ current: 0, total: 0, });
  const handleMore = () => {
    props.setLoading(true)
    setPageInfo(page, setPage, page.current + 1)
  }

  const initialSet = useRef(false);
  useEffectRefreshComment('CMT', `/api/${props.origin}/${props.originId}/comment?sort=createdAt,desc&size=10`, initialSet, page, setPage,
    props.setCount, props.isLoading, props.setLoading, setComments, props.tmp, props.setTmp, props.setTmpP, props.tmpP)
  // console.log('&& ', comments)
  // if (props.isLoading && page.current === 0) { return <LoadingSkeleton type='CMT' /> }
  // else {
  return (
    <>
      <div className='flex flex-col w-full min-h-[calc(100vh-104px)] pb-[88px] bg-gray1'>
        {comments.map((comment: CommentProps, idx: number) => (
          <div key={`cmt-${idx}`} className={idx % 2 == 0 ? 'bg-p-white px-[16px] py-[12px]' : 'bg-gray1 px-[16px] py-[12px]'}>
            <CommentBlock opt='CMT' data={comment} setOpenD={props.setOpenD} setTargetM={props.setTargetM} origin={props.origin} />
          </div>
        ))
        }
        {page.total > 1 && page.current + 1 < page.total
          ? <MoreButton onClick={handleMore} />
          : <></>
        }
      </div>
    </>
  )
  // }
}