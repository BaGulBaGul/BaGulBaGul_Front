"use client";
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormatDateRange } from '@/service/Functions';
import { useEffectUpdateRange, submitFilter } from '@/hooks/useInFilter';
import { DialogFilter, FilterCalendar, FilterSortRadio } from '@/components/common/filter';
import { InputNumber, InputCollapse, InputCheck } from '@/components/common/input';

export function Filter({ eventId, open, closeFilter }: { eventId: number; open: boolean; closeFilter: () => void }) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [dateRange, setDateRange] = useState<(Date | undefined)[]>([undefined, undefined])
  useEffectUpdateRange('DATE', searchParams.get('sD'), searchParams.get('eD'), (date: [any, any]) => setDateRange(date))

  let url = `/event/${eventId}/recruitment?`
  return (
    <DialogFilter isOpen={open} handleSubmit={(e: React.FormEvent<HTMLFormElement>) => { submitFilter(e, dateRange, searchParams, undefined, router, url); closeFilter(); }} >
      <InputCheck title='모집 중만 보기' name="state" value="r" defaultChecked={searchParams.get('state') === 'r'} />
      <FilterSortRadio name='sort' defaultValue={searchParams.get('sort') ?? 'createdAt,desc'} />
      <InputCollapse title={'날짜선택'} type='CAL' value={(!dateRange[0] || !dateRange[1]) ? '' : FormatDateRange(dateRange[0], dateRange[1])}>
        <FilterCalendar startDate={dateRange[0]} endDate={dateRange[1]} onChange={(dates: [any, any]) => { setDateRange(dates) }} />
      </InputCollapse>
      <InputCollapse title={'참여인원'} type="NUM" value={Number(searchParams.get('ptcp'))} keepMounted={true} >
        <InputNumber value={!!searchParams.get('ptcp') ? Number(searchParams.get('ptcp')) : undefined} name='ptcp' />
      </InputCollapse>
    </DialogFilter>
  )
}