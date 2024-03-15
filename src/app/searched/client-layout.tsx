"use client";

import { PostTab, ViewSelect } from "@/components/common";
import { useRouter, useSearchParams } from 'next/navigation'
import { SearchBar } from "@/components/pages/searched";
import { Box, Backdrop } from "@mui/material";
import { String2Day, RangeProps, getParams } from "@/service/Functions";
import { useEffect, useState } from "react";
import { DayRange } from "react-modern-calendar-datepicker";

export function ClientRootLayout({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()
  const search = decodeURIComponent(decodeURIComponent(searchParams.get('query') ?? ''))

  // type
  const [tab, setTab] = useState(Number(searchParams.get('tab_id')) ?? 0);
  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    console.log('setTab (', newValue)
    setTab(newValue);
  };
  // 정렬기준(default 최신순), 날짜, 참여인원, 규모
  const [sort, setSort] = useState(searchParams.get('sort') ?? 'createdAt,desc');
  const [dayRange, setDayRange] = useState<DayRange>({ from: String2Day(searchParams.get('startDate')), to: String2Day(searchParams.get('endDate')) });
  const [participants, setParticipants] = useState(Number(searchParams.get('participants')) ?? 0);
  const [headCount, setHeadCount] = useState<RangeProps>({
    from: Number(searchParams.get('headCountMax')) ?? undefined, to: Number(searchParams.get('headCountMin')) ?? undefined
  });

  const [title, setTitle] = useState(search)

  const [open, setOpen] = useState(false);
  const handleClose = () => { setOpen(false) }

  // 적용된 필터들, 적용된 필터 개수, 현재 변경된 필터
  const [filterCnt, setFilterCnt] = useState(0)

  // // searchParams로 넘어온 필터 count
  useEffect(() => {
    let paramFilter: string[] = []
    for (const key of searchParams.keys()) {
      console.log('- ', key)
      if ((key === 'startDate' || key === 'endDate')) {
        if (!paramFilter.includes('dayRange')) {
          paramFilter.push('dayRange')
        }
      } else if (key !== 'query' && key !== 'size' && key !== 'tab_id' && !paramFilter.includes(key)) {
        paramFilter.push(key)
      }
    }

    if (paramFilter.length > 0) {
      if (paramFilter.length === 1 && sort === 'createdAt,desc') {
        setFilterCnt(0)
      } else {
        console.log('paramFilter : ', paramFilter)
        setFilterCnt(paramFilter.length)
      }
    }
  }, [searchParams])

  const router = useRouter()
  useEffect(() => {
    let params = {
      sort: sort ?? '',
      startDate: dayRange.from === null || dayRange.from === undefined
        ? '' : `${dayRange.from.year}-${String(dayRange.from.month).padStart(2, "0")}-${String(dayRange.from.day).padStart(2, "0")}T00:00:00`,
      endDate: dayRange.to === null || dayRange.to === undefined
        ? '' : `${dayRange.to.year}-${String(dayRange.to.month).padStart(2, "0")}-${String(dayRange.to.day).padStart(2, "0")}T23:59:59`,
      leftHeadCount: participants > 0 ? participants : '',
      totalHeadCountMax: headCount.from === null || headCount.from === undefined || headCount.from <= 0 ? '' : headCount.from,
      totalHeadCountMin: headCount.to === null || headCount.to === undefined || headCount.to <= 0 ? '' : headCount.to,
    }
    if(title.length > 0) {
      console.log('^^ /searched');
      router.push(Object.keys(params).length > 0 ? `/searched?query=${title}&${getParams(params)}&tab_id=${tab}` : `/searched?query=${title}&tab_id=${tab}`)
    }
  }, [sort, dayRange, participants, headCount, tab, title])

  return (
    <div className='flex flex-col w-full pb-[10px] h-screen bg-gray1'>
      <div className='fixed w-full top-0 bg-white z-paper'>
        <SearchBar title={search ?? ''} setOpen={setOpen} filterCnt={filterCnt} setTitle={setTitle} />
      </div>
      <div className='pt-[66px]'>
        <Box className='w-full p-0'>
          <Box className='sticky top-[66px] bg-[#FFF] relative z-10 px-[16px] pt-[20px] pb-[10px]'>
            <div className='flex justify-between items-center'>
              <PostTab value={tab} handleChange={handleChange} />
            </div>
          </Box>
          <Backdrop open={open ?? false} className='z-paper'>
            <ViewSelect sort={sort} setSort={setSort} handleClose={handleClose} dayRange={dayRange} setDayRange={setDayRange}
              participants={participants} setParticipants={setParticipants} headCount={headCount} setHeadCount={setHeadCount} />
          </Backdrop>
          {children}
        </Box>
      </div>
    </div>
  );
}