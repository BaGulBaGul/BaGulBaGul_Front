"use client";
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';
import { FormatDateRange, getParams } from '@/service/Functions';
import { DialogFilter, FilterCalendar, FilterSortRadio } from '@/components/common/filter';
import { InputNumber, InputCollapse, InputCheck } from '@/components/common/input';

export function Filter({ eventId, open, closeFilter }: { eventId: number; open: boolean; closeFilter: () => void }) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [dateRange, setDateRange] = useState<(Date | undefined)[]>([undefined, undefined])
  useEffect(() => {
    setDateRange([!!searchParams.get('sD') ? dayjs(searchParams.get('sD'), "YYYYMMDD").toDate() : undefined,
    !!searchParams.get('eD') ? dayjs(searchParams.get('eD'), "YYYYMMDD").toDate() : undefined])
  }, [searchParams.get('sD'), searchParams.get('eD')])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formData = new FormData(e.currentTarget);
    if (formData.get('state') === 'off') { formData.delete('state') }
    let fd = Object.fromEntries(formData.entries())
    let params = { ...fd, sD: !!dateRange[0] ? dayjs(dateRange[0]).format('YYYYMMDD') : '', eD: !!dateRange[1] ? dayjs(dateRange[1]).format('YYYYMMDD') : '' }
    // 변경사항 있는 경우에만 url 이동
    if (searchParams.toString() !== getParams(params).toString()) {
      router.replace(Object.keys(params).length > 0 ? `/event/${eventId}/recruitment?${getParams(params)}` : `/event/${eventId}/recruitment`)
    }
    closeFilter()
  }
  return (
    <DialogFilter isOpen={open} handleSubmit={handleSubmit} >
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