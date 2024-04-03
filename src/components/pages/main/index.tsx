"use client";
import { useState, useRef, useEffect } from 'react';
import { Divider, ThemeProvider, Fab } from '@mui/material';
import { TabPanel, MoreButton, EventBlock, NoEvent, LoadingSkeleton, LoadingCircle } from '@/components/common';
import { writeFabTheme } from '@/components/common/Themes'
import { tabList } from '@/components/common/Data';
import { ParamProps, String2ISO, useEffectCallAPI } from '@/service/Functions';
import { useSearchParams } from 'next/navigation';
import { TabBlockProps } from '@/components/common/EventBlock';

const index = () => (<PostTabs />);
export default index;

function PostTabs() {
  const searchParams = useSearchParams()
  const [isLoading, setLoading] = useState(true)
  const [events, setEvents] = useState([]);

  // api 호출용 파라미터, 호출 결과
  const [params, setParams] = useState<ParamProps | undefined>();
  let tab = Number(searchParams.get('tab_id')) ?? 0

  const [page, setPage] = useState({ current: 0, total: 0, });
  function setPageInfo(currentPage: number) {
    setPage({ ...page, current: currentPage });
    setParams({ ...params, page: currentPage })
  }
  console.log(page)

  const initialSet = useRef(false);
  useEffect(() => {
    console.log('useEffect - setparams')
    if (initialSet.current) { initialSet.current = false }
    setEvents([])
    setLoading(true);
    setParams({
      page: 0, categories: searchParams.getAll('ct'),
      type: tabList[Number(searchParams.get('tab_id')) ?? 0], sort: searchParams.get('sort') ?? 'createdAt,desc',
      startDate: searchParams.get('sD') ? String2ISO((searchParams.get('sD'))) : '',
      endDate: searchParams.get('eD') ? String2ISO((searchParams.get('eD'))) : '',
      leftHeadCount: searchParams.get('ptcp') ?? '', totalHeadCountMax: searchParams.get('hcMax') ?? '',
      totalHeadCountMin: searchParams.get('hcMin') ?? ''
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
  if (props.isLoading && props.page.current === 0) { return <LoadingSkeleton /> }
  else if (props.isLoading && props.page.current > 0) { return <LoadingCircle /> }
  else {
    return (
      <div className='bg-[#FFF]'>
        {props.events.length > 0
          ? <>
            {props.events.map((post, idx) => (
              <div key={`event-${idx}`}>
                {idx === 0 ? <></> : <Divider />}
                <EventBlock data={post} />
              </div>
            ))}
            {props.page.total > 1 && props.page.current + 1 < props.page.total
              ? <MoreButton onClick={handleMore} /> : <></>
            }
          </>
          : <NoEvent text1="찾는 행사가 없어요." text2="지금 인기 있는 페스티벌을 만나보세요." buttonText={"페스티벌 인기순 보러가기"} />
        }
        {
          props.opt === 1
            ? <ThemeProvider theme={writeFabTheme}>
              <Fab variant="extended" size="small" color="primary" className='fixed bottom-[55px] right-[16px]'>
                <div className='flex flex-row items-center'>
                  <img src='/main_add.svg' />
                  <span className='ps-[4px]'>글작성</span>
                </div>
              </Fab>
            </ThemeProvider>
            : <></>
        }
      </div>
    )
  }
}