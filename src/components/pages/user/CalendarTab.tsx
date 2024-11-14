"use client";
import Link from 'next/link';
import { CalProps, NoData, Divider, UserProfile, HeadCount, BlockInfo } from '@/components/common';
import { FormatDateRange, typeString } from '@/service/Functions';
import dayjs from 'dayjs';
import { UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { DeleteIcn } from '@/components/common/styles/Icon';
import { useDelete } from '@/hooks/useInCommon';

export function CalendarTab(props: { focusDay: Date | null; editing: boolean; }) {
  console.log('focusDay: ', props.focusDay)
  if (!!props.focusDay) {
    const queryClient = useQueryClient()
    const qKey = ['calendar', `${props.focusDay.getFullYear()}-${props.focusDay.getMonth() + 1}`]
    let calendarData: { dates: Date[], events: { [key: string]: any[] } } | undefined = queryClient.getQueryData(qKey);
    let focusedEvent = !!calendarData ? calendarData.events[dayjs(props.focusDay).format('YYYY-MM-DD')] ?? [] : []

    return (
      <div className='w-full'>
        {focusedEvent.length > 0
          ? <div className='flex flex-col bg-white'>
            {focusedEvent.map((post, idx) => (
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
  } else { return (<></>) }
}

function CalendarBlock(props: { data: CalProps; editing: boolean; qKey: string[] }) {
  const handleDelete = (e: any, mutateDelete: UseMutationResult<any, Error, void, unknown>) => {
    e.preventDefault();
    let confirmDelete = confirm("캘린더에서 삭제하시겠습니까?");
    if (confirmDelete) { mutateDelete.mutate() }
  }
  if (!!props.data.eventId) {
    const mutateDelete = useDelete(`/api/user/calendar/event/${props.data.eventId}`, props.qKey, '캘린더에서 이벤트')
    return (
      <Link href={`/event/${props.data.eventId}`} passHref legacyBehavior className='flex justify-between py-[18px] px-[16px]'>
        <div className='flex flex-row justify-between items-center pb-[10px] w-full'>
          <div className='flex flex-col justify-between gap-[17px] h-[104px]'>
            <BlockInfo title={props.data.title} date={FormatDateRange(props.data.startTime, props.data.endTime)} address={props.data.abstractLocation}
              direction='row' type={typeString[props.data.type as string]} />
            <div className='flex flex-row items-center gap-[4px]'>
              <UserProfile userId={props.data.userId} userName={props.data.userName} userProfileImageUrl={props.data.userProfileImageUrl} />
              {props.data.type === 'PARTY' ? <HeadCount currentHeadCount={props.data.currentHeadCount} maxHeadCount={props.data.maxHeadCount} state={props.data.state} /> : <></>}
            </div>
          </div>
          <div className='flex flex-row gap-[8px] items-start'>
            <img className='rounded-[4px] w-[92px] h-[116px] object-cover' src={props.data.headImageUrl ?? '/default_list_thumb3x.png'} />
            {!props.editing ? <></>
              : <button onClick={(e) => handleDelete(e, mutateDelete)}><DeleteIcn /></button>}
          </div>
        </div>
      </Link>
    )
  } else if (!!props.data.recruitmentId) {
    const mutateDelete = useDelete(`/api/user/calendar/recruitment/${props.data.recruitmentId}`, props.qKey, '캘린더에서 모집글')
    return (
      <Link href={`/recruitment/${props.data.recruitmentId}`} className='flex justify-between py-[18px] px-[16px]'>
        <div className='flex flex-row justify-between items-center pb-[10px] w-full'>
          <div className='flex flex-col justify-between gap-[17px] h-[104px]'>
            <BlockInfo title={props.data.title} date={FormatDateRange(props.data.startTime, props.data.endTime)}
              direction='row' type='모집글' />
            <div className='flex flex-row items-center gap-[4px]'>
              <UserProfile userId={props.data.userId} userName={props.data.userName} userProfileImageUrl={props.data.userProfileImageUrl} />
              <HeadCount currentHeadCount={props.data.currentHeadCount} maxHeadCount={props.data.maxHeadCount} state={props.data.state} />
            </div>
          </div>
          <div className='flex flex-row gap-[8px] items-start'>
            <img className='rounded-[4px] w-[92px] h-[116px] object-cover' src={props.data.headImageUrl ?? '/default_list_thumb3x.png'} />
            {!props.editing ? <></>
              : <button onClick={(e) => handleDelete(e, mutateDelete)}><DeleteIcn /></button>}
          </div>
        </div>
      </Link>
    )
  }
}