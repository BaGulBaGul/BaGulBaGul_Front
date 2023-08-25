"use client";
import React, { useState } from "react";

// 다른 유저 페이지도 사용
// 추후 동적 라우팅 사용해서 /[id] 형식으로 사용(쿠키로 본인인지 확인해서 버튼 노출)
const index = ( {isMe}: any ) => {
  const username = "USER";
  const usermail = "user@naver.com";
  
  const [isAlarm, setIsAlarm] = useState(true);

  const IconChangeButton = () => {
    if (isMe) {
      return (
        <button>
          <img
            src="/icon_upload_button.svg"
            alt="아이콘 수정 버튼"
            width={31}
            height={31}
            className="absolute z-10 right-0 bottom-0"
          />
        </button>
      );
    }
    return null;
  };
  
  const AlarmCheck = () => {
    if (isAlarm) {
      return (
        <div className="absolute w-2 h-2 bg-[#ff0000] rounded-full z-10 right-3 top-3"></div>
      );
    }
    return null;
  };

  const AlarmButton = () => {
    if(isMe) {
      return (
        <div className="flex flex-col justify-center items-center gap-2 text-[14px]">
          <div className="relative">
            <img src="/mypage_alarm.svg" width={56} height={56} alt="알림" />
            <AlarmCheck />
          </div>
          알림
        </div>
      )
    }
    return null;
  }

  const TosButton = () => {
    if(isMe) {
      return (
        <div className="flex flex-col justify-center items-center gap-2 text-[14px]">
          <img src="/mypage_tos.svg" width={56} height={56} alt="약관확인" />
          약관확인
        </div>
      )
    }
    return null;
  }

  return (
    <div className="pt-[60px]">
      <div className="my-[60px]">
        <div className="flex justify-center">
          <div className="relative w-[100px] h-[100px] rounded-full">
            <img
              src="/default_icon.svg"
              alt="아이콘"
              width={100}
              height={100}
              className="rounded-full"
            />
            <IconChangeButton />
          </div>
        </div>
        <div className="flex mt-5 text-center gap-2 justify-center place-items-center">
          <span className="text-[18px]">{username}</span>
          <span>
            <img src="/name_edit.svg" alt="이름 수정" />
          </span>
        </div>
        <div className="text-[14px] text-[#6C6C6C] underline text-center">
          {usermail}
        </div>
      </div>
    
      <div className="flex gap-5 justify-center">
        <AlarmButton />
        <div className="flex flex-col justify-center items-center gap-2 text-[14px]">
          <img src="/mypage_like.svg" width={56} height={56} alt="좋아요" />
          좋아요
        </div>
        <div className="flex flex-col justify-center items-center gap-2 text-[14px]">
          <img src="/mypage_post.svg" width={56} height={56} alt="작성글" />
          작성글
        </div>
        <TosButton />
      </div>
    </div>
  );
};

export default index;
