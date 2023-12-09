'use client';
import { HeaderNonMain } from "@/components/layout/header";
import Event from '@/components/pages/event/[eventId]';

export default function Page() {
  return (
    <div>
      <div className='relative z-30'>
        <HeaderNonMain />
      </div>
      <Event />
    </div>
  );
}