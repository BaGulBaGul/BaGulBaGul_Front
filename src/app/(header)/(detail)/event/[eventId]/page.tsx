'use client';
import { useParams } from 'next/navigation';
import { DetailPage } from '@/components/pages/detail/DetailPage';

export default function Page() {
  const params = useParams()
  return (<DetailPage origin='event' postId={params.eventId} />)
}