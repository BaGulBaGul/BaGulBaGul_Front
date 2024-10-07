"use client";
import { useSearchParams } from "next/navigation";
import { TabPanels } from '@/components/common';
import { getParams, tabList } from '@/service/Functions';
import { MainTabBlock } from '@/components/pages/main';
import dayjs from 'dayjs';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchFromURLWithPage } from '@/service/ApiService';

export default function Page() {
  const searchParams = useSearchParams()
  let tab = Number(searchParams.get('tab_id')) ?? 0
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

  let params = {
    categories: searchParams.getAll('ct'),
    type: tabList[tab], sort: searchParams.get('sort') ?? 'createdAt,desc',
    startDate: sD, endDate: searchParams.get('eD') ? `${dayjs(searchParams.get('eD'), "YYYYMMDD").format('YYYY-MM-DD')}T23:59:59` : '',
    leftHeadCount: searchParams.get('ptcp') ?? '', totalHeadCountMax: searchParams.get('hcMax') ?? '',
    totalHeadCountMin: searchParams.get('hcMin') ?? ''
  }
  let apiURL = !!params && Object.keys(params).length > 0 ? `/api/event?size=10&${getParams(params)}` : '/api/event?size=10&type=FESTIVAL'
  const { data: events, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey: ['events', params],
    queryFn: (pageParam) => fetchFromURLWithPage(apiURL, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPageParam >= lastPage.totalPages - 1) { return undefined }
      return lastPageParam + 1
    }, enabled: !!params,
  })
  const handleMore = () => { if (hasNextPage) { fetchNextPage() } }

  return (
    <TabPanels value={tab}
      child1={<MainTabBlock opt={0} events={events} hasNextPage={hasNextPage} handleMore={handleMore} status={status} />}
      child2={<MainTabBlock opt={1} events={events} hasNextPage={hasNextPage} handleMore={handleMore} status={status} />} />
  )
}