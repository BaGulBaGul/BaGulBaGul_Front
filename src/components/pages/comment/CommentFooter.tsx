"use client";
import { useRef, useState } from 'react';
import { useNewComment } from '@/hooks/useInComment';
import { handleResizeHeight } from '@/service/Functions';
import { CommentFooterWrapper } from '.';

export function CommentFooter(props: { url: string; qKey: any; isLogin: boolean; }) {
  const cmtRef = useRef<HTMLTextAreaElement>(null);
  // 댓글입력창에 입력 여부 확인용
  const [cmtEntered, setCmtEntered] = useState(false);
  
  const mutateComment = useNewComment(`/api/${props.url}/comment`, props.qKey, cmtRef)
  const handleComment = () => {
    if (cmtRef.current && cmtRef.current.value.length > 0) {
      mutateComment.mutate()
    }
  }

  return (
    <CommentFooterWrapper isLogin={props.isLogin} entered={cmtEntered} handleComment={handleComment}>
      <textarea placeholder='댓글을 입력해주세요' rows={1} ref={cmtRef}
        onInput={() => handleResizeHeight(cmtRef, cmtEntered, (e: boolean) => setCmtEntered(e))}
        className='w-full max-h-[110px] mx-[24px] my-[13px] text-14 outline-none' />
    </CommentFooterWrapper>
  )
}