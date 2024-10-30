"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ThemeProvider, Backdrop, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { CategoryButtons, ViewFilterApplied, ViewSelect, Divider } from '@/components/common';
import { tabTheme } from '@/components/common/styles/Themes';
import { getParams, useEffectFilterApplied } from '@/service/Functions';
import dayjs from 'dayjs';
import { SearchBar, FrequentSearches } from '@/components/pages/search';

export default function Page() {
  const [tab, setTab] = useState(0);
  const handleTab = (e: React.MouseEvent<HTMLElement>, newTab: number | null) => {
    if (newTab !== null) { setTab(newTab); }
  };

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
  console.log('sd, ed: ', startDate, endDate)
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
      <SearchBar opt={0} title={title} setOpen={setOpen} filterCnt={filterCnt} setTitle={setTitle} router={router} />
      <div className='w-full p-0 pt-[66px]'>
        <div className='fixed top-[66px] w-full bg-p-white z-10'>
          <ViewFilterApplied filterCnt={filterCnt} filters={filters} p={p} setP={setP} setFilters={setFilters} />
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
        <ViewSelect p={p} setP={setP} setOpen={setOpen} />
      </Backdrop>
    </div>
  );
}