"use client";
import { useSearchParams } from 'next/navigation'
import { SearchTabs } from '@/components/pages/search';

export default function Page() {
  const searchParams = useSearchParams()
  return (<SearchTabs opt='TAG' sp={searchParams} />)
}