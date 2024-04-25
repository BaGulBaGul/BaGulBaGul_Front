"use client";
import { useSearchParams } from 'next/navigation'
import { SearchTabs } from '@/components/common';

const index = () => {
  const searchParams = useSearchParams()
  return (<SearchTabs opt='TAG' sp={searchParams}  />)
}
export default index;