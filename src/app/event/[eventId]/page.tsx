'use client';
import { useState } from 'react';
import { HeaderNonMain } from "@/components/layout/header";
import Event from '@/components/pages/event/[eventId]';
import SubHeader from '@/components/layout/subHeader';

export default function Page() {
  const [title, setTitle] = useState<string>('')
  return (
    <div>
      <div className='relative z-30'>
        <HeaderNonMain />
        <SubHeader name={title} url={"/"} />
      </div>
      <Event setTitle={setTitle} />
    </div>
  );
}