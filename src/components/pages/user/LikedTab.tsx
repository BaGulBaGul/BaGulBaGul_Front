"use client";
import { useEffect, useRef, useState } from 'react';
import { FormatDateRange, applyLike, setPageInfo, setUniqueList, tabList } from '@/service/Functions';
import { call } from '@/service/ApiService';
import { MoreButton, NoEvent, TabPanels, PostTab, LikeProps, LikeRProps } from '@/components/common';
import { LikeIcn } from '@/components/common/styles/Icon';
import { ViewToggle } from './UserButtons';
import dayjs from 'dayjs';
import Link from 'next/link';

export function LikedTab() {
  const [value, setValue] = useState(0);
  const [view, setView] = useState<string>('EVT');

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setView('EVT');
  };

  const [isLoading, setLoading] = useState(true)
  const [events, setEvents] = useState<LikeProps[] | LikeRProps[]>([]);
  const [page, setPage] = useState({ current: 0, total: 0, });
  const initialSet = useRef(false);

  useEffect(() => {
    if (initialSet.current) { initialSet.current = false }
    setEvents([])
    setLoading(true);
  }, [value, view])

  useEffect(() => {
    let apiURL = view === 'EVT' ? `/api/event/mylike?type=${tabList[value]}&size=10&page=${page.current}`
      : `/api/event/recruitment/mylike?type=${tabList[value]}&size=10&page=${page.current}`
    call(apiURL, "GET", null)
      .then((response) => {
        console.log(response.data);
        if (!response.data.empty) {
          if (!initialSet.current) {  // 페이지값 초기설정
            setPage({ current: 0, total: response.data.totalPages })
            initialSet.current = true;
          }
          setUniqueList(`L-${view}`, response.data.content, setEvents, events)
        }
        setLoading(false)
      })
  }, [isLoading, page])

  return (
    <div className='flex flex-col w-full pb-[10px]'>
      <div className='fixed top-[60px] flex flex-row justify-between items-center w-full px-[16px] bg-p-white z-10'>
        <PostTab value={value} handleChange={handleChange} cN='items-center min-h-0 py-[10px]' />
        {value === 2 ? <></> : <ViewToggle view={view} setView={setView} />}
      </div>
      <div className='mt-[108px]'>
        <TabPanels value={value}
          child1={<TabBlock events={events} page={page} setPage={setPage} isLoading={isLoading} view={view} />}
          child2={<TabBlock events={events} page={page} setPage={setPage} isLoading={isLoading} view={'EVT'} />} />
      </div>
    </div >
  )
}

const TabBlock = (props: { events: any; page: any; setPage: any; isLoading: boolean; view: string; }) => {
  const handleMore = () => { setPageInfo(props.page, props.setPage, props.page.current + 1) }
  if (props.events.length > 0) {
    if (props.view === 'EVT') {
      return (
        <div className='bg-p-white'>
          {props.events.map((post: LikeProps, idx: any) => (
            <LikedPostBlock data={post} key={`like-${idx}`} />
          ))}
          {props.page.total > 1 && props.page.current + 1 < props.page.total
            ? <MoreButton onClick={handleMore} /> : <></>
          }
        </div>
      )
    } else if (props.view === 'RCT') {
      return (
        <div className='bg-p-white'>
          {props.events.map((post: LikeRProps, idx: any) => (
            <LikedAccompanyBlock data={post} key={`like-${idx}`} />
          ))}
          {props.page.total > 1 && props.page.current + 1 < props.page.total
            ? <MoreButton onClick={handleMore} /> : <></>
          }
        </div>
      )
    }
  } else {
    return (
      <NoEvent text1="좋아요 누른 게시물이 없어요." text2="인기 게시물에 좋아요를 눌러보세요!" buttonText={"페스티벌 인기순 보러가기"} />
    )
  }
}

function LikedPostBlock(props: { data: LikeProps }) {
  const [liked, setLiked] = useState(true);
  const handleLike = (e: any) => {
    e.preventDefault();
    applyLike(true, liked, `/api/event/${props.data.eventId}/like`, setLiked)
  }
  return (
    <Link href={`/event/${props.data.eventId}`} className='flex flex-row px-[16px] py-[18px] gap-[20px]'>
      <img className='rounded-[4px] h-[104px] w-[84px] min-w-[84px] object-cover' src={props.data.headImageUrl ?? '/default_list_thumb3x.png'} />
      <div className='flex flex-col justify-between w-full'>
        <div className='flex flex-col justify-between w-full'>
          <div className='flex flex-row justify-between w-full'>
            <span className='text-14 text-gray3'>{FormatDateRange(props.data.startDate, props.data.endDate)}, {props.data.abstractLocation}</span>
            <button className="h-[22px] w-[24px]" onClick={handleLike}>
              <LikeIcn val={liked} />
            </button>
          </div>
          <span className='text-16 text-[#333333] font-semibold'>{props.data.title}</span>
        </div>
        <span className='text-12 text-gray3 description max-w-[278px]'>
          {props.data.content ?? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer consectetur turpis congue massa laoreet rutrum."}
        </span>
      </div>
    </Link>
  )
}

function LikedAccompanyBlock(props: { data: LikeRProps }) {
  const [liked, setLiked] = useState(true);
  const handleLike = (e: any) => {
    e.preventDefault();
    applyLike(true, liked, `/api/event/recruitment/${props.data.recruitmentId}/like`, setLiked)
  }
  return (
    <Link href={`/recruitment/${props.data.recruitmentId}`} className='flex flex-col px-[16px] py-[18px] gap-[4px]'>
      <div className='flex flex-row justify-between items-start'>
        <div className='flex flex-col gap-[4px]'>
          <span className='text-14 text-gray3'>{dayjs(props.data.startDate).format('YY.MM.DD')}</span>
          <span className='text-16'>{props.data.title}</span>
          <span className='text-14 text-gray3'>{props.data.eventTitle ?? '-'}</span>
        </div>
        <button className="h-[22px] w-[24px]" onClick={handleLike}>
          <LikeIcn val={liked} />
        </button>
      </div>
    </Link>
  )
}