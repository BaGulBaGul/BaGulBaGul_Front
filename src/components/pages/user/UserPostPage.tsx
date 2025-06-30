"use client";
import React, { useState } from "react";
import useLoginInfo from '@/hooks/useLoginInfo';
import { useUserInfo } from "@/hooks/useInUser";
import { UserProfileBlock } from "@/components/common/block";
import { UserPostList, UserPostWrapper } from ".";

export function MyPostPage() {
  const [value, setValue] = useState<0 | 1>(0);
  const handleChange = (value: any, e: Event | undefined) => { setValue(value); };
  const userinfo = useLoginInfo().data
  return (
    <UserPostWrapper value={value} handleChange={handleChange}>
      <UserPostList value={value} me={true} userinfo={userinfo} />
    </UserPostWrapper>
  )
}

export function UserPostPage(props: { userId: number }) {
  const [value, setValue] = useState<0 | 1>(0);
  const handleChange = (value: any, e: Event | undefined) => { setValue(value); };
  const userdata = useUserInfo(props.userId).data
  return (
    <UserPostWrapper value={value} handleChange={handleChange}
      profile={<UserProfileBlock profileImageUrl={userdata?.imageURI} username={userdata?.nickname} email={userdata?.email} message={userdata?.profileMessage ?? '-'} />}>
      <UserPostList value={value} me={false} userinfo={userdata} />
    </UserPostWrapper>
  )
}