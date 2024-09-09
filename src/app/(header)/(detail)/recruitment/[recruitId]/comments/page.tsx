"use client";
import { CommentsPage } from '@/components/pages/comment/CommentsPage';
import { useParams } from 'next/navigation';
export default function Page() {
  const params = useParams()
  return (<CommentsPage origin={'event/recruitment'} postId={params.recruitId} />)
}