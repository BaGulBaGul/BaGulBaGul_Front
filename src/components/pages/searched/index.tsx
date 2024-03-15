"use client";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
import { IconButton, TextField, ThemeProvider, Divider } from '@mui/material';
import { searchInputTheme } from '@/components/common/Themes';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { tabList } from '@/components/common/Data';
import { useEffectCallAPI } from '@/service/Functions';
import { MoreButton, NoEvent, ResultBlock, SuggestBlock, TabPanel, ViewButton } from '@/components/common';

const index = () => {
  const searchParams = useSearchParams()

  // api 호출용 파라미터
  const [params, setParams] = useState({
    title: decodeURIComponent(decodeURIComponent(searchParams.get('query') ?? '')), page: 0,
    type: tabList[Number(searchParams.get('tab_id')) ?? 0], sort: searchParams.get('sort') ?? 'createdAt,desc',
    startDate: searchParams.get('startDate') ?? '', endDate: searchParams.get('endDate') ?? '',
  });

  useEffect(() => {
    console.log("@#!@#!@#!@")
    setEvents([])
    setParams({
      title: decodeURIComponent(decodeURIComponent(searchParams.get('query') ?? '')), page: 0,
      type: tabList[Number(searchParams.get('tab_id')) ?? 0], sort: searchParams.get('sort') ?? 'createdAt,desc',
      startDate: searchParams.get('startDate') ?? '', endDate: searchParams.get('endDate') ?? ''
    })
  }, [searchParams])

  const [events, setEvents] = useState([]);

  // const loading = useRef<boolean>(false);
  const [page, setPage] = useState({ current: 0, total: 0, });
  function setPageInfo(currentPage: number) {
    setPage({ ...page, current: currentPage });
    setParams({ ...params, page: currentPage })
  }

  const initialSet = useRef(false);
  const mounted = useRef(false);

  // 조건에 따라 리스트 호출
  useEffectCallAPI(params, initialSet, setPage, events, setEvents)

  return (
    <ResultTabs events={events} tab={Number(searchParams.get('tab_id')) ?? 0} page={page} setPageInfo={setPageInfo} />
  )
}
export default index;

export function SearchBar(props: { title: string; setOpen: any; filterCnt: number; setTitle: any; }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter()
  const handleSearch = (event: any) => {
    console.log(inputRef.current ? inputRef.current.value : '()()()()()(')
    if (inputRef.current && inputRef.current.value !== '') {
      event.preventDefault();
      props.setTitle(encodeURIComponent(encodeURIComponent(inputRef.current.value)))
    }
  }
  const handleOpen = () => { props.setOpen(true) }

  return (
    <div className='flex flex-row mx-[16px] my-[18px] gap-[16px] items-center'>
      <IconButton disableRipple className='p-0'><img src='/search_back.svg' /></IconButton>
      <div className='flex flex-row w-full justify-between'>
        <div className='flex flex-row bg-gray1 px-[8px] py-[4px] gap-[8px] w-full max-w-[268px]'>
          <ThemeProvider theme={searchInputTheme}><TextField defaultValue={props.title} inputRef={inputRef} required /></ThemeProvider>
          <IconButton onClick={handleSearch} disableRipple className='p-0' ><img src='/search_magnifying.svg' /></IconButton>
        </div>
        <ViewButton handleOpen={handleOpen} cnt={props.filterCnt} fs={14} />
      </div>
    </div>
  )
}

export function ResultTabs(props: { events: any[]; tab: number; page: { current: number; total: number; }; setPageInfo: any; }) {
  return (
    <>
      <TabPanel value={props.tab} index={0}>
        <TabBlock opt={0} events={props.events} page={props.page} setPageInfo={props.setPageInfo} />
      </TabPanel>
      <TabPanel value={props.tab} index={1}>
        <TabBlock opt={0} events={props.events} page={props.page} setPageInfo={props.setPageInfo} />
      </TabPanel>
      <TabPanel value={props.tab} index={2}>
        <TabBlock opt={1} events={props.events} page={props.page} setPageInfo={props.setPageInfo} />
      </TabPanel>
    </>
  )
}

interface TabBlockProps {
  opt: number; events: any[]; page: { current: number; total: number; }; setPageInfo: any;
}
const TabBlock = (props: TabBlockProps) => {
  const handleMore = () => { props.setPageInfo(props.page.current + 1) }
  return (
    <div>
      {
        props.events.length > 5
          ? <div className='bg-white'>
            {
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
            ? <div className='flex flex-col gap-[1px] bg-white'>
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