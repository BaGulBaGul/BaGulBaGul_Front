"use client";
import { useState } from 'react';
import { tabList } from '@/service/Functions';
import { MoreButton, NoEvent, TabPanels, PostTab, LikeProps, LikeRProps, Divider } from '@/components/common';
import { ViewToggle, LikedAccompanyBlock, LikedPostBlock } from '.';
import { InfiniteData } from '@tanstack/react-query';
import { handleMore, useListWithPage } from '@/hooks/useInCommon';

export function LikedTab() {
  const [value, setValue] = useState(0);
  const [view, setView] = useState<string>('EVT');

  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (view !== 'EVT') { setView('EVT'); }
  };

  const apiURL = view === 'EVT' ? `/api/event/mylike?type=${tabList[value]}&size=10`
    : `/api/event/recruitment/mylike?type=${tabList[value]}&size=10`
  const { data: events, fetchNextPage, hasNextPage, status } = useListWithPage(apiURL, ['liked-posts', value, view])

  return (
    <div className='flex flex-col w-full pb-[10px]'>
      <div className='fixed top-[60px] flex flex-row justify-between items-center w-full px-[16px] bg-p-white z-10'>
        <PostTab value={value} handleChange={handleChange} cN='items-center min-h-0 py-[10px]' />
        {value === 2 ? <></> : <ViewToggle view={view} setView={setView} />}
      </div>
      <div className='mt-[108px]'>
        <TabPanels value={value}
          child1={<TabBlock events={events} hasNextPage={hasNextPage} handleMore={() => handleMore(hasNextPage, fetchNextPage)} status={status} value={value} view={view} />}
          child2={<TabBlock events={events} hasNextPage={hasNextPage} handleMore={() => handleMore(hasNextPage, fetchNextPage)} status={status} value={value} view={'EVT'} />} />
      </div>
    </div >
  )
}

interface LikedTabBlockProps {
  events: InfiniteData<any, unknown> | undefined; hasNextPage: boolean; handleMore: any; status: any;
  value: number; view: string;
}
function TabBlock(props: LikedTabBlockProps) {
  if (props.status === 'success' && !!props.events) {
    return (
      <div className='bg-p-white'>
        {props.view === 'EVT'
          ? <>{props.events.pages.map((event) => (
            event.content.map((item: LikeProps, idx: any) => (
              <>
                {idx === 0 ? <></> : <Divider />}
                <LikedPostBlock data={item} key={`like-${idx}`} />
              </>
            ))
          ))}</>
          : <>{props.events.pages.map((event) => (
            event.content.map((item: LikeRProps, idx: any) => (
              <>
                {idx === 0 ? <></> : <Divider />}
                <LikedAccompanyBlock data={item} key={`like-${idx}`} />
              </>
            ))
          ))}</>
        }
        {props.hasNextPage ? <MoreButton onClick={props.handleMore} /> : <></>}
      </div>
    )
  } else {
    return (
      <NoEvent text1="좋아요 누른 게시물이 없어요." text2="인기 게시물에 좋아요를 눌러보세요!" buttonText={"페스티벌 인기순 보러가기"} />
    )
  }
}