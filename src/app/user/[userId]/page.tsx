"use client";
import { HeaderMyPage } from "@/components/layout/header";

import { MyPage, UserPage } from '@/components/pages/user'
import React, { useState } from "react";

export default function Page({ params }: { params: { userId: string | number } }) {
  const [isAlarm, setIsAlarm] = useState<boolean>(true);
  return (
    <>
      <HeaderMyPage opt={params.userId === 'mypage' ? 'MY' : 'USR'} isAlarm={isAlarm} />
      {/* <UserPage user={params.userId} /> */}
      {params.userId === 'mypage' ? <MyPage /> : <UserPage userId={params.userId} />}
    </>
  );
}