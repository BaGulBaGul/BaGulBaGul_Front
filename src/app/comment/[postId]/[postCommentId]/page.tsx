"use client";
import { HeaderNotFixed } from "@/components/layout/header";
import Reply from '@/components/pages/comment/[postId]/[postCommentId]'

export default function Page() {
  return (
    <div>
      <HeaderNotFixed />
      <Reply />
    </div>
  );
}
