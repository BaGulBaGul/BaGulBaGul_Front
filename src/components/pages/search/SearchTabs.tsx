import { getParams, tabList } from "@/service/Functions"
import { ListProps, MoreButton, NoData, TabPanels, Divider, TabBlockProps, LoadingCircle, SkeletonList } from "../../common"
import { ReadonlyURLSearchParams } from "next/navigation"
import dayjs from "dayjs"
import { ResultBlock, SuggestBlock } from "./SearchBlock"
import { handleMore, useListWithPageE } from "@/hooks/useInCommon"

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

  return (
    <TabPanels value={tab}
      child1={<TabBlock opt={props.opt === 'TTL' ? 0 : 1} events={events} tab={Number(props.sp.get('tab_id'))} />}
      child2={<TabBlock opt={props.opt === 'TTL' ? 0 : 1} events={events} tab={Number(props.sp.get('tab_id'))} />} />
  )
}

function TabBlock(props: TabBlockProps) {
  if (props.events.isPending || props.events.isLoading) { return <SkeletonList thumb={props.tab !== undefined && props.tab < 2} tag={props.opt > 0} /> }
  if (props.events.status === 'success') {
    return (
      <>
        {!!props.events && props.events.data.pages[0].totalElements > 5
          ? <div className='bg-p-white'>
            {props.events.data.pages.map((event) => (
              event.content.map((item: ListProps, idx: any) => (
                <div key={`searched-${idx}`}>
                  {idx === 0 ? <></> : <Divider />}
                  <ResultBlock data={item} opt={props.opt} />
                </div>
              ))
            ))}
            {props.events.hasNextPage ? <MoreButton onClick={() => handleMore(props.events.hasNextPage, props.events.fetchNextPage)} /> : <></>}
            {props.events.isFetchingNextPage ? <LoadingCircle /> : <></>}
          </div>
          : !!props.events && !props.events.data.pages[0].empty
            ? <div className='flex flex-col gap-[8px]'>
              <div className="bg-p-white">
                {props.events.data.pages.map((event) => (
                  event.content.map((item: ListProps, idx: any) => (
                    <div key={`searched-${idx}`}>
                      {idx === 0 ? <></> : <Divider />}
                      <ResultBlock data={item} opt={props.opt} />
                    </div>
                  ))
                ))}
              </div>
              <SuggestBlock type={1} />
            </div>
            : <div className='flex flex-col'>
              <SuggestBlock type={0} />
              <NoData text1="찾는 검색결과가 없어요." text2="지금 인기 있는 페스티벌을 만나보세요." buttonText="페스티벌 인기순 보러가기" buttonLink="/?sort=likeCount%2Cdesc" />
            </div>
        }
      </>
    )
  }
}