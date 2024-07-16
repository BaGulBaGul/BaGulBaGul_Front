import MyCalendar from '@/components/pages/user/[userId]/calendar'
import { SubTopHeader } from '@/components/layout/subHeader';
import { redirect } from 'next/navigation';

export default function Page({ params }: { params: { userId: string | number } }) {
  if (params.userId === 'mypage') {
    return (
      <div className='h-screen'>
        <SubTopHeader name='캘린더' />
        <MyCalendar />
      </div>
    );
  } else { redirect(`/user/${params.userId}`) }
}