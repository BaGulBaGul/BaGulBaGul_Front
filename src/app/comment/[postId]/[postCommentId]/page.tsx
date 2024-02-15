"use client";
import { HeaderNotFixed } from "@/components/layout/header";
import Reply, { CommentFooter } from '@/components/pages/comment/[postId]/[postCommentId]'
import { SubHeaderCnt } from '@/components/layout/subHeader';
import { commentData } from '@/components/common/Data';

export default function Page() {
  return (
    <div>
      <HeaderNotFixed />
      <Reply />
    </div>
  );
}
