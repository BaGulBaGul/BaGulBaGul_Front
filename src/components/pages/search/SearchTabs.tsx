import { ReadonlyURLSearchParams } from "next/navigation"
import dayjs from "dayjs"
import { getParams, tabList } from "@/service/Functions"
import { handleMore, useListWithPageE } from "@/hooks/useInCommon"
import { ListProps, MoreButton, Divider, LoadingCircle, SkeletonList } from "../../common"
import { BlockBodyAD, BlockContainer, BlockWrapper, NoData } from "@/components/common/block"
import { SuggestBlock } from "./SearchBlock"
import { InfiniteData, InfiniteQueryObserverSuccessResult } from "@tanstack/react-query"

export function SearchTabs(props: { opt: 'TTL' | 'TAG'; sp: ReadonlyURLSearchParams }) {
  let tab = Number(props.sp.get('tab_id')) ?? 0
  let params = {
    title: props.opt === 'TTL' ? decodeURIComponent(decodeURIComponent(props.sp.get('query') ?? '')) : '',
    tags: props.opt === 'TAG' ? decodeURIComponent(decodeURIComponent(props.sp.get('tag') ?? '')) : '',
    categories: props.sp.getAll('ct') ?? '',
    type: tabList[Number(props.sp.get('tab_id')) ?? 0], sort: props.sp.get('sort') ?? 'createdAt,desc',
    startDate: props.sp.get('sD') ? `${dayjs(props.sp.get('sD')).format('YYYY-MM-DD')}T00:00:00` : '',
    endDate: props.sp.get('eD') ? `${dayjs(props.sp.get('eD')).format('YYYY-MM-DD')}T23:59:59` : '',
    leftHeadCount: props.sp.get('ptcp') ?? '', totalHeadCountMax: props.sp.get('hcMax') ?? '',
    totalHeadCountMin: props.sp.get('hcMin') ?? '',
  }
  let apiURL = !!params && Object.keys(params).length > 0 ? `/api/event?size=10&${getParams(params)}` : '/api/event?size=10&type=FESTIVAL'
  const events = useListWithPageE(apiURL, ['events', params], !!params)

  if (events.isPending || events.isLoading) { return <SkeletonList thumb={tab < 2} tag={props.opt === 'TAG'} /> }
  else if ((events.status === 'success')) {
    if (!events || events.data.pages[0].empty) {
      return (
        <div className='flex flex-col'>
          <SuggestBlock type={tabList[tab ?? 0]} eventRanking={false} />
          <NoData text1="찾는 검색결과가 없어요." text2="지금 인기 있는 페스티벌을 만나보세요." buttonText="페스티벌 인기순 보러가기" buttonLink="/?sort=likeCount%2Cdesc" />
        </div>
      )
    } else if (events.data.pages[0].totalElements <= 5) {
      <div className='flex flex-col gap-[8px]'>
        <ResultList events={events} opt={props.opt} />
        <SuggestBlock type={tabList[tab ?? 0]} eventRanking={true} />
      </div>
    }
    return <ResultList events={events} opt={props.opt} />
  }
}

function ResultList({ events, opt }: { events: InfiniteQueryObserverSuccessResult<InfiniteData<any, unknown>, Error>, opt: 'TTL' | 'TAG' }) {
  return (
    <div className='bg-p-white'>
      {events.data.pages.map((event) => (
        event.content.map((item: ListProps, idx: any) => (
          <div key={`searched-${idx}`}>
            {idx === 0 ? <></> : <Divider />}
            <BlockContainer tags={opt === 'TAG' ? item.post.tags : []} >
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
    </div>
  )
}