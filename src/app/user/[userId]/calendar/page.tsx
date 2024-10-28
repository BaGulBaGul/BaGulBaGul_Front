import { redirect } from 'next/navigation';
import { CalendarPage } from '@/components/pages/user';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '캘린더 • 바글바글',
  description: '모여봐요 바글바글',
}

export default function Page({ params }: { params: { userId: 'mypage' | number } }) {
  if (params.userId === 'mypage') {
    return ( <CalendarPage /> );
  } else { redirect(`/user/${params.userId}`) }
}