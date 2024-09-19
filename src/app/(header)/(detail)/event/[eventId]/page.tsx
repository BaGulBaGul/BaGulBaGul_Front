'use client';
import { useParams } from 'next/navigation';
import { DetailPage } from '@/components/pages/detail/DetailPage';

export default function Page() {
  const params = useParams()
  알람 토스트용 AlarmHeader 구현 / DetailPage 컴포넌트 분리 / 캘린더 아이콘 수정  return (<DetailPage origin='event' postId={params.eventId} />)
}