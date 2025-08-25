"use client";
import { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { SubTopHeader } from '@/components/layout/subHeader';
import { Calendar } from './Calendar';
import { useCalendarData } from '@/hooks/useInCalendar';
import { EditButton } from '@/components/common';
import { CalendarTab } from '..';

export function CalendarPage() {
  const [focusDay, setFocusDay] = useState<Date>(new Date());
  const [displayM, setDisplayM] = useState<{ y: number, m: number }>({ y: dayjs().year(), m: dayjs().month() + 1 })

  const events = useCalendarData(displayM) as any

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
  const handleEdit = () => { setEditing(!editing); setSelectedItems([]); }
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const handleSelected = (value: any[], e: Event) => { setSelectedItems(value); }

  const [focusEvents, setFocusEvents] = useState<any[] | undefined>(undefined)
  const changeFocusDay = (date: Date) => {
    setFocusDay(date);
    if (editing) { handleEdit(); }
  }

  return (
    <>
      <SubTopHeader name='캘린더' child={<EditButton editing={editing} handleEdit={handleEdit} />} />
      <div className='flex flex-col w-full pb-[10px] mt-[60px] gap-[8px]'>
        <Calendar focusDay={focusDay} changeFocusDay={changeFocusDay} displayM={displayM} changeDisplayM={(month: { y: number, m: number }) => setDisplayM(month)} events={events} />
        <CalendarTab eventsLoading={focusEvents === undefined && (events.isPending || events.isLoading)}
          focusDay={focusDay} editing={editing} focusEvents={focusEvents} selectedItems={selectedItems} handleSelected={handleSelected} />
      </div>
    </>
  )
}