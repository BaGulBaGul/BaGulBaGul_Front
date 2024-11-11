import { HashtagAccordion, HeadCount, ListProps, UserProfile, BlockInfo } from "@/components/common"
import { FormatDateRange } from "@/service/Functions"
import Link from "next/link"

export function EventBlock(props: { data: ListProps }) {
  return (
    <div className="flex flex-col justify-between py-[18px] px-[16px]">
      <Link href={`/event/${props.data.event.eventId}`} passHref legacyBehavior>
        <div className='flex flex-row justify-between items-center'>
          <div className='flex flex-col justify-between w-[calc(100%-152px)] h-[116px]'>
            <BlockInfo title={props.data.post.title} date={FormatDateRange(props.data.event.startDate, props.data.event.endDate)} address={props.data.event.abstractLocation} />
            <div className='flex flex-row items-center gap-[4px]'>
              <UserProfile userId={props.data.post.writer.userId} userName={props.data.post.writer.userName} userProfileImageUrl={props.data.post.writer.userProfileImageUrl} />
              {props.data.event.type !== 'PARTY' ? <></>
                : <HeadCount currentHeadCount={props.data.event.currentHeadCount} maxHeadCount={props.data.event.maxHeadCount} />}
            </div>
          </div>
          <img className='rounded-[4px] w-[92px] h-[116px] object-cover' src={props.data.post.headImageUrl ?? '/default_list_thumb3x.png'} />
        </div>
      </Link>
      {props.data.post.tags.length > 0 ? <div className="pt-[10px]"><HashtagAccordion tag={props.data.post.tags} /></div> : <></>}
    </div>
  )
}