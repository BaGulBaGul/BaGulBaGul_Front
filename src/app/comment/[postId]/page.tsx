"use client";
import { HeaderNotFixed } from "@/components/layout/header";
import Comments from '@/components/pages/comment/[postId]'
import { SubHeaderCnt } from '@/components/layout/subHeader';
import { commentData } from '@/components/common/Data';

export default function Page() {
  return (
    <div>
      <HeaderNotFixed />
      <Comments />
    </div>
  );
}
