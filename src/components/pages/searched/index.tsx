"use client";
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import { IconButton, TextField, ThemeProvider, Divider } from '@mui/material';
import { searchInputTheme } from '@/components/common/Themes';
import { tabList } from '@/components/common/Data';
import { ParamProps, String2ISO, useEffectCallAPI } from '@/service/Functions';
import { LoadingSkeleton, MoreButton, NoEvent, ResultBlock, SuggestBlock, TabPanel, ViewButton } from '@/components/common';
import { TabBlockProps } from '@/components/common/EventBlock';

const index = () => (<ResultTabs />)
export default index;

export function SearchBar(props: { title: string; setOpen: any; filterCnt: number; setTitle: any; handleRt?: any; }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSearch = (event: any) => {
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

export function ResultTabs() {
  const searchParams = useSearchParams()
  const [isLoading, setLoading] = useState(true)
  const [events, setEvents] = useState([]);

  // api 호출용 파라미터
  const [params, setParams] = useState<ParamProps | undefined>();
  let tab = Number(searchParams.get('tab_id')) ?? 0

  const [page, setPage] = useState({ current: 0, total: 0, });
  function setPageInfo(currentPage: number) {
    setPage({ ...page, current: currentPage });
    setParams({ ...params, page: currentPage })
  }

  const initialSet = useRef(false);
  useEffect(() => {
    if (initialSet.current) { initialSet.current = false }
    setEvents([])
    setLoading(true);
    setParams({
      title: decodeURIComponent(decodeURIComponent(searchParams.get('query') ?? '')), page: 0,
      // tag: decodeURIComponent(decodeURIComponent(searchParams.get('tag') ?? '')),
      type: tabList[Number(searchParams.get('tab_id')) ?? 0], sort: searchParams.get('sort') ?? 'createdAt,desc',
      startDate: searchParams.get('sD') ? String2ISO((searchParams.get('sD'))) : '',
      endDate: searchParams.get('eD') ? String2ISO((searchParams.get('eD'))) : '',
      leftHeadCount: searchParams.get('ptcp') ?? '', totalHeadCountMax: searchParams.get('hcMax') ?? '',
      totalHeadCountMin: searchParams.get('hcMin') ?? '',
    })
  }, [searchParams])

  // 조건에 따라 리스트 호출
  useEffectCallAPI(params, initialSet, setPage, events, setEvents, setLoading)

  return (
    <>
      <TabPanel value={tab} index={0}>
        <TabBlock opt={0} events={events} page={page} setPageInfo={setPageInfo} isLoading={isLoading} />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <TabBlock opt={0} events={events} page={page} setPageInfo={setPageInfo} isLoading={isLoading} />
      </TabPanel>
      <TabPanel value={tab} index={2}>
        <TabBlock opt={1} events={events} page={page} setPageInfo={setPageInfo} isLoading={isLoading} />
      </TabPanel>
    </>
  )
}

const TabBlock = (props: TabBlockProps) => {
  const handleMore = () => { props.setPageInfo(props.page.current + 1) }
  if (props.isLoading) { return <LoadingSkeleton /> }
  else {
    return (
      <div>
        {
          props.events.length > 5
            ? <div className='bg-[#FFF]'>
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
              ? <div className='flex flex-col gap-[1px] bg-[#FFF]'>
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
}