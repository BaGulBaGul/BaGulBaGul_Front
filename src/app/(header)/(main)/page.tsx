"use client";
import { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import { ParamProps, TabPanels} from '@/components/common';
import { tabList, useEffectCallAPI } from '@/service/Functions';
import { MainTabBlock } from '@/components/pages/main';
import dayjs from 'dayjs';

export default function Page() {
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
      child1={<MainTabBlock opt={0} events={events} page={page} setPage={setPage} isLoading={isLoading} params={params} setParams={setParams} router={router} />}
      child2={<MainTabBlock opt={1} events={events} page={page} setPage={setPage} isLoading={isLoading} params={params} setParams={setParams} router={router} />} />
  )
}