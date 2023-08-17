"use client";
import { MypageHeader } from "@/components/layout/header";
import { SubTopHeader } from "@/components/layout/subHeader";

import Mypage from '@/components/pages/mypage'
import React, { useState } from "react";

// 다른 유저 페이지도 사용
// 추후 동적 라우팅 사용해서 /[id] 형식으로 사용(쿠키로 본인인지 확인해서 버튼 노출)
export default function Page() {
  const [isMe, setIsMe] = useState(true);

  const Header = () => {
    if(isMe) {
      return <MypageHeader />
    }
    return <SubTopHeader name={"프로필"} url={"/"} />
  }

  return (
    <div>
      <div className="relative z-50">
        <Header />
      </div>
      <Mypage isMe = {isMe} />
    </div>
  );
}
