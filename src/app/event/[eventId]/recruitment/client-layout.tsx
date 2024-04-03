"use client";
import { useState, useEffect } from 'react';
import { Backdrop } from '@mui/material';
import { ViewButton, ViewSelect, ViewFilterApplied } from '@/components/common';
import { getParams, String2Day, useEffectCntFilter } from '@/service/Functions';
import { DayRange } from '@hassanmojab/react-modern-calendar-datepicker'
import { useParams, useRouter, useSearchParams } from 'next/navigation';

export function ClientRootLayout({ children }: { children: React.ReactNode }) {
  const prms = useParams()
  const searchParams = useSearchParams()

  // 정렬기준(default 최신순), 날짜, 참여인원, 규모
  const [proceeding, setProceeding] = useState(false);
  const [sort, setSort] = useState(searchParams.get('sort') ?? 'createdAt,desc');
  const [dayRange, setDayRange] = useState<DayRange>({ from: String2Day(searchParams.get('sD')), to: String2Day(searchParams.get('eD')) });
  const [participants, setParticipants] = useState(Number(searchParams.get('ptcp')) ?? 0);

  // 적용된 필터들, 적용된 필터 개수
  const [filters, setFilters] = useState(['sort'])
  const [filterCnt, setFilterCnt] = useState(0)
  // // searchParams로 넘어온 필터 count
  useEffectCntFilter(searchParams, setFilters, setFilterCnt, sort)

  const router = useRouter()
  const [rt, setRt] = useState(false)
  // 필터 삭제 시 변경대로 redirect
  const handleRt = () => { setRt(!rt) }

  const routeToFilter = () => {
    let params = {
      sort: sort ?? '',
      sD: dayRange.from === null || dayRange.from === undefined
        ? '' : `${dayRange.from.year}${String(dayRange.from.month).padStart(2, "0")}${String(dayRange.from.day).padStart(2, "0")}`,
      eD: dayRange.to === null || dayRange.to === undefined
        ? '' : `${dayRange.to.year}${String(dayRange.to.month).padStart(2, "0")}${String(dayRange.to.day).padStart(2, "0")}`,
      ptcp: participants > 0 ? participants : '',
    }
    router.push(Object.keys(params).length > 0 ? `/event/${prms.eventId}/recruitment?${getParams(params)}` : `/event/${prms.eventId}/recruitment`)
  }

  useEffect(() => {
    console.log('useEffect - routeToFilter')
    routeToFilter()
  }, [rt])

  const [open, setOpen] = useState(false);
  const handleOpen = () => { setOpen(true) }
  // 필터 적용마다 링크 이동 시 버벅거림이 커서 필터 닫을때마다 링크 이동하는 것으로 수정
  const handleClose = () => {
    setOpen(false);
    routeToFilter();
  }

  return (
    <>
      <div className="relative z-20">
        <div className="fixed top-[44px] left-0 right-0 flex-row flex w-full h-[60px] justify-between px-[17px] place-items-center bg-[#FFF]">
          <a href={'/'} className="me-[46px]"><img src='/arrow_prev.svg' /></a>
          <div className='text-[18px]'>모집글</div>
          <ViewButton handleOpen={handleOpen} cnt={filterCnt} fs={18} />
        </div>
      </div>
      <Backdrop open={open} className='z-paper'>
        <ViewSelect sort={sort} setSort={setSort} handleClose={handleClose} dayRange={dayRange} setDayRange={setDayRange}
          participants={participants} setParticipants={setParticipants} proceeding={proceeding} setProceeding={setProceeding} />
      </Backdrop>
      {children}
    </>
  )
}