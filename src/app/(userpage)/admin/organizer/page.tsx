import { SubTopHeader } from '@/components/layout/subHeader';
import { OrganizerManagePage } from '@/components/pages/admin/user/OrganizerManagePage';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '관리자페이지 | 바글바글 관리',
  description: '모여봐요 바글바글',
}

export default function Page() {
  return (
    <>
      <SubTopHeader name='주최자 관리' />
      <OrganizerManagePage />
    </>
  );
}