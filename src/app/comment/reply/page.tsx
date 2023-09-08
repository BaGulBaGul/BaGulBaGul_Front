"use client";
import { HeaderNotFixed } from "@/components/layout/header";
import Reply, { CommentFooter } from '@/components/pages/comment/reply'
import { SubHeaderCnt } from '@/components/layout/subHeader';
import { commentData } from '@/components/common/Data';

export default function Page() {
  return (
    <div>
      <HeaderNotFixed />
      <SubHeaderCnt name='답글' url={"/"} cnt={commentData.length} />
      <Reply />
      <CommentFooter />
    </div>
  );
}
