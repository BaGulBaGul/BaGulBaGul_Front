"use client";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
import { createSearchParams } from 'react-router-dom'
import { IconButton, TextField, ThemeProvider, Divider, Button, Backdrop, Paper, FormControl, Box, Checkbox } from '@mui/material';
import { searchInputTheme, searchFreqTheme, deleteButtonTheme } from '@/components/common/Themes';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { DayRange } from '@hassanmojab/react-modern-calendar-datepicker'
import { postData, valueList } from '@/components/common/Data';
import { FormatDateRange, PostTabsProps, RangeProps, useEffectCallAPI, useEffectFilter, useEffectFilterApplied, useEffectParam } from '@/service/Functions';
import { MoreButton, NoEvent, PostTab, SuggestBlock, TabPanel, ViewButton, ViewSelect } from '@/components/common';
import { PostProps } from '@/components/common/EventBlock';

const index = () => {
  const searchParams = useSearchParams()
  const search = decodeURIComponent(decodeURIComponent(searchParams.get('query') ?? ''))

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
  const [open, setOpen] = useState(false);
  // 적용된 필터들, 적용된 필터 개수, 현재 변경된 필터
  const [filters, setFilters] = useState(['sort'])
  const [filterCnt, setFilterCnt] = useState(0)
  const [changed, setChanged] = useState<{ key: string, value: string | number | RangeProps | undefined }>({ key: '', value: undefined })

  useEffectParam([sort, value, dayRange], initialSet, setParams, params, value, [], sort, dayRange, participants, headCount, setEvents)

  // 적용된 필터 확인
  useEffectFilter([sort, dayRange, participants, headCount], ['sort', 'dayRange', 'participants', 'headCount'], setChanged)
  useEffectFilterApplied([filters, sort], filters, setFilters, changed, sort, setFilterCnt)

  // 조건에 따라 리스트 호출
  useEffectCallAPI(params, initialSet, setPage, events, setEvents)

  return (
    <div className='flex flex-col w-full pb-[10px] h-screen bg-gray1-text'>
      <div className='fixed top-0 bg-white-text z-paper'>
        <SearchBar title={search ?? ''} setOpen={setOpen} />
      </div>
      <div className='pt-[66px]'>
        <ResultTabs events={events} value={value} handleChange={handleChange} filterCnt={filterCnt} filters={filters}
          setFilters={setFilters} sort={sort} setSort={setSort} dayRange={dayRange} setDayRange={setDayRange}
          participants={participants} setParticipants={setParticipants} headCount={headCount} setHeadCount={setHeadCount}
          page={page} setPageInfo={setPageInfo} selectedCate={[]} setSelectedCate={setSelectedCate} open={open} setOpen={setOpen} />
      </div>
    </div>
  )
}
export default index;

function SearchBar(props: { title: string; setOpen: any; }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter()
  const handleSearch = (event: any) => {
    console.log(inputRef.current ? inputRef.current.value : '()()()()()(')
    if (inputRef.current) {
      event.preventDefault();
      router.push(`/searched?query=${encodeURIComponent(encodeURIComponent(inputRef.current.value))}`)
    }
  }
  const handleOpen = () => { props.setOpen(true) }

  return (
    <div className='flex flex-row mx-[16px] my-[18px] gap-[16px]'>
      <div>
        <IconButton disableRipple className='p-0'><img src='/search_back.svg' /></IconButton>
      </div>
      <div className='flex flex-row w-full gap-[25px] justify-between'>
        <div className='flex flex-row bg-gray1-text px-[8px] py-[4px] gap-[8px]'>
          <ThemeProvider theme={searchInputTheme}><TextField defaultValue={props.title} inputRef={inputRef} required /></ThemeProvider>
          <IconButton onClick={handleSearch} disableRipple className='p-0' ><img src='/search_magnifying.svg' /></IconButton>
        </div>
        <ViewButton handleOpen={handleOpen} cnt={3} fs={14} />
      </div>
    </div>
  )
}

export function ResultTabs(props: PostTabsProps) {
  const handleClose = () => { props.setOpen(false) }

  return (
    <Box className='w-full p-0'>
      <Box className='sticky top-[66px] bg-[#FFF] relative z-10 px-[16px] pt-[20px] pb-[10px]'>
        <div className='flex justify-between items-center'>
          <PostTab value={props.value} handleChange={props.handleChange} />
        </div>
      </Box>
      <Backdrop open={props.open ?? false} className='z-paper'>
        <ViewSelect sort={props.sort} setSort={props.setSort} handleClose={handleClose} dayRange={props.dayRange} setDayRange={props.setDayRange}
          participants={props.participants} setParticipants={props.setParticipants} headCount={props.headCount} setHeadCount={props.setHeadCount} />
      </Backdrop>
      <TabPanel value={props.value} index={0}>
        <TabBlock opt={0} selectedCate={props.selectedCate} setSelectedCate={props.setSelectedCate} events={props.events} page={props.page} setPageInfo={props.setPageInfo} />
      </TabPanel>
      <TabPanel value={props.value} index={1}>
        <TabBlock opt={0} selectedCate={props.selectedCate} setSelectedCate={props.setSelectedCate} events={props.events} page={props.page} setPageInfo={props.setPageInfo} />
      </TabPanel>
      <TabPanel value={props.value} index={2}>
        <TabBlock opt={1} selectedCate={props.selectedCate} setSelectedCate={props.setSelectedCate} events={props.events} page={props.page} setPageInfo={props.setPageInfo} />
      </TabPanel>
    </Box>
  )
}

interface TabBlockProps {
  opt: number; selectedCate: string[]; setSelectedCate: Dispatch<SetStateAction<string[]>>;
  events: never[]; page: { current: number; total: number; }; setPageInfo: any;
}
const TabBlock = (props: TabBlockProps) => {
  const handleMore = () => { props.setPageInfo(props.page.current + 1) }
  return (
    <div>
      {
        props.events.length > 5
          ? <div className='bg-white-text'>
            {//postData.map((post, idx) => (
              props.events.map((post, idx) => (
                <div key={`searched-${idx}`}>
                  {idx === 0 ? <></> : <Divider />}
                  <ResultBlock data={post} />
                </div>
              ))}
            {
              props.page.total > 1 && props.page.current + 1 < props.page.total
                ? <MoreButton onClick={handleMore} />
                : <></>
            }
          </div>
          : props.events.length > 0
            ? <div className='flex flex-col gap-[1px] bg-white-text'>
              <div>
                {/* {postData.map((post, idx) => ( */}
                {props.events.map((post, idx) => (
                  <div key={`searched-${idx}`}>
                    {idx === 0 ? <></> : <Divider />}
                    <ResultBlock data={post} />
                  </div>
                ))}
              </div>
              <SuggestBlock type={1} />
            </div>
            : <div className='flex flex-col'>
              <SuggestBlock type={0} />
              <NoEvent text1="찾는 검색결과가 없어요." text2="지금 인기 있는 페스티벌을 만나보세요." buttonText={"페스티벌 인기순 보러가기"} />
            </div>
      }
    </div>
  )
}

export function ResultBlock(props: { data: PostProps }) {
  const [checked, setChecked] = useState(true);
  const handleChange = (event: any) => { setChecked(!checked); };

  return (
    <div>
      <div className='flex flex-col py-[18px] px-[16px]'>
        <div className='flex flex-col justify-between'>
          <div className='flex flex-row items-center pb-[10px] gap-[20px]'>
            <img className='rounded-lg w-[84px] h-[104px] object-cover' src={props.data.headImageUrl ?? '/default_list_thumb3x.png'} />
            <div className='flex flex-col w-[278px] h-[104px] gap-[20px] justify-between'>
              <div className='flex flex-col'>
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row text-[14px] text-gray3-text">
                    <p>{FormatDateRange(props.data.startDate, props.data.endDate)}</p>
                    <p>, {props.data.abstractLocation}</p>
                  </div>
                  <Checkbox icon={<img src="/detail_like.svg" width={20} height={20} />}
                    checkedIcon={<img src="/detail_like_1.svg" width={20} height={20} />}
                    checked={checked} onChange={handleChange} style={{ padding: 0 }} />
                </div>
                <p className='truncate text-base font-semibold'>{props.data.title}</p>
              </div>
              <span className='text-[12px] text-gray3-text block description max-w-[278px]'>{props.data.content}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}