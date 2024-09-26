"use client";
import { SubTopHeader } from "@/components/layout/subHeader";
import { MyPage, UserPage } from '@/components/pages/user'
import Link from "next/link";
import React, { useState } from "react";

export default function Page({ params }: { params: { userId: 'mypage' | number } }) {
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
    <Link href='/user/mypage/alarm' className='relative w-[24px] h-[24px]'>
      <AlarmIcn />
      {!isAlarm ? <></>
        : <div id='alarm-check' className="absolute top-0 right-[3px] w-[8px] h-[8px] bg-primary-blue rounded-full z-10"></div>
      }
    </Link>
  )
}

const AlarmIcn = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13.7295 21C13.5537 21.3031 13.3014 21.5547 12.9978 21.7295C12.6941 21.9044 12.3499 21.9965 11.9995 21.9965C11.6492 21.9965 11.3049 21.9044 11.0013 21.7295C10.6977 21.5547 10.4453 21.3031 10.2695 21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)