"use client";
import { useState, useEffect } from 'react';
import { Backdrop } from '@mui/material';
import { ViewButton, ViewSelect, ViewFilterApplied } from '@/components/common';
import { getParams, useEffectCntFilter } from '@/service/Functions';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';

export function ClientRootLayout({ children }: { children: React.ReactNode }) {
  const prms = useParams()
  const searchParams = useSearchParams()

  // 정렬기준(default 최신순), 날짜, 참여인원, 규모
  const [recruiting, setRecruiting] = useState(searchParams.get('state') === 'r' ? true : false);
  const [sort, setSort] = useState(searchParams.get('sort') ?? 'createdAt,desc');
  const [dateRange, setDateRange] = useState<[any, any]>([searchParams.get('sD') ?? null, searchParams.get('eD') ?? null]);
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

  const [startDate, endDate] = dateRange ?? [null, null];
  const routeToFilter = () => {
    let params = {
      sort: sort ?? '', state: recruiting ? 'r' : '',
      sD: startDate !== null ? dayjs(startDate).format('YYYYMMDD') : '',
      eD: endDate !== null ? dayjs(endDate).format('YYYYMMDD') : '',
      ptcp: participants > 0 ? participants : '',
    }
    router.push(Object.keys(params).length > 0 ? `/event/${prms.eventId}/recruitment?${getParams(params)}` : `/event/${prms.eventId}/recruitment`)
  }

  useEffect(() => {
    routeToFilter()
  }, [rt])

  const [open, setOpen] = useState(false);
  const handleOpen = () => { setOpen(true) }

  return (
    <>
      <div className="relative z-20">
        <div className="fixed top-[44px] left-0 right-0 flex-row flex w-full h-[60px] justify-between px-[17px] place-items-center bg-[#FFF]">
          <a href={'/'} className="me-[46px]"><img src='/arrow_prev.svg' /></a>
          <div className='text-[18px]'>모집글</div>
          <ViewButton handleOpen={handleOpen} cnt={filterCnt} fs={18} />
        </div>
      </div>
      {filterCnt <= 0 ? <></>
          : <div className='fixed top-[104px] w-full bg-[#FFF] z-10 h-[36px]'>
            <ViewFilterApplied filterCnt={filterCnt} filters={filters} setFilters={setFilters} sort={sort} dateRange={dateRange} setDateRange={setDateRange}
              participants={participants} setParticipants={setParticipants} handleRt={handleRt} />
          </div>
      }
      <Backdrop open={open} className='z-paper'>
        <ViewSelect sort={sort} setSort={setSort} setOpen={setOpen} routeToFilter={routeToFilter} dateRange={dateRange} setDateRange={setDateRange}
          participants={participants} setParticipants={setParticipants} recruiting={recruiting} setRecruiting={setRecruiting} />
      </Backdrop>
      <div className={filterCnt > 0 ? 'flex flex-col w-full pb-[77px] pt-[140px]' : 'flex flex-col w-full pb-[77px] pt-[104px]'}>
        {children}
      </div>
    </>
  )
}