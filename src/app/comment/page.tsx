"use client";
import { HeaderNotFixed } from "@/components/layout/header";
import Comment, { CommentFooter } from '@/components/pages/comment'
import { SubHeaderCnt } from '@/components/layout/subHeader';
import { commentData } from '@/components/common/Data';

export default function Page() {
  return (
    <div>
      <HeaderNotFixed />
      <SubHeaderCnt name='글 댓글' url={"/"} cnt={commentData.length} />
      <Comment />
      <CommentFooter />
    </div>
  );
}
