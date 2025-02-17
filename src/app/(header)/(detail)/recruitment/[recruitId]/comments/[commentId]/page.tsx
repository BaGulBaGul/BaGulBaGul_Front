"use client";
import { RepliesPage } from '@/components/pages/comment/RepliesPage';
import { useParams } from 'next/navigation';

export default function Page() {
  const params = useParams()
  return (
    <RepliesPage origin={'event/recruitment'} commentId={params.commentId} postId={params.recruitId} />
  )
}
