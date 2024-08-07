import { FormatDateRange, setPageInfo, tabList, useEffectCallAPI } from "@/service/Functions"
import { LoadingSkeleton } from "../../common/Loading"
import { DividerDot } from "../../common/styles/Icon"
import { HashtagAccordion, HashtagButton, ListProps, MoreButton, NoEvent, NoUser, ParamProps, TabPanels, Divider, TabBlockProps } from "../../common"
import { useEffect, useRef, useState } from "react"
import { call } from "@/service/ApiService"
import { ReadonlyURLSearchParams } from "next/navigation"
import dayjs from "dayjs"

export function SearchTabs(props: { opt: 'TTL' | 'TAG'; sp: ReadonlyURLSearchParams }) {
  // const searchParams = useSearchParams()
  const [isLoading, setLoading] = useState(true)
  const [events, setEvents] = useState([]);

  // api 호출용 파라미터
  const [params, setParams] = useState<ParamProps | undefined>();
  let tab = Number(props.sp.get('tab_id')) ?? 0

  const [page, setPage] = useState({ current: 0, total: 0, });
  const initialSet = useRef(false);
  useEffect(() => {
    if (initialSet.current) { initialSet.current = false }
    setEvents([])
    setLoading(true);
    if (props.opt === 'TTL') {
      console.log('** ')
      setParams({
        title: decodeURIComponent(decodeURIComponent(props.sp.get('query') ?? '')),
        page: 0, categories: props.sp.getAll('ct') ?? '',
        type: tabList[Number(props.sp.get('tab_id')) ?? 0], sort: props.sp.get('sort') ?? 'createdAt,desc',
        startDate: props.sp.get('sD') ? `${dayjs(props.sp.get('sD')).format('YYYY-MM-DD')}T00:00:00` : '',
        endDate: props.sp.get('eD') ? `${dayjs(props.sp.get('eD')).format('YYYY-MM-DD')}T23:59:59` : '',
        leftHeadCount: props.sp.get('ptcp') ?? '', totalHeadCountMax: props.sp.get('hcMax') ?? '',
        totalHeadCountMin: props.sp.get('hcMin') ?? '',
      })
    } else if (props.opt === 'TAG') {
      setParams({
        tags: decodeURIComponent(decodeURIComponent(props.sp.get('tag') ?? '')),
        page: 0, categories: props.sp.getAll('ct') ?? '',
        type: tabList[Number(props.sp.get('tab_id')) ?? 0], sort: props.sp.get('sort') ?? 'createdAt,desc',
        startDate: props.sp.get('sD') ? `${dayjs(props.sp.get('sD')).format('YYYY-MM-DD')}T00:00:00` : '',
        endDate: props.sp.get('eD') ? `${dayjs(props.sp.get('eD')).format('YYYY-MM-DD')}T23:59:59` : '',
        leftHeadCount: props.sp.get('ptcp') ?? '', totalHeadCountMax: props.sp.get('hcMax') ?? '',
        totalHeadCountMin: props.sp.get('hcMin') ?? '',
      })
    }

  }, [props.sp])

  // 조건에 따라 리스트 호출
  useEffectCallAPI(params, initialSet, setPage, events, setEvents, setLoading)

  return (
    <TabPanels value={tab}
      child1={<TabBlock opt={props.opt === 'TTL' ? 0 : 1} events={events} page={page} setPage={setPage} isLoading={isLoading} params={params} setParams={setParams} />}
      child2={<TabBlock opt={props.opt === 'TTL' ? 0 : 1} events={events} page={page} setPage={setPage} isLoading={isLoading} params={params} setParams={setParams} />} />
  )
}

const TabBlock = (props: TabBlockProps) => {
  const handleMore = () => { setPageInfo(props.page, props.setPage, props.page.current + 1, props.params, props.setParams) }
  if (props.isLoading) { return <LoadingSkeleton /> }
  else {
    return (
      <div>
        {props.events.length > 5
          ? <div className='bg-p-white'>
            {props.events.map((post, idx) => (
              <div key={`searched-${idx}`}>
                {idx === 0 ? <></> : <Divider />}
                <ResultBlock data={post} opt={props.opt} />
              </div>
            ))}
            {props.page.total > 1 && props.page.current + 1 < props.page.total
              ? <MoreButton onClick={handleMore} /> : <></>
            }
          </div>
          : props.events.length > 0
            ? <div className='flex flex-col gap-[8px]'>
              <div className="bg-p-white">
                {props.events.map((post, idx) => (
                  <div key={`searched-${idx}`}>
                    {idx === 0 ? <></> : <Divider />}
                    <ResultBlock data={post} opt={props.opt} />
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

function ResultBlock(props: { data: ListProps; opt: 0 | 1; }) {
  let urlLink = `/event/${props.data.event.eventId}`
  if (props.data.event.type !== 'PARTY') {
    return (
      <div className="flex flex-col justify-between py-[18px] px-[16px]">
        <a href={urlLink} className='flex flex-row justify-between items-center'>
          <div className='flex flex-col justify-between w-[230px] h-[116px]'>
            <div className='flex flex-col gap-[4px]'>
              <p className='text-16 font-semibold truncate'>{props.data.post.title}</p>
              <div className="flex flex-col text-14 text-gray3 gap-[4px]">
                <p>{props.data.event.abstractLocation}</p>
                <p>{FormatDateRange(props.data.event.startDate, props.data.event.endDate)}</p>
              </div>
            </div>
            <div className='flex flex-row items-center gap-[4px] text-14'>
              {props.data.post.writer.userId === null ? <NoUser />
                : <a href={`/user/${props.data.post.writer.userId}`} className='flex flex-row items-center gap-[4px]'>
                  {/* <img className='rounded-full w-[24px] h-[24px]' src={props.data.post.writer.userProfileImageUrl ?? '/profile_main.svg'} /> */}
                  <img className='rounded-full w-[24px] h-[24px]' src="/profile_main.svg" />
                  <p className="text-black">{props.data.post.writer.userName}</p>
                </a>
              }
            </div>
          </div>
          <img className='rounded-[4px] w-[92px] h-[116px] object-cover' src={props.data.post.headImageUrl ?? '/default_list_thumb3x.png'} />
        </a>
        {props.opt === 1 ? <HashtagAccordion tag={props.data.post.tags} /> : <></>}
      </div>
    )
  } else {
    return (
      <div className="flex flex-col justify-between py-[18px] px-[16px]">
        <a href={urlLink} className='flex flex-col items-start gap-[4px]'>
          <p className='text-16 font-semibold truncate'>{props.data.post.title}</p>
          <p className='text-14 text-gray3'>{FormatDateRange(props.data.event.startDate, props.data.event.endDate)}</p>
          <div className='flex flex-row items-center gap-[4px] text-14'>
            {props.data.post.writer.userId === null ? <NoUser />
              : <a href={`/user/${props.data.post.writer.userId}`} className='flex flex-row items-center gap-[4px]'>
                {/* <img className='rounded-full w-[24px] h-[24px]' src={props.data.post.writer.userProfileImageUrl ?? '/profile_main.svg'} /> */}
                <img className='rounded-full w-[24px] h-[24px]' src="/profile_main.svg" />
                <p className="text-black">{props.data.post.writer.userName}</p>
              </a>
            }
            <DividerDot />
            <p className='text-gray3'>{`${props.data.event.currentHeadCount}/${props.data.event.maxHeadCount}(명)`}</p>
            {props.data.event.currentHeadCount !== props.data.event.maxHeadCount ? <></>
              : <p className="done-chip">모집완료</p>
            }
          </div>
        </a>
        {props.opt === 1 ? <HashtagAccordion tag={props.data.post.tags} /> : <></>}
      </div>
    )
  }

}

function SuggestBlock(props: { type: 0 | 1 }) {
  const [suggestions, setSuggestions] = useState<ListProps[]>([])
  useEffect(() => {
    console.log(' :: suggestblock: ', props.type)
    let apiURL = `/api/event?size=5&sort=likeCount,desc`
    console.log('** suggest : ', apiURL)
    call(apiURL, "GET", null)
      .then((response) => {
        console.log(response.data);
        if (response.data.empty === false) {
          setSuggestions(response.data.content)
        }
      })
  }, [])

  const SuggestText = () => {
    return (
      <div className="flex flex-col gap-[8px]">
        <span className="text-14">혹시 이건 어떠세요?</span>
        <div className="flex flex-row gap-[6px] flex-wrap w-[382px]">
          { // 자주 찾는 검색어, 1~2줄
            suggestions.map((s, idx) => <HashtagButton tag={s.post.title} key={`st-${idx}`} />)
          }
        </div>
      </div>
    )
  }
  const SuggestImage = () => {
    return (
      <div className="overflow-hidden	h-[204px]">
        <div className="flex flex-row gap-[16px] overflow-x-auto overflow-y-hide whitespace-nowrap">
          {suggestions.map((s, idx) =>
            <div className="flex flex-col w-[120px] gap-[12px]" key={`si-${idx}`}>
              <img className='h-[148px] rounded-[5.65px] object-cover' src={s.post.headImageUrl ?? '/default_list_thumb3x.png'} />
              <div className="flex flex-col text-14">
                <span className="font-semibold truncate">{s.post.title}</span>
                <span>{FormatDateRange(s.event.startDate, s.event.endDate)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col px-[16px] py-[20px] gap-[16px] bg-p-white">
      <SuggestText />
      {props.type > 0 ? <SuggestImage /> : <></>}
    </div>
  )
}