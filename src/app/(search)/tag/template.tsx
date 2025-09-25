"use client";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
import { createSearchParams } from 'react-router-dom';
import { useEffectFilterApplied } from '@/service/Functions';
import { TypeTabs } from '@/components/common';
import { FilterButton, FilterApplied, useFilter } from '@/components/common/filter';
import { CategoryButtons } from '@/components/common/input';
import { SearchTagBar } from '@/components/pages/search';
import { Filter } from './filter';

export default function Template({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [open, setOpen] = useState(false);

  //type, 카테고리, 태그
  const [tab, setTab] = useState(Number(searchParams.get('tab_id')) ?? 0);
  const [selectedCate, setSelectedCate] = useState<string[]>(searchParams.getAll('ct') ?? []);
  const tag = decodeURIComponent(decodeURIComponent(searchParams.get('tag') ?? ''))

  // 적용된 필터들, 적용된 필터 개수
  const { filters, filterCnt, updateFilters, updateFilterCnt } = useFilter();
  // searchParams로 넘어온 필터 count
  useEffectFilterApplied(searchParams, updateFilters, updateFilterCnt)

  const currentSP = new URLSearchParams(Array.from(searchParams.entries()))
  const routeToFilter = () => {
    currentSP.delete('tag')
    currentSP.delete('ct')
    currentSP.set('tab_id', tab.toString())
    if (tag.length > 0) {
      router.push(`/tag?tag=${tag}&${currentSP.toString()}${selectedCate.length > 0 ? `&${createSearchParams({ ct: selectedCate ?? '' })}` : ''}`)
    }
  }

  useEffect(() => { routeToFilter() }, [tab, selectedCate])


  return (
    <div className='flex flex-col w-full h-screen pb-[10px]'>
      <SearchTagBar tag={tag ?? ''} handleBack={() => router.back()} >
        <FilterButton handleOpen={() => { setOpen(true) }} cnt={filterCnt} />
      </SearchTagBar>
      <div className='w-full p-0 pt-[66px]'>
        <div className='fixed top-[66px] w-full bg-p-white z-10'>
          <TypeTabs val={tab} handleChange={(value: any) => { setTab(value); }} />
          {filterCnt > 0 && <FilterApplied opt='REDIRECT' filters={filters} sp={searchParams} router={router} url={``} />}
          <CategoryButtons selectedCate={selectedCate} updateSelectedCate={(groupValue: string[]) => { setSelectedCate(groupValue) }} />
        </div>
        {<div className={filterCnt > 0 ? 'mt-[120px]' : 'mt-[94px]'}>
          {children}
        </div>}
        <Filter open={open} closeFilter={() => setOpen(false)} url={`?tag=${tag}`} />
      </div>
    </div>);
}