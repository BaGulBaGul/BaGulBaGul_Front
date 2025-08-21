import { UseInfiniteQueryResult, InfiniteData } from "@tanstack/react-query";
import { Divider, ListProps, ListWrapper, SkeletonList } from "@/components/common";
import { NoData, BlockWrapper, BlockBodyCal } from "@/components/common/block";
import { RadioIcn } from "@/components/common/styles/Icon";

interface Props {
  events: UseInfiniteQueryResult<InfiniteData<any, unknown>, Error>; editing?: boolean;
  selectedId?: number; handleSelected: (arg: any) => void;
}
export function BannerEventList({ events, editing, selectedId, handleSelected }: Props) {
  const updateSelected = (item: ListProps) => {
    handleSelected({
      title: item.post.title, headImageUrl: item.post.headImageUrl, headImageKey: undefined,
      linkedEvent: {
        url: `event/${item.event.eventId}`, eventId: item.event.eventId, title: item.post.title,
        headImageUrl: item.post.headImageUrl, startDate: item.event.startDate, endDate: item.event.endDate,
      }
    })
  }

  return (
    <ListWrapper res={events} skeleton={<SkeletonList thumb={true} tag={true} />}
      nodata={<NoData text1="찾는 행사가 없어요." />}>
      <div className='bg-p-white'>
        {events.data?.pages.map((event) => (
          event.content.map((item: ListProps, idx: any) => (
            <div key={`event-${idx}`}>
              {idx === 0 ? <></> : <Divider />}
              <BlockWrapper url=""
                blockAction={!!editing && <button className="self-start p-[3px]" onClick={() => updateSelected(item)}><RadioIcn val={selectedId === item.event.eventId} /></button>}
                wrapStyle="gap-[18px] p-[16px] pb-[10px]" blockStyle="gap-[18px] pointer-events-none"
                blockThumb={<img className='rounded-[4px] w-[92px] h-[116px] object-cover' src={item.post.headImageUrl ?? '/default_list_thumb3x.png'} />}>
                <BlockBodyCal title={item.post.title} startDate={item.event.startDate} endDate={item.event.endDate} address={item.event.abstractLocation} type={item.event.type}
                  writer={item.post.writer} head={item.event.type === 'PARTY' ? { current: item.event.currentHeadCount, max: item.event.maxHeadCount } : undefined} />
              </BlockWrapper>
            </div>
          ))
        ))}
      </div>
    </ListWrapper>
  )
}