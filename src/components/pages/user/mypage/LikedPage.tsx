"use client";
import { useState } from 'react';
import { tabList } from '@/service/Functions';
import { useListWithPage } from '@/hooks/useInCommon';
import { LikeProps, LikeRProps, Divider, SkeletonList, TypeTabs, TypeSwitch, ListWrapper } from '@/components/common';
import { NoData } from '@/components/common/block';
import { LikedBlockE, LikedBlockR } from '..';

export function LikedPage() {
  const [value, setValue] = useState(0);
  const [view, setView] = useState<'EVT' | 'RCT'>('EVT');

  const handleChange = (value: any, e: Event | undefined) => {
    setValue(value);
    if (view !== 'EVT') { setView('EVT'); }
  };
  const handleView = (groupValue: any[], eventDetails: any) => {
    if (groupValue.length === 0 || groupValue[0] === view) { return; }
    setView(groupValue[0]);
  }

  const apiURL = view === 'EVT' ? `/api/event/mylike?type=${tabList[value]}&size=10`
    : `/api/event/recruitment/mylike?type=${tabList[value]}&size=10`
  const events = useListWithPage(apiURL, ['liked-posts', value, view])
  return (
    <div className='flex flex-col w-full'>
      <TypeTabs val={value} handleChange={handleChange} wrapStyle='fixed top-[60px]'>
        {value < 2 && <TypeSwitch type={view} handleChange={handleView} />}
      </TypeTabs>
      <div className='mt-[108px]'>
        <ListWrapper res={events} skeleton={<SkeletonList type='LIKE' />}
          nodata={<NoData text1="좋아요 누른 게시물이 없어요." text2="인기 게시물에 좋아요를 눌러보세요!" buttonText="페스티벌 인기순 보러가기" buttonLink="/?sort=likeCount%2Cdesc" />}>
          <div className='bg-p-white'>
            {events.data?.pages.map((event, index) => (
              event.content.map((item: LikeProps | LikeRProps, idx: any) => (
                <div key={`like-${index}-${idx}`}>
                  {idx === 0 ? <></> : <Divider />}
                  {view === 'EVT' ? <LikedBlockE data={item as LikeProps} /> : <LikedBlockR data={item as LikeRProps} />}
                </div>
              ))
            ))}
          </div>
        </ListWrapper>
      </div>
    </div >
  )
}