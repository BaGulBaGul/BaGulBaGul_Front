"use client";
import { UseMutationResult } from '@tanstack/react-query';
import { useDelete } from '@/hooks/useInCommon';
import { CalProps, Divider } from '@/components/common';
import { NoData, BlockWrapper, BlockBodyCal } from '@/components/common/block';

export function CalendarTab({ focusDay, editing, focusEvents }: { focusDay: Date; editing: boolean; focusEvents: any }) {
  let qKey = ['calendar', `${focusDay.getFullYear()}-${focusDay.getMonth() + 1}`]
  if (!focusEvents || focusEvents.length === 0) {
    return (<NoData text1="저장된 이벤트가 없어요." text2="지금 인기 있는 페스티벌을 저장해보세요!" buttonText="페스티벌 인기순 보러가기" buttonLink="/?sort=likeCount%2Cdesc" />)
  }
  return (
    <div className='flex flex-col w-full bg-white'>
      {editing && <div className="flex justify-end items-center w-full px-[16px] py-[10px]">
        <button className="text-12 text-gray3">전체삭제</button>
      </div>}
      {focusEvents.map((post: CalProps, idx: number) => (
        <div key={`event-${idx}`}>
          {idx === 0 ? <></> : <Divider />}
          {post.type !== 'RECRUITMENT'
            ? <CalendarBlockE data={post} editing={editing} qKey={qKey} key={`cal-${idx}`} />
            : <CalendarBlockR data={post} editing={editing} qKey={qKey} key={`cal-${idx}`} />
          }
        </div>
      ))}
    </div>
  )
}

function CalendarBlockE({ data, editing, qKey }: { data: CalProps; editing: boolean; qKey: string[] }) {
  const handleDelete = (e: any, mutateDelete: UseMutationResult<any, Error, void, unknown>) => {
    e.preventDefault();
    let confirmDelete = confirm("캘린더에서 삭제하시겠습니까?");
    if (confirmDelete) { mutateDelete.mutate() }
  }
  const mutateDelete = useDelete(`/api/user/calendar/event/${data.eventId}`, qKey, '캘린더에서 이벤트')

  return (
    <BlockWrapper url={`/event/${data.eventId}`} wrapStyle='p-[16px]'
      blockAction={!!editing && <>p</>}
      blockThumb={<img className='rounded-[4px] w-[92px] h-[116px] object-cover' src={data.headImageUrl ?? '/default_list_thumb3x.png'} />}>
      <BlockBodyCal title={data.title} startDate={data.startTime} endDate={data.endTime} writer={undefined}
        head={data.type === 'PARTY' ? { current: data.currentHeadCount, max: data.maxHeadCount } : undefined}
        type={data.type ?? ''} address={data.abstractLocation} />
    </BlockWrapper>
  )
}

function CalendarBlockR({ data, editing, qKey }: { data: CalProps; editing: boolean; qKey: string[] }) {
  const handleDelete = (e: any, mutateDelete: UseMutationResult<any, Error, void, unknown>) => {
    e.preventDefault();
    let confirmDelete = confirm("캘린더에서 삭제하시겠습니까?");
    if (confirmDelete) { mutateDelete.mutate() }
  }
  const mutateDelete = useDelete(`/api/user/calendar/recruitment/${data.recruitmentId}`, qKey, '캘린더에서 모집글')

  return (
    <BlockWrapper url={`/recruitment/${data.recruitmentId}`}
      blockAction={!!editing && <>p</>}>
      <BlockBodyCal title={data.title} startDate={data.startTime} endDate={data.endTime} writer={undefined}
        head={{ current: data.currentHeadCount, max: data.maxHeadCount }}
        type='RCT' />
    </BlockWrapper>
  )
}