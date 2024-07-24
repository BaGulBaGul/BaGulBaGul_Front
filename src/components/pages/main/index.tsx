"use client";
import { useState, useRef, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { ThemeProvider, Fab } from '@mui/material';
import { MoreButton, EventBlock, NoEvent, LoadingSkeleton, LoadingCircle, ParamProps, TabPanels, Divider } from '@/components/common';
import { writeFabTheme } from '@/components/common/Themes'
import { tabList } from '@/components/common/Data';
import { setPageInfo, useEffectCallAPI } from '@/service/Functions';
import { useSearchParams } from 'next/navigation';
import { TabBlockProps } from '@/components/common/EventBlock';
import dayjs from 'dayjs';

const index = () => (<PostTabs />);
export default index;

function PostTabs() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isLoading, setLoading] = useState(true)
  const [events, setEvents] = useState([]);

  // api 호출용 파라미터, 호출 결과
  const [params, setParams] = useState<ParamProps | undefined>();
  let tab = Number(searchParams.get('tab_id')) ?? 0

  const [page, setPage] = useState({ current: 0, total: 0, });
  const initialSet = useRef(false);
  useEffect(() => {
    console.log('useEffect - setparams')
    if (initialSet.current) { initialSet.current = false }
    setEvents([])
    setLoading(true);

    // '종료된 행사 제외하기' 적용 ; startDate값과 비교
    const sD = (() => {
      let startDate = searchParams.get('sD')
      let state = searchParams.get('state')
      // 1) sD값 없고 'state'값 없거나 p아님
      if (!startDate && (!state || state !== 'p')) { return '' }
      // 2) sD값 있고 'state'값 없거나 / p인데 sD가 오늘이거나 오늘 이후
      else if (startDate !== null && (!state || (state === 'p' && (dayjs().isSame(dayjs(startDate)) || dayjs().isBefore(dayjs(startDate)))))) {
        return `${dayjs(startDate).format('YYYY-MM-DD')}T00:00:00`
      } // 3) 'state'값 p이고 sD값 없거나 / sD가 오늘 이전
      else if (state === 'p' && (!startDate || dayjs().isAfter(dayjs(startDate)))) {
        return `${dayjs().format('YYYY-MM-DD')}T00:00:00`
      } else { return '' }
    })()

    setParams({
      page: 0, categories: searchParams.getAll('ct'),
      type: tabList[Number(searchParams.get('tab_id')) ?? 0], sort: searchParams.get('sort') ?? 'createdAt,desc',
      startDate: sD, endDate: searchParams.get('eD') ? `${dayjs(searchParams.get('eD')).format('YYYY-MM-DD')}T23:59:59` : '',
      leftHeadCount: searchParams.get('ptcp') ?? '', totalHeadCountMax: searchParams.get('hcMax') ?? '',
      totalHeadCountMin: searchParams.get('hcMin') ?? ''
    })
  }, [searchParams])

  // 조건에 따라 리스트 호출
  useEffectCallAPI(params, initialSet, setPage, events, setEvents, setLoading)

  return (
    <TabPanels value={tab}
      child1={<TabBlock opt={0} events={events} page={page} setPage={setPage} isLoading={isLoading} params={params} setParams={setParams} router={router} />}
      child2={<TabBlock opt={1} events={events} page={page} setPage={setPage} isLoading={isLoading} params={params} setParams={setParams} router={router} />} />
  )
}

const TabBlock = (props: TabBlockProps) => {
  const handleMore = () => { setPageInfo(props.page, props.setPage, props.page.current + 1, props.params, props.setParams) }
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
                <EventBlock data={post} router={props.router} />
              </div>
            ))}
            {props.page.total > 1 && props.page.current + 1 < props.page.total
              ? <MoreButton onClick={handleMore} /> : <></>
            }
          </>
          : <NoEvent text1="찾는 행사가 없어요." text2="지금 인기 있는 페스티벌을 만나보세요." buttonText={"페스티벌 인기순 보러가기"} />
        }
        {props.opt !== 1 ? <></>
          : <ThemeProvider theme={writeFabTheme}>
            <Fab variant="extended" size="small" color="primary" className='fixed bottom-[19px] right-[16px]'>
              <div className='flex flex-row items-center'>
                <img src='/main_add.svg' />
                <span className='ps-[4px]'>글작성</span>
              </div>
            </Fab>
          </ThemeProvider>
        }
      </div>
    )
  }
}