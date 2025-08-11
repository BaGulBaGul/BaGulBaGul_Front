import { UseInfiniteQueryResult, InfiniteData } from "@tanstack/react-query";
import { Divider, ListProps, ListWrapper, SkeletonList } from "@/components/common";
import { NoData, BlockWrapper, BlockBodyAD } from "@/components/common/block";

interface Props {
  events: UseInfiniteQueryResult<InfiniteData<any, unknown>, Error>; editing?: boolean;
  selectedId?: number; handleSelected: (arg: any) => void;
}
export function EventPostList({ events, editing, selectedId, handleSelected }: Props) {
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
              <BlockWrapper url='' wrapStyle='p-[16px] pb-[10px]'
                blockAction={!!editing && <button className="self-start" onClick={() => updateSelected(item)}><RadioIcn val={selectedId === item.event.eventId} /></button>}
                blockThumb={<img className='rounded-[4px] w-[92px] h-[116px] object-cover' src={item.post.headImageUrl ?? '/default_list_thumb3x.png'} />}>
                <BlockBodyAD title={item.post.title} startDate={item.event.startDate} endDate={item.event.endDate} address={item.event.abstractLocation}
                  writer={item.post.writer} head={item.event.type === 'PARTY' ? { current: item.event.currentHeadCount, max: item.event.maxHeadCount } : undefined} />
              </BlockWrapper>
            </div>
          ))
        ))}
      </div>
    </ListWrapper>
  )
}

// * 체크박스 아이콘 이동 및 공통사용적용 필요
const RadioIcn = (props: { val: boolean }) => {
  if (!props.val) {
    return (
      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12.5" cy="12" r="8.5" stroke="#C1C1C1" />
      </svg>
    )
  } else {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="8.5" stroke="#C1C1C1" />
        <circle cx="12" cy="12" r="5" fill="#4A6AFE" />
      </svg>
    )
  }
}

const CheckIcn = (props: { val: boolean }) => {
  if (!props.val) {
    return (
      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12.5" cy="12" r="8.5" stroke="#C1C1C1" />
      </svg>
    )
  } else {
    return (
      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12.5" cy="12" r="9" fill="#4A6AFE" />
        <path d="M8.5 11.7241L11.5377 14.25L16.5 9.75" stroke="#FCFCFC" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  }
}