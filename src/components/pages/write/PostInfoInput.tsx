'use client';
import React, { useState } from 'react'
import { RangeProps } from '@/components/common'
import { CalIcn } from '@/components/common/styles/Icon';
import { viewCheckTheme } from '@/components/common/filter/ViewFilterTheme';
import { Checkbox, FormControl, FormControlLabel, ThemeProvider } from '@mui/material'
import dayjs from 'dayjs';
import { ScrollPicker } from './ScrollPicker';
import { HeadSelect, PartiSelect } from '@/components/common/input/Select';

interface PostInfoInputProps {
  type: 'p' | 'r';
  startDate?: dayjs.Dayjs | null; setStartDate?: any; endDate?: dayjs.Dayjs | null; setEndDate?: any;
  headCount?: RangeProps; setHeadCount?: any; forAdult: boolean; setForAdult: any;
  participants?: number; setParticipants?: any;
}
export function PostInfoInput(props: PostInfoInputProps) {
  const handleAdult = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setForAdult(e.target.checked);
  }
  const [openCollapse, setOpenCollapse] = useState(false);
  const handleOpenCollapse = () => { setOpenCollapse(!openCollapse) }

  return (
    <div className='flex flex-col gap-[8px] px-[16px] py-[10px]'>
      {props.type === 'p'
        ? <>
          <DateSelect title='시작일시' date={props.startDate!} setDate={props.setStartDate} />
          <DateSelect title='종료일시' date={props.endDate!} setDate={props.setEndDate} />
          {props.headCount === undefined ? <></>
            : <HeadSelect openHead={openCollapse} handleOpenHead={handleOpenCollapse} headCount={props.headCount} setHeadCount={props.setHeadCount} />}
        </>
        : <PartiSelect openParti={openCollapse} handleOpenParti={handleOpenCollapse} participants={props.participants ?? 0} setParticipants={props.setParticipants} />
      }
      <div className="flex flex-row justify-between">
        <div className={`${props.forAdult ? 'text-primary-blue' : 'text-gray3'} text-14 font-semibold pb-[2px]`}>19세 미만 참여불가 파티</div>
        <ThemeProvider theme={viewCheckTheme}>
          <FormControl>
            <FormControlLabel control={<Checkbox checked={props.forAdult} onChange={handleAdult} />} label="" />
          </FormControl>
        </ThemeProvider>
      </div>
    </div>
  )
}

const DateSelect = (props: { title: string; date: dayjs.Dayjs | null; setDate: any; }) => {
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
              <span>{props.date.format('YYYY년 M월 DD일')}</span>
              <span>{props.date.format('A HH:mm')}</span>
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