"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { FormatDateRange, getParams, headCountString, useEffectFilterApplied } from '@/service/Functions';
import { Divider, TypeTabs } from '@/components/common';
import { DialogFilter, FilterApplied, closeFilter, FilterSortRadio, handleObjectValue, FilterCalendar, FilterButton } from '@/components/common/filter';
import { CategoryButtons, InputCollapse, InputNumber, InputNumberRange } from '@/components/common/input';
import { SearchBar, FrequentSearches } from '@/components/pages/search';

export default function Page() {
  const [tab, setTab] = useState(0);
  const handleTab = (value: any, e: Event | undefined) => { setTab(value); }

  const [selectedCate, setSelectedCate] = useState<string[]>([]);
  const [p, setP] = useState({
    sort: 'createdAt,desc',
    dateRange: [undefined, undefined], participants: 0,
    headCount: { from: undefined, to: undefined },
  })

  // 적용된 필터들, 적용된 필터 개수
  const [filters, setFilters] = useState(['sort'])
  const [filterCnt, setFilterCnt] = useState(0)
  useEffectFilterApplied(p, setFilters, setFilterCnt)

  const [open, setOpen] = useState(false);
  const [startDate, endDate] = p.dateRange ?? [null, null];
  // Searchbar
  const router = useRouter()
  const [title, setTitle] = useState('')
  const params = {
    ct: selectedCate.length > 0 ? selectedCate : '', sort: p.sort,
    sD: !!startDate ? dayjs(startDate).format('YYYYMMDD') : '',
    eD: !!endDate ? dayjs(endDate).format('YYYYMMDD') : '', ptcp: p.participants > 0 ? p.participants : '',
    hcMin: !!p.headCount.from ? p.headCount.from : '',
    hcMax: !!p.headCount.to ? p.headCount.to : '',
  }

  useEffect(() => {
    if (title.length > 0) { router.push(`/searched?query=${title}&${getParams(params)}&tab_id=${tab}`) }
  }, [title])

  return (
    <div className='flex flex-col w-full h-screen'>
      <SearchBar title={title} isSearched={false} updateTitle={(t: string) => setTitle(t)} handleBack={() => router.back()} >
        <FilterButton handleOpen={() => { setOpen(true) }} cnt={filterCnt} />
        <DialogFilter isOpen={open} handleClose={() => { closeFilter(setOpen) }} >
          <FilterSortRadio value={p.sort} handleChange={(newSort: string) => { handleObjectValue(setP, 'sort', newSort) }} />
          <InputCollapse title={'날짜선택'} type='CAL' value={!startDate ? '' : FormatDateRange(startDate, endDate)}>
            <FilterCalendar startDate={startDate} endDate={endDate} onChange={(dates: [any, any]) => { setP((prev: any) => ({ ...prev, dateRange: dates })) }} />
          </InputCollapse>
          <InputCollapse title={'참여인원'} type="NUM" value={p.participants} >
            <InputNumber value={p.participants} onChange={(newValue) => handleObjectValue(setP, 'participants', newValue)} />
          </InputCollapse>
          <InputCollapse title={'규모설정'} type="NUM" value={!!p.headCount.from || !!p.headCount.to ? headCountString(p.headCount.from, p.headCount.to) : 0}>
            <div className='flex flex-col gap-[8px]'>
              <InputNumberRange
                minNumber={{ value: p.headCount.from, onChange: (newValue: any) => { handleObjectValue(setP, 'headCount', { from: newValue ?? undefined, to: p.headCount.to }) } }}
                maxNumber={{ value: p.headCount.to, min: p.headCount.from, onChange: (newValue: any) => { handleObjectValue(setP, 'headCount', { from: p.headCount.from, to: newValue ?? undefined }) } }} />
              <div className='self-end text-12 text-gray3'>*최대인원 제한 없을 경우 '0'명으로 표기</div>
            </div>
          </InputCollapse>
        </DialogFilter>
      </SearchBar>
      <div className='w-full p-0 pt-[66px]'>
        <div className='fixed top-[66px] w-full bg-p-white z-10'>
          <TypeTabs val={tab} handleChange={handleTab} />
          <FilterApplied filterCnt={filterCnt} filters={filters} opt="REDIRECT" p={p} setP={setP} setFilters={setFilters} />
          <CategoryButtons selectedCate={selectedCate} updateSelectedCate={(groupValue: string[]) => { setSelectedCate(groupValue) }} />
          <Divider />
        </div>
        <div className={filterCnt > 0 ? 'bg-p-white mt-[120px]' : 'bg-p-white mt-[94px]'}>
          <FrequentSearches />
        </div>
      </div>
    </div>
  );
}