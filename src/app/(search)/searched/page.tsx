"use client";
import { useSearchParams } from 'next/navigation'
import { SearchTabs } from '@/components/pages/search';

export default function Page() {
  const searchParams = useSearchParams()
  console.log('sp: ', searchParams)
  return (<SearchTabs opt='TTL' sp={searchParams} />)
}