"use client";
import { useState, useEffect } from 'react';
import { CategoryButtons, ViewButton, ViewSelect, PostTab, ViewFilterApplied } from '@/components/common';
import { getParams, useEffectCntFilter } from '@/service/Functions';
import { useRouter, useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';
import { RecCarousel } from '@/components/pages/main';

export default function Template({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()
  //type
  const [tab, setTab] = useState(Number(searchParams.get('tab_id')) ?? 0);
  const handleChange = (e: React.SyntheticEvent, newValue: number) => { setTab(newValue); };
  // 카테고리 - 정렬기준, 날짜, 참여인원, 규모, 진행여부
  const [selectedCate, setSelectedCate] = useState<string[]>(searchParams.getAll('ct') ?? []);
  const [p, setP] = useState({
    sort: searchParams.get('sort') ?? 'createdAt,desc',
    dateRange: [
      !!searchParams.get('sD') ? dayjs(searchParams.get('sD'), "YYYYMMDD").toDate() : undefined,
      !!searchParams.get('eD') ? dayjs(searchParams.get('eD'), "YYYYMMDD").toDate() : undefined
    ], participants: Number(searchParams.get('ptcp')) ?? 0,
    headCount: { from: !!searchParams.get('hcMin') ? Number(searchParams.get('hcMin')) : undefined, to: !!searchParams.get('hcMax') ? Number(searchParams.get('hcMax')) : undefined },
    proceeding: searchParams.get('state') === 'p' ? true : false
  })

  // 적용된 필터들, 적용된 필터 개수
  const [filters, setFilters] = useState(['sort'])
  const [filterCnt, setFilterCnt] = useState(0)
  // searchParams로 넘어온 필터 count
  useEffectCntFilter(searchParams, setFilters, setFilterCnt, p.sort)

  const router = useRouter()
  const [startDate, endDate] = p.dateRange ?? [null, null];
  const routeToFilter = () => {
    let params = {
      sort: p.sort ?? '', ct: selectedCate ?? '', state: p.proceeding ? 'p' : '',
      sD: !!startDate ? dayjs(startDate).format('YYYYMMDD') : '',
      eD: !!endDate ? dayjs(endDate).format('YYYYMMDD') : '',
      ptcp: p.participants > 0 ? p.participants : '',
      hcMin: !!p.headCount.from ? p.headCount.from : '',
      hcMax: !!p.headCount.to ? p.headCount.to : '',
    }
    router.replace(Object.keys(params).length > 0 ? `?${getParams(params)}&tab_id=${tab}` : ``)
  }

  const [rt, setRt] = useState(false)
  // 필터 삭제 시 변경대로 redirect
  const handleRt = () => { setRt(!rt) }
  useEffect(() => { routeToFilter() }, [tab, selectedCate, rt])

  const [open, setOpen] = useState(false);
  const handleOpen = () => { setOpen(true) }

  return (
    <div className='flex flex-col w-full pt-[44px]'>
      <RecCarousel />
      <div className='w-full px-0'>
        <div className='sticky top-[44px] relative px-[16px] pt-[20px] pb-[10px] bg-p-white z-10'>
          <div className='flex justify-between items-center'>
            <PostTab value={tab} handleChange={handleChange} />
            <ViewButton handleOpen={handleOpen} cnt={filterCnt} fs={18} />
          </div>
        </div>
        <div className='sticky top-[102px] relative bg-p-white z-10'>
          <ViewFilterApplied filterCnt={filterCnt} filters={filters} setFilters={setFilters} p={p} setP={setP} handleRt={handleRt} />
          <CategoryButtons selectedCate={selectedCate} setSelectedCate={setSelectedCate} />
        </div>
        <ViewSelect p={p} setP={setP} open={open} setOpen={setOpen} routeToFilter={routeToFilter} />
        {children}
      </div>
    </div>
  )
}