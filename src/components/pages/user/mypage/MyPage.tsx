'use client';
import React from "react";
import { IconCalendar, IconHeart, IconSmile, IconEdit } from "@/components/common/styles/Icon";
import useLoginInfo from "@/hooks/useLoginInfo";
import { SubTopHeader } from "@/components/layout/subHeader";
import { UserProfileBlock, SetBlock } from "@/components/common/block";
import { AlarmButton, LogoutButton } from "@/components/common";

export function MyPage() {
  let userinfo = useLoginInfo()
  let userdata = userinfo?.data

  if (userinfo.isPending || userinfo.isLoading) { return (<></>) }
  return (
    <>
      <SubTopHeader name='마이페이지' child={<AlarmButton />} />
      <div className="flex flex-col mb-[11px] pt-[60px]">
        <div className="flex flex-col gap-[8px]">
          <UserProfileBlock profileImageUrl={userdata?.imageURI} username={userdata?.nickname} email={userdata?.email} message={userdata?.profileMessage ?? '바글이의 한마디를 적어주세요.'} />
          <div className="flex flex-col bg-p-white" id='mypage-set1'>
            <div className="p-[16px] text-14 font-semibold text-black">나의 바글바글</div>
            <SetBlock icon={<IconHeart />} title='좋아요' count={userdata?.postLikeCount} url='/mypage/liked' />
            <SetBlock icon={<IconEdit />} title='작성글' count={userdata?.writingCount} url='/mypage/post' />
            <SetBlock icon={<IconCalendar />} title='캘린더' count={userdata?.calendarCount} url='/mypage/calendar' />
          </div>
          <div className="flex flex-col bg-p-white" id='mypage-set2'>
            <div className="p-[16px] text-14 font-semibold text-black">계정 관리</div>
            <SetBlock icon={<IconSmile />} title='프로필 수정' url='/mypage/edit' />
          </div>
          <div className="flex flex-col bg-p-white" id='mypage-set3'>
            <div className="p-[16px] text-14 font-semibold text-black">이용 정보</div>
            <SetBlock title='약관 및 정책' url='/' />
            <SetBlock title='회원 탈퇴히기' url='/' />
          </div>
        </div>
        <LogoutButton />
      </div>
    </>
  )
}