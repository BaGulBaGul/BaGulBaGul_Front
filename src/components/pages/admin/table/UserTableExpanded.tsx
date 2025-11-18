"use client";
import React, { useState } from 'react'
import dayjs from 'dayjs';
import { Row } from '@tanstack/react-table';
import { User } from '../table/TableConfig';
import { ReportPopup } from '../report/ReportPopup';

export function UserTableExpanded({ row }: { row: Row<User> }) {
  const [open, setOpen] = useState(false);
  let limitDate = dayjs().add(7, 'day').format('YYYY.MM.DD')
  if (!row.original.suspend) {
    return (
      <>
        <button onClick={() => setOpen(true)} className='w-full rounded-[4px] bg-gray1 text-black text-14 p-[4px]'>
          계정 일시 정지
        </button>
        <ReportPopup open={open} handleOpen={() => setOpen(false)} value={'suspend-account'} opt='POST' />
      </>
    )
  }
  return (
    <>
      <button onClick={() => setOpen(true)} className='w-full rounded-[4px] bg-primary-blue text-white text-14 p-[4px]'>
        계정 활성화
      </button>
      <p className='text-gray3 text-12'>일시 정지 기간 : {limitDate}까지</p>
      <ReportPopup open={open} handleOpen={() => setOpen(false)} value={'activate-account'} opt='POST' />
    </>
  )
}