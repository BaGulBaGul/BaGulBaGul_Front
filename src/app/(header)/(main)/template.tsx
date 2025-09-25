"use client";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffectFilterApplied } from '@/service/Functions';
import { TypeTabs, EventCarousel } from '@/components/common';
import { FilterButton, FilterApplied, useFilter } from '@/components/common/filter';
import { CategoryButtons } from '@/components/common/input';
import { Filter } from './filter';
import { createSearchParams } from 'react-router-dom';

export default function Template({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [open, setOpen] = useState(false);

  //type, 카테고리
  const [tab, setTab] = useState(Number(searchParams.get('tab_id')) ?? 0);
  const [selectedCate, setSelectedCate] = useState<string[]>(searchParams.getAll('ct') ?? []);

  // 적용된 필터들, 적용된 필터 개수
  const { filters, filterCnt, updateFilters, updateFilterCnt } = useFilter();
  // searchParams로 넘어온 필터 count
  useEffectFilterApplied(searchParams, updateFilters, updateFilterCnt)

  const currentSP = new URLSearchParams(Array.from(searchParams.entries()))
  const routeToFilter = () => {
    currentSP.delete('ct')
    currentSP.set('tab_id', tab.toString())
    router.replace(`?${currentSP.toString()}${selectedCate.length > 0 ? `&${createSearchParams({ ct: selectedCate ?? '' })}` : ''}`)
  }
  useEffect(() => { routeToFilter() }, [tab, selectedCate])


  const defaultTitle = "SUMMER\n페스티벌 추천"
  return (
    <div className='flex flex-col w-full pt-[44px]'>
      <EventCarousel title={defaultTitle} />
      <div className='w-full px-0'>
        <TypeTabs val={tab} handleChange={(value: any) => { setTab(value); }} wrapStyle='sticky relative top-[44px] pt-[20px]'>
          <FilterButton handleOpen={() => { setOpen(true) }} cnt={filterCnt} />
        </TypeTabs>
        <div className='sticky top-[102px] relative bg-p-white z-10'>
          {filterCnt > 0 && <FilterApplied opt='REDIRECT' filters={filters} sp={searchParams} router={router} url={``} />}
          <CategoryButtons selectedCate={selectedCate} updateSelectedCate={(groupValue: string[]) => { setSelectedCate(groupValue) }} />
        </div>
        {children}
      </div>
      <Filter open={open} closeFilter={() => setOpen(false)} />
    </div>
  )
}