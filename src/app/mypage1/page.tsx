"use client";
import { HeaderMyPage } from "@/components/layout/header";

import Mypage from '@/components/pages/mypage1'
import React, { useState } from "react";

export default function Page() {
  const [isAlarm, setIsAlarm] = useState<boolean>(true);
  return (
    <div className="h-screen bg-gray1">
      <HeaderMyPage isAlarm={isAlarm} />
      <Mypage />
    </div>
  );
}