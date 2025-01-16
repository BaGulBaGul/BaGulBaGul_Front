"use client";
import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { SubTopHeader } from '@/components/layout/subHeader';
import { CalendarTab } from '.';
import { Calendar } from './Calendar';
import { useCalendarData } from '@/hooks/useInCalendar';

export function CalendarPage() {
  const [focusDay, setFocusDay] = useState<Date>(new Date());
  const [displayM, setDisplayM] = useState<{ y: number, m: number }>({ y: dayjs().year(), m: dayjs().month() + 1 })
  useEffect(() => {
    if (focusDay && focusDay.getMonth() + 1 !== displayM.m) { setDisplayM({ y: focusDay.getFullYear(), m: focusDay.getMonth() + 1 }) }
  }, [focusDay])
  let events = useCalendarData(displayM)

  const [editing, setEditing] = useState<boolean>(false);
  return (
    <>
      <SubTopHeader name='캘린더' child={<EditButton editing={editing} setEditing={setEditing} />} />
      <div className='flex flex-col w-full pb-[10px] mt-[60px] gap-[8px]'>
        <div className='flex flex-col items-center w-full bg-p-white' id='calendar'>
          <Calendar focusDay={focusDay} setFocusDay={setFocusDay} displayM={displayM} setDisplayM={setDisplayM} events={events} />
        </div>
        <CalendarTab focusDay={focusDay} editing={editing} events={events} />
      </div>
    </>
  )
}

function EditButton(props: { editing: boolean; setEditing: Dispatch<SetStateAction<boolean>> }) {
  const handleEdit = () => { props.setEditing(!props.editing) }
  return (<button onClick={handleEdit} className='text-16 text-gray3'>{props.editing ? '완료' : '편집'}</button>)
}