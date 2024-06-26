"use client";
import { HeaderMyPage } from "@/components/layout/header";

import UserPage from '@/components/pages/user/[userId]'
import React, { useState } from "react";

export default function Page({ params }: { params: { userId: string | number } }) {
  const [isAlarm, setIsAlarm] = useState<boolean>(true);
  return (
    <div className="h-screen bg-gray1">
      <HeaderMyPage opt={params.userId === 'mypage' ? 'MY' : 'USR'} isAlarm={isAlarm} />
      <UserPage user={params.userId} />
    </div>
  );
}