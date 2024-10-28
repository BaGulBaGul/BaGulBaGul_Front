"use client";
import { Dispatch, SetStateAction, useState } from 'react';
import { SubTopHeader } from '@/components/layout/subHeader';
import { CalendarTab } from '.';
import { Calendar } from './Calendar';

export function CalendarPage() {
  const [focusDay, setFocusDay] = useState<Date | null>(new Date());
  const [editing, setEditing] = useState<boolean>(false);

  return (
    <>
      <SubTopHeader name='캘린더' child={<EditButton editing={editing} setEditing={setEditing} />} />
      <div className='flex flex-col w-full pb-[10px] mt-[60px] gap-[8px]'>
        <div className='flex flex-col items-center w-full bg-p-white' id='calendar'>
          <Calendar focusDay={focusDay} setFocusDay={setFocusDay} />
        </div>
        <CalendarTab focusDay={focusDay} editing={editing} />
      </div>
    </>
  )
}

function EditButton(props: { editing: boolean; setEditing: Dispatch<SetStateAction<boolean>> }) {
  const handleEdit = () => { props.setEditing(!props.editing) }
  return (<button onClick={handleEdit} className='text-16 text-gray3'>{props.editing ? '완료' : '편집'}</button>)
}