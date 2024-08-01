"use client";
import { SubTopHeader } from "@/components/layout/subHeader";

import { MyPage, UserPage } from '@/components/pages/user'
import { AlarmIcn } from "@/components/styles/Icon";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Page({ params }: { params: { userId: string | number } }) {
  const router = useRouter()
  return (
    <>
      {params.userId === 'mypage'
        ? <SubTopHeader name='마이페이지' child={<AlarmButton />} />
        : <SubTopHeader name='프로필' />
      }
      {params.userId === 'mypage' ? <MyPage /> : <UserPage userId={params.userId} />}
    </>
  );
}

const AlarmButton = () => {
  const [isAlarm, setIsAlarm] = useState<boolean>(true);
  return (
    <a href='/user/mypage/alarm' className='relative w-[24px] h-[24px]'>
      <AlarmIcn />
      {!isAlarm ? <></>
        : <div id='alarm-check' className="absolute top-0 right-[3px] w-[8px] h-[8px] bg-primary-blue rounded-full z-10"></div>
      }
    </a>
  )
}