"use client";
import { useSearchParams } from "next/navigation";
import dayjs from 'dayjs';
import { getParams, tabList } from '@/service/Functions';
import { handleMore, useListWithPageE } from "@/hooks/useInCommon";
import { Divider, ListProps, LoadingCircle, MoreButton, SkeletonList, WriteFab } from '@/components/common';
import { BlockBodyAD, BlockContainer, BlockWrapper, NoData } from "@/components/common/block";

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
  const events = useListWithPageE(apiURL, ['events', params], !!params)

  if (events.isPending || events.isLoading) { return <SkeletonList thumb={true} tag={true} /> }
  else if (events.status !== 'success' || !events.data || !!events.data.pages[0].empty) {
    return <NoData text1="찾는 행사가 없어요." text2="지금 인기 있는 페스티벌을 만나보세요." buttonText="페스티벌 인기순 보러가기" buttonLink="/?sort=likeCount%2Cdesc" />
  }
  return (
    <div className='bg-p-white'>
      {events.data.pages.map((event) => (
        event.content.map((item: ListProps, idx: any) => (
          <div key={`event-${idx}`}>
            {idx === 0 ? <></> : <Divider />}
            <BlockContainer tags={item.post.tags}>
              <BlockWrapper url={`/event/${item.event.eventId}`} wrapStyle='p-[16px] pb-[10px]'
                blockThumb={<img className='rounded-[4px] w-[92px] h-[116px] object-cover' src={item.post.headImageUrl ?? '/default_list_thumb3x.png'} />}>
                <BlockBodyAD title={item.post.title} startDate={item.event.startDate} endDate={item.event.endDate} address={item.event.abstractLocation}
                  writer={item.post.writer} head={item.event.type === 'PARTY' ? { current: item.event.currentHeadCount, max: item.event.maxHeadCount } : undefined} />
              </BlockWrapper>
            </BlockContainer>
          </div>
        ))
      ))}
      {events.hasNextPage ? <MoreButton onClick={() => handleMore(events.hasNextPage, events.fetchNextPage)} /> : <></>}
      {events.isFetchingNextPage ? <LoadingCircle /> : <></>}
      {tab === 2 && <WriteFab url="/write?w=p" />}
    </div>
  )
}