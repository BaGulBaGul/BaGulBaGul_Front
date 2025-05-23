import { SubTopHeader } from '@/components/layout/subHeader';
import { PostManagePage } from '@/components/pages/admin';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '삭제된 게시글 관리 | 바글바글 관리',
  description: '모여봐요 바글바글',
}

export default function Page() {
  return (
    <>
      <SubTopHeader name='삭제된 게시글 관리' />
      <PostManagePage />
    </>
  );
}