"use client";

export function ReportCard(props: { data: any }) {
  return (
    <div className='flex flex-col bg-gray1 rounded-[8px] p-[8px] gap-[4px]'>
      <div className='flex flex-row gap-[8px] text-12'>
        <p className='font-medium text-gray3'>신고 횟수</p>
        <p className='text-black'>{props.data.reportCount}회</p>
      </div>
      <div className='flex flex-row gap-[8px] text-12'>
        <p className='font-medium text-gray3'>신고한 회원</p>
        <p className='text-black'>{props.data.reporter}</p>
      </div>
      <div className='flex flex-row gap-[8px] text-12'>
        <p className='font-medium text-gray3'>신고 일시</p>
        <p className='text-black'>{props.data.reportedAt}</p>
      </div>
      <div className='flex flex-row gap-[8px] text-12'>
        <p className='font-medium text-gray3'>신고 내용</p>
        <p className='text-black'>{props.data.reportedReason}</p>
      </div>
    </div>
  )
}