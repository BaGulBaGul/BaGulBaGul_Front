"use client";
import { useState } from 'react';
import useLoginInfo from '@/hooks/useLoginInfo';
import { useUserInfo } from '@/hooks/useInUser';
import { useListWithPageE } from '@/hooks/useInCommon';
import { TypeTabs } from '@/components/common';
import { UserPostTab } from '.';

const apiURL = (value: 0 | 1, nickname: string) => {
  if (value === 0) { return `/api/event?type=PARTY&size=10&sort=createdAt,desc&username=${nickname}` }
  else { return `/api/event/recruitment?&size=10&sort=createdAt,desc&username=${nickname}` }
}

export function MyPostPage() {
  const [value, setValue] = useState<0 | 1>(0);
  const handleChange = (value: any, e: Event | undefined) => { setValue(value); };
  const userinfo = useLoginInfo().data
  const posts = useListWithPageE(apiURL(value, userinfo?.nickname), ['my-posts', value], !!userinfo && !!userinfo.nickname)
  return (
    <div className='flex flex-col w-full pb-[10px]'>
      <TypeTabs val={value} handleChange={handleChange} types={['PARTY', 'RCT']} wrapStyle='fixed top-[60px]' />
      <div className='mt-[108px]'>
        <UserPostTab me={true} posts={posts} opt={value === 0 ? 'EVT' : 'RCT'} />
      </div>
    </div>
  )
}

export function UserPostPage(props: { userId: number }) {
  const [value, setValue] = useState<0 | 1>(0);
  const handleChange = (value: any, e: Event | undefined) => { setValue(value); };
  const userinfo = useUserInfo(props.userId).data
  const posts = useListWithPageE(apiURL(value, userinfo?.nickname), ['user', props.userId, value], !!userinfo && !!userinfo.nickname)
  return (
    <div className='flex flex-col w-full'>
      <TypeTabs val={value} handleChange={handleChange} types={['PARTY', 'RCT']} />
      <UserPostTab me={false} posts={posts} opt={value === 0 ? 'EVT' : 'RCT'} />
    </div>
  )
}