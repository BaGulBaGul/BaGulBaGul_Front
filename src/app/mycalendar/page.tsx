import MyCalendar from '@/components/pages/mycalendar'
import { SubTopHeader } from '@/components/layout/subHeader';

export default function Page() {
  return (
    <div>
      <div className='relative z-10'>
        <SubTopHeader name='캘린더' url={"/"} />
      </div>
      <MyCalendar />
    </div>
  );
}
