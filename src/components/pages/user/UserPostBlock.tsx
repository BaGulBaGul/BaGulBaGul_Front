import Link from 'next/link';
import { FormatDateRange } from '@/service/Functions';
import { ListProps, RListProps } from '@/components/common';
import { BlockInfo, HeadCount, BlockInfoDT, UserProfile } from '@/components/common/block';

export function MyPostBlock(props: { opt: 'EVT' | 'RCT', data: ListProps | RListProps }) {
  if (props.opt === 'EVT') {
    let data = props.data as ListProps
    return (
      <Link href={`/event/${data.event.eventId}`} className='flex flex-row p-[16px] justify-between gap-[20px] bg-p-white'>
        <div className='flex flex-col justify-between w-full'>
          <BlockInfo title={data.post.title} date={FormatDateRange(data.event.startDate, data.event.endDate)} address={data.event.abstractLocation} />
          <HeadCount currentHeadCount={data.event.currentHeadCount} maxHeadCount={data.event.maxHeadCount} dot={false} />
        </div>
        <img className='rounded-[4px] h-[116px] w-[92px] min-w-[92px] object-cover' src={data.post.headImageUrl} />
      </Link>
    )
  } else {
    let data = props.data as RListProps
    return (
      <Link href={`/recruitment/${data.recruitment.recruitmentId}`} className='flex flex-col justify-between w-full px-[16px] py-[18px] gap-[4px] bg-p-white'>
        <BlockInfoDT title={props.data.post.title} date={FormatDateRange(data.recruitment.startDate, data.recruitment.endDate)} />
        <span className='text-14 text-gray3'>PEAK FESTIVAL 2023</span>
      </Link>
    )
  }
}

export function UserPostBlock(props: { opt: string, data: ListProps | RListProps }) {
  let url = props.opt === 'EVT' ? `/event/${(props.data as ListProps).event.eventId}` : `/recruitment/${(props.data as RListProps).recruitment.recruitmentId}`
  let d = props.opt === 'EVT' ? (props.data as ListProps).event : (props.data as RListProps).recruitment
  return (
    <Link href={url} className='flex flex-row p-[16px] justify-between gap-[20px] bg-p-white'>
      <div className='flex flex-col justify-between w-full'>
        <BlockInfo title={props.data.post.title} date={FormatDateRange(d.startDate, d.endDate)} address={props.opt === 'EVT' ? (props.data as ListProps).event.abstractLocation : undefined} />
        <div className='flex flex-row items-center gap-[4px]'>
          <UserProfile userId={props.data.post.writer.userId} userName={props.data.post.writer.userName} userProfileImageUrl={props.data.post.writer.userProfileImageUrl} />
          <HeadCount currentHeadCount={d.currentHeadCount} maxHeadCount={d.maxHeadCount} />
        </div>
      </div>
      <img className='rounded-[4px] h-[116px] w-[92px] min-w-[92px] object-cover' src={props.data.post.headImageUrl} />
    </Link>
  )
}