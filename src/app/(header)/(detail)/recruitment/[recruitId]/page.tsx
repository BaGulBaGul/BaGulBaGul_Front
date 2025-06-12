'use client';
import { useParams } from 'next/navigation';
import { DetailPageR } from '@/components/pages/detail/_DetailPageR';

export default function Page() {
  const params = useParams()
  return (<DetailPageR postId={params.recruitId} />)
}