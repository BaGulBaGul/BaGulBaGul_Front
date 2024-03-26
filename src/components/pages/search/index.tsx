"use client";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { IconButton, TextField, ThemeProvider, Divider, Button, Backdrop, Paper, FormControl } from '@mui/material';
import { ViewButton, ViewSelect } from '@/components/common';
import { searchInputTheme, searchFreqTheme, deleteButtonTheme } from '@/components/common/Themes';
import { krLocale } from '@/components/common/CalendarLocale';
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import { DayRange, Calendar, Day } from '@hassanmojab/react-modern-calendar-datepicker'
import { useRouter } from 'next/navigation';
import { RangeProps, getParams, useEffectFilter, useEffectFilterApplied, useEffectParam } from '@/service/Functions';

const index = () => {
  // 정렬기준(default 최신순), 날짜, 참여인원, 규모
  const [sort, setSort] = useState('createdAt,desc');
  const [dayRange, setDayRange] = useState<DayRange>({ from: undefined, to: undefined });
  // * temporary name
  const [participants, setParticipants] = useState(0);
  const [headCount, setHeadCount] = useState<RangeProps>({ from: undefined, to: undefined });

  // 적용된 필터들, 적용된 필터 개수, 현재 변경된 필터
  const [filters, setFilters] = useState(['sort'])
  const [filterCnt, setFilterCnt] = useState(0)
  const [changed, setChanged] = useState<{ key: string, value: string | number | RangeProps | undefined }>({ key: '', value: undefined })

  const [open, setOpen] = useState(false);
  const handleClose = () => { setOpen(false) }

  useEffectFilter([sort, dayRange, participants, headCount], ['sort', 'dayRange', 'participants', 'headCount'], setChanged)
  useEffectFilterApplied([filters, sort], filters, setFilters, changed, sort, setFilterCnt)

  return (
    <div className='flex flex-col w-full h-screen bg-gray1'>
      <div className='bg-white'>
        <SearchBar setOpen={setOpen} filterCnt={filterCnt}
          params={{
            sort: sort, startDate: dayRange.from === null || dayRange.from === undefined
              ? '' : `${dayRange.from.year}-${String(dayRange.from.month).padStart(2, "0")}-${String(dayRange.from.day).padStart(2, "0")}T00:00:00`,
            endDate: dayRange.to === null || dayRange.to === undefined
              ? '' : `${dayRange.to.year}-${String(dayRange.to.month).padStart(2, "0")}-${String(dayRange.to.day).padStart(2, "0")}T23:59:59`,
            participants: participants > 0 ? participants : '',
            headCountMax: headCount.from === null || headCount.from === undefined || headCount.from <= 0 ? '' : headCount.from,
            headCountMin: headCount.to === null || headCount.to === undefined || headCount.to <= 0 ? '' : headCount.to,
          }} />
        <Divider />
        <div>
          <FrequentSearches />
          <RecentSearches />
          <Backdrop open={open} className='z-paper'>
            <ViewSelect sort={sort} setSort={setSort} handleClose={handleClose} dayRange={dayRange} setDayRange={setDayRange}
              participants={participants} setParticipants={setParticipants} headCount={headCount} setHeadCount={setHeadCount} />
          </Backdrop>
        </div>
      </div>
    </div>
  )
}
export default index;

function SearchBar(props: { setOpen: any; filterCnt: number; params: any; }) {
  const handleOpen = () => { props.setOpen(true) }

  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter()

  const [title, setTitle] = useState('')
  const handleSearch = (event: any) => {
    if (inputRef.current && inputRef.current.value !== '') {
      event.preventDefault();
      console.log('^^ SearchBar /search', inputRef.current.value);
      setTitle(encodeURIComponent(encodeURIComponent(inputRef.current.value)))
    }
  }

  useEffect(() => {
    if (title.length > 0) {
      router.push(`/searched?query=${title}&${getParams(props.params)}&tab_id=0`)
    }
  }, [title])

  return (
    <div className='flex flex-row mx-[16px] my-[18px] gap-[16px] items-center'>
      <IconButton disableRipple className='p-0'><img src='/search_back.svg' /></IconButton>
      <div className='flex flex-row w-full justify-between'>
        <div className='flex flex-row bg-gray1 px-[8px] py-[4px] gap-[8px] w-full max-w-[268px]'>
          <ThemeProvider theme={searchInputTheme}><TextField placeholder="피크페스티벌" inputRef={inputRef} required /></ThemeProvider>
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