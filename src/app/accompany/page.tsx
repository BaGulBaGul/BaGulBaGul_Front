"use client";
import { HeaderNonMain } from "@/components/layout/header";
import Accompany from '@/components/pages/accompany'
import SubHeader from '@/components/layout/subHeader';
import { PostFooter } from '@/components/layout/footer';

export default function Page() {
  return (
    <div>
      <div className='relative z-10'>
        <HeaderNonMain />
        <SubHeader name='모집글' url={"/"} />
      </div>
      <Accompany />
      <PostFooter title='모집글 작성하기' path='/' />
    </div>
  );
}
