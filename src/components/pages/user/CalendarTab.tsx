"use client";
import Link from 'next/link';
import { CalProps, NoData, Divider, UserProfile, HeadCount, BlockInfo } from '@/components/common';
import { FormatDateRange, typeString } from '@/service/Functions';
import { UseMutationResult } from '@tanstack/react-query';
import { DeleteIcn } from '@/components/common/styles/Icon';
import { useDelete } from '@/hooks/useInCommon';

export function CalendarTab(props: { focusDay: Date; editing: boolean; focusEvents: any }) {
  let qKey = ['calendar', `${props.focusDay.getFullYear()}-${props.focusDay.getMonth() + 1}`]
  return (
    <div className='w-full'>
      {!!props.focusEvents && props.focusEvents.length > 0
        ? <div className='flex flex-col bg-white'>
          {!props.editing ? <></>
            : <div className="flex justify-end items-center w-full px-[16px] py-[10px]">
              <button className="text-12 text-gray3">전체삭제</button>
            </div>}
          {props.focusEvents.map((post: CalProps, idx: number) => (
            <div key={`event-${idx}`}>
              {idx === 0 ? <></> : <Divider />}
              <CalendarBlock data={post} editing={props.editing} qKey={qKey} key={`cal-${idx}`} />
            </div>
          ))}
        </div>
        : <NoData text1="저장된 이벤트가 없어요." text2="지금 인기 있는 페스티벌을 저장해보세요!" buttonText="페스티벌 인기순 보러가기" buttonLink="/?sort=likeCount%2Cdesc" />
      }
    </div>
  )
}

function CalendarBlock(props: { data: CalProps; editing: boolean; qKey: string[] }) {
  const handleDelete = (e: any, mutateDelete: UseMutationResult<any, Error, void, unknown>) => {
    e.preventDefault();
    let confirmDelete = confirm("캘린더에서 삭제하시겠습니까?");
    if (confirmDelete) { mutateDelete.mutate() }
  }
  const mutateDelete = !!props.data.eventId ? useDelete(`/api/user/calendar/event/${props.data.eventId}`, props.qKey, '캘린더에서 이벤트')
    : useDelete(`/api/user/calendar/recruitment/${props.data.recruitmentId}`, props.qKey, '캘린더에서 모집글')
  const url = !!props.data.eventId ? `/event/${props.data.eventId}` : `/recruitment/${props.data.recruitmentId}`

  return (
    <Link href={url} passHref legacyBehavior>
      <div className='flex flex-row justify-between items-center p-[16px] w-full'>
        <div className='flex flex-row gap-[16px] items-start'>
          {!props.editing ? <></> : <button onClick={(e) => handleDelete(e, mutateDelete)}><DeleteIcn /></button>}
          <div className='flex flex-col justify-between gap-[17px]'>
            <BlockInfo title={props.data.title} date={FormatDateRange(props.data.startTime, props.data.endTime)} address={props.data.abstractLocation}
              direction='row' type={!!props.data.eventId ? typeString[props.data.type as string] : '모집글'} />
            <div className='flex flex-row items-center gap-[4px]'>
              <UserProfile userId={props.data.userId} userName={props.data.userName} userProfileImageUrl={props.data.userProfileImageUrl} />
              {props.data.type === 'PARTY' || !!props.data.recruitmentId ? <HeadCount currentHeadCount={props.data.currentHeadCount} maxHeadCount={props.data.maxHeadCount} state={props.data.state} /> : <></>}
            </div>
          </div>
        </div>
        <img className='rounded-[4px] w-[92px] h-[116px] object-cover' src={props.data.headImageUrl ?? '/default_list_thumb3x.png'} />
      </div>
    </Link>
  )
}