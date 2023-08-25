"use client";
import { HeaderNonMain } from "@/components/layout/header";
import Comment, { CommentFooter } from '@/components/pages/comment'
import SubHeaderCnt from '@/components/layout/subHeader';
import { commentData } from '@/components/common/Data';

export default function Page() {
  return (
    <div>
      <div className='relative z-50'>
        <HeaderNonMain />
        <SubHeaderCnt name='글 댓글' url={"/"} cnt={commentData.length} />
      </div>
      <Comment />
      <CommentFooter />
    </div>
  );
}
