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
import { useEffectFilter } from '@/service/Functions';
import { call } from '@/service/ApiService';
import { PostTab } from '../main';

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
  // 정렬기준, default는 최신순
  const [sort, setSort] = useState('createdAt,desc');
  const [dayRange, setDayRange] = useState<DayRange>({ from: undefined, to: undefined });
  // * temporary name - 참여인원 / 규모
  const [participants, setParticipants] = useState(0);
  const [headCount, setHeadCount] = useState<{ from: undefined | number, to: undefined | number }>({ from: undefined, to: undefined });

  // api 호출용 파라미터
  const [params, setParams] = useState({
    page: 0, type: valueList[value],
    sort: sort, startDate: '', endDate: ''
  });

  const [events, setEvents] = useState([]);
  function setEventList(currentEvents: []) {
    // setEvents(prevState => [...prevState, ...currentEvents])
    const newEvents = events.concat(currentEvents)
    const newEventsSet = new Set(newEvents)
    const newEventsList = Array.from(newEventsSet);
    setEvents(newEventsList);
  }

  // const loading = useRef<boolean>(false);
  const [page, setPage] = useState({ current: 0, total: 0, });
  function setPageInfo(currentPage: number) {
    setPage({ ...page, current: currentPage });
    setParams({ ...params, page: currentPage })
  }

  const initialSet = useRef(false);
  const mounted = useRef(false);
  useEffect(() => {
    initialSet.current = false;
    setParams({
      ...params,
      page: 0, type: valueList[value], sort: sort,
      startDate: dayRange.from === null || dayRange.from === undefined
        ? '' : `${dayRange.from.year}-${String(dayRange.from.month).padStart(2, "0")}-${String(dayRange.from.day).padStart(2, "0")}T00:00:00`,
      endDate: dayRange.to === null || dayRange.to === undefined
        ? '' : `${dayRange.to.year}-${String(dayRange.to.month).padStart(2, "0")}-${String(dayRange.to.day).padStart(2, "0")}T23:59:59`
    })
    setEvents([]);
  }, [sort, value, dayRange])

  // 적용된 필터 확인
  const [filters, setFilters] = useState(['sort'])
  const [filterCnt, setFilterCnt] = useState(0)
  const [changed, setChanged] = useState<{ key: string, value: string | number | { from: undefined | number, to: undefined | number } | undefined }>({ key: '', value: undefined })

  useEffectFilter([sort, dayRange, participants, headCount], ['sort', 'dayRange', 'participants', 'headCount'], setChanged)

  useEffect(() => {
    if (!filters.includes(changed.key)) { // filters에 key가 존재하지 않고 값이 유효 -> filters에 key 추가
      if ((changed.value !== undefined) && JSON.stringify(changed.value) !== JSON.stringify({ from: undefined, to: undefined })) {
        setFilters(filters.concat(changed.key))
      }
    } else { // filters에 key가 존재하고 값이 유효하지 X -> filters에서 key 제외
      if ((changed.value === undefined) || JSON.stringify(changed.value) === JSON.stringify({ from: undefined, to: undefined })) {
        setFilters(filters.filter((f) => f !== changed.key))
      }
    }
  }, [changed])
  // 필터 개수 판단
  useEffect(() => {
    if (filters.length === 1 && sort === 'createdAt,desc') {
      setFilterCnt(0)
    } else if (filters.length > 0) {
      setFilterCnt(filters.length)
    }
  }, [filters, sort])

  // 조건에 따라 리스트 호출
  function getParams(params: any) {
    let sparams = createSearchParams(params);
    let target: any[] = [];
    sparams.forEach((val, key) => { if (val === '') { target.push(key); } })
    target.forEach(key => { sparams.delete(key); })
    return sparams.toString();
  }

  useEffect(() => {
    let apiURL = Object.keys(params).length !== 0 ? `/api/event?size=5&title=${search}&${getParams(params)}` : '/api/event?size=5'
    console.log('** ', apiURL)
    call(apiURL, "GET", null)
      .then((response) => {
        console.log(response.data);
        if (response.data.empty === false) {
          // 페이지값 초기설정
          if (!initialSet.current) {
            setPage({ current: 0, total: response.data.totalPages })
            initialSet.current = true;
          }
          setEventList(response.data.content)
        }
      })
  }, [params])

  // const [open, setOpen] = useState(false);
  // const handleOpen = () => { setOpen(true) }
  // const handleClose = () => { setOpen(false) }

  return (
    <div className='flex flex-col w-full pb-[10px]'>
      <div className='sticky top-0'>
        <SearchBar title={search ?? ''} />
        <Divider />
      </div>
      <PostTab events={events} value={value} handleChange={handleChange} filterCnt={filterCnt} filters={filters}
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