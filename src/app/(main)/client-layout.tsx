"use client";
import { useState, useEffect, useRef } from 'react';
import { Box, Backdrop } from '@mui/material';
import { CategoryButtons, ViewButton, ViewSelect, RecCarousel, PostTab, ViewFilterApplied, RangeProps } from '@/components/common';
import { getParams, String2Day, useEffectCntFilter } from '@/service/Functions';
import { DayRange } from '@hassanmojab/react-modern-calendar-datepicker'
import { useRouter, useSearchParams } from 'next/navigation';

export function ClientRootLayout({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()

  //type
  const [tab, setTab] = useState(Number(searchParams.get('tab_id')) ?? 0);
  const handleChange = (e: React.SyntheticEvent, newValue: number) => { setTab(newValue); };

  // 정렬기준(default 최신순), 날짜, 참여인원, 규모
  const [selectedCate, setSelectedCate] = useState<string[]>(searchParams.getAll('ct') ?? []);
  const [sort, setSort] = useState(searchParams.get('sort') ?? 'createdAt,desc');
  const [dayRange, setDayRange] = useState<DayRange>({ from: String2Day(searchParams.get('sD')), to: String2Day(searchParams.get('eD')) });
  const [participants, setParticipants] = useState(Number(searchParams.get('ptcp')) ?? 0);
  const [headCount, setHeadCount] = useState<RangeProps>({
    from: Number(searchParams.get('hcMin')) ?? undefined, to: Number(searchParams.get('hcMax')) ?? undefined
  });

  // 적용된 필터들, 적용된 필터 개수
  const [filters, setFilters] = useState(['sort'])
  const [filterCnt, setFilterCnt] = useState(0)
  // searchParams로 넘어온 필터 count
  useEffectCntFilter(searchParams, setFilters, setFilterCnt, sort)

  // // ** 적용된 필터 있는 경우 자동으로 스크롤되도록 -> 적용안됨
  // const sRef = useRef<HTMLDivElement>()
  // useEffect(() => {
  //   // let element = document.getElementById('post-root');
  //   if (sRef.current && (Array.from(searchParams).length > 2 || (Array.from(searchParams).length === 2
  //     && !(searchParams.get('sort') === 'createdAt,desc' && searchParams.get('tab_id') === '0')))) {
  //     console.log('-@-@-@- !!! ', Array.from(searchParams).length)
  //     sRef.current.scrollIntoView()
  //   }
  // }, [])

  const router = useRouter()
  const [rt, setRt] = useState(false)
  // 필터 삭제 시 변경대로 redirect
  const handleRt = () => { setRt(!rt) }

  const routeToFilter = () => {
    let params = {
      sort: sort ?? '', ct: selectedCate ?? '',
      sD: dayRange.from === null || dayRange.from === undefined
        ? '' : `${dayRange.from.year}${String(dayRange.from.month).padStart(2, "0")}${String(dayRange.from.day).padStart(2, "0")}`,
      eD: dayRange.to === null || dayRange.to === undefined
        ? '' : `${dayRange.to.year}${String(dayRange.to.month).padStart(2, "0")}${String(dayRange.to.day).padStart(2, "0")}`,
      ptcp: participants > 0 ? participants : '',
      hcMin: headCount.from === null || headCount.from === undefined || headCount.from <= 0 ? '' : headCount.from,
      hcMax: headCount.to === null || headCount.to === undefined || headCount.to <= 0 ? '' : headCount.to,
    }
    router.push(Object.keys(params).length > 0 ? `?${getParams(params)}&tab_id=${tab}` : ``)
  }

  useEffect(() => {
    console.log('useEffect - routeToFilter')
    routeToFilter()
  }, [tab, selectedCate, rt])

  const [open, setOpen] = useState(false);
  const handleOpen = () => { setOpen(true) }

  return (
    <div className='flex flex-col w-full pt-[44px]'>
      <RecCarousel />
      {/* <Box className='w-full px-0' id='post-root' ref={sRef}> */}
      <Box className='w-full px-0'>
        <Box className='sticky top-[44px] bg-[#FFF] relative z-10 px-[16px] pt-[20px] pb-[10px]'>
          <div className='flex justify-between items-center'>
            <PostTab value={tab} handleChange={handleChange} />
            <ViewButton handleOpen={handleOpen} cnt={filterCnt} fs={18} />
          </div>
        </Box>
        <div className='sticky top-[102px] bg-[#FFF] relative z-10'>
          <ViewFilterApplied filterCnt={filterCnt} filters={filters} setFilters={setFilters}
            sort={sort} dayRange={dayRange} setDayRange={setDayRange} participants={participants}
            setParticipants={setParticipants} headCount={headCount} setHeadCount={setHeadCount} handleRt={handleRt} />
          <CategoryButtons selectedCate={selectedCate} setSelectedCate={setSelectedCate} />
        </div>
        <Backdrop open={open} className='z-paper'>
          <ViewSelect sort={sort} setSort={setSort} setOpen={setOpen} routeToFilter={routeToFilter} dayRange={dayRange} setDayRange={setDayRange}
            participants={participants} setParticipants={setParticipants} headCount={headCount} setHeadCount={setHeadCount} />
        </Backdrop>
        {children}
      </Box>
    </div>
  )
}