"use client";
import { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { SubTopHeader } from '@/components/layout/subHeader';
import { CalendarTab } from '.';
import { Calendar } from './Calendar';
import { useCalendarData } from '@/hooks/useInCalendar';
import { EditButton, SkeletonList } from '@/components/common';

export function CalendarPage() {
  const [focusDay, setFocusDay] = useState<Date>(new Date());
  const [displayM, setDisplayM] = useState<{ y: number, m: number }>({ y: dayjs().year(), m: dayjs().month() + 1 })

  const events = useCalendarData(displayM) as any
  const [focusEvents, setFocusEvents] = useState<any[] | undefined>(undefined)

  const initRef = useRef(false)
  const updateFE = () => {
    if (events.isSuccess && !!events.data) {
      if (!!events.data.events) { setFocusEvents(events.data.events[dayjs(focusDay).format('YYYY-MM-DD')] ?? []) }
      else { setFocusEvents([]) }
    }
  }

  useEffect(() => {
    if (!initRef.current && events.status === 'success') { updateFE(); initRef.current = true; }
  }, [events.status])
  useEffect(() => {
    if (focusDay && focusDay.getMonth() + 1 !== displayM.m) { setDisplayM({ y: focusDay.getFullYear(), m: focusDay.getMonth() + 1 }) }
    if (!!initRef.current) { updateFE(); }
  }, [focusDay])

  const [editing, setEditing] = useState<boolean>(false);
  return (
    <>
      <SubTopHeader name='캘린더' child={<EditButton editing={editing} handleEdit={() => setEditing(!editing)} />} />
      <div className='flex flex-col w-full pb-[10px] mt-[60px] gap-[8px]'>
        <div className='flex flex-col items-center w-full bg-p-white' id='calendar'>
          <Calendar focusDay={focusDay} setFocusDay={setFocusDay} displayM={displayM} setDisplayM={setDisplayM} events={events} />
        </div>
        {focusEvents === undefined && (events.isPending || events.isLoading)
          ? <SkeletonList num={3} type='CAL' />
          : <CalendarTab focusDay={focusDay} editing={editing} focusEvents={focusEvents} />
        }
      </div>
    </>
  )
}