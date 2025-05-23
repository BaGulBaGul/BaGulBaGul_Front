import { SubTopHeader } from '@/components/layout/subHeader';
import { ReportManagePage } from '@/components/pages/admin';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '신고 댓글 관리 | 바글바글 관리',
  description: '모여봐요 바글바글',
}

export default function Page() {
  return (
    <>
      <SubTopHeader name='신고 댓글 관리' />
      <ReportManagePage opt='CMT' />
    </>
  );
}