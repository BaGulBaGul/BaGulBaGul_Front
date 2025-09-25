"use client";
import { useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffectFilterApplied } from '@/service/Functions';
import { FilterButton, FilterApplied, useFilter } from '@/components/common/filter';
import SubHeader from '@/components/layout/subHeader';
import { Filter } from './filter';

export default function Template({ children }: { children: React.ReactNode }) {
  const eventId = Number(useParams().eventId)
  const searchParams = useSearchParams()
  const router = useRouter()
  const [open, setOpen] = useState(false);

  // 적용된 필터들, 적용된 필터 개수
  const { filters, filterCnt, updateFilters, updateFilterCnt } = useFilter();
  // searchParams로 넘어온 필터 count
  useEffectFilterApplied(searchParams, updateFilters, updateFilterCnt)

  return (
    <>
      <SubHeader name="모집글" >
        <FilterButton handleOpen={() => { setOpen(true) }} cnt={filterCnt} />
      </SubHeader>
      {filterCnt > 0 && <div className='fixed top-[104px] w-full h-[36px] bg-p-white z-10'>
        <FilterApplied opt='REDIRECT' filters={filters} sp={searchParams} router={router} url={`/event/${eventId}/recruitment`} />
      </div>}
      <div className={`flex flex-col w-full ${filterCnt > 0 ? 'pt-[140px]' : 'pt-[104px]'}`}>
        {children}
      </div>
      <Filter eventId={eventId} open={open} closeFilter={() => setOpen(false)} />
    </>
  )
}