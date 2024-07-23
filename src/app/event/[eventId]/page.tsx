'use client';
import Header from "@/components/layout/header";
import Event from '@/components/pages/event/[eventId]';

export default function Page() {
  return (
    <div>
      <Header />
      <Event />
    </div>
  );
}