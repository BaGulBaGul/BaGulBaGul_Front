"use client";
import React from 'react'
import dayjs from 'dayjs';
import { Row } from '@tanstack/react-table';
import { User } from './UserTableConfig';

export function UserTableExpanded({ row }: { row: Row<User> }) {
  let limitDate = dayjs().add(7, 'day').format('YYYY.MM.DD')
  // console.log(row.original)
  if (!!row.original.activated) {
    return (
      <button className='w-full rounded-[4px] bg-gray1 text-black text-14 p-[4px]'>
        계정 일시 정지
      </button>
    )
  }
  return (
    <>
      <button className='w-full rounded-[4px] bg-primary-blue text-white text-14 p-[4px]'>
        계정 활성화
      </button>
      <p className='text-gray3 text-12'>일시 정지 기간 : {limitDate}까지</p>
    </>
  )
}