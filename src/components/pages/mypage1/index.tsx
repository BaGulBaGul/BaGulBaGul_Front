"use client";
import { CalendarIcn, LikeIcn, MailIcn, PostEditIcn, SmileIcn } from "@/components/common/Icon";
import { Button } from "@mui/material";
import React from "react";

const index = () => {
  const IconChangeButton = () => {
    return (
      <button className="absolute z-10 w-[30px] h-[30px] right-0 bottom-0">
        <img src="/mypage_upload_button.svg" alt="아이콘 수정 버튼" />
      </button>
    );
  };

  const SetBlock = (props: { icon?: any; title: string; count: number; url: string; }) => {
    return (
      <div className="flex flex-row justify-between p-[16px] text-[14px] leading-[160%] text-black">
        <div className="flex flex-row items-center gap-[8px]">
          {props.icon ? <div className="w-[24px] h-[24px]">{props.icon}</div> : <></>}
          <span>{props.title}</span>
        </div>
        <div className="flex flex-row items-center gap-[8px]">
          <span>{props.count}개</span>
          <a href={props.url} className="p-[4px] w-[24px] h-[24px]"><img src='/arrow_next.svg' /></a>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-[60px]">
      <div className="flex flex-col mb-[11px]">
        <div className="flex flex-col gap-[8px]">
          <div className="flex flex-row px-[16px] py-[18px] gap-[16px] bg-[#FFF]" id='mypage-profile'>
            <div className="relative w-[77px] h-[70px] rounded-full">
              <img src="/default_icon.svg" className="w-[70px] h-[70px] rounded-full" />
              <IconChangeButton />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-[18px] leading-[140%] text-black">USER</span>
              <span className="text-[14px] leading-[160%] text-gray3">user@naver.com</span>
              <span className="text-[14px] leading-[160%] text-gray3">바글이의 한마디를 적어주세요.</span>
            </div>
          </div>
          <div className="flex flex-col bg-[#FFF]" id='mypage-set1'>
            <div className="p-[16px] text-[14px] leading-[160%] font-semibold text-black">나의 바글바글</div>
            <SetBlock icon={<LikeIcn color='#6C6C6C' />} title='좋아요' count={12} url='/liked' />
            <SetBlock icon={<PostEditIcn />} title='작성글' count={12} url='/mypost' />
            <SetBlock icon={<CalendarIcn color='#6C6C6C' />} title='캘린더' count={12} url='/mycalendar' />
          </div>
          <div className="flex flex-col bg-[#FFF]" id='mypage-set2'>
            <div className="p-[16px] text-[14px] leading-[160%] font-semibold text-black">계정 관리</div>
            <SetBlock icon={<SmileIcn />} title='닉네임 재설정' count={12} url='/' />
            <SetBlock icon={<MailIcn />} title='이메일 주소 재설정' count={12} url='/' />
          </div>
          <div className="flex flex-col bg-[#FFF]" id='mypage-set3'>
            <div className="p-[16px] text-[14px] leading-[160%] font-semibold text-black"> 이용 정보</div>
            <SetBlock title='약관 및 정책' count={12} url='/' />
            <SetBlock title='회원 탈퇴히기' count={12} url='/' />
          </div>
        </div>
        <div className="p-[24px]">
          <Button disableRipple className="w-full bg-[#FFF] text-gray3 text-[16px] p-[16px] leading-[140%]">로그아웃</Button>
        </div>
      </div>
    </div>
  );
};

export default index;
