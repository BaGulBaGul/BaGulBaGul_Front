'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CalIcn, LikeIcn, PostEditIcn } from "@/components/common/styles/Icon";
import useLoginInfo from "@/hooks/useLoginInfo";
import { useSignout } from "@/hooks/useInUser";
import { useAlarmed } from "@/hooks/useInAlarm";
import { SubTopHeader } from "@/components/layout/subHeader";
import { UserProfileBlock, SetBlock } from "@/components/common/block";
import { LogoutButton } from "@/components/common/button/LogoutButton";

export function MyPage() {
  let userinfo = useLoginInfo()
  let userdata = userinfo?.data

  // const mutateSignout = useSignout();
  // const handleSignout = () => { mutateSignout.mutate() }
  if (userinfo.isPending || userinfo.isLoading) { return (<></>) }
  return (
    <>
      <SubTopHeader name='마이페이지' child={<AlarmButton />} />
      <div className="flex flex-col mb-[11px] pt-[60px]">
        <div className="flex flex-col gap-[8px]">
          <UserProfileBlock profileImageUrl={userdata?.imageURI} username={userdata?.nickname} email={userdata?.email} message={userdata?.profileMessage ?? '바글이의 한마디를 적어주세요.'} />
          <div className="flex flex-col bg-p-white" id='mypage-set1'>
            <div className="p-[16px] text-14 font-semibold text-black">나의 바글바글</div>
            <SetBlock icon={<LikeIcn color='#6C6C6C' />} title='좋아요' count={userdata?.postLikeCount} url='/mypage/liked' />
            <SetBlock icon={<PostEditIcn />} title='작성글' count={userdata?.writingCount} url='/mypage/post' />
            <SetBlock icon={<CalIcn val={false} color='#6C6C6C' />} title='캘린더' count={userdata?.calendarCount} url='/mypage/calendar' />
          </div>
          <div className="flex flex-col bg-p-white" id='mypage-set2'>
            <div className="p-[16px] text-14 font-semibold text-black">계정 관리</div>
            <SetBlock icon={<SmileIcn />} title='프로필 수정' url='/mypage/edit' />
          </div>
          <div className="flex flex-col bg-p-white" id='mypage-set3'>
            <div className="p-[16px] text-14 font-semibold text-black">이용 정보</div>
            <SetBlock title='약관 및 정책' url='/' />
            <SetBlock title='회원 탈퇴히기' url='/' />
          </div>
        </div>
        {/* <div className="p-[24px]">
          <button className="w-full bg-p-white text-gray3 text-16 p-[16px]" onClick={handleSignout}>로그아웃</button>
        </div> */}
        {/* // * need to test if works */}
        <LogoutButton />
      </div>
    </>
  )
}

const SmileIcn = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.4041 2.47168C6.88406 2.47168 2.41406 6.95168 2.41406 12.4717C2.41406 17.9917 6.88406 22.4717 12.4041 22.4717C17.9341 22.4717 22.4141 17.9917 22.4141 12.4717C22.4141 6.95168 17.9341 2.47168 12.4041 2.47168ZM12.4141 20.4717C7.99406 20.4717 4.41406 16.8917 4.41406 12.4717C4.41406 8.05168 7.99406 4.47168 12.4141 4.47168C16.8341 4.47168 20.4141 8.05168 20.4141 12.4717C20.4141 16.8917 16.8341 20.4717 12.4141 20.4717ZM15.9141 11.4717C16.7441 11.4717 17.4141 10.8017 17.4141 9.97168C17.4141 9.14168 16.7441 8.47168 15.9141 8.47168C15.0841 8.47168 14.4141 9.14168 14.4141 9.97168C14.4141 10.8017 15.0841 11.4717 15.9141 11.4717ZM8.91406 11.4717C9.74406 11.4717 10.4141 10.8017 10.4141 9.97168C10.4141 9.14168 9.74406 8.47168 8.91406 8.47168C8.08406 8.47168 7.41406 9.14168 7.41406 9.97168C7.41406 10.8017 8.08406 11.4717 8.91406 11.4717ZM12.4141 17.9717C14.4441 17.9717 16.2141 16.8617 17.1641 15.2217C17.3541 14.8917 17.1141 14.4717 16.7241 14.4717H8.10406C7.72406 14.4717 7.47406 14.8917 7.66406 15.2217C8.61406 16.8617 10.3841 17.9717 12.4141 17.9717Z" fill="#6C6C6C" />
  </svg>
)

const AlarmButton = () => {
  const [alarmed, setAlarmed] = useState(false);
  const mutateAlarmed = useAlarmed(setAlarmed)
  useEffect(() => { mutateAlarmed.mutate() }, [])

  return (
    <Link href='/mypage/alarm' className='relative w-[24px] h-[24px]'>
      <AlarmIcn />
      {!alarmed ? <></>
        : <div id='alarm-check' className="absolute top-0 right-[3px] w-[8px] h-[8px] bg-primary-blue rounded-full z-10"></div>}
    </Link>
  )
}

const AlarmIcn = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13.7295 21C13.5537 21.3031 13.3014 21.5547 12.9978 21.7295C12.6941 21.9044 12.3499 21.9965 11.9995 21.9965C11.6492 21.9965 11.3049 21.9044 11.0013 21.7295C10.6977 21.5547 10.4453 21.3031 10.2695 21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)