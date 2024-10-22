"use client";
import { useState } from 'react';
import { TabPanel } from '@/components/common';
import useLoginInfo from '@/hooks/useLoginInfo';
import { useUserInfo } from '@/hooks/useInUser';
import { UserPostTab, UserPostTabs } from '.';
import { useListWithPageE } from '@/hooks/useInCommon';

const apiURL = (value: 0 | 1, nickname: string) => {
  if (value === 0) { return `/api/event?type=PARTY&size=10&username=${nickname}` }
  else { return `/api/event/recruitment?&size=10&username=${nickname}` }
}

export function MyPostPage() {
  const [value, setValue] = useState<0 | 1>(0);
  const handleChange = (e: React.SyntheticEvent, newValue: 0 | 1) => { setValue(newValue); };
  const userinfo = useLoginInfo()
  const posts = useListWithPageE(apiURL(value, userinfo?.nickname), ['my-posts', value], !!userinfo && !!userinfo.nickname)
  return (
    <div className='flex flex-col w-full pb-[10px]'>
      <UserPostTabs value={value} handleChange={handleChange} />
      <TabPanel value={value} index={0} classn='mt-[108px]'><UserPostTab me={true} posts={posts} opt='EVT' /></TabPanel>
      <TabPanel value={value} index={1} classn='mt-[108px]'><UserPostTab me={true} posts={posts} opt='RCT' /></TabPanel>
    </div>
  )
}

export function UserPostPage(props: { userId: number }) {
  const [value, setValue] = useState<0 | 1>(0);
  const handleChange = (e: React.SyntheticEvent, newValue: 0 | 1) => { setValue(newValue); };
  const userinfo = useUserInfo(props.userId).data
  const posts = useListWithPageE(apiURL(value, userinfo?.nickname), ['user-posts', value], !!userinfo && !!userinfo.nickname)
  return (
    <div className='flex flex-col w-full pb-[10px]'>
      <UserPostTabs value={value} handleChange={handleChange} />
      <TabPanel value={value} index={0} classn='mt-[108px]'><UserPostTab me={false} posts={posts} opt='EVT' /></TabPanel>
      <TabPanel value={value} index={1} classn='mt-[108px]'><UserPostTab me={false} posts={posts} opt='RCT' /></TabPanel>
    </div>
  )
}