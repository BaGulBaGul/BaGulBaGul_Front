"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CalProps, NoEvent, Divider, NoUser } from '@/components/common';
import { call } from '@/service/ApiService';
import { FormatDateRange, setUniqueList, typeString } from '@/service/Functions';
import { ViewToggle } from '.';
import dayjs from 'dayjs';

export function CalendarTab(props: { focusDay: any; setEventDates: any; }) {
  const [view, setView] = useState<string>('EVT');
  const [isLoading, setLoading] = useState(true)
  const [events, setEvents] = useState<CalProps[]>([]);

  useEffect(() => {
    setEvents([])
    setLoading(true);
  }, [props.focusDay, view])

  useEffect(() => {
    let dateS = dayjs(props.focusDay).format('YYYY-MM-DD')
    let apiURL = `/api/user/calendar/event?searchStartTime=${dateS}T00:00:00&searchEndTime=${dateS}T23:59:59`
    // let apiURL = view === 'EVT' ? `/api/user/calendar/event?searchStartTime=${dateS}T00:00:00&searchEndTime=${dateS}T23:59:59`
    //   : ``
    call(apiURL, "GET", null)
      .then((response) => {
        console.log(response);
        if (response.data.length > 0) { setUniqueList('CAL', response.data, setEvents, events) }
        else { setEvents([]) }
        setLoading(false)
      })
  }, [isLoading])

  return (
    <div className='w-full'>
      {events.length > 0
        ? <div className='flex flex-col bg-white'>
          <div className='flex flex-row justify-end pt-[10px] px-[16px]'>
            <ViewToggle view={view} setView={setView} />
          </div>
          {events.map((post, idx) => (
            <div key={`event-${idx}`}>
              {idx === 0 ? <></> : <Divider />}
              <CalendarBlock data={post} key={`cal-${idx}`} />
            </div>
          ))}
          {/* {props.page.total > 1 && props.page.current + 1 < props.page.total
            ? <MoreButton onClick={handleMore} /> : <></>
          } */}
        </div>
        : <NoEvent text1="저장된 이벤트가 없어요." text2="지금 인기 있는 페스티벌을 저장해보세요!" buttonText={"페스티벌 인기순 보러가기"} />
      }
    </div>
  )
}

function CalendarBlock(props: { data: CalProps }) {
  let urlLink = `/event/${props.data.eventId}`
  return (
    <Link className='flex justify-between py-[18px] px-[16px]' href={urlLink}>
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
              : <a href={`/user/${props.data.userId}`} className='flex flex-row items-center gap-[4px]'>
                {/* <img className='rounded-full w-[24px] h-[24px]' src={props.data.userProfileImageUrl ?? '/profile_main.svg'} /> */}
                <img className='rounded-full w-[24px] h-[24px]' src="/profile_main.svg" />
                <p className="text-14 text-black">{props.data.userName ?? '-'}</p>
              </a>
            }
          </div>
        </div>
        <img className='rounded-[4px] w-[84px] h-[104px] object-cover' src={props.data.headImageUrl ?? '/default_list_thumb3x.png'} />
      </div>
    </Link>
  )
}