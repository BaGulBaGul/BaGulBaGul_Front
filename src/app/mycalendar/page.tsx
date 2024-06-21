import MyCalendar from '@/components/pages/mycalendar'
import { SubTopHeader } from '@/components/layout/subHeader';

export default function Page() {
  return (
    <div className='h-screen'>
      <div className='relative z-50'>
        <SubTopHeader name='캘린더' url={"/"} />
      </div>
      <MyCalendar />
    </div>
  );
}
