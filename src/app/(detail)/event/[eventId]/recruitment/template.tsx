"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Backdrop } from '@mui/material';
import { getParams, useEffectCntFilter } from '@/service/Functions';
import { ViewButton, ViewSelect, ViewFilterApplied } from '@/components/common';
import { PostFooter } from '@/components/layout/footer';
import dayjs from 'dayjs';
import { HeaderBackIcn } from '@/components/common/styles/Icon';

export default function Template({ children }: { children: React.ReactNode }) {
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
      <div className="fixed top-[44px] left-0 right-0 flex flex-row justify-between place-items-center w-full h-[60px] px-[17px] py-[10px] bg-p-white z-30">
        <button onClick={() => router.back()}><HeaderBackIcn /></button>
        <div className='text-18'>모집글</div>
        <ViewButton handleOpen={handleOpen} cnt={filterCnt} fs={18} />
      </div>
      {filterCnt <= 0 ? <></>
        : <div className='fixed top-[104px] w-full h-[36px] bg-p-white z-10'>
          <ViewFilterApplied filterCnt={filterCnt} filters={filters} setFilters={setFilters} sort={sort} dateRange={dateRange} setDateRange={setDateRange}
            participants={participants} setParticipants={setParticipants} handleRt={handleRt} />
        </div>
      }
      <Backdrop open={open} className='z-paper'>
        <ViewSelect sort={sort} setSort={setSort} setOpen={setOpen} routeToFilter={routeToFilter} dateRange={dateRange} setDateRange={setDateRange}
          participants={participants} setParticipants={setParticipants} recruiting={recruiting} setRecruiting={setRecruiting} />
      </Backdrop>
      <div className={`flex flex-col w-full pb-[77px] ${filterCnt > 0 ? 'pt-[140px]' : 'pt-[104px]'}`}>
        {children}
      </div>
      <PostFooter title='모집글 작성하기' path='/' />
    </>
  )
}