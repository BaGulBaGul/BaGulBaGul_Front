import { FormatDateRange } from "@/service/Functions"
import { BlockInfo, EventType, HashtagAccordion, HashtagButton, HeadCount, ListProps, SkeletonList, UserProfile } from "../../common"
import Link from "next/link"
import { useRankEvents } from "@/hooks/useInRanking"

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

export function SuggestBlock(props: { type: EventType; eventRanking: boolean; }) {
  const rankedTags = ['피크페스티벌', '10cm', '서울재즈페스티벌', '펜타포트', '데이식스', '월디제', '넬', '터치드', '상상실현페스티벌']
  const rankedEvents = useRankEvents(props.type)

  const SuggestText = () => {
    return (
      <div className="flex flex-col gap-[8px]">
        <span className="text-14">혹시 이건 어떠세요?</span>
        <div className="flex flex-row gap-[6px] flex-wrap">
          {rankedTags.map((s, idx) => <HashtagButton tag={s} key={`st-${idx}`} />)}
        </div>
      </div>
    )
  }
  const SuggestImage = () => {
    if (rankedEvents.isFetching || rankedEvents.isLoading) {
      return (<div className="overflow-hidden">
        <SkeletonList type='SGST' rowcol='row' />
      </div>
      )
    }
    return (
      <div className="overflow-hidden h-[204px]">
        <div className="flex flex-row gap-[16px] overflow-x-auto overflow-y-hide whitespace-nowrap">
          {rankedEvents.data.map((s: any, idx: number) =>
            <Link href={`/event/${s.eventId}`} className="flex flex-col w-[120px] gap-[12px]" key={`si-${idx}`}>
              <img className='h-[148px] w-[120px] min-w-[120px] rounded-[5.65px] object-cover' src={s.headImageUrl ?? '/default_list_thumb3x.png'} />
              <div className="flex flex-col text-14 items-center">
                <span className="font-semibold truncate w-full text-center">{s.title}</span>
                <span>{FormatDateRange(s.startDate, s.endDate)}</span>
              </div>
            </Link>)}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col px-[16px] py-[20px] gap-[16px] bg-p-white">
      <SuggestText />
      {!!props.eventRanking ? <SuggestImage /> : <></>}
    </div>
  )
}