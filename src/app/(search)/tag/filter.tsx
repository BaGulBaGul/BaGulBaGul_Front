"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import { submitFilter } from '@/hooks/useInFilter';
import { DialogFilter, FilterSortRadio, FilterNumber, FilterNumberRange, FilterDateRange } from '@/components/common/filter';

export function Filter({ open, closeFilter, url }: { open: boolean; closeFilter: () => void; url: string }) {
  const searchParams = useSearchParams()
  const router = useRouter()

  return (
    <DialogFilter isOpen={open} handleSubmit={(e: React.FormEvent<HTMLFormElement>) => { submitFilter(e, searchParams, undefined, router, url, true); closeFilter(); }} >
      <FilterSortRadio name='sort' defaultValue={searchParams.get('sort') ?? 'createdAt,desc'} />
      <FilterDateRange prevMin={searchParams.get('sD')} prevMax={searchParams.get('eD')} />
      <FilterNumber prevVal={searchParams.get('ptcp')} />
      <FilterNumberRange prevMin={searchParams.get('hcMin')} prevMax={searchParams.get('hcMax')} />
    </DialogFilter>
  )
}