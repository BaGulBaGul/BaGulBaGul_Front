import { FormatDateRange } from "@/service/Functions"
import { DividerDot } from "../../common/styles/Icon"
import { HashtagAccordion, HashtagButton, ListProps, NoUser } from "../../common"
import { useEffect, useState } from "react"
import { call } from "@/service/ApiService"
import Link from "next/link"

export function ResultBlock(props: { data: ListProps; opt: 0 | 1; }) {
  let urlLink = `/event/${props.data.event.eventId}`
  if (props.data.event.type !== 'PARTY') {
    return (
      <div className="flex flex-col justify-between py-[18px] px-[16px]">
        <Link href={urlLink} className='flex flex-row justify-between items-center'>
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
                : <Link href={`/user/${props.data.post.writer.userId}`} className='flex flex-row items-center gap-[4px]'>
                  {/* <img className='rounded-full w-[24px] h-[24px]' src={props.data.post.writer.userProfileImageUrl ?? '/profile_main.svg'} /> */}
                  <img className='rounded-full w-[24px] h-[24px]' src="/profile_main.svg" />
                  <p className="text-black">{props.data.post.writer.userName}</p>
                </Link>
              }
            </div>
          </div>
          <img className='rounded-[4px] w-[92px] h-[116px] object-cover' src={props.data.post.headImageUrl ?? '/default_list_thumb3x.png'} />
        </Link>
        {props.opt === 1 ? <HashtagAccordion tag={props.data.post.tags} /> : <></>}
      </div>
    )
  } else {
    return (
      <div className="flex flex-col justify-between py-[18px] px-[16px]">
        <Link href={urlLink} className='flex flex-col items-start gap-[4px]'>
          <p className='text-16 font-semibold truncate'>{props.data.post.title}</p>
          <p className='text-14 text-gray3'>{FormatDateRange(props.data.event.startDate, props.data.event.endDate)}</p>
          <div className='flex flex-row items-center gap-[4px] text-14'>
            {props.data.post.writer.userId === null ? <NoUser />
              : <Link href={`/user/${props.data.post.writer.userId}`} className='flex flex-row items-center gap-[4px]'>
                {/* <img className='rounded-full w-[24px] h-[24px]' src={props.data.post.writer.userProfileImageUrl ?? '/profile_main.svg'} /> */}
                <img className='rounded-full w-[24px] h-[24px]' src="/profile_main.svg" />
                <p className="text-black">{props.data.post.writer.userName}</p>
              </Link>
            }
            <DividerDot />
            <p className='text-gray3'>{`${props.data.event.currentHeadCount}/${props.data.event.maxHeadCount}(명)`}</p>
            {props.data.event.currentHeadCount !== props.data.event.maxHeadCount ? <></>
              : <p className="done-chip">모집완료</p>
            }
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