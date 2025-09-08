'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAlarmed } from "@/hooks/useInAlarm";
import { IconNoti } from "../styles/Icon";

export function AlarmButton() {
  const [alarmed, setAlarmed] = useState(false);
  const mutateAlarmed = useAlarmed(setAlarmed)
  useEffect(() => { mutateAlarmed.mutate() }, [])

  return (
    <Link href='/mypage/alarm' className='relative w-[24px] h-[24px]'>
      <IconNoti />
      {alarmed && <div id='alarm-check' className="absolute top-0 right-[3px] w-[8px] h-[8px] bg-primary-blue rounded-full z-10"></div>}
    </Link>
  )
}