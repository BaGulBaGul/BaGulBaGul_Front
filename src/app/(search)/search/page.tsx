"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getParams, useEffectFilterApplied } from '@/service/Functions';
import { Divider, TypeTabs } from '@/components/common';
import { handleObjectValue, FilterButton, FilterApplied, useFilter } from '@/components/common/filter';
import { CategoryButtons } from '@/components/common/input';
import { SearchBar, FrequentSearches } from '@/components/pages/search';
import { Filter } from './filter';

export default function Page() {
  const [p, setP] = useState<any>({ sort: 'createdAt,desc' })
  const [open, setOpen] = useState(false);
  
  // 적용된 필터들, 적용된 필터 개수
  const { filters, filterCnt, updateFilters, updateFilterCnt } = useFilter();
  // searchParams로 넘어온 필터 count
  useEffectFilterApplied(p, updateFilters, updateFilterCnt)

  // Searchbar
  const router = useRouter()
  const [title, setTitle] = useState('')

  useEffect(() => {
    if (title.length > 0) { router.push(`/searched?query=${title}&${getParams(p)}`) }
  }, [title])

  return (
    <div className='flex flex-col w-full h-screen'>
      <SearchBar title={title} isSearched={false} updateTitle={(t: string) => setTitle(t)} handleBack={() => router.back()} >
        <FilterButton handleOpen={() => { setOpen(true) }} cnt={filterCnt} />
      </SearchBar>
      <div className='w-full p-0 pt-[66px]'>
        <div className='fixed top-[66px] w-full bg-p-white z-10'>
          <TypeTabs val={p.tab_id ?? 0} handleChange={(value: any) => { handleObjectValue(setP, 'tab_id', value) }} />
          {filterCnt > 0 && <FilterApplied opt='UPDATE' filters={filters} sp={p} updateSP={(value: Object) => setP(value)} />}
          <CategoryButtons selectedCate={p.ct ?? []} updateSelectedCate={(groupValue: string[]) => { handleObjectValue(setP, 'ct', groupValue) }} />
          <Divider />
        </div>
        <div className={filterCnt > 0 ? 'bg-p-white mt-[120px]' : 'bg-p-white mt-[94px]'}>
          <FrequentSearches />
        </div>
      </div>
      <Filter open={open} closeFilter={() => setOpen(false)} p={p} updateP={(value: Object) => setP(value)} />
    </div>
  );
}