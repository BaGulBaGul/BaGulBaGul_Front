"use client";
import { useState } from 'react';
import { useEffectUpdateRange, submitFilter } from '@/hooks/useInFilter';
import { FormatDateRange } from '@/service/Functions';
import { DialogFilter, FilterSortRadio, FilterCalendar } from '@/components/common/filter';
import { InputCollapse } from '@/components/common/input';
import { FilterNumber, FilterNumberRange } from '@/components/common/filter/FilterNumber';

export function Filter({ open, closeFilter, p, updateP }: { open: boolean; closeFilter: () => void; p: any; updateP: (value: Object) => void; }) {
  const [dateRange, setDateRange] = useState<(Date | undefined)[]>([undefined, undefined])
  useEffectUpdateRange('DATE', p.sD, p.eD, (date: [any, any]) => setDateRange(date))

  return (
    <DialogFilter isOpen={open} handleSubmit={(e: React.FormEvent<HTMLFormElement>) => { submitFilter(e, dateRange, p, updateP, undefined, undefined, true); closeFilter(); }} >
      <FilterSortRadio name='sort' defaultValue={p.sort ?? 'createdAt,desc'} />
      <InputCollapse title={'날짜선택'} type='CAL' value={(!dateRange[0] || !dateRange[1]) ? '' : FormatDateRange(dateRange[0], dateRange[1])}>
        <FilterCalendar startDate={dateRange[0]} endDate={dateRange[1]} onChange={(dates: [any, any]) => { setDateRange(dates) }} />
      </InputCollapse>
      <FilterNumber prevVal={p.ptcp} />
      <FilterNumberRange prevMin={p.hcMin ?? null} prevMax={p.hcMax ?? null} />
    </DialogFilter>
  )
}