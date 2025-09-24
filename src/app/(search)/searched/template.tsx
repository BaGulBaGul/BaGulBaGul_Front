"use client";
import { useEffect, useState } from 'react';
import { createSearchParams } from 'react-router-dom';
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffectCntFilter } from '@/service/Functions';
import { TypeTabs } from '@/components/common';
import { FilterButton } from '@/components/common/filter';
import { CategoryButtons } from '@/components/common/input';
import { SearchBar } from '@/components/pages/search';
import { Filter } from './filter';
import { FilterApplied1 } from '@/components/common/filter/FilterApplied';

export default function Template({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()
  const router = useRouter()

  //type, 카테고리, 제목
  const [tab, setTab] = useState(Number(searchParams.get('tab_id')) ?? 0);
  const [selectedCate, setSelectedCate] = useState<string[]>(searchParams.getAll('ct') ?? []);
  const [title, setTitle] = useState(decodeURIComponent(decodeURIComponent(searchParams.get('query') ?? '')))

  // 적용된 필터들, 적용된 필터 개수
  const [filters, setFilters] = useState(['sort'])
  const [filterCnt, setFilterCnt] = useState(0)
  // searchParams로 넘어온 필터 count
  useEffectCntFilter(searchParams, setFilters, setFilterCnt, searchParams.get('sort') ?? 'createdAt,desc')

  const currentSP = new URLSearchParams(Array.from(searchParams.entries()))
  const routeToFilter = () => {
    currentSP.delete('query')
    currentSP.delete('ct')
    currentSP.set('tab_id', tab.toString())
    // router.replace(`?${currentSP.toString()}${selectedCate.length > 0 ? `&${createSearchParams({ ct: selectedCate ?? '' })}` : ''}`)
    if (title.length > 0) {
      router.push(`/searched?query=${title}&${currentSP.toString()}${selectedCate.length > 0 ? `&${createSearchParams({ ct: selectedCate ?? '' })}` : ''}`)
    }
  }
  useEffect(() => { routeToFilter() }, [tab, selectedCate])

  const [open, setOpen] = useState(false);

  return (
    <div className='flex flex-col w-full h-screen pb-[10px]'>
      <SearchBar title={title} isSearched={true} updateTitle={(t: string) => setTitle(t)} handleBack={() => router.back()} handleRoute={() => { routeToFilter() }} >
        <FilterButton handleOpen={() => { setOpen(true) }} cnt={filterCnt} />
      </SearchBar>
      <div className='w-full p-0 pt-[66px]'>
        <div className='fixed top-[66px] w-full bg-p-white z-10'>
          <TypeTabs val={tab} handleChange={(value: any) => { setTab(value); }} />
          {filterCnt > 0 && <FilterApplied1 filters={filters} opt="REDIRECT" sp={searchParams} router={router} url={``} />}
          <CategoryButtons selectedCate={selectedCate} updateSelectedCate={(groupValue: string[]) => { setSelectedCate(groupValue) }} />
        </div>
        {<div className={filterCnt > 0 ? 'mt-[120px]' : 'mt-[94px]'}>
          {children}
        </div>}
        <Filter open={open} closeFilter={() => setOpen(false)} />
      </div>
    </div>);
}