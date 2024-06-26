import MyCalendar from '@/components/pages/user/[userId]/calendar'
import { SubTopHeader } from '@/components/layout/subHeader';

export default function Page({ params }: { params: { userId: string | number } }) {
  if (params.userId === 'mypage') {
    return (
      <div className='h-screen'>
        <div className='relative z-50'>
          <SubTopHeader name='캘린더' url={"/"} />
        </div>
        <MyCalendar />
      </div>
    );
  }
}
