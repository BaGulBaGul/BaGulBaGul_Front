"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ThemeProvider, Backdrop, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { CategoryButtons, RangeProps, ViewFilterApplied, ViewSelect, Divider, SearchBar } from '@/components/common';
import { tabTheme } from '@/components/common/Themes';
import { getParams, useEffectFilter, useEffectFilterApplied } from '@/service/Functions';
import dayjs from 'dayjs';

const index = () => {
  const [tab, setTab] = useState(0);
  const handleTab = (event: React.MouseEvent<HTMLElement>, newTab: number | null) => {
    if (newTab !== null) { setTab(newTab); }
  };
  const [selectedCate, setSelectedCate] = useState<string[]>([]);

  // 정렬기준(default 최신순), 날짜, 참여인원, 규모
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
        <div className='fixed top-[66px] w-full bg-[#FFF] z-10'>
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
        <div className={filterCnt > 0 ? 'bg-[#FFF] mt-[120px]' : 'bg-[#FFF] mt-[94px]'}>
          <FrequentSearches />
          <RecentSearches />
        </div>
      </div>

      <Backdrop open={open} className='z-paper'>
        <ViewSelect sort={sort} setSort={setSort} setOpen={setOpen} dateRange={dayRange} setDateRange={setDayRange}
          participants={ptcp} setParticipants={setParticipants} headCount={headCount} setHeadCount={setHeadCount} />
      </Backdrop>
    </div>
  )
}
export default index;

function FrequentSearches() {
  const freqsearchlist = ['피크페스티벌', '서재페', '종강파티', '방학', '연희동', '와인파티', '볼빨간사춘기', '피크페스티벌', '서재페', '종강파티', '방학']
  return (
    <div className='flex flex-col py-[20px]'>
      <span className='px-[16px] text-[14px] leading-[160%]'>자주 찾는 검색어입니다</span>
      <div className='overflow-hidden	h-[30px]'>
        <div className='flex h-[60px] py-[8px] px-[16px] overflow-x-scroll overflow-y-hide whitespace-nowrap'>
          {freqsearchlist.map((item, idx) =>
            <button className='searchfreq-btn' key={`freq-${idx}`}>{item}</button>
          )}
        </div>
      </div>
    </div>
  )
}

interface RecentSearchProps { searchword: string; idx: number; }
function RecentSearches() {
  const searchlist = ['책과 와인파티', '페스티벌1', '페스티벌2', '페스티벌3', '페스티벌4']
  const SearchBlock = (props: RecentSearchProps) => {
    return (
      <div className='flex flex-row justify-between'>
        {
          props.idx === 0
            ? <>
              <div className='flex flex-row gap-[6px] items-center'>
                <img className='h-[20px] w-[20px]' src='/search_magnifying.svg' />
                <span className='text-[14px] text-gray3 leading-[160%] font-normal'>{props.searchword}</span>
              </div>
              <button><img src='/search_delete.svg' /></button>
            </>
            : <>
              <div className='flex flex-row gap-[6px] items-center'>
                <img className='h-[20px] w-[20px]' src='/search_magnifying_1.svg' />
                <span className='text-[14px] text-gray2 leading-[160%] font-normal'>{props.searchword}</span>
              </div>
              <button><img src='/search_delete_1.svg' /></button>
            </>
        }
      </div>
    )
  }

  return (
    <div className='flex flex-col px-[16px] py-[20px] gap-[16px]'>
      <div className='flex flex-row justify-between text-[12px] text-[#757575]'>
        <span>최근 검색어</span>
        <button className='text-[12px] leading-[160%] text-gray3'>전체삭제</button>
      </div>
      <div className='flex flex-col gap-[8px]'>
        {
          searchlist.map((item, idx) => (
            <SearchBlock searchword={item} idx={idx} key={`recent-${idx}`} />
          ))
        }
      </div>
      <div className='flex justify-center text-[12px] text-gray3 leading-[160%] font-normal'>검색어 더보기</div>
    </div>
  )
}