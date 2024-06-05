"use client";
import { HeaderNotFixed } from "@/components/layout/header";
import Comments from '@/components/pages/comment/[postId]'

export default function Page() {
  return (
    <div>
      <HeaderNotFixed />
      <Comments />
    </div>
  );
}
