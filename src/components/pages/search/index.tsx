"use client";
import { useEffect, useRef, useState } from 'react';
import { IconButton, TextField, ThemeProvider, Divider, Button, Backdrop, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { CategoryButtons, RangeProps, ViewButton, ViewFilterApplied, ViewSelect } from '@/components/common';
import { searchInputTheme, searchFreqTheme, deleteButtonTheme, tabTheme } from '@/components/common/Themes';
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import { DayRange } from '@hassanmojab/react-modern-calendar-datepicker'
import { useRouter } from 'next/navigation';
import { getParams, useEffectFilter, useEffectFilterApplied } from '@/service/Functions';

const index = () => {
  const [tab, setTab] = useState(0);
  const handleTab = (event: React.MouseEvent<HTMLElement>, newTab: number | null) => {
    if (newTab !== null) { setTab(newTab); }
  };
  const [selectedCate, setSelectedCate] = useState<string[]>([]);

  // 정렬기준(default 최신순), 날짜, 참여인원, 규모
  const [sort, setSort] = useState('createdAt,desc');
  const [dayRange, setDayRange] = useState<DayRange>({ from: undefined, to: undefined });
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

  return (
    <div className='flex flex-col w-full h-screen bg-gray1'>
      <div className='bg-[#FFF]'>
        <SearchBar setOpen={setOpen} filterCnt={filterCnt}
          params={{
            ct: selectedCate.length > 0 ? selectedCate : '',
            sort: sort, sD: dayRange.from === null || dayRange.from === undefined
              ? '' : `${dayRange.from.year}${String(dayRange.from.month).padStart(2, "0")}${String(dayRange.from.day).padStart(2, "0")}`,
            eD: dayRange.to === null || dayRange.to === undefined
              ? '' : `${dayRange.to.year}${String(dayRange.to.month).padStart(2, "0")}${String(dayRange.to.day).padStart(2, "0")}`,
            ptcp: ptcp > 0 ? ptcp : '',
            hcMin: headCount.from === null || headCount.from === undefined || headCount.from <= 0 ? '' : headCount.from,
            hcMax: headCount.to === null || headCount.to === undefined || headCount.to <= 0 ? '' : headCount.to,
          }} tab={tab} />
        <div className='bg-[#FFF] relative z-10'>
          <ViewFilterApplied filterCnt={filterCnt} filters={filters} setFilters={setFilters}
            sort={sort} dayRange={dayRange} setDayRange={setDayRange} participants={ptcp}
            setParticipants={setParticipants} headCount={headCount} setHeadCount={setHeadCount} />
        </div>
        <ThemeProvider theme={tabTheme}>
          <ToggleButtonGroup value={tab} exclusive onChange={handleTab} >
            <ToggleButton value={0}>페스티벌</ToggleButton>
            <ToggleButton value={1}>지역행사</ToggleButton>
            <ToggleButton value={2}>파티</ToggleButton>
          </ToggleButtonGroup>
        </ThemeProvider>
        <CategoryButtons selectedCate={selectedCate} setSelectedCate={setSelectedCate} />
        <Divider />
        <div>
          <FrequentSearches />
          <RecentSearches />
          <Backdrop open={open} className='z-paper'>
            <ViewSelect sort={sort} setSort={setSort} setOpen={setOpen} dayRange={dayRange} setDayRange={setDayRange}
              participants={ptcp} setParticipants={setParticipants} headCount={headCount} setHeadCount={setHeadCount} />
          </Backdrop>
        </div>
      </div>
    </div>
  )
}
export default index;

function SearchBar(props: { setOpen: any; filterCnt: number; params: any; tab: number; }) {
  const handleOpen = () => { props.setOpen(true) }

  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter()

  const [title, setTitle] = useState('')
  const handleSearch = (event: any) => {
    if ((event.type === 'keydown' && event.key === 'Enter') || event.type === 'click') {
      if (inputRef.current && inputRef.current.value !== '') {
        event.preventDefault();
        console.log('^^ SearchBar /search', inputRef.current.value);
        setTitle(encodeURIComponent(encodeURIComponent(inputRef.current.value)))
      }
    }
  }

  useEffect(() => {
    if (title.length > 0) { router.push(`/searched?query=${title}&${getParams(props.params)}&tab_id=${props.tab}`) }
  }, [title])

  return (
    <div className='flex flex-row mx-[16px] my-[18px] gap-[16px] items-center'>
      <IconButton disableRipple className='p-0'><img src='/search_back.svg' /></IconButton>
      <div className='flex flex-row w-full justify-between'>
        <div className='flex flex-row bg-gray1 px-[8px] py-[4px] gap-[8px] w-full max-w-[268px]'>
          <ThemeProvider theme={searchInputTheme}><TextField placeholder="피크페스티벌" inputRef={inputRef} onKeyDown={handleSearch} required /></ThemeProvider>
          <IconButton onClick={handleSearch} disableRipple className='p-0' ><img src='/search_magnifying.svg' /></IconButton>
        </div>
        <ViewButton handleOpen={handleOpen} cnt={props.filterCnt} fs={14} />
      </div>
    </div>
  )
}

function FrequentSearches() {
  const freqsearchlist = ['피크페스티벌', '서재페', '종강파티', '방학', '연희동', '와인파티', '볼빨간사춘기', '피크페스티벌', '서재페', '종강파티', '방학']
  return (
    <div className='flex flex-col my-[20px]'>
      <span className='mx-[16px] text-[14px] leading-[160%]'>자주 찾는 검색어입니다</span>
      <div className='overflow-hidden	h-[30px]'>
        <div className='flex h-[60px] py-[8px] px-[16px] overflow-x-scroll overflow-y-hide whitespace-nowrap'>
          {freqsearchlist.map((item, idx) =>
            <ThemeProvider theme={searchFreqTheme}>
              <Button disableRipple value={item} key={`freq-${idx}`}>{item}</Button>
            </ThemeProvider>
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
              <IconButton className='p-0'><img src='/search_delete.svg' /></IconButton>
            </>
            : <>
              <div className='flex flex-row gap-[6px] items-center'>
                <img className='h-[20px] w-[20px]' src='/search_magnifying_1.svg' />
                <span className='text-[14px] text-gray2 leading-[160%] font-normal'>{props.searchword}</span>
              </div>
              <IconButton className='p-0'><img src='/search_delete_1.svg' /></IconButton>
            </>
        }
      </div>
    )
  }

  return (
    <div className='flex flex-col mx-[16px] my-[20px] gap-[16px]'>
      <div className='flex flex-row justify-between text-[12px] text-[#757575]'>
        <span>최근 검색어</span>
        <ThemeProvider theme={deleteButtonTheme}><Button>전체삭제</Button></ThemeProvider>
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