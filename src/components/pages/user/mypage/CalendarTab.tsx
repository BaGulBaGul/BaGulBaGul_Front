"use client";
import { CalProps, Divider, SkeletonList } from '@/components/common';
import { NoData, BlockWrapper, BlockBodyCal } from '@/components/common/block';
import { Toggle, ToggleGroup } from '@base-ui-components/react';
import { IconCheck } from '@/components/common/styles/Icon';

interface Props {
  eventsLoading: boolean, focusDay: Date; editing: boolean; focusEvents: any
  selectedItems: string[]; handleSelected: (value: any[], e: Event) => void;
}
export function CalendarTab({ eventsLoading, focusDay, editing, focusEvents, selectedItems, handleSelected }: Props) {
  // let qKey = ['calendar', `${focusDay.getFullYear()}-${focusDay.getMonth() + 1}`]

  if (eventsLoading) { return <SkeletonList num={3} type='CAL' /> }
  else if (!focusEvents || focusEvents.length === 0) {
    return (<NoData text1="저장된 이벤트가 없어요." text2="지금 인기 있는 페스티벌을 저장해보세요!" buttonText="페스티벌 인기순 보러가기" buttonLink="/?sort=likeCount%2Cdesc" />)
  }
  return (
    <div className='flex flex-col w-full bg-white'>
      {editing && <div className="flex justify-end items-center w-full px-[16px] py-[10px]">
        <button className="text-12 text-gray3" onClick={(e) => console.log(selectedItems)}>전체삭제</button>
      </div>}
      <ToggleGroup value={selectedItems} onValueChange={handleSelected} toggleMultiple={true} orientation="vertical">
        {focusEvents.map((post: CalProps, idx: number) => (
          <div key={`event-${idx}`}>
            {idx === 0 ? <></> : <Divider />}
            {!!post.eventId
              ? <CalendarBlockE data={post} editing={editing} selected={selectedItems.some(x => x === post.eventId?.toString())} key={`cal-${idx}`} />
              : <CalendarBlockR data={post} editing={editing} selected={selectedItems.some(x => x === post.recruitmentId?.toString())} key={`cal-${idx}`} />
            }
          </div>
        ))}
      </ToggleGroup>
    </div>
  )
}

function CalendarBlockE({ data, editing, selected }: { data: CalProps; editing: boolean; selected: boolean; }) {
  return (
    <Toggle value={data.eventId?.toString()} className='w-full'>
      <BlockWrapper url={`/event/${data.eventId}`} wrapStyle='p-[16px] gap-[18px]'
        blockAction={!!editing && <span className="p-[3px]"><IconCheck checked={selected} /></span>}
        blockThumb={<img className='rounded-[4px] w-[92px] h-[116px] object-cover' src={data.headImageUrl ?? '/default_list_thumb3x.png'} />}>
        <BlockBodyCal title={data.title} startDate={data.startTime} endDate={data.endTime} writer={undefined}
          head={data.type === 'PARTY' ? { current: data.currentHeadCount, max: data.maxHeadCount } : undefined}
          type={data.type ?? ''} address={data.abstractLocation} />
      </BlockWrapper>
    </Toggle>
  )
}

function CalendarBlockR({ data, editing, selected }: { data: CalProps; editing: boolean; selected: boolean; }) {
  return (
    <Toggle value={data.recruitmentId?.toString()} className='w-full'>
      <BlockWrapper url={`/recruitment/${data.recruitmentId}`} wrapStyle='p-[16px] gap-[18px]'
        blockAction={!!editing && <span className="p-[3px]"><IconCheck checked={selected} /></span>}>
        <BlockBodyCal title={data.title} startDate={data.startTime} endDate={data.endTime} writer={undefined}
          head={{ current: data.currentHeadCount, max: data.maxHeadCount }}
          type='RCT' />
      </BlockWrapper>
    </Toggle>
  )
}