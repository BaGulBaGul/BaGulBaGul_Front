'use client';
import { useParams } from 'next/navigation';
import { DetailPageE } from '@/components/pages/detail/_DetailPageE';

export default function Page() {
  const params = useParams()
  return (<DetailPageE postId={params.eventId} />)
}