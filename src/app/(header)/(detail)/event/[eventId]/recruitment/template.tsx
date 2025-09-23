"use client";
import { useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffectCntFilter } from '@/service/Functions';
import { FilterButton } from '@/components/common/filter';
import SubHeader from '@/components/layout/subHeader';
import { FilterApplied1 } from '@/components/common/filter/FilterApplied';
import { Filter } from './filter';

export default function Template({ children }: { children: React.ReactNode }) {
  const eventId = Number(useParams().eventId)
  const searchParams = useSearchParams()
  const router = useRouter()

  // 적용된 필터들, 적용된 필터 개수
  const [filters, setFilters] = useState(['sort'])
  const [filterCnt, setFilterCnt] = useState(0)
  // searchParams로 넘어온 필터 count
  useEffectCntFilter(searchParams, setFilters, setFilterCnt, searchParams.get('sort') ?? 'createdAt,desc')
  const [open, setOpen] = useState(false);
  return (
    <>
      <SubHeader name="모집글" >
        <FilterButton handleOpen={() => { setOpen(true) }} cnt={filterCnt} />
      </SubHeader>
      {filterCnt > 0 && <div className='fixed top-[104px] w-full h-[36px] bg-p-white z-10'>
        <FilterApplied1 filters={filters} opt="REDIRECT" sp={searchParams} router={router} state='r' url={`/event/${eventId}/recruitment`} />
      </div>}
      <div className={`flex flex-col w-full ${filterCnt > 0 ? 'pt-[140px]' : 'pt-[104px]'}`}>
        {children}
      </div>
      <Filter eventId={eventId} open={open} closeFilter={() => setOpen(false)} />
    </>
  )
}