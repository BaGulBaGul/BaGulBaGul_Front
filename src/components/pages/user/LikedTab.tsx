"use client";
import { useState } from 'react';
import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import { tabList } from '@/service/Functions';
import { handleMore, useListWithPage } from '@/hooks/useInCommon';
import { MoreButton, LikeProps, LikeRProps, Divider, LoadingCircle, SkeletonList, TypeTabs } from '@/components/common';
import { NoData } from '@/components/common/block';
import { ViewToggle, LikedAccompanyBlock, LikedPostBlock } from '.';

export function LikedTab() {
  const [value, setValue] = useState(0);
  const [view, setView] = useState<string>('EVT');

  const handleChange = (value: any, e: Event | undefined) => {
    setValue(value);
    if (view !== 'EVT') { setView('EVT'); }
  };

  const apiURL = view === 'EVT' ? `/api/event/mylike?type=${tabList[value]}&size=10`
    : `/api/event/recruitment/mylike?type=${tabList[value]}&size=10`
  const events = useListWithPage(apiURL, ['liked-posts', value, view])
  return (
    <div className='flex flex-col w-full'>
      <TypeTabs val={value} handleChange={handleChange} wrapStyle='fixed top-[60px]'>
        {value < 2 && <ViewToggle view={view} setView={setView} />}
      </TypeTabs>
      <div className='mt-[108px]'>
        <TabBlock events={events} value={value} view={view} />
      </div>
    </div >
  )
}

interface LikedTabBlockProps { events: UseInfiniteQueryResult<InfiniteData<any, unknown>, Error>; value: number; view: string; }
function TabBlock(props: LikedTabBlockProps) {
  if (props.events.isPending || props.events.isLoading) { return <SkeletonList type='LIKE' /> }
  if (props.events.status === 'success') {
    return (
      <div className='bg-p-white'>
        {props.view === 'EVT'
          ? <>{props.events.data.pages.map((event, index) => (
            event.content.map((item: LikeProps, idx: any) => (
              <div key={`like-${index}-${idx}`}>
                {idx === 0 ? <></> : <Divider />}
                <LikedPostBlock data={item} />
              </div>
            ))
          ))}</>
          : <>{props.events.data.pages.map((event, index) => (
            event.content.map((item: LikeRProps, idx: any) => (
              <div key={`like-${index}-${idx}`}>
                {idx === 0 ? <></> : <Divider />}
                <LikedAccompanyBlock data={item} />
              </div>
            ))
          ))}</>
        }
        {props.events.hasNextPage ? <MoreButton onClick={() => handleMore(props.events.hasNextPage, props.events.fetchNextPage)} /> : <></>}
        {props.events.isFetchingNextPage ? <LoadingCircle /> : <></>}
      </div>
    )
  } else {
    return (
      <NoData text1="좋아요 누른 게시물이 없어요." text2="인기 게시물에 좋아요를 눌러보세요!" buttonText="페스티벌 인기순 보러가기" buttonLink="/?sort=likeCount%2Cdesc" />
    )
  }
}