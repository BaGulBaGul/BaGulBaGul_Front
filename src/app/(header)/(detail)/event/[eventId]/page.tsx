'use client';
import { useParams } from 'next/navigation';
import { DetailPageE } from '@/components/pages/detail/DetailPageE';

export default function Page() {
  const params = useParams()
  return (<DetailPageE postId={params.eventId} />)
}