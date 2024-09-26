"use client";
import Link from 'next/link';
import { CalProps, NoEvent, Divider, NoUser } from '@/components/common';
import { DividerDot } from '@/components/common/styles/Icon';
import { FormatDateRange, typeString } from '@/service/Functions';
import dayjs from 'dayjs';

export function CalendarTab(props: { focusDay: any; events?: { [key: string]: any[] }; isLoading: boolean; router: any; }) {
  const focusedEvent = props.events === undefined ? [] : props.events[dayjs(props.focusDay).format('YYYY-MM-DD')] ?? []

  return (
    <div className='w-full'>
      {focusedEvent.length > 0
        ? <div className='flex flex-col bg-white'>
          {focusedEvent.map((post, idx) => (
            <div key={`event-${idx}`}>
              {idx === 0 ? <></> : <Divider />}
              <CalendarBlock data={post} key={`cal-${idx}`} router={props.router} />
            </div>
          ))}
        </div>
        : <NoEvent text1="저장된 이벤트가 없어요." text2="지금 인기 있는 페스티벌을 저장해보세요!" buttonText={"페스티벌 인기순 보러가기"} />
      }
    </div>
  )
}

function CalendarBlock(props: { data: CalProps; router: any }) {
  if (props.data.eventId && props.data.eventId > 0) {
    return (
      <div onClick={() => { props.router.push(`/event/${props.data.eventId}`) }} className='flex justify-between py-[18px] px-[16px]'>
        <div className='flex flex-row justify-between items-center pb-[10px] w-full'>
          <div className='flex flex-col justify-between gap-[17px] w-full h-[104px]'>
            <div className='flex flex-col gap-[4px]'>
              <div className="rounded-[2px] bg-gray1 px-[4px] py-[2px] text-12 w-fit">{typeString[props.data.type as string]}</div>
              <p className='text-16 font-semibold truncate'>{props.data.title}</p>
              <div className="flex flex-row text-14 text-gray3 gap-[4px]">
                <p>{props.data.abstractLocation}</p>
                <p>{FormatDateRange(props.data.startTime, props.data.endTime)}</p>
              </div>
            </div>
            <div className='flex flex-row items-center gap-[4px]'>
              {props.data.userId === null ? <NoUser />
                : <Link href={`/user/${props.data.userId}`} className='flex flex-row items-center gap-[4px]'>
                  {/* <img className='rounded-full w-[24px] h-[24px]' src={props.data.userProfileImageUrl ?? '/profile_main.svg'} /> */}
                  <img className='rounded-full w-[24px] h-[24px]' src="/profile_main.svg" />
                  <p className="text-14 text-black">{props.data.userName ?? '-'}</p>
                </Link>
              }
              {props.data.type === 'PARTY' && props.data.currentHeadCount && props.data.maxHeadCount
                ? <>
                  <DividerDot />
                  <p className='text-gray3'>{`${props.data.currentHeadCount ?? 0}/${props.data.maxHeadCount ?? 0}(명)`}</p>
                  {props.data.currentHeadCount < props.data.maxHeadCount ? <></> : <p className="done-chip">모집완료</p>}
                </> : <></>
              }
            </div>
          </div>
          <img className='rounded-[4px] w-[84px] h-[104px] object-cover' src={props.data.headImageUrl ?? '/default_list_thumb3x.png'} />
        </div>
      </div>
    )
  } else if (props.data.recruitmentId && props.data.recruitmentId > 0) {
    return (
      <div onClick={() => { props.router.push(`/recruitment/${props.data.recruitmentId}`) }} className='flex justify-between py-[18px] px-[16px]'>
        <div className='flex flex-row justify-between items-center pb-[10px] w-full'>
          <div className='flex flex-col justify-between gap-[17px] w-full h-[104px]'>
            <div className='flex flex-col gap-[4px]'>
              <div className="rounded-[2px] bg-gray1 px-[4px] py-[2px] text-12 w-fit">모집글</div>
              <p className='text-16 font-semibold truncate'>{props.data.title}</p>
              <p className="text-14 text-gray3">{FormatDateRange(props.data.startTime, props.data.endTime)}</p>
            </div>
            <div className='flex flex-row items-center gap-[4px]'>
              {props.data.userId === null ? <NoUser />
                : <Link href={`/user/${props.data.userId}`} className='flex flex-row items-center gap-[4px]'>
                  {/* <img className='rounded-full w-[24px] h-[24px]' src={props.data.userProfileImageUrl ?? '/profile_main.svg'} /> */}
                  <img className='rounded-full w-[24px] h-[24px]' src="/profile_main.svg" />
                  <p className="text-14 text-black">{props.data.userName ?? '-'}</p>
                </Link>
              }
              <DividerDot />
              <p className='text-gray3'>{`${props.data.currentHeadCount ?? 0}/${props.data.maxHeadCount ?? 0}(명)`}</p>
              {props.data.state === "PROCEEDING" ? <></> : <p className="done-chip">모집완료</p>}
            </div>
          </div>
          <img className='rounded-[4px] w-[84px] h-[104px] object-cover' src={props.data.headImageUrl ?? '/default_list_thumb3x.png'} />
        </div>
      </div>
    )
  }
}