"use client";
import { useState, useEffect, ChangeEvent } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';
import { FormatDateRange, getParams, useEffectCntFilter } from '@/service/Functions';
import { WriteFab } from '@/components/common';
import { HeaderBackIcn } from '@/components/common/styles/Icon';
import { closeFilter, FilterApplied, FilterButton, FilterCalendar, FilterDialog, FilterSortRadio, handleObjectValue } from '@/components/common/filter';
import { InputCheck, InputCollapse, InputNumber } from '@/components/common/input';

export default function Template({ children }: { children: React.ReactNode }) {
  const prms = useParams()
  const eventId = Number(prms.eventId)
  const searchParams = useSearchParams()
  // 정렬기준, 날짜, 참여인원, 진행여부
  const [p, setP] = useState({
    sort: searchParams.get('sort') ?? 'createdAt,desc',
    dateRange: [
      !!searchParams.get('sD') ? dayjs(searchParams.get('sD'), "YYYYMMDD").toDate() : undefined,
      !!searchParams.get('eD') ? dayjs(searchParams.get('eD'), "YYYYMMDD").toDate() : undefined
    ], participants: Number(searchParams.get('ptcp')) ?? 0,
    recruiting: searchParams.get('state') === 'r' ? true : false
  })

  // 적용된 필터들, 적용된 필터 개수
  const [filters, setFilters] = useState(['sort'])
  const [filterCnt, setFilterCnt] = useState(0)
  // // searchParams로 넘어온 필터 count
  useEffectCntFilter(searchParams, setFilters, setFilterCnt, p.sort)

  const router = useRouter()
  const [startDate, endDate] = p.dateRange ?? [null, null];
  const routeToFilter = () => {
    let params = {
      sort: p.sort ?? '', state: p.recruiting ? 'r' : '',
      sD: !!startDate ? dayjs(startDate).format('YYYYMMDD') : '',
      eD: !!endDate ? dayjs(endDate).format('YYYYMMDD') : '',
      ptcp: p.participants > 0 ? p.participants : '',
    }
    router.replace(Object.keys(params).length > 0 ? `/event/${eventId}/recruitment?${getParams(params)}` : `/event/${eventId}/recruitment`)
  }

  const [rt, setRt] = useState(false)
  // 필터 삭제 시 변경대로 redirect
  const handleRt = () => { setRt(!rt) }
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
        <FilterButton handleOpen={handleOpen} cnt={filterCnt} fs={18} />
      </div>
      {filterCnt <= 0 ? <></>
        : <div className='fixed top-[104px] w-full h-[36px] bg-p-white z-10'>
          <FilterApplied filterCnt={filterCnt} filters={filters} setFilters={setFilters} opt="REDIRECT" p={p} setP={setP} handleRt={handleRt} />
        </div>
      }
      <FilterDialog open={open} handleClose={() => { closeFilter(setOpen, routeToFilter) }} >
        <InputCheck title='모집 중만 보기' checked={p.recruiting} handleChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleObjectValue(setP, 'recruiting', e.target.checked) }} />
        <FilterSortRadio value={p.sort} handleChange={(e: ChangeEvent<HTMLInputElement>, newSort: string) => { handleObjectValue(setP, 'sort', newSort) }} />
        <InputCollapse title={'날짜선택'} type='CAL' value={!startDate ? '' : FormatDateRange(startDate, endDate)}>
          <FilterCalendar startDate={startDate} endDate={endDate} onChange={(dates: [any, any]) => { setP((prev: any) => ({ ...prev, dateRange: dates })) }} />
        </InputCollapse>
        <InputCollapse title={'참여인원'} type="NUM" value={p.participants} >
          <InputNumber value={p.participants} onChange={(newValue) => handleObjectValue(setP, 'participants', newValue)} />
        </InputCollapse>
      </FilterDialog>
      <div className={`flex flex-col w-full ${filterCnt > 0 ? 'pt-[140px]' : 'pt-[104px]'}`}>
        {children}
      </div>
      <WriteFab opt='r' eventId={eventId} />
    </>
  )
}