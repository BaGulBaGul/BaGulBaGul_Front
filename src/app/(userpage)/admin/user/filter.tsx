'use client';
import { useState } from "react";
import { FormatDateRange } from "@/service/Functions";
import { useEffectUpdateRange, submitFilter } from "@/hooks/useInFilter";
import { DialogFilter, FilterCalendar, FilterSortRadio } from "@/components/common/filter";
import { InputCollapse } from "@/components/common/input";

export function Filter({ open, closeFilter, p, updateP }: { open: boolean; closeFilter: () => void; p: any; updateP: (value: Object) => void; }) {
  const [dateRange, setDateRange] = useState<(Date | undefined)[]>([undefined, undefined])
  useEffectUpdateRange('DATE', p.sD, p.eD, (date: [any, any]) => setDateRange(date))
  
  const sortOrder = [{ 'value': 'createdAt,desc', 'label': '최신순' }, { 'value': 'createdAt,asc', 'label': '오래된 순' }, { 'value': 'activatedAt,desc', 'label': '활성화 순' }, { 'value': 'activatedAt,asc', 'label': '비활성화 순' }]

  return (
    <DialogFilter isOpen={open} handleSubmit={(e: React.FormEvent<HTMLFormElement>) => { submitFilter(e, dateRange, p, updateP); closeFilter(); }} >
      <FilterSortRadio name='sort' defaultValue={p.sort ?? 'createdAt,desc'} order={sortOrder} />
      <InputCollapse title={'가입일자'} type='CAL' value={(!dateRange[0] || !dateRange[1]) ? '' : FormatDateRange(dateRange[0], dateRange[1])}>
        <FilterCalendar startDate={dateRange[0]} endDate={dateRange[1]} onChange={(dates: [any, any]) => { setDateRange(dates) }} />
      </InputCollapse>
    </DialogFilter>
  )
}