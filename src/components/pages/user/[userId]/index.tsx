"use client";
import { UserInfoProps } from "@/components/common";
import { CalIcn, LikeIcn, MailIcn, PostEditIcn, SmileIcn } from "@/components/common/Icon";
import { call } from "@/service/ApiService";
import React, { useEffect, useState } from "react";

const index = (props: { user: string | number }) => {
  return (
    <>{props.user === 'mypage' ? <MyPage /> : <UserPage userId={props.user} />}</>
  )
};
export default index;

const SetBlock = (props: { icon?: any; title: string; count: number; url: string; }) => {
  return (
    <a href={props.url}
      className="flex flex-row justify-between p-[16px] text-14 text-black">
      <div className="flex flex-row items-center gap-[8px]">
        {props.icon ? <div className="w-[24px] h-[24px]">{props.icon}</div> : <></>}
        <span>{props.title}</span>
      </div>
      <div className="flex flex-row items-center gap-[8px]">
        <span>{props.count}개</span>
        <img src='/arrow_next.svg' className="p-[4px] w-[24px] h-[24px]" />
      </div>
    </a>
  )
}

const MyPage = () => {
  const [userinfo, setUserinfo] = useState<UserInfoProps>();

  useEffect(() => {
    call('/api/user/info', 'GET', null)
    .then((response) => {
      if(response.errorCode === "C00000") {
        setUserinfo(response.data)
      }
    })
  }, [])

  const IconChangeButton = () => {
    return (
      <button className="absolute right-0 bottom-0 w-[30px] h-[30px] z-10">
        <img src="/mypage_upload_button.svg" alt="아이콘 수정 버튼" />
      </button>
    );
  };

  return (
    <div className="pt-[60px]">
      <div className="flex flex-col mb-[11px]">
        <div className="flex flex-col gap-[8px]">
          <div className="flex flex-row px-[16px] py-[18px] gap-[16px] bg-p-white" id='mypage-profile'>
            <div className="relative w-[77px] h-[70px] rounded-full">
              <img src={userinfo?.imageURI ?? "/default_icon.svg"} className="w-[70px] h-[70px] rounded-full" />
              <IconChangeButton />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-18 text-black">{userinfo?.nickname ?? '-'}</span>
              <span className="text-14 text-gray3">{userinfo?.email ?? '-'}</span>
              <span className="text-14 text-gray3">{userinfo?.profileMessage ?? '바글이의 한마디를 적어주세요.'}</span>
            </div>
          </div>
          <div className="flex flex-col bg-p-white" id='mypage-set1'>
            <div className="p-[16px] text-14 font-semibold text-black">나의 바글바글</div>
            <SetBlock icon={<LikeIcn color='#6C6C6C' />} title='좋아요' count={12} url='/user/mypage/liked' />
            <SetBlock icon={<PostEditIcn />} title='작성글' count={12} url='/user/mypage/post' />
            <SetBlock icon={<CalIcn val={false} color='#6C6C6C' />} title='캘린더' count={12} url='/user/mypage/calendar' />
          </div>
          <div className="flex flex-col bg-p-white" id='mypage-set2'>
            <div className="p-[16px] text-14 font-semibold text-black">계정 관리</div>
            <SetBlock icon={<SmileIcn />} title='닉네임 재설정' count={12} url='/' />
            <SetBlock icon={<MailIcn />} title='이메일 주소 재설정' count={12} url='/' />
          </div>
          <div className="flex flex-col bg-p-white" id='mypage-set3'>
            <div className="p-[16px] text-14 font-semibold text-black"> 이용 정보</div>
            <SetBlock title='약관 및 정책' count={12} url='/' />
            <SetBlock title='회원 탈퇴히기' count={12} url='/' />
          </div>
        </div>
        <div className="p-[24px]">
          <button className="w-full bg-p-white text-gray3 text-16 p-[16px]">로그아웃</button>
        </div>
      </div>
    </div>
  )
}

const UserPage = (props: { userId: string | number }) => {
  return (
    <div className="pt-[60px]">
      <div className="flex flex-col mb-[11px]">
        <div className="flex flex-col gap-[8px]">
          <div className="flex flex-row px-[16px] py-[18px] gap-[16px] bg-p-white" id='userpage-profile'>
            <div className="relative w-[77px] h-[70px] rounded-full">
              <img src="/default_icon.svg" className="w-[70px] h-[70px] rounded-full" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-18 text-black">USER</span>
              <span className="text-14 text-gray3">bageul@naver.com</span>
              <span className="text-14 text-gray3">바글이의 한마디</span>
            </div>
          </div>
          <div className="flex flex-col bg-p-white" id='userpage-set1'>
            <div className="p-[16px] text-14 font-semibold text-black">바글이의 정보</div>
            <SetBlock icon={<LikeIcn color='#6C6C6C' />} title='좋아요' count={12} url={`/user/${props.userId}/liked`} />
            <SetBlock icon={<PostEditIcn />} title='작성글' count={12} url={`/user/${props.userId}/post`} />
          </div>
        </div>
      </div>
    </div>
  )
}