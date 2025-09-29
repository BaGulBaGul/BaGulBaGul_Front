"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import { submitFilter } from '@/hooks/useInFilter';
import { DialogFilter, FilterSortRadio, FilterNumber, FilterNumberRange, FilterDateRange } from '@/components/common/filter';
import { InputCheck } from '@/components/common/input';

export function Filter({ open, closeFilter }: { open: boolean; closeFilter: () => void }) {
  const searchParams = useSearchParams()
  const router = useRouter()

  return (
    <DialogFilter isOpen={open} handleSubmit={(e: React.FormEvent<HTMLFormElement>) => { submitFilter(e, searchParams, undefined, router, '?', true); closeFilter(); }} >
      <InputCheck title='종료된 행사 제외하기' name="state" value="p" defaultChecked={searchParams.get('state') === 'p'} />
      <FilterSortRadio name='sort' defaultValue={searchParams.get('sort') ?? 'createdAt,desc'} />
      <FilterDateRange prevMin={searchParams.get('sD')} prevMax={searchParams.get('eD')} />
      <FilterNumber prevVal={searchParams.get('ptcp')} />
      <FilterNumberRange prevMin={searchParams.get('hcMin')} prevMax={searchParams.get('hcMax')} />
    </DialogFilter>
  )
}