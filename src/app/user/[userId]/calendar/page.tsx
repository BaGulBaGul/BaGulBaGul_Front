"use client";
import { useState } from 'react';
import { SubTopHeader } from '@/components/layout/subHeader';
import { redirect } from 'next/navigation';
import dayjs from 'dayjs';
import { Calendar, CalendarTab } from '@/components/pages/user';

export default function Page({ params }: { params: { userId: string | number } }) {
  if (params.userId === 'mypage') {
    const [focusDay, setFocusDay] = useState<Date | null>(new Date());
    const [displayM, setDisplayM] = useState(dayjs().month() + 1)
    const [eventDates, setEventDates] = useState([]);

    return (
      <>
        <SubTopHeader name='캘린더' />
        <div className='flex flex-col w-full pb-[10px] mt-[60px] gap-[8px]'>
          <Calendar focusDay={focusDay} setFocusDay={setFocusDay} eventDays={eventDates} displayM={displayM} setDisplayM={setDisplayM} setEventDates={setEventDates} />
          <CalendarTab focusDay={focusDay} setEventDates={setEventDates} />
        </div>
      </>
    );
  } else { redirect(`/user/${params.userId}`) }
}