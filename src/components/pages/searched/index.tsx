"use client";
import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
import { createSearchParams } from 'react-router-dom'
import { IconButton, TextField, ThemeProvider, Divider, Button, Backdrop, Paper, FormControl } from '@mui/material';
import { ViewButton, ViewSelect } from '@/components/common/ViewFilter';
import { searchInputTheme, searchFreqTheme, deleteButtonTheme } from '@/components/common/Themes';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { DayRange } from 'react-modern-calendar-datepicker'
import { valueList } from '@/components/common/Data';
import { RangeProps, useEffectCallAPI, useEffectFilter, useEffectFilterApplied, useEffectParam } from '@/service/Functions';
import { call } from '@/service/ApiService';
import { PostTabs } from '../main';

const index = () => {
  const searchParams = useSearchParams()
  const search = searchParams.get('query')

  //type
  const [value, setValue] = useState(0);
  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // * PostTab 수정 후 지우기
  const [selectedCate, setSelectedCate] = useState<string[]>([]);
  // 정렬기준(default 최신순), 날짜, 참여인원, 규모
  const [sort, setSort] = useState('createdAt,desc');
  const [dayRange, setDayRange] = useState<DayRange>({ from: undefined, to: undefined });
  // * temporary name
  const [participants, setParticipants] = useState(0);
  const [headCount, setHeadCount] = useState<RangeProps>({ from: undefined, to: undefined });

  // api 호출용 파라미터
  const [params, setParams] = useState({ title: search, page: 0, type: valueList[value], sort: sort, startDate: '', endDate: '' });
  const [events, setEvents] = useState([]);

  // const loading = useRef<boolean>(false);
  const [page, setPage] = useState({ current: 0, total: 0, });
  function setPageInfo(currentPage: number) {
    setPage({ ...page, current: currentPage });
    setParams({ ...params, page: currentPage })
  }

  const initialSet = useRef(false);
  const mounted = useRef(false);
  // 적용된 필터들, 적용된 필터 개수, 현재 변경된 필터
  const [filters, setFilters] = useState(['sort'])
  const [filterCnt, setFilterCnt] = useState(0)
  const [changed, setChanged] = useState<{ key: string, value: string | number | { from: undefined | number, to: undefined | number } | undefined }>({ key: '', value: undefined })

  useEffectParam([sort, value, dayRange], initialSet, setParams, params, value, [], sort, dayRange, setEvents)

  // 적용된 필터 확인
  useEffectFilter([sort, dayRange, participants, headCount], ['sort', 'dayRange', 'participants', 'headCount'], setChanged)
  useEffectFilterApplied([filters, sort], filters, setFilters, changed, sort, setFilterCnt)

  // 조건에 따라 리스트 호출
  useEffectCallAPI(params, initialSet, setPage, events, setEvents)

  return (
    <div className='flex flex-col w-full pb-[10px]'>
      <div className='sticky top-0'>
        <SearchBar title={search ?? ''} />
        <Divider />
      </div>
      <PostTabs events={events} value={value} handleChange={handleChange} filterCnt={filterCnt} filters={filters}
        setFilters={setFilters} sort={sort} setSort={setSort} dayRange={dayRange} setDayRange={setDayRange}
        participants={participants} setParticipants={setParticipants} headCount={headCount} setHeadCount={setHeadCount}
        page={page} setPageInfo={setPageInfo} selectedCate={[]} setSelectedCate={setSelectedCate} />
    </div>
  )
}
export default index;

function SearchBar(props: { title: string; }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter()
  const handleSearch = () => {
    console.log(inputRef.current ? inputRef.current.value : '()()()()()(')
    if (inputRef.current) {
      router.push(`/searched?query=${inputRef.current.value}`)
    }
  }

  return (
    <div className='flex flex-row mx-[16px] my-[18px] gap-[16px]'>
      <div>
        <IconButton disableRipple className='p-0'><img src='/search_back.svg' /></IconButton>
      </div>
      <div className='flex flex-row w-full justify-between'>
        <div className='flex flex-row w-[268px] bg-gray1-text px-[8px] py-[4px] gap-[8px]'>
          <ThemeProvider theme={searchInputTheme}><TextField defaultValue={props.title} inputRef={inputRef} required /></ThemeProvider>
          <IconButton onClick={handleSearch} disableRipple className='p-0' ><img src='/search_magnifying.svg' /></IconButton>
        </div>
        {/* <ViewButton handleOpen={props.handleOpen} cnt={3} fs={14} /> */}
      </div>
    </div>
  )
}