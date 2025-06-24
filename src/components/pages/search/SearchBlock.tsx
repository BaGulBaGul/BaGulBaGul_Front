import Link from "next/link"
import { FormatDateRange } from "@/service/Functions"
import { useRankEvents } from "@/hooks/useInRanking"
import { EventType, SkeletonList } from "../../common"
import { HashtagButton } from "@/components/common/block";

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