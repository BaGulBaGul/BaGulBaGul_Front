"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import { submitFilter } from '@/hooks/useInFilter';
import { DialogFilter, FilterSortRadio, FilterNumber, FilterDateRange } from '@/components/common/filter';
import { InputCheck } from '@/components/common/input';

export function Filter({ open, closeFilter, url }: { open: boolean; closeFilter: () => void; url: string }) {
  const searchParams = useSearchParams()
  const router = useRouter()

  return (
    <DialogFilter isOpen={open} handleSubmit={(e: React.FormEvent<HTMLFormElement>) => { submitFilter(e, searchParams, undefined, router, url); closeFilter(); }} >
      <InputCheck title='모집 중만 보기' name="state" value="r" defaultChecked={searchParams.get('state') === 'r'} />
      <FilterSortRadio name='sort' defaultValue={searchParams.get('sort') ?? 'createdAt,desc'} />
      <FilterDateRange prevMin={searchParams.get('sD')} prevMax={searchParams.get('eD')} />
      <FilterNumber prevVal={searchParams.get('ptcp')} />
    </DialogFilter>
  )
}