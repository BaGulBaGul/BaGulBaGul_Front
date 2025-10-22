"use client";
import { Accordion } from '@base-ui-components/react';
import { FormatDateRange } from "@/service/Functions"
import { TypeChip, UserProfile } from '@/components/common/block';
import { IconArrowDown } from '@/components/common/styles/Icon';
import { ReactNode } from 'react';

export function ReportedBlock({ data, children }: { data: any; children: ReactNode; }) {
  return (
    <div className="flex flex-col bg-p-white">
      <Accordion.Header className="flex flex-row justify-between p-[16px] pb-[10px]">
        <div className="flex flex-col gap-[4px]">
          <TypeChip type={data.type} />
          <p className="text-16 font-semibold">{data.title}</p>
          <div className="flex flex-row gap-[8px]">
            <UserProfile userId={data.userId} userName={data.username} userProfileImageUrl={data.userProfileImageUrl} />
            {/* 신고일 */}
            <p className="text-14 text-gray3">{FormatDateRange(data.startDate, data.endDate)}</p>
          </div>
        </div>
        <Accordion.Trigger className='h-[24px] w-[24px] transition-transform align-middle data-[panel-open]:rotate-180'>
          <IconArrowDown />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Panel className='px-[16px] py-[10px]'>
        <ReportCard data={data} />
        {children}
      </Accordion.Panel>
    </div>
  )
}

function ReportCard({ data }: { data: any }) {
  return (
    <div className='flex flex-col bg-gray1 rounded-[8px] p-[8px] gap-[4px]'>
      <div className='flex flex-row gap-[8px] text-12'>
        <p className='font-medium text-gray3'>신고 횟수</p>
        <p className='text-black'>{data.reportCount}회</p>
      </div>
      <div className='flex flex-row gap-[8px] text-12'>
        <p className='font-medium text-gray3'>신고한 회원</p>
        <p className='text-black'>{data.reporter}</p>
      </div>
      <div className='flex flex-row gap-[8px] text-12'>
        <p className='font-medium text-gray3'>신고 일시</p>
        <p className='text-black'>{data.reportedAt}</p>
      </div>
      <div className='flex flex-row gap-[8px] text-12'>
        <p className='font-medium text-gray3'>신고 내용</p>
        <p className='text-black'>{data.reportedReason}</p>
      </div>
    </div>
  )
}