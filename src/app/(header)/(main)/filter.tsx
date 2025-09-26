"use client";
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormatDateRange } from '@/service/Functions';
import { useEffectUpdateRange, submitFilter } from '@/hooks/useInFilter';
import { DialogFilter, FilterCalendar, FilterSortRadio } from '@/components/common/filter';
import { InputCollapse, InputCheck } from '@/components/common/input';
import { FilterNumber, FilterNumberRange } from '@/components/common/filter/FilterNumber';

export function Filter({ open, closeFilter }: { open: boolean; closeFilter: () => void }) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [dateRange, setDateRange] = useState<(Date | undefined)[]>([undefined, undefined])
  useEffectUpdateRange('DATE', searchParams.get('sD'), searchParams.get('eD'), (date: [any, any]) => setDateRange(date))

  return (
    <DialogFilter isOpen={open} handleSubmit={(e: React.FormEvent<HTMLFormElement>) => { submitFilter(e, dateRange, searchParams, undefined, router, '?', true); closeFilter(); }} >
      <InputCheck title='종료된 행사 제외하기' name="state" value="p" defaultChecked={searchParams.get('state') === 'p'} />
      <FilterSortRadio name='sort' defaultValue={searchParams.get('sort') ?? 'createdAt,desc'} />
      <InputCollapse title={'날짜선택'} type='CAL' value={(!dateRange[0] || !dateRange[1]) ? '' : FormatDateRange(dateRange[0], dateRange[1])}>
        <FilterCalendar startDate={dateRange[0]} endDate={dateRange[1]} onChange={(dates: [any, any]) => { setDateRange(dates) }} />
      </InputCollapse>
      <FilterNumber prevVal={searchParams.get('ptcp')} />
      <FilterNumberRange prevMin={searchParams.get('hcMin')} prevMax={searchParams.get('hcMax')} />
    </DialogFilter>
  )
}