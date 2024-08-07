import { SubTopHeader } from '@/components/layout/subHeader';
import { redirect } from 'next/navigation';
import { Calendar, EditButton } from '@/components/pages/user';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '캘린더 • 바글바글',
  description: '모여봐요 바글바글',
}

export default function Page({ params }: { params: { userId: 'mypage' | number } }) {
  if (params.userId === 'mypage') {

    return (
      <>
        <SubTopHeader name='캘린더' child={<EditButton />} />
        <Calendar />
      </>
    );
  } else { redirect(`/user/${params.userId}`) }
}