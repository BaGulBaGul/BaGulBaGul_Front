import { SubTopHeader } from '@/components/layout/subHeader';
import { UserPostTab } from '@/components/pages/user';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '작성글 • 바글바글',
  description: '모여봐요 바글바글',
}

export default function Page({ params }: { params: { userId: string | number } }) {
  return (
    <>
      <SubTopHeader name='작성글' />
      <UserPostTab />
    </>
  );
}