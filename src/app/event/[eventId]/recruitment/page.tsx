"use client";
import Header from '@/components/layout/header'
import Recruitment from '@/components/pages/event/[eventId]/recruitment'
import { PostFooter } from '@/components/layout/footer';

export default function Page() {
  return (
    <div>
      <Header />
      <Recruitment />
      <PostFooter title='모집글 작성하기' path='/' />
    </div>
  );
}
