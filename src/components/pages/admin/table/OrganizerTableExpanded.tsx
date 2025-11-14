"use client";
import React, { useState } from 'react'
import { Row } from '@tanstack/react-table';
import { ReportPopup } from '../report/ReportPopup';
import { Organizer } from '../table/TableConfig';
import { OrganizerProfileDialog } from './OrganizerProfileDialog';

export function OrganizerTableExpanded({ row }: { row: Row<Organizer> }) {
  const [open, setOpen] = useState(false);
  const [openP, setOpenP] = useState(false);
  return (
    <>
      <div className='flex flex-row gap-[16px]'>
        <button onClick={() => setOpen(true)} className='w-full rounded-[4px] bg-gray1 text-black text-14 p-[4px]'>
          수정하기
        </button>
        <button onClick={() => setOpenP(true)} className='w-full rounded-[4px] bg-danger-red text-white text-14 p-[4px]'>
          삭제하기
        </button>
      </div>
      <ReportPopup open={openP} handleOpen={() => setOpenP(false)} value={'activate-account'} opt='POST' />
      <OrganizerProfileDialog open={open} toggleOpen={(o: boolean) => setOpen(o)} />
    </>
  )
}