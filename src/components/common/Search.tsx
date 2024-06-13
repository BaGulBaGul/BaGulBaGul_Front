import { FormatDateRange, String2ISO, setPageInfo, useEffectCallAPI } from "@/service/Functions"
import { TabBlockProps } from "./EventBlock"
import { LoadingSkeleton } from "./Loading"
import { DividerDot, TagIcn } from "./Icon"
import { HashtagAccordion, HashtagButton, ListProps, MoreButton, NoEvent, ParamProps, TabPanel, ViewButton } from "."
import { Chip, Divider, IconButton, TextField, ThemeProvider } from "@mui/material"
import { doneChipTheme, searchInputTheme } from "./Themes"
import { useEffect, useRef, useState } from "react"
import { call } from "@/service/ApiService"
import { ReadonlyURLSearchParams } from "next/navigation"
import { tabList } from "./Data"

export const TabBlock = (props: TabBlockProps) => {
  const handleMore = () => { setPageInfo(props.page, props.setPage, props.page.current + 1, props.params, props.setParams) }
  if (props.isLoading) { return <LoadingSkeleton /> }
  else {
    return (
      <div>
        {props.events.length > 5
          ? <div className='bg-[#FFF]'>
            {props.events.map((post, idx) => (
              <div key={`searched-${idx}`}>
                {idx === 0 ? <></> : <Divider />}
                <ResultBlock data={post} />
              </div>
            ))}
            {props.page.total > 1 && props.page.current + 1 < props.page.total
              ? <MoreButton onClick={handleMore} /> : <></>
            }
          </div>
          : props.events.length > 0
            ? <div className='flex flex-col gap-[1px] bg-[#FFF]'>
              <div>
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

export function ResultBlock(props: { data: ListProps }) {
  let urlLink = `/event/${props.data.event.eventId}`
  return (
    // <div className="flex flex-col py-[18px] px-[16px] justify-between">
    //   <a href={urlLink} className='flex flex-col gap-[4px]'>
    //     <p className='truncate text-[16px] font-semibold leading-[140%]'>{props.data.post.title}</p>
    //     <p className="text-[14px] text-gray3 leading-[160%]">{FormatDateRange(props.data.event.startDate, props.data.event.endDate)}</p>
    //     <div className='flex flex-row items-center gap-[4px] text-[14px]'>
    //       <img className='rounded-full w-[24px] h-[24px]' src='/main_profile.svg' />
    //       <p className='text-black'>{props.data.post.writer.userName}</p>
    //       {props.data.event.type === 'PARTY'
    //         ? <>
    //           <DividerDot />
    //           <p className='text-gray3'>{`${props.data.event.currentHeadCount}/${props.data.event.maxHeadCount}(명)`}</p>
    //           {props.data.event.currentHeadCount === props.data.event.maxHeadCount
    //             ? <ThemeProvider theme={doneChipTheme}><Chip label="모집완료" /></ThemeProvider>
    //             : <></>
    //           }
    //         </>
    //         : <></>
    //       }
    //     </div>
    //   </a>
    //   {props.data.post.tags ? <HashtagAccordion tag={props.data.post.tags} /> : <></>}
    // </div>
    <a href={urlLink} className='flex py-[18px] px-[16px] justify-between'>
      <div className='flex flex-row items-center pb-[10px] gap-[20px] w-full'>
        <img className='rounded-[4px] w-[84px] h-[104px] object-cover' src={props.data.post.headImageUrl ?? '/default_list_thumb3x.png'} />
        <div className='flex flex-col h-[104px] gap-[20px] justify-between'>
          <div className='flex flex-col'>
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row text-[14px] text-gray3">
                <p>{FormatDateRange(props.data.event.startDate, props.data.event.endDate)}</p>
                <p>, {props.data.event.abstractLocation}</p>
              </div>
            </div>
            <p className='truncate text-[16px] font-semibold'>{props.data.post.title}</p>
          </div>
          <span className='text-[12px] text-gray3 description'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer consectetur turpis congue massa laoreet rutrum. 
            Donec facilisis posuere dui. Sed augue nisl, tempor vitae malesuada vitae, pellentesque in diam. 
            Nam elementum ac ipsum non ullamcorper. Vivamus eu nibh eget sem dignissim rutrum ut ac nunc. 
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec dignissim suscipit faucibus. 
            Aenean dignissim blandit egestas.
          </span>
        </div>
      </div>
    </a>
  )
}

export function SuggestBlock(props: { type: number }) {
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
        <span className="text-[14px] leading-[160%]">혹시 이건 어떠세요?</span>
        <div className="flex flex-row gap-[6px] flex-wrap w-[382px]">
          { // 자주 찾는 검색어, 1~2줄
            suggestions.map((s, idx) =>
              <HashtagButton tag={s.post.title} key={`st-${idx}`} />
            )
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
              <div className="flex flex-col text-[14px] leading-[160%]">
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
    <div className="flex flex-col px-[16px] py-[20px] gap-[16px] bg-[#FFF]">
      <SuggestText />
      {props.type > 0 ? <SuggestImage /> : <></>}
    </div>
  )
}

export function SearchTabs(props: { opt: string; sp: ReadonlyURLSearchParams }) {
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
      setParams({
        title: decodeURIComponent(decodeURIComponent(props.sp.get('query') ?? '')),
        page: 0, categories: props.sp.getAll('ct') ?? '',
        type: tabList[Number(props.sp.get('tab_id')) ?? 0], sort: props.sp.get('sort') ?? 'createdAt,desc',
        startDate: props.sp.get('sD') ? String2ISO((props.sp.get('sD'))) : '',
        endDate: props.sp.get('eD') ? String2ISO((props.sp.get('eD'))) : '',
        leftHeadCount: props.sp.get('ptcp') ?? '', totalHeadCountMax: props.sp.get('hcMax') ?? '',
        totalHeadCountMin: props.sp.get('hcMin') ?? '',
      })
    } else if (props.opt === 'TAG') {
      setParams({
        tags: decodeURIComponent(decodeURIComponent(props.sp.get('tag') ?? '')),
        page: 0, categories: props.sp.getAll('ct') ?? '',
        type: tabList[Number(props.sp.get('tab_id')) ?? 0], sort: props.sp.get('sort') ?? 'createdAt,desc',
        startDate: props.sp.get('sD') ? String2ISO((props.sp.get('sD'))) : '',
        endDate: props.sp.get('eD') ? String2ISO((props.sp.get('eD'))) : '',
        leftHeadCount: props.sp.get('ptcp') ?? '', totalHeadCountMax: props.sp.get('hcMax') ?? '',
        totalHeadCountMin: props.sp.get('hcMin') ?? '',
      })
    }

  }, [props.sp])

  // 조건에 따라 리스트 호출
  useEffectCallAPI(params, initialSet, setPage, events, setEvents, setLoading)

  return (
    <>
      <TabPanel value={tab} index={0}>
        <TabBlock opt={0} events={events} page={page} setPage={setPage} isLoading={isLoading} params={params} setParams={setParams} />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <TabBlock opt={0} events={events} page={page} setPage={setPage} isLoading={isLoading} params={params} setParams={setParams} />
      </TabPanel>
      <TabPanel value={tab} index={2}>
        <TabBlock opt={1} events={events} page={page} setPage={setPage} isLoading={isLoading} params={params} setParams={setParams} />
      </TabPanel>
    </>
  )
}

interface SearchBarProps { title?: string; tag?: string; setOpen: any; filterCnt: number; setTitle?: any; handleRt?: any; }
export function SearchBar(props: SearchBarProps) {
  const handleOpen = () => { props.setOpen(true) }
  if (props.title) {
    const inputRef = useRef<HTMLInputElement>(null);
    const handleSearch = (event: any) => {
      if ((event.type === 'keydown' && event.key === 'Enter') || event.type === 'click') {
        if (inputRef.current && inputRef.current.value !== '') {
          event.preventDefault();
          props.setTitle(encodeURIComponent(encodeURIComponent(inputRef.current.value)))
          props.handleRt()
        }
      }
    }
    return (
      <div className='fixed w-full top-0 bg-[#FFF] z-paper'>
        <div className='flex flex-row mx-[16px] my-[18px] gap-[16px] items-center'>
          <IconButton disableRipple className='p-0'><img src='/search_back.svg' /></IconButton>
          <div className='flex flex-row w-full justify-between'>
            <div className='flex flex-row bg-gray1 px-[8px] py-[4px] gap-[8px] w-full max-w-[268px]'>
              <ThemeProvider theme={searchInputTheme}><TextField defaultValue={props.title} inputRef={inputRef} onKeyDown={handleSearch} required /></ThemeProvider>
              <IconButton onClick={handleSearch} disableRipple className='p-0' ><img src='/search_magnifying.svg' /></IconButton>
            </div>
            <ViewButton handleOpen={handleOpen} cnt={props.filterCnt} fs={14} />
          </div>
        </div></div>
    )
  }
  else if (props.tag) {
    return (
      <div className='fixed w-full top-0 bg-[#FFF] z-paper'>
        <div className='flex flex-row mx-[16px] my-[18px] gap-[16px] items-center'>
          <IconButton disableRipple className='p-0'><img src='/search_back.svg' /></IconButton>
          <div className='flex flex-row w-full justify-between'>
            <div className='flex flex-row px-[4px] py-[2px] gap-[2px] items-center'>
              <TagIcn />
              <div className="inline-block align-middle text-[14px] leading-[160%]">{props.tag}</div>
            </div>
            <ViewButton handleOpen={handleOpen} cnt={props.filterCnt} fs={14} />
          </div>
        </div>
      </div>
    )
  }
}