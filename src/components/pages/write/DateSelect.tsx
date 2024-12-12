'use client';
import React, { useState } from 'react'
import { CalIcn } from '@/components/common/styles/Icon';
import dayjs from 'dayjs';
import { ScrollPicker } from './ScrollPicker';

export const DateSelect = (props: { title: string; date: dayjs.Dayjs | null; setDate: any; }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => { setOpen(true) }
  return (
    <>
      <div className='flex flex-row items-start gap-[16px]'>
        <span className='text-14 font-semibold'>{props.title}</span>
        <button className={`filter-btn px-[8px] py-[4px] gap-[8px] ${!!props.date ? 'border-primary-blue' : ''}`}
          onClick={handleOpen}>
          <span className={!!props.date ? "text-primary-blue" : ''}>
            <CalIcn val={false} color="currentColor" />
          </span>
          {!!props.date
            ? <div className='flex flex-row gap-[10px]'>
              <span>{dayjs(props.date).format('YYYY년 M월 DD일')}</span>
              <span>{dayjs(props.date).format('A HH:mm')}</span>
            </div>
            : <div className='flex flex-row gap-[10px] text-gray2'>
              <span>{dayjs().format('YYYY년 M월 DD일')}</span>
              <span>{dayjs().format('A hh:mm')}</span>
            </div>
          }
        </button>
      </div >
      <ScrollPicker open={open} setOpen={setOpen} data={props.date} setData={props.setDate} />
    </>
  )
}