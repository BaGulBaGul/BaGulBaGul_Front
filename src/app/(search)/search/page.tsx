"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ThemeProvider, Backdrop, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { CategoryButtons, RangeProps, ViewFilterApplied, ViewSelect, Divider } from '@/components/common';
import { tabTheme } from '@/components/common/styles/Themes';
import { getParams, useEffectFilter, useEffectFilterApplied } from '@/service/Functions';
import dayjs from 'dayjs';
import { SearchBar, FrequentSearches } from '@/components/pages/search';

export default function Page() {
  const [tab, setTab] = useState(0);
  const handleTab = (event: React.MouseEvent<HTMLElement>, newTab: number | null) => {
    if (newTab !== null) { setTab(newTab); }
  };

  // 정렬기준(default 최신순), 날짜, 참여인원, 규모
  const [selectedCate, setSelectedCate] = useState<string[]>([]);
  const [sort, setSort] = useState('createdAt,desc');
  const [dayRange, setDayRange] = useState<[any, any]>([null, null]);
  // * temporary name
  const [ptcp, setParticipants] = useState(0);
  const [headCount, setHeadCount] = useState<RangeProps>({ from: undefined, to: undefined });

  // 적용된 필터들, 적용된 필터 개수, 현재 변경된 필터
  const [filters, setFilters] = useState(['sort'])
  const [filterCnt, setFilterCnt] = useState(0)
  const [changed, setChanged] = useState<{ key: string, value: string | number | RangeProps | undefined }>({ key: '', value: undefined })

  const [open, setOpen] = useState(false);
  // const handleClose = () => { setOpen(false) }

  useEffectFilter([sort, dayRange, ptcp, headCount], ['sort', 'dayRange', 'ptcp', 'headCount'], setChanged)
  useEffectFilterApplied([filters, sort], filters, setFilters, changed, sort, setFilterCnt)

  const [startDate, endDate] = dayRange ?? [null, null];

  // Searchbar
  const router = useRouter()
  const [title, setTitle] = useState('')
  const params = {
    ct: selectedCate.length > 0 ? selectedCate : '', sort: sort,
    sD: startDate !== null ? dayjs(startDate).format('YYYYMMDD') : '',
    eD: endDate !== null ? dayjs(endDate).format('YYYYMMDD') : '', ptcp: ptcp > 0 ? ptcp : '',
    hcMin: headCount.from === null || headCount.from === undefined || headCount.from <= 0 ? '' : headCount.from,
    hcMax: headCount.to === null || headCount.to === undefined || headCount.to <= 0 ? '' : headCount.to,
  }
  useEffect(() => {
    if (title.length > 0) { router.push(`/searched?query=${title}&${getParams(params)}&tab_id=${tab}`) }
  }, [title])

  return (
    <div className='flex flex-col w-full h-screen'>
      <SearchBar opt={0} title={title} setOpen={setOpen} filterCnt={filterCnt} setTitle={setTitle} router={router} />
      <div className='w-full p-0 pt-[66px]'>
        <div className='fixed top-[66px] w-full bg-p-white z-10'>
          <ViewFilterApplied filterCnt={filterCnt} filters={filters} setFilters={setFilters}
            sort={sort} dateRange={dayRange} setDateRange={setDayRange} participants={ptcp}
            setParticipants={setParticipants} headCount={headCount} setHeadCount={setHeadCount} />
          <ThemeProvider theme={tabTheme}>
            <ToggleButtonGroup value={tab} exclusive onChange={handleTab} >
              <ToggleButton value={0}>페스티벌</ToggleButton>
              <ToggleButton value={1}>지역행사</ToggleButton>
              <ToggleButton value={2}>파티</ToggleButton>
            </ToggleButtonGroup>
          </ThemeProvider>
          <CategoryButtons selectedCate={selectedCate} setSelectedCate={setSelectedCate} />
          <Divider />
        </div>
        <div className={filterCnt > 0 ? 'bg-p-white mt-[120px]' : 'bg-p-white mt-[94px]'}>
          <FrequentSearches />
        </div>
      </div>

      <Backdrop open={open} className='z-paper'>
        <ViewSelect sort={sort} setSort={setSort} setOpen={setOpen} dateRange={dayRange} setDateRange={setDayRange}
          participants={ptcp} setParticipants={setParticipants} headCount={headCount} setHeadCount={setHeadCount} />
      </Backdrop>
    </div>
  );
}