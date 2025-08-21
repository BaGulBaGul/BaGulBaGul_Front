import { UseInfiniteQueryResult, InfiniteData } from "@tanstack/react-query";
import { Divider, ListProps, ListWrapper, RListProps, SkeletonList } from "@/components/common";
import { NoData, BlockWrapper, BlockBodyAD, BlockBodyN } from "@/components/common/block";
import { RadioIcn } from "@/components/common/styles/Icon";

interface Props {
  opt: 'EVT' | 'RCT'; events: UseInfiniteQueryResult<InfiniteData<any, unknown>, Error>; editing?: boolean;
  handleSelected: (arg: any) => void;
}
export function PostList({ opt, events, editing, handleSelected }: Props) {
  return (
    <ListWrapper res={events} skeleton={<SkeletonList thumb={true} />}
      nodata={<NoData text1="찾는 행사가 없어요." />}>
      <div className='bg-p-white'>
        {events.data?.pages.map((event) => (
          event.content.map((item: ListProps | RListProps, idx: number) => (
            <div key={`event-${idx}`}>
              {idx === 0 ? <></> : <Divider />}
              {opt === 'EVT'
                ? <PostBlockE item={item as ListProps} editing={!!editing} />
                : <PostBlockR item={item as RListProps} editing={!!editing} />}
            </div>
          ))
        ))}
      </div>
    </ListWrapper>
  )
}

function PostBlockE({ item, editing }: { item: ListProps; editing: boolean }) {
  return (
    <BlockWrapper url={`/event/${item.event.eventId}`} wrapStyle='p-[16px]'
      blockAction={!!editing && <RadioIcn val={false} />}
      blockThumb={<img className='rounded-[4px] w-[92px] h-[116px] object-cover' src={item.post.headImageUrl ?? '/default_list_thumb3x.png'} />}>
      <BlockBodyAD title={item.post.title} startDate={item.event.startDate} endDate={item.event.endDate} address={item.event.abstractLocation}
        writer={item.post.writer} head={item.event.type === 'PARTY' ? { current: item.event.currentHeadCount, max: item.event.maxHeadCount } : undefined} />
    </BlockWrapper>
  )
}

function PostBlockR({ item, editing }: { item: RListProps; editing: boolean }) {
  return (
    <BlockWrapper url={`/recruitment/${item.recruitment.recruitmentId}`} wrapStyle='p-[16px]'
      blockAction={!!editing && <RadioIcn val={false} />}>
      <BlockBodyN title={item.post.title} startDate={item.recruitment.startDate} endDate={item.recruitment.endDate} name={'tmp name for event'} />
    </BlockWrapper>
  )
}