"use client";
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormatDateRange, headCountString } from '@/service/Functions';
import { DialogFilter, FilterCalendar, FilterSortRadio, submitFilter, useEffectUpdateRange } from '@/components/common/filter';
import { InputNumber, InputCollapse, InputNumberRange } from '@/components/common/input';

export function Filter({ open, closeFilter, url }: { open: boolean; closeFilter: () => void; url: string }) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [dateRange, setDateRange] = useState<(Date | undefined)[]>([undefined, undefined])
  useEffectUpdateRange('DATE', searchParams.get('sD'), searchParams.get('eD'), (date: [any, any]) => setDateRange(date))

  const [headCount, setHeadCount] = useState<(number | null)[]>([null, null])
  useEffectUpdateRange('HEAD', searchParams.get('hcMin') ?? null, searchParams.get('hcMax') ?? null, (head: [any, any]) => setHeadCount(head))

  return (
    <DialogFilter isOpen={open} handleSubmit={(e: React.FormEvent<HTMLFormElement>) => { submitFilter(e, dateRange, searchParams, undefined, router, url, true); closeFilter(); }} >
      <FilterSortRadio name='sort' defaultValue={searchParams.get('sort') ?? 'createdAt,desc'} />
      <InputCollapse title={'날짜선택'} type='CAL' value={(!dateRange[0] || !dateRange[1]) ? '' : FormatDateRange(dateRange[0], dateRange[1])}>
        <FilterCalendar startDate={dateRange[0]} endDate={dateRange[1]} onChange={(dates: [any, any]) => { setDateRange(dates) }} />
      </InputCollapse>
      <InputCollapse title={'참여인원'} type="NUM" value={Number(searchParams.get('ptcp'))} keepMounted={true} >
        <InputNumber value={!!searchParams.get('ptcp') ? Number(searchParams.get('ptcp')) : undefined} name='ptcp' />
      </InputCollapse>
      <InputCollapse title={'규모설정'} type="NUM" value={(!headCount[0] || !headCount[1]) ? 0 : headCountString(headCount[0], headCount[1])}>
        <div className='flex flex-col gap-[8px]'>
          <InputNumberRange
            minNumber={{ name: 'hcMin', value: headCount[0], onChange: (value: any) => { setHeadCount([value, headCount[1]]) } }}
            maxNumber={{ name: 'hcMax', value: headCount[1], min: headCount[0], onChange: (value: any) => { setHeadCount([headCount[0], value]) } }} />
          <div className='self-end text-12 text-gray3'>*최대인원 제한 없을 경우 '0'명으로 표기</div>
        </div>
      </InputCollapse>
    </DialogFilter>
  )
}