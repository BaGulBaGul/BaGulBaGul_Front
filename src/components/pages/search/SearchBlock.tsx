import { FormatDateRange } from "@/service/Functions"
import { BlockInfo, HashtagAccordion, HashtagButton, HeadCount, ListProps, UserProfile } from "../../common"
import { useEffect, useState } from "react"
import { call } from "@/service/ApiService"
import Link from "next/link"

export function ResultBlock(props: { data: ListProps; opt: 0 | 1; }) {
  let urlLink = `/event/${props.data.event.eventId}`
  if (props.data.event.type !== 'PARTY') {
    return (
      <div className="flex flex-col justify-between py-[18px] px-[16px]">
        <Link href={urlLink} passHref legacyBehavior>
          <div className='flex flex-row justify-between items-center'>
            <div className='flex flex-col justify-between w-[calc(100%-152px)] h-[116px]'>
              <BlockInfo title={props.data.post.title} date={FormatDateRange(props.data.event.startDate, props.data.event.endDate)} address={props.data.event.abstractLocation} />
              <UserProfile userId={props.data.post.writer.userId} userName={props.data.post.writer.userName} userProfileImageUrl={props.data.post.writer.userProfileImageUrl} />
            </div>
            <img className='rounded-[4px] w-[92px] h-[116px] object-cover' src={props.data.post.headImageUrl ?? '/default_list_thumb3x.png'} />
          </div>
        </Link>
        {props.opt === 1 ? <HashtagAccordion tag={props.data.post.tags} /> : <></>}
      </div>
    )
  } else {
    return (
      <div className="flex flex-col justify-between py-[18px] px-[16px]">
        <Link href={urlLink} passHref legacyBehavior>
          <div className='flex flex-col items-start gap-[4px]'>
            <BlockInfo title={props.data.post.title} date={FormatDateRange(props.data.event.startDate, props.data.event.endDate)} />
            <div className='flex flex-row items-center gap-[4px]'>
              <UserProfile userId={props.data.post.writer.userId} userName={props.data.post.writer.userName} userProfileImageUrl={props.data.post.writer.userProfileImageUrl} />
              <HeadCount currentHeadCount={props.data.event.currentHeadCount} maxHeadCount={props.data.event.maxHeadCount} />
            </div>
          </div>
        </Link>
        {props.opt === 1 ? <HashtagAccordion tag={props.data.post.tags} /> : <></>}
      </div>
    )
  }

}

export function SuggestBlock(props: { type: 0 | 1 }) {
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