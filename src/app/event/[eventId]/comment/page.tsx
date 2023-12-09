"use client";
import { HeaderNotFixed } from "@/components/layout/header";
import Comment from '@/components/pages/event/[eventId]/comment'

export default function Page() {
  return (
    <div>
      <HeaderNotFixed />
      <Comment />
    </div>
  );
}
