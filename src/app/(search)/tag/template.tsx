"use client";
import { SearchLayout } from '@/components/pages/search';
import { useRouter, useSearchParams } from 'next/navigation'

export default function Template({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  return (
    <SearchLayout opt='TAG' sp={searchParams} router={router} children={children} />
  );
}