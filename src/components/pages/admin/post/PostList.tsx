import { UseInfiniteQueryResult, InfiniteData } from "@tanstack/react-query";
import { Divider, ListProps, ListWrapper, RListProps, SkeletonList } from "@/components/common";
import { NoData, BlockWrapper, BlockBodyAD, BlockBodyN } from "@/components/common/block";
import { IconCheck } from "@/components/common/styles/Icon";
import { Toggle, ToggleGroup } from "@base-ui-components/react";

interface Props {
  opt: 'EVT' | 'RCT'; events: UseInfiniteQueryResult<InfiniteData<any, unknown>, Error>; editing?: boolean;
  selectedItems: string[]; handleSelected: (groupValue: any[], eventDetails: any) => void;
}
export function PostList({ opt, events, editing, selectedItems, handleSelected }: Props) {
  return (
    <ListWrapper res={events} skeleton={<SkeletonList thumb={true} />}
      nodata={<NoData text1="찾는 행사가 없어요." />}>
      <div className='bg-p-white'>
        <ToggleGroup value={selectedItems} onValueChange={handleSelected} multiple orientation="vertical">
          {events.data?.pages.map((event) => (
            event.content.map((item: ListProps | RListProps, idx: number) => (
              <div key={`event-${idx}`}>
                {idx === 0 ? <></> : <Divider />}
                {opt === 'EVT'
                  ? <PostBlockE item={item as ListProps} editing={!!editing} selected={selectedItems.some(x => x === (item as ListProps).event.eventId.toString())} />
                  : <PostBlockR item={item as RListProps} editing={!!editing} selected={selectedItems.some(x => x === (item as RListProps).recruitment.recruitmentId.toString())} />}
              </div>
            ))
          ))}
        </ToggleGroup>
      </div>
    </ListWrapper>
  )
}

function PostBlockE({ item, editing, selected }: { item: ListProps; editing: boolean; selected: boolean; }) {
  return (
    <Toggle value={item.event.eventId.toString()} className='w-full'>
      <BlockWrapper url={`/event/${item.event.eventId}`} wrapStyle='p-[16px] gap-[18px]'
        blockAction={!!editing && <span className="p-[3px]"><IconCheck checked={selected} /></span>}
        blockThumb={<img className='rounded-[4px] w-[92px] h-[116px] object-cover' src={item.post.headImageUrl ?? '/default_list_thumb3x.png'} />}>
        <BlockBodyAD title={item.post.title} startDate={item.event.startDate} endDate={item.event.endDate} address={item.event.abstractLocation}
          writer={item.post.writer} head={item.event.type === 'PARTY' ? { current: item.event.currentHeadCount, max: item.event.maxHeadCount } : undefined} />
      </BlockWrapper>
    </Toggle>
  )
}

function PostBlockR({ item, editing, selected }: { item: RListProps; editing: boolean; selected: boolean; }) {
  return (
    <Toggle value={item.recruitment.recruitmentId.toString()} className='w-full'>
      <BlockWrapper url={`/recruitment/${item.recruitment.recruitmentId}`} wrapStyle='p-[16px] gap-[18px]'
        blockAction={!!editing && <span className="p-[3px]"><IconCheck checked={selected} /></span>}>
        <BlockBodyN title={item.post.title} startDate={item.recruitment.startDate} endDate={item.recruitment.endDate} name={'tmp name for event'} />
      </BlockWrapper>
    </Toggle>
  )
}