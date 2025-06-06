import { SubTopHeader } from '@/components/layout/subHeader';
import { LikedTab } from '@/components/pages/user';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '좋아요 • 바글바글',
  description: '모여봐요 바글바글',
}

export default function Page() {
  return (
    <>
      <SubTopHeader name='좋아요' />
      <LikedTab />
    </>
  );
}